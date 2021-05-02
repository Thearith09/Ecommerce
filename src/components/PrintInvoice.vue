<template>
  <div
    class="justify-center items-center inset-0 h-screen w-full overflow-scroll fixed bg-gray-700 bg-opacity-50"
  >
    <div class="relative w-full flex justify-center items-center">
      <div
        id="print-invoice"
        class="w-1/2 bg-white space-y-10 shadow-lg py-5 px-10"
      >
        <div
          class="flex justify-between items-end border-b-2 border-gray-200 pb-4"
        >
          <div>
            <img
              class="w-28 focus:outline-none"
              src="@/assets/images/logo.png"
              alt="Easy shopping logo"
            />
          </div>
          <div class="text-gray-700 font-semibold">
            <p>{{ today }}</p>
            <p>Invoice #{{ invoiceNumber }}</p>
          </div>
        </div>

        <div class="grid grid-cols-4 items-start space-x-5 text-gray-700">
          <div
            class="col-span-3 flex justify-between space-x-5 border-b-2 border-gray-200 pb-4"
          >
            <div class="space-y-3 leading-none w-full">
              <div>
                <span>Supplier:</span>
                <span
                  class="block text-pink-500 text-xl font-semibold uppercase"
                >
                  Master IT Cambodia
                </span>
              </div>
              <div class="text-sm">
                <h5>Prek Presdach commune,</h5>
                <h5>Battambang, Cambodia</h5>
              </div>
            </div>
            <div class="space-y-3 leading-none w-full">
              <div>
                <span>Customer:</span>
                <h5 class="text-pink-500 text-xl font-semibold uppercase">
                  {{ orders.name }}
                </h5>
              </div>
              <div class="text-sm">
                <h5>Prek Presdach commune,</h5>
                <h5>Battambang, Cambodia</h5>
                <div>
                  <img
                    class="h-6 w-6 inline-block"
                    src="@/assets/images/telegram.png"
                  />
                  <span>{{ orders.telegram }}</span>
                  <br />
                  <img
                    class="h-6 w-6 inline-block"
                    src="@/assets/images/phone.png"
                  />
                  <span>{{ orders.tel }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-pink-500 w-full h-10 grid grid-cols-7 gap-2 text-white font-semibold items-center px-2"
        >
          <p class="col-span-3">Item Description</p>
          <p>Price</p>
          <p>Discount</p>
          <p>Quantity</p>
          <p class="flex justify-end">Total</p>
        </div>
        <div>
          <div v-for="(item, index) in orders.items" :key="index">
            <div
              :class="{
                'bg-even': index % 2 == 0,
                'bg-odd': index % 2 != 0,
              }"
              class="grid grid-cols-7 text-gray-700 items-center p-2"
            >
              <div class="col-span-3 flex space-x-1 items-center">
                <img class="h-12 w-12" :src="item.color" />
                <div>
                  <p
                    class="text-gray-700 font-semibold leading-none break-normal"
                  >
                    {{ item.name }}
                  </p>
                </div>
              </div>
              <p>${{ Number(item.price).toFixed(2) }}</p>
              <p class="flex justify-center">{{ item.discount }}%</p>
              <p class="flex justify-center">{{ item.qty }}</p>
              <p class="flex justify-end">
                ${{
                  (
                    item.price * item.qty -
                    (item.price * item.discount) / 100
                  ).toFixed(2)
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-px">
          <div class="flex justify-between w-1/4 text-gray-700 ml-auto">
            <span>Sub Total</span>
            <span>${{ subTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between w-1/4 text-gray-700 ml-auto">
            <span>Shipping</span>
            <span>${{ Number(orders.shipping).toFixed(2) }}</span>
          </div>
        </div>

        <div
          class="border-2 border-gray-700 w-1/4 flex justify-between text-gray-700 p-1 ml-auto"
        >
          <div class="flex justify-end">Total</div>
          <div>${{ total.toFixed(2) }}</div>
        </div>

        <div class="flex justify-center space-x-5 border-t-2 border-gray-200">
          <div class="flex items-center">
            <img class="h-8 w-8" src="@/assets/images/fb.png" />
            <span> Master IT Cambodia </span>
          </div>
          <div class="flex items-center">
            <img class="h-8 w-8" src="@/assets/images/telegram.png" />
            <span> Master IT Cambodia </span>
          </div>
          <div class="flex items-center">
            <img class="h-8 w-8" src="@/assets/images/phone.png" />
            <span> 098 866 356 </span>
          </div>
        </div>
      </div>

      <div
        @click="handlePrint"
        class="absolute bottom-0 right-1/4 text-gray-700 hover:text-pink-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div
        @click="handleCancel"
        class="absolute top-0 right-1/4 text-gray-700 cursor-pointer"
      >
        <div
          class="w-5 h-5 bg-red-500 hover:bg-red-600 flex justify-center items-center"
        >
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import moment from "moment";
import printJS from "print-js";
import { ref } from "@vue/reactivity";

export default {
  props: ["orders", "invoiceNum"],
  setup(props, { emit }) {
    const today = moment().format("dddd D, MMMM YYYY");
    const subTotal = ref(0);
    const total = ref(0);
    const invoiceNumber = ref(props.invoiceNum);

    const { user } = getUser();
    const { updateDoc: updateCart } = useDocument("carts", user.value?.uid);
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { addDoc } = useCollection("orders");

    if (invoiceNumber.value > 0) {
      invoiceNumber.value++;

      if (invoiceNumber.value < 10)
        invoiceNumber.value = `000${invoiceNumber.value}`;
      else if (invoiceNumber.value < 100)
        invoiceNumber.value = `00${invoiceNumber.value}`;
      else if (invoiceNumber.value < 1000)
        invoiceNumber.value = `0${invoiceNumber.value}`;
      else invoiceNumber.value = invoiceNumber.value;
    } else {
      invoiceNumber.value = "0001";
    }

    if (props.orders.items.length > 0) {
      const items = props.orders.items;
      for (let item of items) {
        subTotal.value +=
          item.price * item.qty - (item.price * item.qty * item.discount) / 100;
      }
      total.value += subTotal.value + props.orders.shipping;
    }

    const handlePrint = async () => {
      if (user.value?.admin) {
        printJS({
          printable: "print-invoice",
          type: "html",
          targetStyles: ["*"],
        });

        emit("close", true);
      } else {
        let tempItems = cart.value.items.filter((doc) => {
          let temp;
          props.orders.items.forEach((item) => {
            if (item.id == doc.productId && item.qty > 0 && item.size) {
              temp = item;
            }
          });
          if (!temp) return doc;
        });
        await updateCart({
          items: [...tempItems],
        });

        await addDoc({
          uid: user.value?.uid,
          orderedInfo: props.orders,
          createdAt: timestamp(),
        });

        printJS({
          printable: "print-invoice",
          type: "html",
          targetStyles: ["*"],
        });

        emit("close", true);
      }
    };

    const handleCancel = () => {
      emit("close");
    };

    return { today, subTotal, total, handlePrint, handleCancel, invoiceNumber };
  },
};
</script>

<style></style>
