<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div
      class="relative bg-white w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 h-auto shadow rounded"
    >
      <div
        @click="handleCancel"
        class="absolute right-0 top-0 group cursor-pointer flex justify-center items-center"
      >
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
              class="w-full bg-white hover:text-pink-700 text-pink-500 shadow py-2 focus:outline-none"
            >
              Customer Paid
            </button>
            <button
              @click="handleClearInvoice"
              class="w-full bg-white hover:text-pink-700 text-pink-500 shadow py-2 focus:outline-none"
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
