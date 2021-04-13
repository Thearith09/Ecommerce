<template>
  <div>
    <Navbar />
    <div class="grid grid-cols-3 h-auto mt-12 bg-white">
      <div class="col-span-2">
        <img src="@/assets/images/loginBackground.png" />
      </div>
      <div>
        <form @submit.prevent="handleLogin" class="space-y-5 space-x-5">
          <img src="@/assets/images/loginHeader.png" />
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
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 hover:bg-pink-400 shadow-lg p-2 font-mono text-md bg-pink-500 text-white"
            >
              Login
            </button>
            <button
              v-else
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 hover:bg-pink-400 shadow-lg p-2 font-mono text-md bg-pink-500 text-white"
            >
              Login...
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
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import useLogin from "@/composables/useLogin";

export default {
  components: {
    Navbar,
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
