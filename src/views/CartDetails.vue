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
        <div v-if="cart" class="flex flex-col bg-white space-y-1 rounded">
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
              class="bg-yellow-200 text-purple-700 space-x-10 items-center p-2 rounded"
            >
              <span> Discount </span>
              <span>- ${{ discount.toFixed(2) }} </span>
            </div>
          </div>

          <div
            class="text-right space-x-10 items-center font-medium text-gray-700 border-b-2 border-purple-100 pb-3"
          >
            <span class="underline"> Shipping </span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>

          <div>
            <div
              class="text-right space-x-10 text-gray-700 font-semibold uppercase"
            >
              <span>Total Amount</span>
              <span class="text-purple-700 text-xl font-mono"
                >${{ total.toFixed(2) }}</span
              >
            </div>
          </div>

          <div class="pb-5 border-b-2 border-purple-100">
            <button
              v-if="!isPending"
              @click="handleCheckout"
              class="focus:outline-none w-full p-3 flex rounded justify-center items-center cursor-pointer text-purple-700 font-bold bg-yellow-300 hover:translate-y-1 transform transition-all duration-150 shadow"
            >
              Checkout
            </button>
            <button
              v-else
              class="relative flex justify-center items-center focus:outline-none rounded shadow p-3 tracking-wide bg-yellow-300 text-purple-700 font-bold w-full"
            >
              <div>
                Checking out...
              </div>
              <div class="absolute top-4 right-2">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-700"
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="userSignin ? cart?.length <= 0 : tempCart.length <= 0"
        class="relative rounded w-11/12 h-auto my-10 p-5 md:w-6/12 mx-auto lg:my-20 border-2 border-purple-100 bg-white"
      >
        <div class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 sm:h-28 inline-block p-5 text-purple-700"
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

        <div
          class="text-gray-700 tracking-wide text-center flex justify-center mb-5"
        >
          <h3>Your cart is empty. Keep shopping for your favorite products.</h3>
        </div>

        <div
          @click="handleNavigation"
          class="font-bold py-3 w-40 text-center mx-auto mb-5 bg-yellow-300 text-purple-700 cursor-pointer"
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
import getUserDoc from "@/composables/getUserDoc";
import Cart from "@/components/Cart.vue";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "vue";
import { functions, timestamp, projectAuth } from "@/firebase/config";
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
    const isPending = ref(false);
    const cart = ref(null);
    const userSignin = ref(projectAuth.currentUser);

    const store = useStore();
    const tempCart = ref(store.state.cart);

    const router = useRouter();
    const { _user } = getUserDoc("users");
    const { user } = getUser();
    const { updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.uid,
      "items"
    );

    onMounted(() => {
      const { documents } = getDocument("carts", user.value?.uid, "items");

      watch(documents, () => {
        cart.value = documents.value;
      });
    });

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
        isPending.value = true;
        const createStripeCheckout = functions.httpsCallable(
          "createStripeCheckout"
        );

        const stripe = await loadStripe(
          "pk_test_51Is77NBVuXsuKaUY6WAFvG0YNecHXxnU0XPN3yKSZeC49BkY5AUAXpVjTx45zx0HCHKr654nlUHKD9zsqb5X55nz00NN802AgG"
        );

        const res = await createStripeCheckout({
          id: user.value?.uid,
          email: _user.value.email,
          phone: _user.value.phone,
          createdAt: Date.now(),
        });
        const sessionId = await res.data.id;
        store.commit("setSessionId", sessionId);
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
      isPending,
      userSignin,
    };
  },
};
</script>

<style></style>
