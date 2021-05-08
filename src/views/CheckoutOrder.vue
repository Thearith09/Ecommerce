<template>
  <div class="h-screen flex flex-col">
    <div>
      <Navbar />
    </div>

    <div
      class="mb-auto grid grid-cols-layout-list-carts md:grid-cols-none h-auto"
    >
      <div class="bg-white my-5">
        <Checkout :orders="orders" />
      </div>
    </div>
    <div class="mt-5">
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

    return {
      orders,
    };
  },
};
</script>

<style></style>
