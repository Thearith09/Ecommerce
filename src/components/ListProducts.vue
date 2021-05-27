<template>
  <div class="px-10">
    <div class="h-full border-b-2 border-gray-200">
      <div class="flex justify-between my-5">
        <div v-if="search && category">
          <div class="text-gray-700 font-bold text-2xl">
            {{ category.products.length }} results for "{{ search }}"
            <span class="block text-pink-500 font-bold text-lg"
              >{{ category.categoryName }} Products</span
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

      <div v-if="category?.products.length > 0 && !search" class="h-auto mb-5">
        <div class="font-bold text-xl text-gray-700 uppercase mb-4">
          {{ $t("MOST POPULAR") }}
        </div>
        <Card :category="category" />
      </div>
    </div>
  </div>

  <div v-if="category" class="sm:px-10 my-5 w-full px-5">
    <div
      v-for="(product, index) in category.products"
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
              categoryId: category.id,
              productId: product.id,
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

            <div class="text-gray-500 lg:mt-16 lg:ml-auto">
              <button
                @click="handleAddToCart(product)"
                :class="{ added: cartIds.includes(product.id) }"
                class="flex items-center justify-center w-9 h-9 rounded-full focus:outline-none hover:text-pink-700 border border-gray-200"
                type="button"
                aria-label="like"
              >
                <svg width="20" height="20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
</template>

<script>
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import AddProduct from "@/components/AddProduct";
import Card from "@/components/Card.vue";
import DeleteProductConfirmation from "@/components/DeleteProductConfirmation";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";
export default {
  components: {
    AddProduct,
    Card,
    DeleteProductConfirmation,
  },
  emits: ["emitProducts"],
  props: ["id", "search", "previous", "next"],
  setup(props, { emit }) {
    const currentComponent = ref(null);
    const windowWidth = ref(window.innerWidth);
    const product = ref(null); //for updating product
    const cartIds = ref([]); //dynamic apply style to button heart once user add or not by catching item id
    const items = computed(() => cart.value && cart.value.items); //watching items change
    const router = useRouter();
    const { user } = getUser();
    const { error, document: category } = getDocument("inventory", props.id);
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { addDoc, updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.uid
    );
    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
      window.addEventListener("resize", onResize);
    });
    watch(category, () => {
      emit("emitProducts", category.value);
    });
    watch(items, () => {
      let temp = [];
      for (let item of items.value) temp.push(item.productId);
      cartIds.value = temp;
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
    const handleAddToCart = async (product) => {
      if (!user.value) {
        router.push({ name: "Login" });
      } else {
        const item = cart.value?.items.filter(
          (item) => item.productId == product.id
        );
        const items = cart.value?.items.filter(
          (item) => item.productId != product.id
        );
        if (item?.length > 0) {
          await updateCart({
            items: [...items],
          });
        } else {
          const item = {
            productId: product.id,
            productName: product.productName,
            price: product.price,
            discount: product.discount,
            sizes: product.sizes,
            images: product.images,
          };
          items
            ? await addDoc({
                items: [...items, item],
                createdAt: timestamp(),
              })
            : await addDoc({
                items: [item],
                createdAt: timestamp(),
              });
        }
      }
    };
    return {
      cart,
      error,
      product,
      category,
      cartIds,
      user,
      windowWidth,
      currentComponent,
      mountComponent,
      unmountComponent,
      handleRemoveProduct,
      handleEditProduct,
      handleAddToCart,
    };
  },
};
</script>
<style></style>
