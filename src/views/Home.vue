<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>
    <div class="mb-auto 2xl:w-3/4 mx-auto">
      <div class="bg-white">
        <Slideshow />
      </div>
      <div v-for="(category, index) in categories" :key="category.id">
        <div v-if="category.products.length > 0" class="my-5 mx-10 space-y-3">
          <div class="font-bold text-xl text-gray-700 uppercase mt-8">
            {{ header[index] }}
          </div>
          <Card :category="category" />
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
      "Recommanded for you",
    ]);
    const { documents: categories } = getCollection("inventory", 5);

    return { user, categories, header };
  },
};
</script>
