<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div class="bg-white p-5 w-full sm:w-1/2 2xl:w-1/3 h-auto shadow rounded">
      <div
        class="pb-5 font-bold text-gray-700 flex justify-center items-center"
      >
        <p>
          Once you remove this
          <span class="text-pink-500">[{{ category.name }}]</span>
          category, all items in this category will be gone as well. Are you
          sure to removing it?
        </p>
      </div>
      <div class="flex justify-start">
        <div class="flex justify-between">
          <button
            class="bg-red-600 hover:bg-red-700 text-white py-2 px-6 focus:outline-none rounded-l"
            @click="handleCancel"
          >
            NO
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 focus:outline-none rounded-r"
            @click="handleRemove"
          >
            YES
          </button>
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

export default {
  emits: ["close"],
  props: ["category"],
  setup(props, { emit }) {
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { documents: cart } = getDocument(
      "carts",
      user.value?.displayName,
      "items"
    );
    const { deleteDoc: deleteCart } = useDocument(
      "carts",
      user.value?.displayName,
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

      emit("close");
    };

    return { handleCancel, handleRemove };
  },
};
</script>

<style></style>
