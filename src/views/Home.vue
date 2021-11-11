<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>
    <div class="mb-auto 2xl:w-3/4 2xl:mx-auto bg-white">
      <div>
        <Slideshow />
      </div>
      <div
        class="my-5 2xl:mx-0 mx-10"
        v-for="(category, index) in categories"
        :key="category.id"
      >
        <div class="space-y-3 max-w-sm sm:max-w-none w-full mx-auto">
          <div class="font-bold text-xl text-gray-700 uppercase mt-8">
            {{ $t(`${header[index]?.toUpperCase()}`) }}
          </div>
          <Card :name="category.id" />
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Slideshow from "@/components/Slideshow";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    Navbar,
    Slideshow,
    Card,
    Footer,
  },
  setup() {
    const { user } = getUser();
    const header = ref([
      "Top-ranked product",
      "Our top pick for you",
      "New arrivals",
      "Just for you",
      "Recommended for you",
    ]);

    const store = useStore();
    const { documents: categories } = getCollection("inventory");

    onMounted(() => {
      console.log("Store: ", store.state.items);
    });

    return { user, categories, header };
  },
};
</script>
