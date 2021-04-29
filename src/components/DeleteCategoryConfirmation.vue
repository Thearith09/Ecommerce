<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white w-1/2 h-auto shadow-lg">
      <div
        class="p-5 font-bold text-yellow-500 flex justify-center items-center"
      >
        <p>
          Once you remove this
          <span class="text-pink-500">[{{ category.categoryName }}]</span>
          category, all items in this category will be gone as well. Are you
          sure to removing it?
        </p>
      </div>
      <div class="flex justify-end">
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
import { useRouter } from "vue-router";

export default {
  props: ["category"],
  setup(props, { emit }) {
    const router = useRouter();

    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { updateDoc: updateCart } = useDocument("carts", user.value?.uid);
    const { updateDoc, deleteDoc } = useDocument(
      "inventory",
      props.category.id
    );

    const handleCancel = () => {
      emit("close");
    };

    const handleRemove = async () => {
      const category = props.category;
      const itemIds = [];

      category.products.forEach(async (product) => {
        cart.value.items.forEach((item) => {
          if (item.productId == product.id) {
            itemIds.push(item.productId);
          }
        });

        for (let image of product.images) {
          await deleteImage(image.url);
        }
      });

      const items = cart.value.items.filter((item) => {
        if (!itemIds.includes(item.productId)) return item;
        return;
      });

      await updateCart({ items });

      await deleteImage(category.url);
      await deleteDoc(category.id);

      router.push({ name: "Categories" });
    };

    return { handleCancel, handleRemove };
  },
};
</script>

<style></style>
