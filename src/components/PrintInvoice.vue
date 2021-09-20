<template>
  <div
    class="justify-center items-center inset-0 h-screen overflow-scroll w-full fixed bg-gray-700 bg-opacity-50 z-40"
  >
    <div class="md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
      <div class="relative">
        <div
          id="print-invoice"
          class="w-full px-10 bg-white rounded-md shadow py-10"
        >
          <div
            class="flex flex-col sm:flex-row items-center  sm:justify-between sm:items-end border-b-2 border-purple-100 pt-10 pb-20"
          >
            <div>
              <img
                class="w-full focus:outline-none"
                src="@/assets/images/logo1.png"
                alt="Easy shopping logo"
              />
            </div>
            <div class="text-gray-400 font-semibold leading-none">
              <p>
                {{
                  date(purchaseInfo.createdAt.toDate()).format(
                    "dddd do MMM, YYYY"
                  )
                }}
              </p>
              <p>
                Invoice #{{
                  purchaseInfo.id.substring(
                    purchaseInfo.id.length - 5,
                    purchaseInfo.id.length
                  )
                }}
              </p>
            </div>
          </div>

          <div
            class="grid grid-cols-4 items-start space-x-5 text-gray-700 py-10"
          >
            <div
              class="col-span-4 md:col-span-3 flex justify-between space-x-5 border-b-2 border-purple-100 pb-4"
            >
              <div class="space-y-3 leading-none w-full">
                <div>
                  <span>Supplier:</span>
                  <span
                    class="block text-purple-700 text-xl font-semibold uppercase"
                  >
                    Easy4shopping
                  </span>
                </div>
                <div class="text-sm">
                  <h5>Kammeakar Village, Svay por Commune</h5>
                  <h5>Battambang, Cambodia</h5>
                </div>
              </div>
              <div class="space-y-3 leading-none w-full">
                <div>
                  <span>Customer:</span>
                  <h5 class="text-purple-700 text-xl font-semibold uppercase">
                    {{ purchaseInfo.shippingInfo.name }}
                  </h5>
                </div>
                <div class="text-sm">
                  <h5>
                    {{ purchaseInfo.shippingInfo.address.line1 }},
                    {{ purchaseInfo.shippingInfo.address.line2 }},
                    {{ purchaseInfo.shippingInfo.address.city }}
                  </h5>
                  <div>
                    {{ purchaseInfo.userContact.phone }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-gray-200 w-full h-10 grid grid-cols-5 sm:grid-cols-6 gap-2 text-purple-700 font-semibold items-center px-2"
          >
            <p class="col-span-2 sm:col-span-3">Item Description</p>
            <p>Price</p>
            <p>Discount</p>
            <p>Quantity</p>
          </div>

          <div>
            <div v-for="(item, index) in purchaseInfo.items" :key="index">
              <div
                :class="{
                  'bg-even': index % 2 == 0,
                  'bg-odd': index % 2 != 0,
                }"
                class="grid grid-cols-5 sm:grid-cols-6 text-gray-700 items-center p-2"
              >
                <div class="col-span-2 sm:col-span-3">
                  <p class="font-semibold leading-none break-normal">
                    {{ item.name }}
                  </p>
                </div>
                <p>${{ Number(item.price).toFixed(2) }}</p>
                <p class="flex justify-center">{{ item.discount }}%</p>
                <p class="flex justify-center">{{ item.qty }}</p>
                <p class="flex justify-end"></p>
              </div>
            </div>
          </div>

          <div
            class="mt-10 w-full h-auto space-y-5 bg-gray-50 text-gray-700 font-semibold py-3 px-5 border-2 border-purple-100"
          >
            <div
              class="w-40 ml-auto flex justify-between items-center uppercase space-x-2"
            >
              <span>shipping</span>
              <span>$2</span>
            </div>
            <div
              class="w-40 ml-auto flex justify-between items-center space-x-2 text-2xl uppercase"
            >
              <span>Total</span>
              <span>${{ purchaseInfo.amount }}</span>
            </div>
          </div>

          <div
            class="w-full h-10 bg-gray-50 border-b-2 border-purple-100 my-10"
          ></div>
        </div>

        <div
          @click="handlePrint"
          class="absolute top-0 left-7 text-gray-600 hover:text-gray-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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

        <div @click="handleCancel" class="absolute top-0 left-0 cursor-pointer">
          <svg
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
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import printJS from "print-js";
import { ref } from "@vue/reactivity";

export default {
  //invoiceIndex from admin page for printing invoice
  props: ["purchaseInfo"],
  emits: ["close"],
  setup(props, { emit }) {
    const date = moment;
    const subTotal = ref(0);
    const total = ref(0);

    const handlePrint = () => {
      printJS({
        printable: "print-invoice",
        type: "html",
        targetStyles: ["*"],
      });

      emit("close", true);
    };

    const handleCancel = () => {
      emit("close");
    };

    return { date, subTotal, total, handlePrint, handleCancel };
  },
};
</script>

<style></style>
