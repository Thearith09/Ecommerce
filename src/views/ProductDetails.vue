<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto my-5">
      <div v-if="category">
        <div
          class="h-auto"
          v-for="product in category.products"
          :key="product.id"
        >
          <div v-if="product.id == productId">
            <component
              :is="currentComponent"
              :item="product"
              @order="emitOrder"
              :key="category"
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
  props: ["categoryId", "productId"],
  setup(props) {
    const currentComponent = ref("Product");
    const { document: category } = getDocument("inventory", props.categoryId);

    return { category, currentComponent };
  },
};
</script>

<style></style>
