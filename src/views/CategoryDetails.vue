<template>
  <div>
    <Navbar />
    <div class="mx-5 my-12 shadow-lg h-auto bg-white">
      <component :is="currentComponent" :id="id" :key="id" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ListProduct from "@/components/ListProduct.vue";
import { ref } from "@vue/reactivity";

export default {
  props: ["id"],
  components: {
    Navbar,
    Footer,
    ListProduct,
  },
  setup(props) {
    const currentComponent = ref("ListProduct");
    return { currentComponent };
  },
};
</script>

<style></style>
