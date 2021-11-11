<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <div>
      <Navbar />
    </div>
    <div class="mb-auto 2xl:w-3/4 2xl:mx-auto">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-5 m-5"
      >
        <div
          class="h-80 overflow-hidden bg-white border relative cursor-pointer rounded"
          v-for="category in categories"
          :key="category.name"
        >
          <router-link
            :to="{ name: 'CategoryDetails', params: { id: category.name } }"
          >
            <img
              class="h-full w-full object-cover object-center rounded transform transition duration-500 hover:scale-110 "
              :src="category.url"
            />
          </router-link>

          <h4
            class="absolute top-0 w-1/2 text-center font-semibold text-white py-2 bg-purple-700 bg-opacity-80 rounded-t rounded-r-none"
          >
            {{ category.name }}
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
import getUser from "@/composables/getUser";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const { user } = getUser();
    const { error, documents: categories } = getCollection("inventory");

    return {
      error,
      categories,
      user,
    };
  },
};
</script>

<style></style>
