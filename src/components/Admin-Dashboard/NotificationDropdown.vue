<template>
  <div>
    <div @click="handleSwitchingComponent('OrderList')" class="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 text-gray-700 hover:text-purple-700"
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
      <div
        v-if="orders && orders.length > 0"
        class="absolute -top-2 -right-2 cursor-pointer text-purple-700 font-semibold"
      >
        <!--  -->
        <div
          v-if="orders.length > 9"
          class="relative w-7 h-4 bg-yellow-300 rounded-full flex justify-center items-center pr-2 mt-1 -mr-1"
        >
          <p>9</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute top-0 right-px h-4"
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
          v-else
          class="relative w-5 h-5 bg-yellow-300 rounded-full flex justify-center items-center"
        >
          {{ orders.length }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getCollection from "@/composables/getCollection";
export default {
  setup(props, { emit }) {
    const { documents: orders } = getCollection("orders");

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
      console.log(component);
    };

    return { orders, handleSwitchingComponent };
  },
};
</script>
