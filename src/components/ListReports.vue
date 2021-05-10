<template>
  <div class="h-auto bg-white">
    <div v-if="reports?.length > 0">
      <div class="mx-5 sm:mx-10 py-5 md:mb-10">
        <div class="flex flex-col space-y-5 items-start lg:text-lg">
          <span class="text-gray-700 font-semibold"
            ><span class="text-pink-500 lg:text-xl">{{ reports.length }}</span>
            Invoices in total from
            <span class="text-gray-700 px-2 ">{{ dateFrom }}</span> to
            <span class="text-gray-700 px-2 ">{{ dateTo }}</span></span
          >

          <span
            class="text-pink-500 font-bold border-2 border-gray-200 p-5 text-xl"
            >USD {{ total.toFixed(2) }}</span
          >
        </div>
      </div>

      <!--for greater than 768px screenn-->
      <div v-if="windowWidth >= 768" class="mx-10">
        <div
          class="grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 md:gap-2 items-center text-gray-700 font-bold border-t-2 border-gray-200 pt-5 px-2"
        >
          <div></div>
          <div>Admin</div>
          <div class="col-span-1 md:col-span-2 lg:col-span-1">Date</div>
          <div>Customer</div>
          <div>Customer Contact</div>
          <div>Payment Type</div>
        </div>

        <div
          v-for="(report, index) in reports"
          :key="report.id"
          v-show="index + 1 >= start && index + 1 <= end"
        >
          <div
            class="font-semibold text-gray-700 my-5 h-16 border-b-2 border-t-2 border-gray-200 transform transition hover:translate-y-1 grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 md:gap-2 items-center px-2"
          >
            <div class="col-span-1">
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
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <div class="col-span-1">
              <span>{{ report.admin }}</span>
            </div>

            <div class="col-span-1 md:col-span-2 lg:col-span-1">
              <span>{{
                date(report.createdAt?.toDate()).format("dddd D, MMMM YYYY")
              }}</span>
            </div>

            <div class="col-span-1 text-pink-500">
              {{ report.customer }}
            </div>

            <div class="col-span-1">
              {{ report.customerTel }}
            </div>
            <div class="col-span-1 items-center space-x-1">
              <span>{{ report.paymentType }} -</span>
              <br v-if="windowWidth < 1024" />
              <span>{{ report.paymentId }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--end for greater than 768px screen-->

      <!--for less than 768px screenn-->
      <div v-if="windowWidth < 768" class="mx-5 sm:mx-10">
        <div
          class="flex justify-between items-center border-b-2 border-gray-200"
          v-for="(report, index) in reports"
          :key="report.id"
          v-show="index + 1 >= start && index + 1 <= end"
        >
          <div class="w-full text-gray-700 font-bold py-5">
            <div></div>
            <div>Admin</div>
            <div>Date</div>
            <div>Customer</div>
            <div>Customer Contact</div>
            <div>Payment Type</div>
          </div>

          <div
            class="text-gray-700 w-full transform transition hover:translate-y-1 py-5"
          >
            <div>
              <span>{{ report.admin }}</span>
            </div>

            <div>
              <span>{{
                date(report.createdAt?.toDate()).format("dddd D, MMMM YYYY")
              }}</span>
            </div>

            <div class="text-pink-500">
              {{ report.customer }}
            </div>

            <div>
              {{ report.customerTel }}
            </div>
            <div>
              <span>{{ report.paymentType }} - </span>
              <span>{{ report.paymentId }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--end for less than 768px screen-->

      <div
        v-if="reports?.length > 0"
        class="flex items-center w-1/4 mx-auto space-x-2 py-5 md:pb-10 pl-5"
      >
        <button
          @click="handlePrevious(reports.length)"
          :class="{ frozen: previous <= 0 }"
          :disabled="previous <= 0"
          class="h-8 w-8 lg:h-10 lg:w-10 rounded-full focus:outline-none border-2 border-pink-500 text-pink-500 flex justify-center hover:text-pink-600 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 lg:w-9 lg:h-9"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div class="flex items-center">
          <ul
            v-for="i in Math.ceil(reports.length / 10)"
            :key="i"
            class="flex items-center px-2 text-pink-500 font-bold lg:text-lg"
          >
            <li class="px-1" :class="{ activePaginate: i == indexActive }">
              {{ i }}
            </li>
          </ul>
        </div>
        <button
          @click="handleNext(reports.length)"
          :class="{ frozen: next >= Math.ceil(reports.length / 10) }"
          :disabled="next >= Math.ceil(reports.length / 10)"
          class="h-8 w-8 lg:h-10 lg:w-10 rounded-full focus:outline-none border-2 border-pink-500 text-pink-500 hover:text-pink-600 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 lg:h-9 lg:w-9"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="p-5 lg:p-10 bg-gray-100">
      <h1 class="text-gray-700 font-bold text-2xl mb-5">
        Oop, Something went wrong!
      </h1>
      <h1 class="text-gray-700 font-bold text-lg mb-5">
        maybe your filterings is incorrect, or maybe there is no reports.
      </h1>
      <h3 class="text-gray-700 font-bold text-lg mb-3">
        Make sure your filterings is in correct order.
      </h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import getCollection from "@/composables/getCollection";
import { ref } from "@vue/reactivity";
import { convertToTimestamp } from "@/firebase/config";
import { onMounted, watch } from "@vue/runtime-core";

export default {
  props: ["dateFrom", "dateTo"],
  setup(props) {
    const date = moment;
    const start = ref(1);
    const end = ref(10);
    const previous = ref(0);
    const next = ref(1);
    const indexActive = ref(1);
    const total = ref(null);
    const windowWidth = ref(window.innerWidth);

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    console.log(props.dateFrom);
    console.log(new Date(props.dateFrom));
    console.log(convertToTimestamp(new Date(props.dateFrom)));

    const { documents: reports } = getCollection("reports", null, {
      from: convertToTimestamp(new Date(props.dateFrom)),
      to: convertToTimestamp(new Date(props.dateTo)),
    });

    watch(reports, () => {
      reports?.value.forEach((doc) => {
        doc.items.forEach((item) => {
          total.value +=
            item.price * item.qty -
            (item.price * item.qty * item.discount) / 100;
        });
      });
    });

    const handlePrevious = async () => {
      if (end.value >= 10) {
        start.value -= 10;
        end.value -= 10;
      }

      next.value--;
      previous.value--;

      indexActive.value--;
    };
    const handleNext = async (limitedIncrement) => {
      if (end.value < limitedIncrement) {
        start.value += 10;
        end.value += 10;
      }

      next.value++;
      previous.value++;

      indexActive.value++;
    };

    return {
      date,
      start,
      end,
      previous,
      next,
      indexActive,
      handlePrevious,
      handleNext,
      reports,
      total,
      windowWidth,
    };
  },
};
</script>

<style></style>
