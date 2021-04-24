<template>
  <Navbar />
  <div class="grid grid-cols-3 my-12">
    <div
      class="col-span-2 px-5 py-1"
      v-for="item in cart.items"
      :key="item.productId"
    >
      <div class="flex h-56 bg-white">
        <div class="h-full w-1/4">
          <img class="h-full w-full" :src="item.images[0].url" />
        </div>
        <div class="p-2">
          <div>
            <h4>{{ item.productName }}</h4>
          </div>
          <div class="space-x-2">
            <span
              class="text-gray-500 font-semibold bg-gray-200 p-2 uppercase"
              v-for="(size, index) in item.sizes"
              :key="index"
              >{{ size }}</span
            >
          </div>
          <div class="space-x-2">
            <p v-for="(image, index) in item.images" :key="index">
              <img class="h-10 w-10" :src="image.url" />
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-red-500">
      <h1>hoewf</h1>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getUser from "@/composables/getUser";
import getDocument from "@/composables/getDocument";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup(props) {
    const { user } = getUser();
    const { document: cart } = getDocument("carts", user.value?.uid);
    return { cart };
  },
};
</script>

<style></style>
