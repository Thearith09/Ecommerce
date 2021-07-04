<template>
  <div
    v-if="windowWidth < 640"
    class="inset-0 z-30 bg-white fixed h-screen w-full"
  >
    <div class="relative">
      <input
        autofocus
        v-model="search"
        @keydown="handleShowCross"
        @keypress.enter="handleSearch"
        class="focus:outline-none shadow font-thin w-full p-3 text-sm mr-2 pl-10"
        type="search"
        placeholder="searching..."
      />
      <svg
        v-if="show"
        @click="handleSearch"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute top-3 right-5 h-5 w-5 text-gray-500 cursor-pointer"
        viewBox="0 0 20 20x"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getCollection from "@/composables/getCollection";
import { useRouter } from "vue-router";
import { onMounted, watch } from "@vue/runtime-core";

export default {
  emits: ["close"],
  setup(props, { emit }) {
    const show = ref(true);
    const search = ref("");
    const windowWidth = ref(window.innerWidth);

    watch(search, () => {
      if (search.value != "") show.value = false;
      else show.value = true;
    });

    const router = useRouter();
    const { documents: categories } = getCollection("inventory");

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handleSearch = () => {
      if (!search.value) {
        emit("close");
      } else {
        let categoryId = null;
        categories.value?.forEach((doc) => {
          if (doc.name.toLowerCase().includes(search.value.toLowerCase())) {
            categoryId = doc.id;
          }
        });
        router.push({
          name: "ProductSearching",
          params: { id: categoryId, search: search.value },
        });
        emit("close");
      }
    };

    return { search, show, windowWidth, handleSearch };
  },
};
</script>

<style></style>
