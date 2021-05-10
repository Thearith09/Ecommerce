<template>
  <div class="h-screen flex flex-col">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto">
      <div class="flex h-auto my-5">
        <form
          class="flex flex-col w-full bg-white p-5 py-10 space-x-1 space-y-5 items-center justify-start sm:flex-row sm:justify-center sm:space-y-0 md:mx-auto md:space-x-5 lg:p-10"
          @submit.prevent="handleFilter"
        >
          <div class="w-full flex">
            <label
              class="shadow w-1/4 sm:w-2/4 md:w-1/3 text-white bg-pink-500 flex items-center justify-center"
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
              class="shadow w-1/4 sm:w-2/4 md:w-1/3 text-white bg-pink-500 flex items-center justify-center"
              for="dateFrom"
              >Date To</label
            >
          </div>
          <div class="flex w-full sm:w-3/4 lg:w-2/4">
            <button
              class="text-pink-500 shadow p-2 space-x-2 hover:text-pink-600 w-full flex justify-center items-center focus:outline-none"
            >
              <span class="material-icons"> filter_list </span>
              <span>Filter By Date</span>
            </button>
          </div>
        </form>
      </div>
      <div class="h-auto">
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
