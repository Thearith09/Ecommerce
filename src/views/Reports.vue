<template>
  <div class="h-screen flex flex-col">
    <div>
      <Navbar />
    </div>

    <div class="relative mb-auto 2xl:w-3/4 2xl:mx-auto">
      <div class="absolute right-0 top-5">
        <!-- Toggled switch -->
        <div
          id="switch"
          class="relative group w-16 h-7 flex items-center rounded-full mx-3 px-1 bg-gray-700 cursor-pointer"
          @click="handleToggleFiltering"
        >
          <!-- Switch -->
          <div
            id="move-around"
            class="bg-white w-5 h-5 rounded-full shadow-md transform translate-x-0 transition-all duration-200"
          ></div>

          <div
            class="absolute -top-5 -left-10 text-blue-800 text-sm w-32 hidden group-hover:block"
          >
            Toggle filter form
          </div>
        </div>
      </div>
      <div v-if="toggle" class="flex justify-center h-auto mt-10">
        <form
          class="bg-white flex flex-col space-y-8 w-80"
          @submit.prevent="handleFilter"
        >
          <div class="group relative w-full z-0">
            <input
              v-model="dateFrom"
              type="date"
              placeholder=" "
              required
              class="pb-1 block w-full border-b-2 text-gray-500 focus:outline-none bg-transparent focus:ring-0 focus:border-blue-600 border-gray-200"
            />
            <label
              for="email"
              class="absolute duration-300 top-0 transform -translate-y-4 text-sm text-blue-600"
              >From</label
            >
          </div>

          <div class="group relative w-full z-0">
            <input
              v-model="dateTo"
              type="date"
              placeholder=" "
              required
              class="pb-1 block w-full border-b-2 text-gray-500 focus:outline-none bg-transparent focus:ring-0 focus:border-blue-600 border-gray-200"
            />
            <label
              for="email"
              class="absolute duration-300 text-sm top-0 transform -translate-y-4 text-blue-600"
              >To</label
            >
          </div>

          <div class="flex w-full">
            <button
              v-if="!pending"
              class="rounded text-blue-600 shadow w-full p-2 space-x-2 hover:text-blue-700 flex justify-center items-center focus:outline-none"
            >
              <span class="material-icons"> filter_list </span>
              <span>Filter By Date</span>
            </button>
            <button
              v-else
              class="relative flex justify-center items-center focus:outline-none rounded shadow p-2 tracking-wide bg-white text-blue-600 w-full"
            >
              <div>
                Filtering...
              </div>
              <div class="absolute top-3 right-2">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-blue-600"
                ></div>
              </div>
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
          @responseData="handlePending"
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
    const pending = ref(false);
    const toggle = ref(false);
    const currentComponent = ref("");

    const handleFilter = () => {
      pending.value = true;
      key.value++;
      currentComponent.value = "ListReports";
    };

    const handlePending = () => {
      pending.value = false;
    };

    const handleToggleFiltering = () => {
      const switchDiv = document.getElementById("switch");
      const move = document.getElementById("move-around");
      toggle.value = !toggle.value;

      if (
        switchDiv.classList.contains("bg-gray-700") &&
        move.classList.contains("translate-x-0")
      ) {
        switchDiv.classList.remove("bg-gray-700");
        move.classList.remove("translate-x-0");

        switchDiv.classList.add("bg-blue-700");
        move.classList.add("translate-x-9");
      } else {
        switchDiv.classList.remove("bg-blue-700");
        move.classList.remove("translate-x-9");

        move.classList.add("translate-x-0");
        switchDiv.classList.add("bg-gray-700");
      }
    };

    return {
      key,
      dateFrom,
      dateTo,
      pending,
      currentComponent,
      handleFilter,
      handlePending,
      handleToggleFiltering,
      toggle,
    };
  },
};
</script>

<style></style>
