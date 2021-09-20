<template>
  <div
    class="flex flex-col sm:flex-row-reverse py-14 px-10 sm:space-y-0 bg-yellow-300 h-auto md:h-72 min-w-max sm:min-w-0 border-t-2 border-purple-100"
  >
    <div class="pb-5 sm:pb-0 w-full sm:w-3/4 md:w-2/4 lg:w-3/4 xl:w-full">
      <div
        @click="handleSwitchLanguage"
        class="relative group sm:ml-auto w-40 flex justify-center space-x-2 items-center rounded cursor-pointer border-2 border-gray-400 p-2 text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-semibold">English</span>
      </div>
    </div>

    <div
      class="grid sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-none md:gap-4 space-y-5 sm:space-y-0 text-gray-700"
    >
      <div>
        <h3 class="font-bold mb-3">
          {{ $t("Customer Services") }}
        </h3>
        <ul class="text-gray-900">
          <li>Help Center</li>
          <li>Report Abuse</li>
          <li>Submit a Dispute</li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold mb-3">{{ $t("About Us") }}</h3>
        <ul class="text-gray-900">
          <li>Help Center</li>
          <li>Report Abuse</li>
          <li>Submit a Dispute</li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold mb-3">{{ $t("Contact Us") }}</h3>

        <div class="space-y-2 text-gray-900">
          <div class="flex space-x-2">
            <img
              class="w-8 h-8 rounded-full hover:shadow-sm shadow-lg p-1"
              src="@/assets/images/fb1.png"
            />
            <img
              class="w-8 h-8 rounded-full hover:shadow-sm shadow-lg p-1"
              src="@/assets/images/tiktok1.png"
            />
            <img
              class="w-8 h-8 rounded-full hover:shadow-sm shadow-lg p-1"
              src="@/assets/images/twitter1.png"
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full hover:shadow-sm shadow-lg p-1"
                src="@/assets/images/ms1.png"
              />
              <span class=" pl-2">easy4shopping@gmail.com</span>
            </div>
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full hover:shadow-sm shadow-lg p-1"
                src="@/assets/images/tel.png"
              />
              <a :href="`tel:+${mobile}`">
                <span class="pl-2">077 628 480</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <component :is="currentComponent" @close="currentComponent = ''" />
</template>

<script>
import { ref } from "@vue/reactivity";
import SwitchLanguage from "@/components/SwitchLanguage";

export default {
  components: {
    SwitchLanguage,
  },
  setup() {
    const mobile = ref("98866396");
    const currentComponent = ref("");
    const handleSwitchLanguage = () => {
      currentComponent.value = "SwitchLanguage";
    };

    return { mobile, handleSwitchLanguage, currentComponent };
  },
};
</script>

<style></style>
