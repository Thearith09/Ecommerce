<template>
  <div
    class="flex justify-center bg-gradient-to-l from-green-100 to-green-300 items-center h-screen w-full 2xl:w-3/4 2xl:mx-auto"
  >
    <div
      class="relative w-full mx-5 sm:w-3/4 lg:w-2/4 h-52 px-10 space-y-3 flex flex-col justify-center items-center bg-white shadow rounded"
    >
      <div
        id="tick"
        class="animate__animated animate__bounceIn animate-delay-5s absolute -top-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="text-gray-700 text-xl font-semibold">Payment successful!</div>
      <div class="text-gray-500">
        We've been sent ordered items to your email.
      </div>
      <div>
        <button
          @click="handleNavigation"
          class="py-1 focus:outline-none border-green-500 border-2 text-gray-500 rounded-full w-60 font-semibold hover:border-green-700 hover:text-gray-700"
        >
          BACK TO STORE
        </button>
      </div>
      <div class="text-gray-400">
        easy4shopping.net
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    onMounted(() => {
      document.getElementById("tick").classList.add("translate-y-full");
    });

    const handleNavigation = () => {
      router.push({ name: "Home" });
    };

    return { handleNavigation };
  },
};
</script>
