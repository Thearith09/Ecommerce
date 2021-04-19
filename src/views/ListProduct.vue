<template>
  <div>
    <Navbar />
    <div class="mx-5 my-12 shadow-lg h-auto bg-white">
      <div class="p-5 space-x-2 grid grid-cols-2 items-center">
        <div>
          <div
            class="text-pink-500 cursor-pointer inline-block hover:bg-pink-500 hover:text-white h-12 w-12 rounded-full focus:outline-none active:bg-pink-600"
          >
            <svg
              @click="mountComponent"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div class="text-gray-400 text-md font-semibold">
            Add a New Product
          </div>
        </div>

        <div
          v-if="category"
          class="h-24 shadow-lg bg-white relative transform transition hover:translate-y-2 cursor-pointer"
        >
          <img
            class="h-full w-full object-cover object-center"
            :src="category.url"
          />
          <h4
            class="absolute top-0 left-0  text-center font-semibold text-pink-500 p-1"
          >
            {{ category.categoryName }}
          </h4>
          <button
            @click="handleRemoveCategory"
            class="absolute bottom-0 right-0 text-center font-semibold text-pink-500 hover:bg-white p-1"
          >
            Remove
          </button>
        </div>
      </div>

      <div v-if="category" class="grid grid-cols-2 gap-4">
        <div
          v-for="product in category.products"
          :key="product.id"
          class="flex justify-between items-center bg-white shadow-lg h-64 transition transform hover:translate-y-2"
        >
          <div class="h-full w-5/12 relative">
            <ul class="p-2 space-y-3 text-gray-400">
              <li>
                Product:
                <span class="text-gray-500 font-semibold ml-2">{{
                  product.productName
                }}</span>
              </li>
              <li>
                Price:
                <span class="text-gray-500 font-semibold ml-2"
                  >${{ product.price }}</span
                >
              </li>
              <li>
                Discount:
                <span class="text-gray-500 font-semibold ml-2"
                  >{{ product.discount }}%</span
                >
              </li>
              <li>
                Sizes:
                <span class="text-gray-500 font-semibold ml-2">{{
                  product.sizes
                }}</span>
              </li>
            </ul>
            <div class="grid grid-cols-2 w-full absolute bottom-0 left-0">
              <button
                @click="handleEditProduct(product)"
                class="focus:outline-none active:bg-pink-600 hover:bg-pink-400 shadow-lg p-2 font-mono text-md bg-pink-500 text-white"
              >
                Edit
              </button>
              <button
                @click="handleRemoveProduct(product.id, product.filePaths)"
                class="focus:outline-none active:bg-pink-600 hover:bg-pink-400 shadow-lg p-2 font-mono text-md bg-pink-500 text-white"
              >
                Remove
              </button>
            </div>
          </div>

          <div class="w-10/12 bg-blue-40">
            <img
              class="h-64 w-full object-cover object-center"
              :src="product.imageUrls[0]"
            />
          </div>
        </div>
      </div>

      <component
        @close="unmountComponent"
        :is="currentComponent"
        :categoryId="id"
        :product="product"
        :category="category"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import AddProduct from "@/components/AddProduct";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { ref } from "@vue/reactivity";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { useRouter } from "vue-router";

export default {
  components: {
    Navbar,
    Footer,
    AddProduct,
  },
  props: ["id"],
  setup(props) {
    const { updateDoc, deleteDoc } = useDocument("inventory", props.id);
    const { deleteImage } = useStorage();
    const currentComponent = ref(null);
    const router = useRouter();
    const product = ref(null);

    const { error, document: category } = getDocument("inventory", props.id);

    const mountComponent = () => {
      currentComponent.value = "AddProduct";
    };

    const unmountComponent = () => {
      currentComponent.value = null;
      product.value = null;
    };

    const handleEditProduct = (prod) => {
      product.value = prod;
      mountComponent();
    };

    const handleRemoveProduct = async (id, filePaths) => {
      for (let filePath of filePaths) {
        await deleteImage(filePath);
      }

      const products = category.value.products.filter(
        (product) => product.id != id
      );
      await updateDoc({ products });
    };

    const handleRemoveCategory = async () => {
      category.value.products.forEach((product) => {
        product.filePaths.forEach(async (filePath) => {
          await deleteImage(filePath);
        });
      });

      await deleteImage(category.value.filePath);
      await deleteDoc(category.id);

      router.push({ name: "ListCategory" });
    };

    return {
      error,
      category,
      product,
      currentComponent,
      mountComponent,
      unmountComponent,
      handleRemoveProduct,
      handleRemoveCategory,
      handleEditProduct,
    };
  },
};
</script>

<style></style>
