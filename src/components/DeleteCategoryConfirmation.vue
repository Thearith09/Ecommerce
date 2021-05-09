<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div class="bg-white w-full sm:w-1/2 h-auto shadow-lg">
      <div class="p-5 font-bold text-gray-700 flex justify-center items-center">
        <p>
          Once you remove this
          <span class="text-pink-500">[{{ category.categoryName }}]</span>
          category, all items in this category will be gone as well. Are you
          sure to removing it?
        </p>
      </div>
      <div class="flex justify-start px-5">
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
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";

export default {
  emits: ["close"],
  props: ["category"],
  setup(props, { emit }) {
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { document: carts } = getCollection("carts");
    const { updateDoc: updateCart } = useDocument("carts", user.value?.uid);
    const { deleteDoc } = useDocument("inventory", props.category.id);

    const handleCancel = () => {
      emit("close");
    };

    const handleRemove = async () => {
      const category = props.category;
      const itemIds = [];

      category?.products.forEach(async (product) => {
        carts.value?.forEach((cart) => {
          cart.items.forEach((item) => {
            if (item.productId == product.id) {
              itemIds.push(item.productId);
            }
          });
        });

        for (let image of product.images) {
          await deleteImage(image.url);
        }
      });

      carts.value?.forEach(async (cart) => {
        const items = cart.items.filter(
          (item) => !itemIds.includes(item.productId)
        );

        await updateCart({ items });
      });

      await deleteImage(category.url);
      await deleteDoc(category.id);

      emit("close");
    };

    return { handleCancel, handleRemove };
  },
};
</script>

<style></style>
