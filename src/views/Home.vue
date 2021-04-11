<template>
  <div>
    <Navbar />
    <Slideshow />
    <div class="grid grid-cols-2 grid-rows-3 gap-4 w-full mt-12 px-5">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Slideshow from "@/components/Slideshow";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import getUser from "@/composables/getUser";

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

    return { user };
  },
};
</script>
