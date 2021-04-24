<template>
  <div class="h-auto">
    <div>
      <Navbar />
    </div>
    <div>
      <div class="my-12 mx-5 p-5 bg-white shadow-lg">
        <Slideshow />
      </div>

      <div class="w-full my-12 px-5">
        <Card :categories="categories" />
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
    const { documents: categories } = getCollection("inventory");

    return { user, categories };
  },
};
</script>
