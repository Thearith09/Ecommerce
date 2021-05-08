<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>
    <div class="mb-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row gap-5 my-12 mx-5"
      >
        <div
          class="h-64 hover:shadow-lg bg-white relative transform transition hover:translate-y-2 cursor-pointer"
          v-for="category in categories"
          :key="category.id"
        >
          <router-link
            :to="{ name: 'CategoryDetails', params: { id: category.id } }"
          >
            <img
              class="h-full w-full object-cover object-center rounded"
              :src="category.url"
            />
          </router-link>

          <h4
            class="absolute top-0 w-1/2 text-center font-semibold text-white py-2 bg-pink-500 rounded"
          >
            {{ category.categoryName }}
          </h4>
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const { error, documents: categories } = getCollection("inventory");
    return { error, categories };
  },
};
</script>

<style></style>
