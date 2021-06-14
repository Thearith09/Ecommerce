<template>
  <div>
    <div class="rounded">
      <div
        class="flex flex-col iphone:flex-row space-x-3 rounded h-auto lg:h-52 lg:my-0 shadow p-3"
      >
        <div class="flex-none">
          <img
            class="w-full h-40 iphone:w-44 tablet:w-72 iphone:h-full object-center object-cover rounded"
            :src="item.color"
          />
        </div>

        <div class="flex">
          <div class="flex flex-col justify-between">
            <div class="space-y-3">
              <h2 class="text-gray-700 font-semibold text-xl uppercase">
                {{ item.name }}
              </h2>

              <h4 class="text-gray-500 leading-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                corrupti laudantium in
              </h4>

              <h4 class="text-gray-700 font-bold">USD {{ item.price }}</h4>
            </div>

            <div class="flex space-x-2">
              <div>
                <p class="text-gray-700">qty:</p>
                <div class="relative text-gray-500">
                  <input
                    @keydown="handleInput($event, item.name)"
                    @input="handleChangeQty($event, item.name)"
                    class="inline-block focus:outline-none border-2 border-gray-200 pr-5 pl-5 h-10 w-28 rounded text-center text-sm text-gray-700"
                    type="text"
                    v-model="qty"
                  />

                  <div class="absolute top-2 left-20 cursor-pointer">
                    <svg
                      @click="handleIncrement(item.name)"
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
                      @click="handleDecrement(item.name)"
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
              </div>

              <div class="text-gray-500">
                <p class="text-gray-700 inline-block">size:</p>
                <span
                  class="flex rounded items-center justify-center px-10 font-semibold uppercase border-2 h-10 w-24"
                  >{{ item.size }}</span
                >
              </div>
            </div>
          </div>
          <div>
            <span
              @click="handleRemove(item.id)"
              class="text-gray-700 hover:text-pink-700 cursor-pointer"
              >Remove</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";
import { watch, watchEffect } from "@vue/runtime-core";

export default {
  props: ["item"],
  setup(props, { emit }) {
    const qty = ref(props.item?.qty);
    const name = ref(null);

    const { user } = getUser();
    const { deleteDoc } = useDocument(
      "carts",
      user.value?.displayName,
      "items"
    );

    watch(qty, () => {
      emit("updateQty", {
        qty: qty.value,
        name: name.value,
      });
    });

    const handleInput = (e, item) => {
      //listen for item that changes the qty
      name.value = item;

      //validate input only 0-9
      if (e.keyCode > 57 || e.keyCode < 48) {
        if (e.key.length === 1) {
          e.preventDefault();
        }
      }
    };

    const handleChangeQty = (e, item) => {
      //listen for item that changes the qty
      name.value = item;

      //handle input by listen to the changes
      if (e.target.value[0] < 1 || e.target.value[0] == undefined) {
        qty.value = 1;
      } else {
        qty.value = e.target.value;
      }
    };

    const handleIncrement = (item) => {
      name.value = item;
      qty.value++;
    };

    const handleDecrement = (item) => {
      name.value = item;
      qty.value--;
    };

    const handleRemove = async (docId) => {
      await deleteDoc(docId);
    };

    return {
      handleInput,
      handleRemove,
      handleChangeQty,
      handleIncrement,
      handleDecrement,
      qty,
    };
  },
};
</script>
