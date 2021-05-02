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
          class="text-pink-500 cursor-pointer inline-block hover:bg-pink-500 hover:text-white h-12 w-12 rounded-full focus:outline-none active:bg-pink-600"
        >
          <svg
            @click="mountComponent('AddProduct')"
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
      </div>
      <div v-if="category && !search" class="h-auto mb-5">
        <div class="font-bold text-xl text-gray-700 uppercase mb-4">
          Most Popular
        </div>
        <Card :category="category" />
      </div>
    </div>
  </div>

  <div v-if="category" class="px-10 my-5 w-full">
    <div
      v-for="(product, index) in category.products"
      v-show="index >= previous && index < next"
      :key="product.id"
      class="flex items-center py-5 h-56 transition transform hover:translate-y-2 border-b-2 border-gray-200"
    >
      <div class="relative w-2/4 h-full">
        <img
          class="h-full w-full object-cover object-center overflow-hidden"
          :src="product.images[product.images.length - 1]?.url"
        />
        <h3
          v-if="product.discount > 0"
          class="absolute bottom-0 right-0 bg-pink-500 bg-opacity-90 font-mono text-white p-1"
        >
          {{ product.discount }}% OFF
        </h3>
      </div>

      <div class="col-span-3 w-full h-full px-5">
        <div class="text-gray-400 flex justify-between">
          <div class="space-y-5">
            <div class="leading-none space-y-1">
              <p class="text-gray-800 font-semibold inline-block">
                {{ product.productName }}
              </p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
            <p>In Stock</p>
            <div class="flex space-x-1">
              <p v-for="size in product.sizes" :key="size">
                <span
                  class="text-gray-400 shadow-inner font-semibold p-2 uppercase"
                  >{{ size }}</span
                >
              </p>
            </div>
            <div v-if="user?.admin" class="flex">
              <button
                @click="handleEditProduct(product)"
                class="focus:outline-none active:bg-pink-600 hover:text-pink-500 w-1/3 p-2 font-semibold bg-white shadow-md text-gray-400 border-r-2 border-white"
              >
                Edit
              </button>
              <button
                @click="handleRemoveProduct(product)"
                class="focus:outline-none active:bg-pink-600 hover:text-pink-500 w-1/3 p-2 font-semibold bg-white shadow-md text-gray-400"
              >
                Remove
              </button>
            </div>
          </div>

          <div class="space-y-16">
            <div class="flex space-x-5">
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
            <div class="flex justify-end text-gray-400">
              <button
                @click="handleAddToCart(product)"
                :class="{ added: cartIds.includes(product.id) }"
                class="flex items-center justify-center w-9 h-9 rounded-full focus:outline-none hover:text-pink-500 border border-gray-200"
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
import DeleteCategoryConfirmation from "@/components/DeleteCategoryConfirmation";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { computed, watch } from "vue";

export default {
  components: {
    AddProduct,
    Card,
    DeleteProductConfirmation,
    DeleteCategoryConfirmation,
  },
  props: ["id", "search", "previous", "next"],
  setup(props, { emit }) {
    const currentComponent = ref(null);
    const router = useRouter();
    const product = ref(null); //for updating product
    const cartIds = ref([]); //dynamic apply style to button heart once user add or not by catching item id
    const items = computed(() => cart.value && cart.value.items); //watching items change

    const { user } = getUser();
    const { error, document: category } = getDocument("inventory", props.id);
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { addDoc, updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.uid
    );

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

    const handleRemoveCategory = async () => {
      mountComponent("DeleteCategoryConfirmation");
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
      currentComponent,
      mountComponent,
      unmountComponent,
      handleRemoveProduct,
      handleRemoveCategory,
      handleEditProduct,
      handleAddToCart,
    };
  },
};
</script>

<style></style>
