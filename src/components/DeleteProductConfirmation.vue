<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div class="bg-white w-full sm:w-1/2 h-auto shadow">
      <div class="font-bold p-5 text-gray-700 flex justify-center items-center">
        <p>
          Are you seriously wanting to remove this
          <span class="text-pink-500">[{{ product.productName }}]</span> product
          ?
        </p>
      </div>
      <div class="flex justify-center">
        <div class="flex justify-between">
          <button
            class="bg-red-600 hover:bg-red-700 text-white py-2 px-6 focus:outline-none"
            @click="handleCancel"
          >
            NO
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 focus:outline-none"
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
  props: ["product", "category"],
  setup(props, { emit }) {
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { updateDoc: updateCart } = useDocument("carts", user.value?.uid);
    const { updateDoc } = useDocument("inventory", props.category.id);

    const handleCancel = () => {
      emit("close");
    };

    const handleRemove = async () => {
      const images = props.product.images;
      const id = props.product.id;
      const category = props.category;

      for (let image of images) {
        await deleteImage(image.url);
      }

      const products = category.products.filter((product) => product.id != id);
      await updateDoc({ products });

      //once remove product, remove from cart as well.
      const items = cart.value?.items.filter((item) => item.productId != id);
      await updateCart({ items });

      emit("close");
    };

    return { handleCancel, handleRemove };
  },
};
</script>

<style></style>
