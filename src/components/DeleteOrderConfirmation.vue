<template>
  <div
    class="flex justify-center fixed items-center w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div class="bg-white w-full sm:w-1/2 h-auto shadow-lg">
      <div class="font-bold p-5 text-gray-700 flex justify-center items-center">
        <p>
          Are you seriously wanting to remove this order from
          <span class="text-pink-500">[{{ order?.orderedInfo.name }}]</span>
          customer ?
        </p>
      </div>
      <div class="flex justify-center">
        <div class="flex justify-between">
          <button
            class="bg-red-600 hover:bg-red-700 text-white py-2 px-6 focus:outline-none"
            @click="handleCancel"
          >
            NO
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 focus:outline-none"
            @click="handleRemove"
          >
            YES
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";

export default {
  emits: ["close"],
  props: ["order"],
  setup(props, { emit }) {
    const { deleteDoc: deleteOrder } = useDocument("orders", props.order?.id);

    const handleCancel = () => {
      emit("close");
    };

    const handleRemove = async () => {
      await deleteOrder();
      emit("close");
    };

    return { handleCancel, handleRemove };
  },
};
</script>

<style></style>
