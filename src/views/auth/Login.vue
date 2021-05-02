<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div>
      <Navbar />
    </div>
    <div class="relative mb-auto my-10">
      <div>
        <img
          class="w-full object-cover object-center"
          src="@/assets/images/bg-signin.png"
        />
      </div>
      <div class="absolute top-1/4 right-0 px-10">
        <h3 class="text-gray-400 font-bold text-center pb-7">Sign in Form</h3>
        <form @submit.prevent="handleLogin" class="space-y-5">
          <input
            v-model="email"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-700 font-thin p-2 shadow-lg"
            type="email"
            placeholder="email"
            required
          />
          <input
            v-model="password"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-700 font-thin p-2 shadow-lg"
            type="password"
            placeholder="password"
            required
          />
          <h4 v-if="error" class="text-red-500 text-sm">{{ error }}</h4>
          <div class="flex">
            <button
              v-if="!isPending"
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 hover:bg-pink-600 shadow-lg p-2 font-mono text-md bg-pink-500 text-white"
            >
              sign in
            </button>
            <button
              v-else
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 hover:bg-pink-600 shadow-lg p-2 font-mono text-md bg-pink-500 text-white"
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
    <div>
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

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, login, isPending } = useLogin();

    const handleNavigation = () => {
      router.push({ name: "Signup" });
    };

    const handleLogin = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: "Home" });
      }
    };
    return { handleNavigation, handleLogin, email, password, error, isPending };
  },
};
</script>

<style></style>
