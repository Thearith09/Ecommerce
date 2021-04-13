<template>
  <div>
    <Navbar />
    <div
      class="grid grid-cols-4 grid-rows-2 grid-flow-row my-12 mx-5 bg-white shadow-lg"
    >
      <div class="col-span-1 bg-red-400"></div>
      <div class="col-span-2 row-span-2 p-5">
        <Slideshow />
      </div>
      <div class="col-span-1 bg-blue-500"></div>
    </div>
    <div class="grid grid-cols-4 gap-4 w-full my-12 px-5">
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
