<template>
  <div class="bg-gradient-to-bl from-red-300 to-red-400 h-screen w-full">
    <div class="flex justify-center items-center h-3/4">
      <div
        class="relative w-full mx-5 sm:w-6/12 h-56 px-10 space-y-3 flex flex-col justify-center items-center bg-white shadow rounded-md"
      >
        <div
          id="tick"
          class="animate__animated animate__bounceIn absolute -top-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="text-gray-700 text-xl font-semibold">
          Payment Not Processed!
        </div>
        <div class="text-gray-500">
          <p>
            Shop around and pay again!
          </p>
        </div>
        <div>
          <button
            @click="handleNavigation"
            class="py-1 focus:outline-none border-red-600 border-2 text-gray-500 rounded-full w-60 font-semibold hover:border-red-700 hover:text-gray-700"
          >
            BACK TO STORE
          </button>
        </div>
        <div class="text-gray-400">
          easy4shopping.net
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useCollection from "@/composables/useCollection";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(async () => {
      const { deleteDoc } = useCollection("orders");
      document.getElementById("tick").classList.add("translate-y-full");

      if (store.state.sessionID) {
        console.log(store.state.sessionID);
        await deleteDoc(store.state.sessionID);
        store.commit("removeSessionId");
        console.log("SessionId: ", store.state.sessionID);
      }
    });

    const handleNavigation = () => {
      router.push({ name: "Home" });
    };

    return { handleNavigation };
  },
};
</script>
