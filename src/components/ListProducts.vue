<template>
  <div class="px-10">
    <div class="h-full border-b-2 border-gray-200">
      <div class="flex justify-between my-5">
        <div v-if="search && products?.length > 0">
          <div class="text-gray-700 font-bold text-2xl">
            {{ products?.length }} results for "{{ search }}"
            <span class="block text-pink-500 font-bold text-lg"
              >{{ name }} Products</span
            >
          </div>
        </div>

        <div
          v-if="user?.admin"
          class="fixed z-10 right-20 2xl:right-64 text-pink-500 cursor-pointer hover:text-pink-700 h-12 w-12 focus:outline-none"
        >
          <svg
            @click="mountComponent('AddProduct')"
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div v-if="products?.length > 0 && !search" class="h-auto mb-5">
        <div class="font-bold text-xl text-gray-700 uppercase mb-4">
          {{ $t("MOST POPULAR") }}
        </div>
        <Card :name="name" />
      </div>
    </div>
  </div>
  <div v-if="products" class="sm:px-10 my-5 w-full px-5">
    <div
      v-for="(product, index) in products"
      v-show="index >= previous && index < next"
      :key="product.id"
      class="flex flex-col sm:flex-row items-center space-x-2 py-5 h-auto sm:h-56 transition transform hover:translate-y-2 border-b-2 border-gray-200"
    >
      <div
        class="relative w-full h-48 mb-2 sm:mb-0 sm:w-2/3 md:w-1/2 xl:w-1/3 "
      >
        <router-link
          :to="{
            name: 'ProductDetails',
            params: {
              id: product.id,
              categoryName: name,
            },
          }"
        >
          <img
            class="h-full w-full object-cover object-center overflow-hidden rounded"
            :src="product.images[product.images.length - 1]?.url"
          />
        </router-link>
        <h3
          v-if="product.discount > 0"
          class="absolute bottom-0 right-0 bg-pink-500 bg-opacity-90 font-mono text-white p-1 rounded"
        >
          {{ product.discount }}% OFF
        </h3>
      </div>
      <div class="h-full w-full xl:px-5">
        <div
          class="flex flex-col lg:flex-row justify-between items-start h-full space-y-2 text-gray-500 sm:space-y-3 sm:px-5 md:px-10"
        >
          <div class="space-y-2 lg:space-y-4">
            <div class="leading-none space-y-1">
              <p class="text-gray-800 font-semibold inline-block">
                {{ product.productName }}
              </p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>

            <p>In Stock</p>

            <div class="flex items-center space-x-2 ">
              <p v-for="size in product.sizes" :key="size">
                <span class="text-gray-500 font-semibold uppercase">{{
                  size
                }}</span>
              </p>
            </div>

            <div v-if="user?.admin" class="flex space-x-3">
              <button
                @click="handleEditProduct(product)"
                class="focus:outline-none text-pink-500 hover:text-pink-700"
              >
                Edit
              </button>
              <button
                @click="handleRemoveProduct(product)"
                class="focus:outline-none text-pink-500 hover:text-pink-700"
              >
                Remove
              </button>
            </div>
          </div>

          <div
            class="flex flex-row lg:flex-col justify-between items-center w-full"
          >
            <div class="flex justify-end space-x-1 sm:space-x-5 lg:ml-auto">
              <span
                v-if="product.discount > 0"
                class="text-red-600 font-semibold line-through"
                >USD {{ Number(product.price).toFixed(2) }}</span
              >
              <span class="text-gray-700 font-semibold"
                >USD
                {{
                  (
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <component
    @close="unmountComponent"
    :is="currentComponent"
    :name="name"
    :product="product"
    :products="products"
  />
</template>

<script>
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import AddProduct from "@/components/AddProduct";
import Card from "@/components/Card.vue";
import DeleteProductConfirmation from "@/components/DeleteProductConfirmation";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "vue";
export default {
  components: {
    AddProduct,
    Card,
    DeleteProductConfirmation,
  },
  props: ["name", "search", "previous", "next"],
  setup(props, { emit }) {
    const currentComponent = ref(null);
    const windowWidth = ref(window.innerWidth);
    const product = ref(null); //for updating product
    const { user } = getUser();

    const { error, documents: products } = getDocument(
      "inventory",
      props.name,
      "products"
    );
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    watch(products, () => {
      emit("emitProducts", products.value);
    });

    const mountComponent = (component) => {
      currentComponent.value = component;
    };

    const unmountComponent = () => {
      currentComponent.value = null;
      product.value = null;
    };

    const handleEditProduct = (prod) => {
      product.value = prod;
      mountComponent("AddProduct");
    };

    const handleRemoveProduct = (prod) => {
      product.value = prod;
      mountComponent("DeleteProductConfirmation");
    };

    return {
      cart,
      error,
      product,
      products,
      user,
      windowWidth,
      currentComponent,
      mountComponent,
      unmountComponent,
      handleRemoveProduct,
      handleEditProduct,
    };
  },
};
</script>
<style></style>
