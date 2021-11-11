<template>
  <div
    class="pt-8 px-5 h-auto w-full sm:w-11/12 md:w-10/12 lg:w-8/12 2xl:w-7/12 mx-auto"
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
        <p>
          {{ category.name }}
        </p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900 capitalize">
        {{ category.name }}
      </div>
    </div>
    <div class="flex justify-center items-center h-3/4">
      <div class="bg-white p-5 w-full h-auto shadow rounded border">
        <div class="flex justify-center">
          <img src="@/assets/images/removeIcon.png" alt="remove icon" />
        </div>
        <div
          class="font-bold text-gray-500 pb-5 flex items-center w-3/4 mx-auto"
        >
          <p>
            Are you seriously want to remove this
            <span class="text-purple-700 font-bold text-lg"
              >[{{ category.name }}]</span
            >
            collection? Once you remove it, all products will be gone as well.
          </p>
        </div>

        <div class="w-3/4 mx-auto">
          <div class="flex justify-center">
            <button
              v-if="!pending"
              class="relative py-2 px-10 rounded tracking-wide bg-red-600 hover:bg-red-700 text-white focus:outline-none"
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
          <div class="relative flex justify-center">
            <button
              class="py-2 px-10 rounded text-gray-500 hover:text-gray-700 tracking-wide font-semibold focus:outline-none"
              @click="handleSwitchingComponent('CategoryList')"
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

    const handleSwitchingComponent = (compenent) => {
      emit("onSwitchingComponent", compenent);
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
      emit("onSwitchingComponent", "CategoryList");
    };

    return { handleSwitchingComponent, handleRemove, pending };
  },
};
</script>

<style></style>
