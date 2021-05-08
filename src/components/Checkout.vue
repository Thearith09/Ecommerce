<template>
  <div v-if="paginateOrders" class="h-full my-10">
    <div class="mx-10" v-if="orders?.length > 0">
      <div
        class="text-gray-700 font-bold text-2xl border-b-2 border-gray-200 py-5"
      >
        {{ orders.length }} orders left for checking out
      </div>
    </div>

    <div class="mx-10 my-10">
      <div v-for="(order, index) in paginateOrders" :key="order.id">
        <div
          class="my-5 h-16 border-b-2 border-t-2 border-gray-200 transform transition hover:translate-y-1 grid grid-cols-6 gap-1 items-center px-2"
        >
          <div class="col-span-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <div class="col-span-1 leading-none px-2">
            <span class="block text-pink-500 font-semibold">{{
              order.orderedInfo?.name
            }}</span>
            <span class="text-gray-700 text-sm">{{
              order.orderedInfo?.tel
            }}</span>
          </div>
          <div class="col-span-2 text-gray-700 font-semibold text-center">
            {{ date(order.createdAt?.toDate()).format("dddd D, MMMM YYYY") }}
          </div>
          <div
            @click="handlePrint(order.orderedInfo, orders?.length, index)"
            class="col-span-1 border-2 py-1 border-pink-500 text-pink-500 font-semibold text-center hover:border-pink-600 hover:text-pink-600 cursor-pointer"
          >
            Invoice
          </div>
          <div
            @click="handleClearOrder(order)"
            class="col-span-1 border-2 py-1 px-2 border-pink-500 text-pink-500 font-semibold text-center hover:border-pink-600 hover:text-pink-600 cursor-pointer"
          >
            Clear
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="orders?.length > 0"
      class="flex items-center my-5 w-1/4 mx-auto space-x-2"
    >
      <button
        @click="handlePrevious(orders.length)"
        :class="{ frozen: previous <= 0 }"
        :disabled="previous <= 0"
        class="h-8 w-8 lg:h-10 lg:w-10 rounded-full focus:outline-none border-2 border-pink-500 text-pink-500 flex justify-center hover:text-pink-600 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 lg:w-9 lg:h-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="flex items-center">
        <ul
          v-for="i in Math.ceil(orders.length / 10)"
          :key="i"
          v-show="i >= start && i <= end"
          class="flex items-center px-2 text-pink-500 font-bold lg:text-lg"
        >
          <li class="px-1" :class="{ activePaginate: i == indexActive }">
            {{ i }}
          </li>
        </ul>
      </div>
      <button
        @click="handleNext(orders.length)"
        :class="{ frozen: next >= Math.ceil(orders.length / 10) }"
        :disabled="next >= Math.ceil(orders.length / 10)"
        class="h-8 w-8 lg:h-10 lg:w-10 rounded-full focus:outline-none border-2 border-pink-500 text-pink-500 hover:text-pink-600 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 lg:h-9 lg:w-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <component
      :is="currentComponent"
      :orders="printOrders"
      :order="order"
      @close="currentComponent = ''"
      :invoiceIndex="invoiceIndex"
    />
  </div>
</template>

<script>
import moment from "moment";
import PrintInvoice from "@/components/PrintInvoice.vue";
import getCollection from "@/composables/getCollection";
import DeleteOrderConfirmation from "@/components/DeleteOrderConfirmation.vue";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

export default {
  components: {
    PrintInvoice,
    DeleteOrderConfirmation,
  },
  props: ["orders"],
  setup() {
    const currentComponent = ref("");
    const date = moment;
    const printOrders = ref(null);
    const order = ref(null);
    const invoiceIndex = ref(null);
    const start = ref(1);
    const end = ref(5);
    const previous = ref(0);
    const next = ref(1);
    const indexActive = ref(1);
    const paginateOrders = ref(null);

    const {
      documents: ordersCollection,
      nextPage,
      previousPage,
    } = getCollection("orders", 10);

    watchEffect(() => {
      paginateOrders.value = ordersCollection?.value;
    });

    const handlePrint = (orderedInfo, length, index) => {
      currentComponent.value = "PrintInvoice";
      printOrders.value = orderedInfo;
      invoiceIndex.value = length - index;
    };

    const handleClearOrder = (doc) => {
      currentComponent.value = "DeleteOrderConfirmation";
      order.value = doc;
    };

    const handlePrevious = async (limitedDecrement) => {
      paginateOrders.value = await previousPage();

      limitedDecrement = Math.ceil(limitedDecrement / 10);
      if (end.value > 10) {
        start.value--;
        end.value--;
      }

      next.value--;
      previous.value--;

      indexActive.value--;
    };
    const handleNext = async (limitedIncrement) => {
      paginateOrders.value = await nextPage();

      limitedIncrement = Math.ceil(limitedIncrement / 10);
      if (end.value < limitedIncrement) {
        start.value++;
        end.value++;
      }

      next.value++;
      previous.value++;

      indexActive.value++;
    };

    return {
      date,
      currentComponent,
      paginateOrders,
      order,
      printOrders,
      handleClearOrder,
      handlePrint,
      invoiceIndex,
      start,
      end,
      previous,
      next,
      indexActive,
      handlePrevious,
      handleNext,
    };
  },
};
</script>

<style></style>
