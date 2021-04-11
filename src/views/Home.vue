<template>
  <div>
    <Navbar />
    <Slideshow />
    <div class="grid grid-cols-2 grid-rows-3 gap-4 w-full mt-12 px-5">
      <div class="row-start-1">
        <Card />
      </div>
      <div class="row-start-2">
        <Card />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Card />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Slideshow from "@/components/Slideshow";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    Navbar,
    Slideshow,
    Card,
    Footer,
  },
};
</script>
