<template>
  <div>
    <div
      class="flex flex-col-reverse w-full rounded 2sm:w-3/4 2sm:mx-auto amd:flex-row amd:items-start amd:w-full amd:space-x-5 h-auto alg:w-3/4 alg:mx-auto p-5 shadow"
    >
      <div class="flex shadow p-3 mt-5 amd:mt-0 space-x-3 rounded">
        <div class="2sm:w-52">
          <img
            class="h-32 w-32 object-center object-cover rounded"
            :src="item.color"
          />
        </div>

        <div class="w-52 2sm:w-full space-y-3">
          <h2 class="text-gray-700 font-semibold uppercase">
            {{ item.name }}
          </h2>
          <h4 class="text-gray-500 leading-none">
            {{ item.description }}
          </h4>
          <span class="font-medium block text-gray-700"
            >USD
            {{
              (item.price - (item.price * item.discount) / 100).toFixed(2)
            }}</span
          >
        </div>
        <div
          @click="handleRemove(item.id)"
          class="text-gray-700 hover:text-pink-700 cursor-pointer"
        >
          <span>Remove</span>
        </div>
      </div>

      <div class="space-y-3 w-full amd:w-80 alg:w-96 shadow p-3 rounded">
        <div>
          <span class="font-medium block text-gray-700"
            >USD
            {{
              (item.price - (item.price * item.discount) / 100).toFixed(2)
            }}</span
          >
        </div>

        <div class="flex space-x-2">
          <div>
            <p class="text-gray-700">qty:</p>
            <div class="relative text-gray-500">
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

              <div v-if="qty > 1" class="absolute top-2 left-3 cursor-pointer">
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
          </div>

          <div class="text-gray-500">
            <p class="text-gray-700 inline-block">size:</p>
            <span
              class="flex rounded items-center justify-center px-10 font-semibold uppercase border-2 h-10 w-24"
              >{{ item.size }}</span
            >
          </div>
        </div>

        <div class="flex items-end h-auto space-x-3 md:space-x-5">
          <div class="text-gray-700 font-bold">
            <p>Total Price:</p>
            <span class="text-pink-500 shadow p-3 rounded w-32 inline-block"
              >USD {{ total }}</span
            >
          </div>

          <button
            @click="handleOrder"
            class="focus:outline-none p-3 uppercase flex rounded justify-center items-center cursor-pointer w-44 text-pink-500 bg-white hover:text-pink-700 font-medium shadow"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "vue";

export default {
  props: ["item"],
  setup(props, { emit }) {
    const qty = ref(props.item?.qty);
    const items = ref([]); //order items
    const total = ref(
      (
        props.item?.price * qty.value -
        (props.item?.price * qty.value * props.item?.discount) / 100
      ).toFixed(2)
    );

    const { user } = getUser();
    const { deleteDoc } = useDocument(
      "carts",
      user.value?.displayName,
      "items"
    );

    watch(qty, () => {
      total.value = (
        props.item?.price * qty.value -
        (props.item?.price * qty.value * props.item?.discount) / 100
      ).toFixed(2);
    });

    const windowWidth = ref(window.innerWidth);

    onMounted(() => {
      //watching once window was resized
      window.addEventListener("resize", onResize);

      //explicitly assign value to each element in array once the component mount
      for (let index in props.item.images) {
        starts.value[index] = 0;
        ends.value[index] = 3;
        qtys.value[index] = 0;
      }
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;
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

    const handleRemove = async (docId) => {
      await deleteDoc(docId);
    };

    return {
      handleInput,
      handleRemove,
      handleChangeQty,
      qty,
      total,
    };
  },
};
</script>
