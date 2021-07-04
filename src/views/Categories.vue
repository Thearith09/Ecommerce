<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <div>
      <Navbar />
    </div>
    <div class="mb-auto 2xl:w-3/4 2xl:mx-auto">
      <component
        :is="currentComponent"
        @close="currentComponent = ''"
        :category="category"
      />

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row gap-5 m-5"
      >
        <div
          class="h-52 hover:shadow bg-white relative transform transition hover:translate-y-2 cursor-pointer rounded"
          v-for="category in categories"
          :key="category.name"
        >
          <router-link
            :to="{ name: 'CategoryDetails', params: { id: category.name } }"
          >
            <img
              class="h-full w-full object-cover object-center rounded"
              :src="category.url"
            />
          </router-link>

          <h4
            class="absolute top-0 w-1/2 text-center font-semibold text-white py-2 bg-blue-600 bg-opacity-80 rounded"
          >
            {{ category.name }}
          </h4>
          <div
            @click="handleRemoveCategory(category)"
            v-if="user?.admin"
            class="absolute bottom-0 right-0 text-center font-semibold text-blue-600 hover:text-blue-700"
          >
            Remove
          </div>
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
import DeleteCategoryConfirmation from "@/components/DeleteCategoryConfirmation";
import { ref } from "@vue/reactivity";

export default {
  components: {
    Navbar,
    Footer,
    DeleteCategoryConfirmation,
  },
  setup() {
    const currentComponent = ref("");
    const category = ref("");

    const { user } = getUser();
    const { error, documents: categories } = getCollection("inventory");

    const handleRemoveCategory = (doc) => {
      currentComponent.value = "DeleteCategoryConfirmation";
      category.value = doc;
    };

    return {
      error,
      categories,
      user,
      handleRemoveCategory,
      currentComponent,
      category,
    };
  },
};
</script>

<style></style>
