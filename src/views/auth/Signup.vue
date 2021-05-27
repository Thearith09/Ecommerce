<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div>
      <Navbar />
    </div>
    <div class="my-5 mb-auto xl:relative 2xl:w-3/4 2xl:mx-auto">
      <div v-if="windowWidth >= 1280">
        <img
          class="w-full object-cover object-center"
          src="@/assets/images/bg-signin.png"
        />
      </div>
      <div
        class="w-full p-3 bg-white sm:px-20 md:px-32 xl:bg-transparent xl:absolute top-0 -right-24 xl:w-2/3"
      >
        <h3 class="text-pink-500 font-bold text-center my-5">Sign up Form</h3>
        <form @submit.prevent="handleSignup" class="space-y-5">
          <input
            autofocus
            v-model="username"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="text"
            placeholder="username"
            required
          />
          <input
            v-model="email"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="email"
            placeholder="email"
            required
          />
          <input
            v-model="telephone"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="text"
            placeholder="telephone"
            required
          />
          <input
            v-model="telegram"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="text"
            placeholder="telegram name"
            required
          />
          <input
            v-model="facebook"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="text"
            placeholder="facebook name"
            required
          />
          <input
            v-model="location"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="text"
            placeholder="location"
            required
          />
          <input
            v-model="password"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="password"
            placeholder="password"
            required
          />
          <input
            v-model="confirmPassword"
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 w-full text-gray-800 font-thin p-2 shadow"
            type="password"
            placeholder="confirm password"
            required
          />
          <h4 v-if="error" class="text-red-500 text-sm">{{ error }}</h4>
          <div class="flex">
            <button
              v-if="!isPending"
              class="focus:outline-none  hover:text-pink-700 hover:translate-x-2 transition transform p-2 shadow font-mono text-md bg-white text-pink-500"
            >
              sign up
            </button>
            <button
              v-else
              class="focus:outline-none p-2 shadow font-mono text-md bg-white text-pink-500"
            >
              signing up...
            </button>
          </div>
          <div>
            <p class="text-gray-800 font-thin">
              already have account?<span
                @click="handleNavigation"
                class="ml-2 font-semibold text-pink-500 underline cursor-pointer hover:text-pink-700"
                >signin</span
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
import useSignup from "@/composables/useSignup";
import useCollection from "@/composables/useCollection";
import { onMounted } from "@vue/runtime-core";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const username = ref("");
    const email = ref("");
    const telephone = ref("");
    const telegram = ref("");
    const facebook = ref("");
    const location = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const windowWidth = ref(window.innerWidth);

    const router = useRouter();
    const { error, signup, isPending } = useSignup();
    const { addUser } = useCollection("users");

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

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
          location: location.value,
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
      location,
      isPending,
      windowWidth,
    };
  },
};
</script>

<style></style>
