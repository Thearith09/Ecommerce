<template>
  <div class="h-screen flex flex-col">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto bg-white h-full border-b-2 border-t-2 border-gray-100">
      <Checkout :orders="orders" />
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import Checkout from "@/components/Checkout.vue";
import getCollection from "@/composables/getCollection";

export default {
  components: {
    Footer,
    Navbar,
    Checkout,
  },
  setup() {
    const { documents: orders } = getCollection("orders");

    return { orders };
  },
};
</script>

<style></style>
