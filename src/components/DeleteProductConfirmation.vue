<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div class="bg-white w-full p-5 sm:w-1/2 2xl:w-1/3 h-auto shadow rounded">
      <div class="font-bold text-gray-700 pb-5 flex items-center">
        <p>
          Are you seriously wanting to remove this
          <span class="text-pink-500">[{{ product.name }}]</span> product ?
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
import getUser from "@/composables/getUser";

export default {
  props: ["product", "name"],
  setup(props, { emit }) {
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { documents: carts } = getDocument(
      "carts",
      user.value?.displayName,
      "items"
    );
    const { deleteDoc: deleteCart } = useDocument(
      "carts",
      user.value?.displayName,
      "items"
    );
    const { deleteDoc: deleteProduct } = useDocument(
      "inventory",
      props.name,
      "products"
    );
    const { documents: products } = getDocument(
      "inventory",
      props.name,
      "products"
    );

    const handleCancel = () => {
      emit("close");
    };

    const handleRemove = async () => {
      const images = props.product.images;
      const id = props.product.id;

      for (let image of images) {
        await deleteImage(image.url);
      }

      products.value?.forEach(async (product) => {
        if (product.id == id) {
          await deleteProduct(product.id);
        }
      });

      //once remove product, remove from cart as well.
      carts.value?.forEach(async (item) => {
        if (item.id == id) {
          await deleteCart(item.id);
        }
      });

      emit("close");
    };

    return { handleCancel, handleRemove };
  },
};
</script>

<style></style>
