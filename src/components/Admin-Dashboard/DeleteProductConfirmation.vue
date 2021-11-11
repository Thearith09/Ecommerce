<template>
  <div
    class="pt-8 px-5 h-auto sm:w-11/12 md:w-10/12 lg:w-8/12 2xl:w-7/12 mx-auto"
  >
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 text-sm font-medium pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          Dashboard
        </p>
        <p>/</p>
        <p
          @click="handleSwitchingComponent('CategoryList')"
          class="hover:underline cursor-pointer"
        >
          Categories
        </p>
        <p>/</p>
        <p
          @click="handleSwitchingComponent('ProductList')"
          class="hover:underline cursor-pointer"
        >
          Products
        </p>
        <p>/</p>
        <p>#{{ product.code }}</p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900 capitalize">
        Item #{{ product.code }}
      </div>
    </div>
    <div class="flex justify-center items-center h-3/4">
      <div class="bg-white w-full p-5 shadow rounded-md border">
        <div class="flex justify-center">
          <img src="@/assets/images/removeIcon.png" alt="remove icon" />
        </div>

        <div
          class="font-bold text-gray-500 pb-5 flex items-center w-3/4 mx-auto"
        >
          <p>
            Are you seriously want to remove this
            <span class="text-purple-700 font-bold text-lg"
              >[{{ product.name }}]</span
            >
            item? Once you remove you won't be able to recover it.
          </p>
        </div>

        <div class="relative w-3/4 mx-auto">
          <div class="flex justify-center">
            <button
              v-if="!pending"
              class="py-2 px-10 rounded tracking-wide bg-red-600 hover:bg-red-700 text-white focus:outline-none"
              @click="handleRemove"
            >
              Remove
            </button>

            <button
              v-else
              class="relative flex item-center justify-center rounded py-2 px-10 items-center bg-red-600 hover:bg-red-700 text-white tracking-wide focus:outline-none"
            >
              <div>
                Removing...
              </div>
              <div class="absolute top-3 right-1">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-white"
                ></div>
              </div>
            </button>
          </div>
          <div class="flex justify-center">
            <button
              class="py-2 px-10 rounded text-gray-500 hover:text-gray-700 tracking-wide font-semibold focus:outline-none"
              @click="handleSwitchingComponent('ProductList')"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";

export default {
  props: ["product"],
  setup(props, { emit }) {
    const { user } = getUser();
    const pending = ref(false);
    const { deleteImage } = useStorage();
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");
    const { deleteDoc: deleteCart } = useDocument(
      "carts",
      user.value?.uid,
      "items"
    );
    const { deleteDoc: deleteProduct } = useDocument(
      "inventory",
      props.product?.categoryName,
      "products"
    );
    const { documents: products } = getDocument(
      "inventory",
      props.product?.categoryName,
      "products"
    );

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
    };

    const handleRemove = async () => {
      pending.value = true;
      const images = props.product.images;
      const id = props.product.id;
      if (images.length > 0) {
        for (let image of images) {
          if (image.url) {
            await deleteImage(image.url);
          }
        }
      }

      products.value?.forEach(async (product) => {
        if (product.id == id) {
          await deleteProduct(product.id);
        }
      });

      //once remove product, remove from cart as well.
      cart.value?.forEach(async (item) => {
        if (item.id == id) {
          await deleteCart(item.id);
        }
      });
      pending.value = false;
      handleSwitchingComponent("ProductList");
    };

    return { handleSwitchingComponent, handleRemove, pending };
  },
};
</script>

<style></style>
