<template>
  <div class="px-5">
    <div class="h-full border-b-2 border-yellow-200">
      <div class="relative flex justify-between my-5">
        <div v-if="search && products && products.length > 0">
          <div class="text-gray-700 font-bold text-2xl">
            {{ products?.length }} results for "{{ search }}"
            <span class="block text-blue-600 tracking-wide font-bold text-lg"
              >{{ name }} Products</span
            >
          </div>
        </div>

        <div v-if="user && user.admin" class="absolute top-5 right-0 z-10">
          <img
            @click="mountComponent('AddProduct')"
            class="h-8 w-8 cursor-pointer"
            src="@/assets/images/add-package.png"
            alt="add product icon"
          />
        </div>
      </div>

      <div
        v-if="products && products.length > 0 && !search"
        class="h-auto mb-5"
      >
        <div class="font-bold text-xl text-gray-700 uppercase mb-5">
          {{ $t("MOST POPULAR") }}
        </div>
        <Card :name="name" />
      </div>
    </div>
  </div>

  <div v-if="products" class="grid grid-cols-none md:grid-cols-2 w-full px-5">
    <div
      v-for="(product, index) in products"
      v-show="index >= previous && index < next"
      :key="product.id"
      class="flex flex-col sm:flex-row sm:items-center py-5 h-auto transition transform hover:translate-y-2 border-b-2 border-yellow-200"
    >
      <div class="relative w-72 h-48">
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

      <div class="w-80 h-auto sm:h-48 mt-2 sm:mt-0">
        <div class="flex flex-col justify-between h-full text-gray-500 sm:px-5">
          <div class="space-y-3 md:space-y-0 lg:space-y-2 xl:space-y-3">
            <div class="leading-none tracking-wide space-y-2">
              <p class="font-semibold text-pink-600">
                {{ product.name }}
              </p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>

            <div>
              <p class="text-blue-600 tracking-wide">In stock</p>
              <div class="flex items-center space-x-3">
                <p v-for="size in product.sizes" :key="size">
                  <span class="text-gray-500 font-semibold uppercase">{{
                    size
                  }}</span>
                </p>
              </div>
            </div>

            <div v-if="user?.admin" class="flex space-x-3">
              <button
                @click="handleEditProduct(product)"
                class="focus:outline-none text-gray-500 tracking-wide hover:text-blue-700"
              >
                Edit
              </button>
              <button
                @click="handleRemoveProduct(product)"
                class="focus:outline-none text-gray-500 tracking-wide hover:text-blue-700"
              >
                Remove
              </button>
            </div>
          </div>

          <div>
            <div
              class="flex md:flex-col space-x-3 md:space-x-0 lg:flex-row lg:space-x-1 xl:space-x-3"
              v-if="product.discount > 0"
            >
              <span class="text-gray-700 font-semibold line-through"
                >USD {{ Number(product.price).toFixed(2) }}</span
              >
              <span class="text-red-600 font-semibold"
                >USD
                {{
                  (
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)
                }}</span
              >
            </div>

            <div v-else>
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
