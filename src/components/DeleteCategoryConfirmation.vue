<template>
  <div class="fixed w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20">
    <div class="flex justify-center items-center h-3/4 px-5 sm:px-0">
      <div
        class="bg-white p-5 w-full sm:w-3/4 md:w-2/4 2xl:w-1/3 h-auto shadow rounded"
      >
        <div class="flex justify-center">
          <img src="@/assets/images/removeIcon.png" alt="remove icon" />
        </div>
        <div
          class="font-bold text-gray-500 pb-5 flex items-center w-3/4 mx-auto"
        >
          <p>
            Are you seriously want to remove this
            <span class="text-blue-600">[{{ category.name }}]</span>
            collection? Once you remove you won't be able to recover it.
          </p>
        </div>

        <div class="w-3/4 mx-auto">
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
              @click="handleCancel"
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
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";

export default {
  emits: ["close"],
  props: ["category"],
  setup(props, { emit }) {
    const pending = ref(false);
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");
    const { deleteDoc: deleteCart } = useDocument(
      "carts",
      user.value?.uid,
      "items"
    );
    const { documents: products } = getDocument(
      "inventory",
      props.category.name,
      "products"
    );
    const { deleteDoc: deleteProduct } = useDocument(
      "inventory",
      props.category.name,
      "products"
    );
    const { deleteDoc: deleteCategory } = useCollection("inventory");

    const handleCancel = () => {
      emit("close");
    };

    const handleRemove = async () => {
      pending.value = true;
      const productIds = [];
      const cartIds = [];

      products.value.forEach(async (product) => {
        cart.value.forEach(async (cart) => {
          if (cart.id == product.id) {
            cartIds.push(cart.id);
          }
        });

        productIds.push(product.id);

        //delete image of each products
        for (let image of product.images) {
          await deleteImage(image.url);
        }
      });

      if (cartIds.length > 0) {
        //delete carts first
        for (let id of cartIds) {
          await deleteCart(id);
        }
      }

      if (productIds.length > 0) {
        //then delete products
        for (let id of productIds) {
          await deleteProduct(id);
        }
      }

      await deleteImage(props.category.url);
      await deleteCategory(props.category.id);

      pending.value = false;
      emit("close");
    };

    return { handleCancel, handleRemove, pending };
  },
};
</script>

<style></style>
