<template>
  <div class="flex flex-col h-screen bg-gray-100 w-full">
    <div>
      <Navbar />
    </div>
    <div class="my-5 mb-auto md:relative">
      <div v-if="windowWidth >= 768">
        <img
          class="lg:w-full object-cover object-center"
          src="@/assets/images/bg-signin.png"
        />
      </div>
      <div
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
          <div class="flex">
            <button
              v-if="!isPending"
              class="focus:outline-none hover:text-pink-600 hover:translate-x-2 transition transform shadow p-2 font-mono text-md bg-white text-pink-500"
            >
              sign in
            </button>
            <button
              v-else
              class="focus:outline-none shadow p-2 font-mono text-md bg-white text-pink-500"
            >
              signing in...
            </button>
          </div>
          <div>
            <p class="text-gray-800 font-thin">
              doesn't have account yet?<span
                @click="handleNavigation"
                class="ml-2 font-semibold text-pink-500 underline cursor-pointer hover:text-pink-400"
                >signup</span
              >
            </p>
          </div>
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
import { onMounted } from "@vue/runtime-core";

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

    const { error, login, isPending } = useLogin();

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
      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: "Home" });
      }
    };
    return {
      handleNavigation,
      handleLogin,
      email,
      password,
      error,
      isPending,
      windowWidth,
    };
  },
};
</script>

<style></style>
