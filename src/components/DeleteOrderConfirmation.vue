<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div class="relative bg-white w-full md:w-1/2 h-auto shadow">
      <div
        @click="handleCancel"
        class="absolute right-0 top-0 group bg-red-500 border cursor-pointer shadow w-4 h-4 rounded-full flex justify-center items-center"
      >
        <svg
          class="w-2 h-2"
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
        <span
          class="text-gray-900 text-sm absolute right-5 hidden group-hover:block"
          >close</span
        >
      </div>
      <div class="font-bold p-5 text-gray-700 flex justify-center items-center">
        <p>
          Are you seriously wanting to clear this order from
          <span class="text-pink-500">[{{ order?.orderedInfo.name }}]</span>
          customer ?
        </p>
      </div>
      <div class="my-5 px-5 w-full">
        <div class="space-y-5 sm:w-3/4 mx-auto">
          <div>
            <label class="block text-gray-700 pb-1" for="type"
              >Payment Type</label
            >
            <input
              v-model="paymentType"
              id="type"
              class="p-2 shadow w-full focus:outline-none"
              type="text"
              placeholder="Example: wing"
            />
          </div>
          <div>
            <label class="block text-gray-700 pb-1" for="code"
              >Payment ID</label
            >
            <input
              v-model="paymentId"
              id="code"
              class="p-2 shadow w-full focus:outline-none"
              type="text"
              placeholder="Example: 14567203456"
            />
          </div>
          <div class="text-red-600" v-if="error">{{ error }}</div>
          <div class="flex items-center justify-between">
            <button
              @click="handleClearPaidInvoice"
              class="w-full bg-white hover:text-pink-600 text-pink-500 shadow py-2 focus:outline-none"
            >
              Customer Paid
            </button>
            <button
              @click="handleClearInvoice"
              class="w-full bg-white hover:text-pink-600 text-pink-500 shadow py-2 focus:outline-none"
            >
              Customer Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { ref } from "@vue/reactivity";

export default {
  emits: ["close"],
  props: ["order"],
  setup(props, { emit }) {
    const paymentType = ref("");
    const paymentId = ref("");
    const error = ref(null);

    const { deleteDoc: deleteOrder } = useDocument("orders", props.order?.id);
    const { user } = getUser();
    const { addDoc } = useCollection("reports");

    const handleCancel = () => {
      emit("close");
    };

    const handleClearInvoice = async () => {
      await deleteOrder();
      emit("close");
    };

    const handleClearPaidInvoice = async () => {
      if (!(paymentType.value && paymentId.value)) {
        return (error.value = "Payment Type and Payment ID must be exist!");
      }
      const report = {
        paymentType: paymentType.value,
        paymentId: paymentId.value,
        items: props.order?.orderedInfo.items,
        admin: user?.value.displayName,
        customer: props.order?.orderedInfo.telegram,
        customerTel: props.order?.orderedInfo.tel,
        createdAt: timestamp(),
      };

      await addDoc(report);
      await deleteOrder();
      emit("close");
    };

    return {
      paymentType,
      paymentId,
      error,
      handleCancel,
      handleClearInvoice,
      handleClearPaidInvoice,
    };
  },
};
</script>

<style></style>
