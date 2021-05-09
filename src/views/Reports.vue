<template>
  <div class="h-screen flex flex-col">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto">
      <div
        class="grid grid-cols-layout-list-carts md:grid-cols-none h-auto my-5"
      >
        <form
          class="flex items-center w-full mx-auto space-x-5 bg-white p-10"
          @submit.prevent="handleFilter"
        >
          <div class="w-full flex">
            <label
              class="shadow w-1/3 text-white bg-pink-500 flex items-center justify-center"
              for="dateFrom"
              >Date From</label
            >
            <input
              v-model="dateFrom"
              id="dateFrom"
              class="shadow p-2 w-3/4 text-gray-400 focus:outline-none"
              type="date"
            />
          </div>
          <div class="w-full flex">
            <input
              v-model="dateTo"
              id="dateTo"
              class="shadow p-2 w-3/4 text-gray-400 focus:outline-none"
              type="date"
            />
            <label
              class="shadow w-1/3 text-white bg-pink-500 flex items-center justify-center"
              for="dateFrom"
              >Date To</label
            >
          </div>
          <div class="flex w-3/4 lg:w-2/4">
            <button
              class="text-pink-500 shadow p-2 space-x-2 hover:text-pink-600 w-full flex justify-center items-center focus:outline-none"
            >
              <span class="material-icons">
                filter_list
              </span>

              <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="inline-block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg> -->
              <span>Filter By Date</span>
            </button>
          </div>
        </form>
      </div>
      <div class="grid grid-cols-layout-list-carts md:grid-cols-none h-auto">
        <component
          :is="currentComponent"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :key="key"
        />
      </div>
    </div>
    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import ListReports from "@/components/ListReports.vue";
import { ref } from "@vue/reactivity";
import moment from "moment";

export default {
  components: {
    Footer,
    Navbar,
    ListReports,
  },
  setup() {
    const dateFrom = ref(moment().format("YYYY-MM-DD"));
    const dateTo = ref(moment().format("YYYY-MM-DD"));
    const key = ref(1); //for rebound component
    const currentComponent = ref("");

    const handleFilter = () => {
      key.value++;
      currentComponent.value = "ListReports";
    };

    return { key, dateFrom, dateTo, handleFilter, currentComponent };
  },
};
</script>

<style></style>
