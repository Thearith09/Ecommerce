<template>
  <div class="h-screen flex flex-col">
    <div>
      <Navbar />
    </div>

    <div class="my-5 mb-auto h-auto 2xl:w-3/4 2xl:mx-auto">
      <div></div>
    </div>
    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import getCollection from "@/composables/getCollection";

export default {
  components: {
    Footer,
    Navbar,
  },
  setup() {
    const { documents: orders } = getCollection("orders");

    return {
      orders,
    };
  },
};
</script>

<style></style>
