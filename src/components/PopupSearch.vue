<template>
  <div
    v-if="windowWidth < 640"
    class="inset-0 z-30 bg-white fixed h-screen w-full p-3"
  >
    <input
      autofocus
      v-model="search"
      @keypress.enter="handleSearch"
      class="focus:outline-none shadow font-thin w-full p-3 text-sm mr-2 pl-10"
      type="search"
      placeholder="searching..."
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getCollection from "@/composables/getCollection";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

export default {
  emits: ["close"],
  setup(props, { emit }) {
    const search = ref("");
    const windowWidth = ref(window.innerWidth);

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
          if (
            doc.categoryName.toLowerCase().includes(search.value.toLowerCase())
          ) {
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

    return { search, windowWidth, handleSearch };
  },
};
</script>

<style></style>
