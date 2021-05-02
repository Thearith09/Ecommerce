<template>
  <div class="h-full my-10">
    <div class="mx-10" v-if="orders?.length > 0">
      <div
        class="text-gray-700 font-bold text-2xl border-b-2 border-gray-200 py-5"
      >
        {{ orders.length }} orders left for checking out
      </div>
    </div>

    <div class="mx-10 my-10">
      <div v-for="order in orders" :key="order.id">
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
              order.orderedInfo.name
            }}</span>
            <span class="text-gray-700 text-sm">{{
              order.orderedInfo.tel
            }}</span>
          </div>
          <div class="col-span-2 text-gray-700 font-semibold text-center">
            {{ date(order.createdAt?.toDate()).format("dddd D, MMMM YYYY") }}
          </div>
          <div
            @click="handlePrint(order.orderedInfo)"
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

    <component
      :is="currentComponent"
      :orders="printOrders"
      :order="order"
      @close="currentComponent = ''"
    />
  </div>
</template>

<script>
import moment from "moment";
import PrintInvoice from "@/components/PrintInvoice.vue";
import DeleteOrderConfirmation from "@/components/DeleteOrderConfirmation.vue";
import { ref } from "@vue/reactivity";

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

    const handlePrint = (orderedInfo) => {
      currentComponent.value = "PrintInvoice";
      printOrders.value = orderedInfo;
      console.log(printOrders.value);
    };

    const handleClearOrder = (doc) => {
      currentComponent.value = "DeleteOrderConfirmation";
      order.value = doc;
    };

    return {
      date,
      printOrders,
      currentComponent,
      handlePrint,
      handleClearOrder,
      order,
    };
  },
};
</script>

<style></style>
