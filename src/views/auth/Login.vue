<template>
  <div class="flex flex-col h-screen bg-gray-100 w-full">
    <div>
      <Navbar />
    </div>
    <div class="my-5 mb-auto md:relative 2xl:w-3/4 2xl:mx-auto">
      <div v-if="windowWidth >= 768">
        <img
          class="lg:w-full object-cover object-center"
          src="@/assets/images/bg-signin.png"
        />
      </div>

      <div
        v-if="!reset"
        class="bg-white p-3 w-full py-10 sm:py-20 sm:px-20 md:absolute md:w-6/12 md:bg-transparent md:py-0 md:top-1/4 md:left-2/4 md:px-10 lg:w-2/4 lg:top-1/4 lg:right-0 xl:right-20"
      >
        <h3 class="text-pink-500 font-bold text-center my-5">
          Sign in Form
        </h3>
        <form @submit.prevent="handleLogin" class="space-y-5 md:mr-2">
          <input
            autofocus
            v-model="email"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-700 font-thin p-2 shadow"
            type="email"
            placeholder="email"
            required
          />
          <input
            v-model="password"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-700 font-thin p-2 shadow"
            type="password"
            placeholder="password"
            required
          />
          <h4 v-if="error" class="text-red-500 text-sm">{{ error }}</h4>
          <div class="flex justify-between">
            <button
              v-if="!isPending"
              class="focus:outline-none hover:text-pink-700 hover:translate-x-2 transition transform shadow p-2 font-mono text-md bg-white text-pink-500"
            >
              sign in
            </button>
            <button
              v-else
              class="focus:outline-none shadow p-2 font-mono text-md bg-white text-pink-500"
            >
              signing in...
            </button>
            <div
              @click="reset = !reset"
              class="text-gray-700 hover:text-pink-700 cursor-pointer text-sm"
            >
              forgot password?
            </div>
          </div>

          <div>
            <p class="text-gray-800 font-thin">
              doesn't have account yet?<span
                @click="handleNavigation"
                class="ml-2 font-semibold text-pink-500 underline cursor-pointer hover:text-pink-700"
                >signup</span
              >
            </p>
          </div>
        </form>
      </div>
      <div
        v-else
        class="bg-white p-3 w-full py-10 sm:py-20 sm:px-20 md:absolute md:w-6/12 md:bg-transparent md:py-0 md:top-1/4 md:left-2/4 md:px-10 lg:w-2/4 lg:top-1/4 lg:right-0 xl:right-20"
      >
        <h3 class="text-pink-500 font-bold text-center my-5">
          Reset password with your email address
        </h3>
        <form @submit.prevent="handleResetPassword" class="space-y-5 md:mr-2">
          <input
            autofocus
            v-model="email"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-700 font-thin p-2 shadow"
            type="email"
            placeholder="email"
            required
          />
          <button
            class="focus:outline-none hover:text-pink-700 hover:translate-x-2 transition transform shadow p-2 font-mono text-md bg-white text-pink-500"
          >
            reset
          </button>
        </form>
      </div>
    </div>
    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import useLogin from "@/composables/useLogin";
import useResetPassword from "@/composables/useResetPassword";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const windowWidth = ref(window.innerWidth);
    const reset = ref(false);
    const cart = ref(null);

    const store = useStore();
    const { error, login, isPending } = useLogin();
    const { resetPassword } = useResetPassword();

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handleNavigation = () => {
      router.push({ name: "Signup" });
    };

    const handleLogin = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        if (res.user.emailVerified) {
          const { documents: cart } = getDocument(
            "carts",
            res.user.displayName,
            "items"
          );
          const { updateDoc, addDoc } = useDocument(
            "carts",
            res.user.displayName,
            "items"
          );

          const unwatch = watch(cart, async () => {
            //if there are items in temporary cart, push it to user account
            unwatch(); //watch only once
            if (cart.value.length > 0) {
              store.state.cart.forEach(async (item) => {
                //check whether item already add to card or not yet
                let exist = false;
                cart.value.forEach(async (element) => {
                  if (item.name === element.name) {
                    exist = true;
                    element.qty += item.qty;
                    element.color = item.color;
                    element.size = item.size;
                    await updateDoc(element);
                  }
                });

                if (!exist) {
                  await addDoc(item);
                }
              });
            } else {
              for (let item of store.state.cart) {
                await addDoc(item);
              }
            }
            store.state.cart = [];
            console.log("Temp Cart: ", store.state.cart);
            router.push({ name: "Home" });
          });
        } else {
          error.value = "Please verify your email!";
        }
      } else {
        error.value = "Incorrect email or password!";
      }
    };

    const handleResetPassword = async () => {
      await resetPassword(email.value);
      reset.value = !reset.value;
      email.value = "";
      password.value = "";
      error.value = null;
    };

    return {
      handleNavigation,
      handleLogin,
      email,
      password,
      error,
      isPending,
      windowWidth,
      handleResetPassword,
      reset,
    };
  },
};
</script>

<style></style>
