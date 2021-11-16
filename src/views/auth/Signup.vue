<template>
  <div class="flex flex-col h-screen bg-white">
    <div>
      <Navbar />
    </div>
    <div class="mx-10 my-5 mb-auto 2xl:w-3/4 2xl:mx-auto">
      <div
        class="w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-6/12 px-5 py-10 bg-white mx-auto shadow-2xl rounded"
      >
        <h3
          class="font-mono font-bold tracking-wide text-purple-700 text-center mb-5"
        >
          {{ $t("Signup Form") }}
        </h3>
        <form @submit.prevent="handleSignup" class="space-y-8">
          <div class="space-y-8">
            <div class="relative w-full z-0">
              <input
                v-model="username"
                type="text"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-700 border-purple-100"
              />
              <label
                for="Username"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Enter username</label
              >
            </div>
            <div class="relative w-full z-0">
              <input
                v-model="email"
                type="email"
                name="email"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-700 border-purple-100"
              />
              <label
                for="email"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Enter email</label
              >
            </div>
            <div class="relative w-full text-left z-0">
              <input
                v-model="password"
                type="password"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-700 border-purple-100"
              />
              <label
                for="password"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Enter password</label
              >
            </div>
            <div class="relative w-full text-left z-0">
              <input
                v-model="confirmPassword"
                type="password"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-700 border-purple-100"
              />
              <label
                for="password"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Confrim password</label
              >
            </div>
          </div>
          <label v-if="error" class="text-red-600 text-sm">{{ error }}</label>
          <div class="flex">
            <button
              v-if="!isPending"
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-700 rounded-full w-full p-2 tracking-wide shadow hover:bg-purple-700 hover:text-white bg-white text-purple-700"
            >
              sign up
            </button>
            <button
              v-else
              class="relative flex justify-center rounded-full items-center space-x-4 sm:space-x-12 focus:outline-none cursor-wait w-full p-2 tracking-wide shadow bg-white text-purple-700"
            >
              <div>
                signing up...
              </div>
              <div class="absolute top-3 right-2">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-700"
                ></div>
              </div>
            </button>
          </div>
          <div>
            <p class="text-gray-800 font-thin text-center">
              already have account?<span
                @click="handleNavigation"
                class="ml-2 font-semibold text-purple-700 underline cursor-pointer hover:text-purple-900"
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
import useCollection from "@/composables/useCollection";
import useSignup from "@/composables/useSignup";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const username = ref("");
    const email = ref("");
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

      await res.user.sendEmailVerification();

      if (res.user.uid) {
        await addUser(res.user.uid, {
          name: res.user.displayName,
          email: res.user.email,
          createdAt: timestamp(),
        });

        if (!error.value) {
          router.push({ name: "Login" });
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
      isPending,
      windowWidth,
    };
  },
};
</script>

<style scoped>
.origin-0 {
  transform-origin: 0%;
}
.-z-1 {
  z-index: -1;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label,
textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label,
select:focus ~ label,
select:not([value=""]):valid ~ label {
  /* @apply transform; scale-75; -translate-y-6; */
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-scale-x: 0.75;
  --tw-scale-y: 0.75;
  --tw-translate-y: -1.3rem;
}
input:focus ~ label,
select:focus ~ label {
  /* @apply text-black; left-0; */
  --tw-text-opacity: 1;
  color: rgba(124, 58, 237, var(--tw-text-opacity));
  left: 0px;
  z-index: 10;
}
</style>
