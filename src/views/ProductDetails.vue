<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto 2xl:w-3/4 2xl:mx-auto">
      <div v-if="products">
        <div class="h-auto" v-for="product in products" :key="product.id">
          <div v-if="product.id == id">
            <component
              :is="currentComponent"
              :item="product"
              :categoryName="categoryName"
              @order="emitOrder"
              :key="id"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Product from "@/components/Product.vue";
import getDocument from "@/composables/getDocument";
import { ref } from "@vue/reactivity";

export default {
  components: {
    Navbar,
    Footer,
    Product,
  },
  props: ["categoryName", "id"],
  setup(props) {
    const currentComponent = ref("Product");
    const { documents: products } = getDocument(
      "inventory",
      props.categoryName,
      "products"
    );

    return { products, currentComponent };
  },
};
</script>

<style></style>
