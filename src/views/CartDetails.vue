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
              class="relative flex justify-center items-center focus:outline-none cursor-wait rounded shadow p-3 tracking-wide bg-yellow-300 text-purple-700 font-bold w-full"
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
        class="relative rounded w-11/12 h-auto my-10 p-5 md:w-6/12 mx-auto lg:my-20 shadow border-2 border-purple-100 bg-white"
      >
        <div class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 sm:h-28 inline-block p-5 text-purple-700 text-opacity-80"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
        </div>

        <div
          class="text-gray-700 text-center flex flex-col justify-center space-y-5 mb-5 font-mono"
        >
          <h3>Your cart is empty.</h3>
          <h4>Keep shopping for your favorite products.</h4>
        </div>

        <div
          @click="handleNavigation"
          class="font-medium py-3 w-40 text-center mx-auto mb-5 bg-purple-700 bg-opacity-80 hover:bg-opacity-100 text-white cursor-pointer"
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
