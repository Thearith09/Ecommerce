<template>
  <div
    class="flex justify-center items-start md:items-center inset-0 fixed w-full h-screen bg-gray-900 bg-opacity-50 z-40"
  >
    <div class="relative bg-white flex h-auto rounded p-5">
      <div class="absolute top-0 right-0">
        <svg
          @click="handleClose"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500 cursor-pointer"
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

      <div class="flex space-x-5 pr-5">
        <div class="relative">
          <img
            class="w-64 h-52 rounded object-cover object-center"
            :src="item.images[index].url"
          />
          <h3
            v-if="item.discount > 0"
            class="absolute top-0 right-0 bg-pink-500 bg-opacity-90 font-mono text-white p-1 rounded"
          >
            {{ item.discount }}% OFF
          </h3>
        </div>
      </div>

      <div>
        <div class="space-y-2">
          <h2 class="text-gray-700 font-semibold uppercase">
            {{ item.productName }}
          </h2>
          <h4 class="text-gray-500 leading-none">{{ item.description }}</h4>
          <div class="flex space-x-1">
            <span class="font-medium text-gray-700 line-through block"
              >USD {{ Number(item.price).toFixed(2) }}</span
            >
            <span
              v-if="item.discount > 0"
              class="font-medium block text-red-600"
              >USD
              {{
                (item.price - (item.price * item.discount) / 100).toFixed(2)
              }}</span
            >
          </div>
          <div>
            <p class="text-gray-700">sizes:</p>
            <div class="grid grid-cols-4 gap-1 text-gray-500">
              <span
                @click="handleActiveSize(i)"
                :class="{ activeBorder: indexSize == i }"
                v-for="(size, i) in item.sizes"
                :key="size"
                class="flex rounded items-center justify-center px-10 font-semibold uppercase border-2 h-10 w-24 cursor-pointer"
              >
                {{ size }}
              </span>
            </div>
          </div>
          <div class="text-gray-500">
            <p class="text-gray-700">qty:</p>
            <div class="flex space-x-5">
              <div class="relative">
                <input
                  @keydown="handleInput"
                  @input="handleChangeQty($event)"
                  class="inline-block focus:outline-none border-2 border-gray-200 pr-5 pl-5 h-10 w-28 rounded text-center text-sm text-gray-700"
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
                :disabled="indexSize == null"
                :class="{ frozen: indexSize == null }"
                @click="
                  handleAddToCart(
                    item,
                    item.images[index].url,
                    item.sizes[indexSize]
                  )
                "
                class="rounded focus:outline-none w-full shadow font-medium text-pink-500 hover:text-pink-700"
              >
                ADD TO CART
              </button>
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

export default {
  props: ["item", "index"],
  setup(props, { emit }) {
    const indexSize = ref(null);
    const qty = ref(1);
    const router = useRouter();

    const { user } = getUser();
    const { addDoc, updateDoc } = useDocument(
      "carts",
      user.value?.displayName,
      "items"
    );
    const { documents: carts } = getDocument(
      "carts",
      user.value?.displayName,
      "items"
    );

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
      const addedItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        price: Number(item.price).toFixed(2),
        discount: item.discount,
        size: size,
        color: image,
        qty: qty.value,
      };

      if (!user.value) {
        router.push({ name: "Login" });
      } else {
        // const items = [];
        // carts.value?.forEach((item) => {
        //   if (
        //     item.id == addedItem.id &&
        //     item.size == addedItem.size &&
        //     item.color == addedItem.color
        //   ) {
        //     item.qty = Number(item.qty) + Number(addedItem.qty);
        //   }
        //   items.push(item);
        // });
        // if (items.length > 0) {
        //   await updateDoc(items);
        // } else {
        //   await addDoc({
        //     name: addedItem.name,
        //     item: addedItem,
        //     createdAt: timestamp(),
        //   });
        // }
        carts.value?.forEach((cart) => {
          if (cart.name == item.name) qty.value += cart.qty;
        });

        await addDoc({
          name: item.name,
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
    };
  },
};
</script>

<style></style>
