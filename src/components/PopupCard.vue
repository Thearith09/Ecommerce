<template>
  <div class="inset-0 fixed w-full h-screen bg-gray-900 bg-opacity-50 z-40">
    <div class="flex justify-center items-center h-3/4">
      <div
        class="relative p-5 bg-white flex flex-col md:flex-row h-auto rounded-md"
      >
        <div class="absolute top-1 right-1 z-40">
          <svg
            @click="handleClose"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-purple-800 cursor-pointer"
            viewBox="0 0 20 20x"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div class="flex w-80 sm:w-96 md:w-80">
          <div class="relative h-full border-2 border-purple-100 rounded">
            <img
              class="flex-none w-full h-full rounded object-cover object-center"
              :src="item.images[index].url"
            />
          </div>
        </div>

        <div class="w-80 sm:w-96 md:pl-5">
          <div class="space-y-2">
            <h2
              class="text-purple-700 text-lg font-mono tracking-wide font-semibold uppercase"
            >
              {{ item.name }}
            </h2>
            <h4 class="text-gray-500 leading-none">
              {{ item.description }}
            </h4>

            <h4
              v-if="item.status == 'in stock'"
              class="text-green-500 leading-none"
            >
              {{ item.status }}
            </h4>
            <h4 v-else class="text-red-500 leading-none">
              {{ item.status }}
            </h4>
            <div v-if="item.discount > 0" class="flex space-x-1">
              <span class="font-medium text-gray-700 line-through block"
                >USD {{ Number(item.price).toFixed(2) }}</span
              >
              <span class="font-medium block text-red-600"
                >USD
                {{
                  (item.price - (item.price * item.discount) / 100).toFixed(2)
                }}</span
              >
            </div>
            <div v-else class="flex space-x-1">
              <span class="font-medium text-gray-700 block"
                >USD {{ Number(item.price).toFixed(2) }}</span
              >
            </div>
            <div>
              <p class="text-gray-700">sizes:</p>
              <div class="flex space-x-1 text-gray-500">
                <span
                  @click="handleActiveSize(i)"
                  :class="{ activeSize: indexSize == i }"
                  v-for="(size, i) in item.sizes"
                  :key="size"
                  class="flex rounded items-center justify-center font-semibold uppercase border-2 py-1 px-3 cursor-pointer"
                >
                  {{ size }}
                </span>
              </div>
            </div>
            <div
              v-if="alerting"
              class="flex justify-center items-center bg-red-100 border-2 border-red-300 w-full h-12 rounded"
            >
              <p class="text-red-600 font-semibold font-mono">
                {{ alerting }}
              </p>
            </div>
            <div class="text-gray-500">
              <p class="text-gray-700">qty:</p>
              <div class="flex space-x-5">
                <div class="relative">
                  <input
                    @keydown="handleInput"
                    @input="handleChangeQty($event)"
                    class="inline-block focus:outline-none border-2 border-purple-100 pr-5 pl-5 h-10 w-28 rounded text-center text-sm text-gray-700"
                    type="text"
                    v-model="qty"
                  />
                  <div class="absolute top-2 left-20 cursor-pointer">
                    <svg
                      @click="qty++"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div
                    v-if="qty > 1"
                    class="absolute top-2 left-3 cursor-pointer"
                  >
                    <svg
                      @click="qty--"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <button
                  @click="
                    handleAddToCart(
                      item,
                      item.images[index].url,
                      item.sizes[indexSize]
                    )
                  "
                  :disabled="item.status != 'in stock'"
                  class="rounded focus:outline-none w-full shadow font-bold text-purple-700 bg-yellow-300 hover:translate-y-1 transform transition-all duration-150 p-2"
                  :class="{ frozen: item.status != 'in stock' }"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { useStore } from "vuex";
import { watch } from "@vue/runtime-core";

export default {
  props: ["item", "index", "name"],
  setup(props, { emit }) {
    const indexSize = ref(null);
    const qty = ref(1);
    const alerting = ref(null);

    const router = useRouter();
    const store = useStore();

    const { user } = getUser();
    const { addDoc, updateDoc } = useDocument(
      "carts",
      user.value?.uid,
      "items"
    );
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");

    watch(indexSize, () => {
      if (indexSize.value != null) {
        alerting.value = null;
      }
    });

    const handleClose = () => {
      emit("close");
    };

    const handleActiveSize = (i) => {
      indexSize.value = i;
    };

    const handleInput = (e) => {
      //validate input only 0-9
      if (e.keyCode > 57 || e.keyCode < 48) {
        if (e.key.length === 1) {
          e.preventDefault();
        }
      }
    };

    const handleChangeQty = (e) => {
      //handle input by listen to the changes
      if (e.target.value[0] < 1 || e.target.value[0] == undefined) {
        qty.value = 1;
      } else {
        qty.value = e.target.value;
      }
    };

    const handleAddToCart = async (item, image, size) => {
      if (!size) {
        console.log(props.name);
        return (alerting.value = "Please choose one of the sizes above!");
      }

      const addedItem = {
        categoryName: props.name,
        name: item.name,
        code: item.code,
        description: item.description,
        price: Number(item.price).toFixed(2),
        discount: item.discount,
        size: size,
        color: image,
        qty: qty.value,
        createdAt: timestamp(),
      };

      if (!user.value) {
        store.commit("addToCart", addedItem);
        router.push({ name: "CartDetails" });
      } else {
        cart.value?.forEach((cart) => {
          if (cart.name == item.name) qty.value += cart.qty;
        });

        await addDoc({
          categoryName: props.name,
          name: item.name,
          code: item.code,
          description: item.description,
          price: Number(item.price).toFixed(2),
          discount: item.discount,
          size: size,
          color: image,
          qty: qty.value,
          createdAt: timestamp(),
        });

        router.push({ name: "CartDetails" });
      }
    };

    return {
      handleClose,
      handleInput,
      handleChangeQty,
      handleActiveSize,
      handleAddToCart,
      indexSize,
      qty,
      alerting,
    };
  },
};
</script>

<style></style>
