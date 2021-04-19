<template>
  <div>
    <Navbar />
    <div class="grid grid-cols-3 h-auto mt-12 bg-white">
      <div class="col-span-2">
        <img class="" src="@/assets/images/loginBackground.png" />
      </div>
      <div class="col-span-1">
        <form @submit.prevent="handleSignup" class="space-y-5 space-x-5">
          <img src="@/assets/images/loginHeader.png" />

          <input
            v-model="username"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-800 font-thin p-2 shadow-lg"
            type="text"
            placeholder="username"
            required
          />
          <input
            v-model="email"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-800 font-thin p-2 shadow-lg"
            type="email"
            placeholder="email"
            required
          />
          <input
            v-model="telephone"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-800 font-thin p-2 shadow-lg"
            type="text"
            placeholder="telephone"
            required
          />
          <input
            v-model="telegram"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-800 font-thin p-2 shadow-lg"
            type="text"
            placeholder="telegram name"
            required
          />
          <input
            v-model="facebook"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-800 font-thin p-2 shadow-lg"
            type="text"
            placeholder="facebook name"
            required
          />
          <input
            v-model="password"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-800 font-thin p-2 shadow-lg"
            type="password"
            placeholder="password"
            required
          />
          <input
            v-model="confirmPassword"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-11/12 text-gray-800 font-thin p-2 shadow-lg"
            type="password"
            placeholder="confirm password"
            required
          />
          <h4 v-if="error" class="text-red-500 text-sm">{{ error }}</h4>
          <div class="flex">
            <button
              v-if="!isPending"
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 hover:bg-pink-400 p-2 shadow-lg font-mono text-md bg-pink-500 text-white"
            >
              Signup
            </button>
            <button
              v-else
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 hover:bg-pink-400 p-2 shadow-lg font-mono text-md bg-pink-500 text-white"
            >
              Signup...
            </button>
          </div>
          <div>
            <p class="text-gray-800 font-thin">
              already have account?<span
                @click="handleNavigation"
                class="ml-2 font-semibold text-pink-500 underline cursor-pointer hover:text-pink-400"
                >login</span
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
import useSignup from "@/composables/useSignup";
import useCollection from "@/composables/useCollection";

export default {
  components: {
    Navbar,
  },
  setup() {
    const username = ref("");
    const email = ref("");
    const telephone = ref("");
    const telegram = ref("");
    const facebook = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();
    const { error, signup, isPending } = useSignup();
    const { addUser } = useCollection("users");

    const handleNavigation = () => {
      router.push({ name: "Login" });
    };

    const handleSignup = async () => {
      if (!(password.value == confirmPassword.value)) {
        return (error.value = "Password doesn't match!");
      }

      const res = await signup(email.value, password.value, username.value);

      if (res.user.uid) {
        await addUser(res.user.uid, {
          telephone: telephone.value,
          facebook: facebook.value,
          telegram: telegram.value,
        });

        if (!error.value) {
          router.push({ name: "Home" });
        }
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      handleNavigation,
      error,
      handleSignup,
      telephone,
      telegram,
      facebook,
      isPending,
    };
  },
};
</script>

<style></style>
