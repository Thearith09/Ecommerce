<template>
  <div
    class="p-5 space-x-2 grid grid-cols-2 items-center border-b-2 border-gray-100"
  >
    <div class="h-full">
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
        class="absolute bottom-0 right-0 text-center font-semibold text-pink-500 hover:bg-white py-1 px-3"
      >
        Remove
      </button>
    </div>
  </div>
  <div v-if="category" class="grid grid-cols-2 gap-1">
    <div
      v-for="product in category.products"
      :key="product.id"
      class="grid grid-cols-2 items-center h-56 transition transform hover:translate-y-2"
    >
      <div class="w-full h-full px-5 py-5">
        <div class="text-gray-400 space-y-5">
          <div class="flex justify-between">
            <span class="text-gray-800 font-semibold inline-block">{{
              product.productName
            }}</span>
            <span class="text-gray-500 font-semibold"
              >${{ product.price }}</span
            >
          </div>
          <div>
            <p>In Stock</p>
          </div>
          <div class="flex space-x-1">
            <p v-for="size in product.sizes" :key="size">
              <span
                class="text-gray-500 font-semibold bg-gray-200 p-2 uppercase"
                >{{ size }}</span
              >
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 mt-5">
          <div class="flex justify-between">
            <button
              @click="handleEditProduct(product)"
              class="focus:outline-none active:bg-pink-600 hover:text-pink-500 w-full p-2 font-bold text-md bg-gray-100 text-gray-400 border-r-2 border-white"
            >
              Edit
            </button>
            <button
              @click="handleRemoveProduct(product.id, product.images)"
              class="focus:outline-none active:bg-pink-600 hover:text-pink-500 w-full p-2 font-bold text-md bg-gray-100 text-gray-400"
            >
              Remove
            </button>
          </div>
          <div class="flex justify-end">
            <button
              @click="handleAddToCart(product)"
              class="flex items-center justify-center w-9 h-9 rounded-full focus:outline-none hover:text-pink-500 text-gray-400 border border-gray-200"
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

      <div class="h-56 w-full">
        <img
          class="h-full w-full object-cover object-center overflow-hidden"
          :src="product.images[0].url"
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
</template>

<script>
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import AddProduct from "@/components/AddProduct";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";

export default {
  components: {
    AddProduct,
  },
  props: ["id"],
  setup(props) {
    const { deleteImage } = useStorage();
    const currentComponent = ref(null);
    const router = useRouter();
    const product = ref(null);

    const { user } = getUser();
    const { updateDoc, deleteDoc } = useDocument("inventory", props.id);
    const { error, document: category } = getDocument("inventory", props.id);
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { addDoc } = useDocument("carts", user.value?.uid);

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

    const handleRemoveProduct = async (id, images) => {
      for (let image of images) {
        console.log(image.url);
        await deleteImage(image.url);
      }

      const products = category.value.products.filter(
        (product) => product.id != id
      );
      await updateDoc({ products });
    };

    const handleRemoveCategory = async () => {
      category.value.products.forEach(async (product) => {
        for (let image of product.images) {
          await deleteImage(image.url);
        }
      });

      await deleteImage(category.value.url);
      await deleteDoc(category.id);

      router.push({ name: "Categories" });
    };

    const handleAddToCart = async (product) => {
      if (!user.value) {
        router.push({ name: "Login" });
      } else {
        const items = cart.value.items.filter(
          (item) => item.productId != product.id
        );
        const item = {
          productId: product.id,
          productName: product.productName,
          price: product.price,
          discount: product.discount,
          sizes: product.sizes,
          images: product.images,
        };
        await addDoc({
          items: [...items, item],
          createdAt: timestamp(),
        });
      }
    };

    return {
      error,
      product,
      category,
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
