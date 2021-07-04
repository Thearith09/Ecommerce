<template>
  <div class="flex justify-center items-center h-screen w-full">
    <img
      class="object-cover object-center min-w-full min-h-full"
      src="@/assets/images/succeed.jpg"
      alt=""
    />
    <div class="fixed top-0 flex justify-center items-center h-3/4">
      <div
        class="relative w-full mx-5 sm:w-8/12 h-56 px-10 space-y-3 rounded-md flex flex-col justify-center items-center bg-white shadow"
      >
        <div
          id="tick"
          class="animate__animated animate__bounceIn absolute -top-10"
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
        <div class="text-gray-700 text-xl font-semibold pt-5">
          Payment successful!
        </div>
        <div class="text-gray-500 text-center">
          <p>
            We appreciate your support! If you have any questions, please email
            to

            <a
              class="underline text-blue-600"
              href="mailto:puthearith.pheng@gmail.com"
              >puthearith.pheng@gmail.com</a
            >.
          </p>
        </div>
        <div>
          <button
            @click="handleNavigation"
            class="py-1 focus:outline-none border-green-500 border-2 text-gray-500 rounded-full w-60 font-semibold hover:border-green-700 hover:text-gray-700"
          >
            BACK TO STORE
          </button>
        </div>
        <div class="text-gray-400 pb-5">
          easy4shopping.net
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { onMounted, watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const { user } = getUser();
    const { deleteDoc } = useDocument("carts", user.value?.uid, "items");
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");

    onMounted(() => {
      document.getElementById("tick").classList.add("translate-y-full");

      if (store.state.sessionID) {
        //once payment completely remove items from cart collection
        watch(cart, () => {
          cart.value.forEach(async (item) => {
            await deleteDoc(item.id);
          });
        });
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
