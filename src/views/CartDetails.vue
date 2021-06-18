<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto 2xl:w-3/4 2xl:mx-auto">
      <div
        v-if="cart?.length > 0 || tempCart.length > 0"
        class="flex flex-col-reverse lg:flex-row lg:space-x-2 lg:w-11/12 mb-auto my-5 lg:mx-auto"
      >
        <div v-if="cart" class="flex flex-col bg-white rounded">
          <div v-for="item in cart" :key="item.id">
            <Cart :item="item" @updateQty="handleUpdateQty" />
          </div>
        </div>

        <div v-if="tempCart" class="flex flex-col bg-white rounded">
          <div v-for="item in tempCart" :key="item.id">
            <Cart :item="item" @updateQty="handleUpdateQty" />
          </div>
        </div>

        <div class="space-y-5 w-full lg:w-2/4 xl:w-1/3 p-5 h-72">
          <div
            v-if="!discount"
            class="text-right space-x-10 items-center font-medium text-gray-700"
          >
            <span class="underline"> {{ pieces }} pieces </span>
            <span>${{ subTotal.toFixed(2) }} </span>
          </div>

          <div v-else class="text-right font-medium text-gray-700 space-y-3">
            <div class="space-x-10 items-center">
              <span class="underline"> {{ pieces }} pieces </span>
              <span>${{ subTotal.toFixed(2) }} </span>
            </div>
            <div
              class="bg-red-600 text-white space-x-10 items-center p-2 rounded"
            >
              <span> Discount </span>
              <span>- ${{ discount.toFixed(2) }} </span>
            </div>
          </div>

          <div
            class="text-right space-x-10 items-center font-medium text-gray-700 border-b-2 border-gray-200 pb-3"
          >
            <span class="underline"> Shipping </span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>

          <div>
            <div class="text-right space-x-10 text-gray-700 font-bold">
              <span>Total Price</span>
              <span class="text-red-600">${{ total.toFixed(2) }}</span>
            </div>
          </div>

          <div class="pb-5 border-b-2 border-gray-200">
            <button
              @click="handleCheckout"
              class="focus:outline-none w-full p-3 uppercase flex rounded justify-center items-center cursor-pointer text-white bg-pink-500 hover:bg-pink-700 font-medium shadow"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="cart?.length <= 0 && tempCart.length <= 0"
        class="relative rounded w-full h-auto my-10 p-5 md:w-3/4 xl:w-1/2 md:mx-auto lg:my-20 border-2 border-gray-200 bg-white"
      >
        <div class="flex justify-center mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 sm:h-28 inline-block p-5 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <div class="text-gray-700 text-sm flex justify-center mt-7 mb-5">
          <h3>Your cart is empty. Keep shopping for your favorite products.</h3>
        </div>

        <div
          @click="handleNavigation"
          class="text-white p-3 mb-24 flex justify-center bg-pink-500 w-2/4 sm:w-1/4 mx-auto cursor-pointer"
        >
          Keep Shopping
        </div>
      </div>
    </div>

    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getUser from "@/composables/getUser";
import Cart from "@/components/Cart.vue";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { watchEffect } from "vue";
import { functions } from "@/firebase/config";
import { loadStripe } from "@stripe/stripe-js";
import { useStore } from "vuex";

export default {
  components: {
    Navbar,
    Footer,
    Cart,
  },
  setup() {
    const total = ref(0);
    const subTotal = ref(0);
    const pieces = ref(0);
    const shipping = ref(2);
    const discount = ref(0);

    const store = useStore();
    const tempCart = ref(store.state.cart);

    const router = useRouter();
    const { user } = getUser();
    const { documents: cart } = getDocument(
      "carts",
      user.value?.displayName,
      "items"
    );
    const { updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.displayName,
      "items"
    );

    watchEffect(() => {
      //reset once carts collection has been updated
      subTotal.value = 0;
      total.value = 0;
      pieces.value = 0;
      discount.value = 0;

      if (cart.value?.length > 0) {
        cart.value.forEach((item) => {
          if (item.discount > 0) {
            discount.value += (item.price * item.qty * item.discount) / 100;
          }

          subTotal.value += parseFloat(item.price * item.qty);
          pieces.value += parseInt(item.qty);
        });

        total.value = parseFloat(
          subTotal.value + shipping.value - discount.value
        );
      } else {
        tempCart.value.forEach((item) => {
          if (item.discount > 0) {
            discount.value += (item.price * item.qty * item.discount) / 100;
          }

          subTotal.value += parseFloat(item.price * item.qty);
          pieces.value += parseInt(item.qty);
        });

        total.value = parseFloat(
          subTotal.value + shipping.value - discount.value
        );
      }
    });

    const handleNavigation = () => {
      router.push({ name: "Home" });
    };

    const handleUpdateQty = async (e) => {
      if (user.value) {
        await updateCart(e);
      } else {
        store.commit("updateToCart", e);
      }
    };

    const handleCheckout = async () => {
      if (!user.value) {
        router.push({ name: "Login" });
      } else {
        const createStripeCheckout = functions.httpsCallable(
          "createStripeCheckout"
        );

        const stripe = await loadStripe(
          "pk_test_51Is77NBVuXsuKaUY6WAFvG0YNecHXxnU0XPN3yKSZeC49BkY5AUAXpVjTx45zx0HCHKr654nlUHKD9zsqb5X55nz00NN802AgG"
        );

        const res = await createStripeCheckout({
          name: user.value?.displayName,
        });
        const sessionId = await res.data.id;
        stripe.redirectToCheckout({ sessionId });
      }
    };

    return {
      handleCheckout,
      handleUpdateQty,
      handleNavigation,
      cart,
      tempCart,
      total,
      subTotal,
      discount,
      pieces,
      shipping,
    };
  },
};
</script>

<style></style>
