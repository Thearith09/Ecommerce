<template>
  <div
    class="p-5 lg:p-10 xl:p-16 grid sm:grid-cols-2 lg:grid-cols-4 bg-white shadow-lg h-auto"
  >
    <div class="lg:border-r-2 border-gray-200 lg:mr-5">
      <h3 class="font-semibold text-gray-700 mb-3">Customer Services</h3>
      <ul class="font-thin text-gray-500">
        <li>Help Center</li>
        <li>Report Abuse</li>
        <li>Submit a Dispute</li>
      </ul>
    </div>

    <div class="lg:border-r-2 border-gray-200 lg:mr-5">
      <h3 class="font-semibold text-gray-700 mb-3">About Us</h3>
      <ul class="font-thin text-gray-500">
        <li>Help Center</li>
        <li>Report Abuse</li>
        <li>Submit a Dispute</li>
      </ul>
    </div>

    <div class="col-span-2 mt-5 lg:mt-0">
      <h3 class="font-semibold text-gray-700 mb-3">Contact Us</h3>

      <div class="grid sm:grid-cols-3 gap-4">
        <div class="flex space-x-2 sm:border-r-2 border-gray-100">
          <!-- <a href="https://www.facebook.com/masteritcambodia/" target="_blank">
          </a> -->
          <img
            class="w-10 h-10 rounded-full hover:shadow-sm shadow-lg"
            src="@/assets/images/fb.png"
          />
          <img
            class="w-10 h-10 rounded-full hover:shadow-sm shadow-lg"
            src="@/assets/images/tiktok.png"
          />
          <img
            class="w-10 h-10  rounded-full hover:shadow-sm shadow-lg"
            src="@/assets/images/twitter.png"
          />
        </div>

        <div class="col-span-2">
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full hover:shadow-sm shadow-lg"
              src="@/assets/images/ms.png"
            />
            <span class="text-gray-400 pl-2"
              >masteritcambodia2018@outlook.com</span
            >
          </div>
          <div class="mt-2 flex items-center">
            <img
              class="w-10 h-10 rounded-full hover:shadow-sm shadow-lg"
              src="@/assets/images/phone.png"
            />
            <a :href="`tel:+${mobile}`">
              <span class="text-gray-400 pl-2">098 866 396</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const mobile = ref("98866396");

    return { mobile };
  },
};
</script>

<style></style>
