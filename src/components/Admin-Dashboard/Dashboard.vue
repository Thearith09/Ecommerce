<template>
  <div class="relative pb-32 pt-8 px-5 md:px-10 lg:px-16 mx-auto">
    <div class="pb-3">
      <p class="px-5 text-2xl text-white font-bold font-serif">
        {{ $t("Dashboard") }}
      </p>
    </div>
    <div class="px-5 w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-col Ipad:flex-row Ipad:space-x-4">
          <div class="w-full">
            <div
              class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div
                    class="relative w-full pr-4 text-gray-700 max-w-full flex-grow flex-1"
                  >
                    <h5 class="uppercase font-bold text-xs">
                      {{ $t("Total Incomes") }}
                    </h5>
                    <span class="font-semibold text-xl">
                      ${{
                        new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(totalIncome)
                      }}
                    </span>
                  </div>
                  <div class="relative w-auto pl-4 flex-initial">
                    <div
                      class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-600"
                    >
                      <i class="far fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
                <p
                  v-if="comparisonTotal >= 0"
                  class="text-sm text-gray-500 mt-4"
                >
                  <span class="mr-2 text-purple-600">
                    <i class="fas fa-arrow-up"></i> {{ comparisonTotal }}%
                  </span>
                  <span class="whitespace-nowrap">
                    {{ $t("Versus last month") }}
                  </span>
                </p>

                <p v-else class="text-sm text-gray-500 mt-4">
                  <span class="mr-2 text-red-500">
                    <i class="fas fa-arrow-down"></i> {{ comparisonTotal }}%
                  </span>
                  <span class="whitespace-nowrap">
                    {{ t$("Versus last month") }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="w-full">
            <div
              class="relative flex flex-col min-w-0 break-words text-white bg-gray-900 rounded mb-6 xl:mb-0 shadow-lg"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="uppercase font-bold text-xs">
                      {{ $t("Total Orders") }}
                    </h5>
                    <span class="font-semibold text-xl">
                      {{ totalOrder || 0 }}
                    </span>
                  </div>
                  <div class="relative w-auto pl-4 flex-initial">
                    <div
                      class="text-purple-700 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-yellow-300"
                    >
                      <i class="fab fa-opencart"></i>
                    </div>
                  </div>
                </div>
                <p v-if="comparisonOrders >= 0" class="text-sm mt-4">
                  <span class="mr-2 text-yellow-300">
                    <i class="fas fa-arrow-up"></i> {{ comparisonOrders }}%
                  </span>
                  <span class="whitespace-nowrap">
                    {{ $t("Versus last month") }}
                  </span>
                </p>
                <p v-else class="text-sm mt-4">
                  <span class="mr-2 text-red-500">
                    <i class="fas fa-arrow-down"></i> {{ comparisonOrders }}%
                  </span>
                  <span class="whitespace-nowrap">
                    {{ $t("Versus last month") }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="w-full">
            <div
              class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div
                    class="relative w-full pr-4 text-gray-700 max-w-full flex-grow flex-1"
                  >
                    <h5 class="uppercase font-bold text-xs">
                      {{ $t("Sales") }}
                    </h5>
                    <span class="font-semibold text-xl">
                      ${{ totalSales }}
                    </span>
                  </div>
                  <div class="relative w-auto pl-4 flex-initial">
                    <div
                      class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500"
                    >
                      <i class="fas fa-users"></i>
                    </div>
                  </div>
                </div>
                <p
                  v-if="comparisonSales >= 0"
                  class="text-sm text-gray-500 mt-4"
                >
                  <span class="mr-2 text-green-500">
                    <i class="fas fa-arrow-up"></i>
                    {{ comparisonSales }}%
                  </span>
                  <span class="whitespace-nowrap">
                    {{ $t("Versus yesterday") }}
                  </span>
                </p>

                <p v-else class="text-sm mt-4 text-gray-500">
                  <span class="mr-2 text-red-500">
                    <i class="fas fa-arrow-down"></i>
                    {{ comparisonSales }}%
                  </span>
                  <span class="whitespace-nowrap">
                    {{ $t("Versus yesterday") }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="px-5 md:px-10 lg:px-16 w-full mx-auto -mt-24">
    <div>
      <LineChart />
      <BarChart />
    </div>
    <!-- <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-blueGray-700">
                  Page visits
                </h3>
              </div>
              <div
                class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
              >
                <button
                  class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style="transition:all .15s ease"
                >
                  See all
                </button>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Page name
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Visitors
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Unique users
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Bounce rate
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    /argon/
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    4,569
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    340
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                    46,53%
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    /argon/index.html
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    3,985
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    319
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
                    46,53%
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    /argon/charts.html
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    3,513
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    294
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
                    36,49%
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    /argon/tables.html
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    2,050
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    147
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                    50,87%
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    /argon/profile.html
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    1,795
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    190
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-blueGray-700">
                  Social traffic
                </h3>
              </div>
              <div
                class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
              >
                <button
                  class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style="transition:all .15s ease"
                >
                  See all
                </button>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead class="thead-light">
                <tr>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Referral
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Visitors
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    style="min-width:140px"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    Facebook
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    1,480
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <div class="flex items-center">
                      <span class="mr-2">60%</span>
                      <div class="relative w-full">
                        <div
                          class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                        >
                          <div
                            style="width:60%"
                            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    Facebook
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    5,480
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <div class="flex items-center">
                      <span class="mr-2">70%</span>
                      <div class="relative w-full">
                        <div
                          class="overflow-hidden h-2 text-xs flex rounded bg-emerald-200"
                        >
                          <div
                            style="width:70%"
                            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    Google
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    4,807
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <div class="flex items-center">
                      <span class="mr-2">80%</span>
                      <div class="relative w-full">
                        <div
                          class="overflow-hidden h-2 text-xs flex rounded bg-purple-200"
                        >
                          <div
                            style="width:80%"
                            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    Instagram
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    3,678
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <div class="flex items-center">
                      <span class="mr-2">75%</span>
                      <div class="relative w-full">
                        <div
                          class="overflow-hidden h-2 text-xs flex rounded bg-lightBlue-200"
                        >
                          <div
                            style="width:75%"
                            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                    twitter
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    2,645
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <div class="flex items-center">
                      <span class="mr-2">30%</span>
                      <div class="relative w-full">
                        <div
                          class="overflow-hidden h-2 text-xs flex rounded bg-orange-200"
                        >
                          <div
                            style="width:30%"
                            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import LineChart from "@/components/Admin-Dashboard/LineChart";
import BarChart from "@/components/Admin-Dashboard/BarChart";
import getCollection from "@/composables/getCollection";
import { convertToTimestamp } from "@/firebase/config";
import { ref, watch, watchEffect } from "@vue/runtime-core";
export default {
  components: {
    LineChart,
    BarChart,
  },
  setup() {
    const totalIncome = ref(0);
    const totalIncomeLastMonth = ref(0);
    const comparisonTotal = ref(0);

    const totalOrder = ref(0);
    const totalOrderLastMonth = ref(0);
    const comparisonOrders = ref(0);

    const totalSales = ref(0);
    const totalSalesYesterday = ref(0);
    const comparisonSales = ref(0);

    let nowFromMorning = new Date();
    nowFromMorning = new Date(
      nowFromMorning.getFullYear(),
      nowFromMorning.getMonth(),
      nowFromMorning.getDate(),
      7,
      0,
      0
    );

    let nowUntilMidnight = new Date();
    nowUntilMidnight = new Date(
      nowUntilMidnight.getFullYear(),
      nowUntilMidnight.getMonth(),
      nowUntilMidnight.getDate(),
      23,
      59,
      59
    );

    let yesterdayFromMorning = new Date();
    yesterdayFromMorning = new Date(
      yesterdayFromMorning.getFullYear(),
      yesterdayFromMorning.getMonth(),
      yesterdayFromMorning.getDate() - 1,
      7,
      0,
      0
    );

    let yesterDayUntilMidnight = new Date();
    yesterDayUntilMidnight = new Date(
      yesterDayUntilMidnight.getFullYear(),
      yesterDayUntilMidnight.getMonth(),
      yesterDayUntilMidnight.getDate() - 1,
      23,
      59,
      59
    );

    let firstDayInThisMonth = new Date();
    firstDayInThisMonth = new Date(
      firstDayInThisMonth.getFullYear(),
      firstDayInThisMonth.getMonth(),
      1
    );

    let lastDayInThisMonth = new Date();
    lastDayInThisMonth = new Date(
      lastDayInThisMonth.getFullYear(),
      lastDayInThisMonth.getMonth(),
      getlastDayInAMonth(
        lastDayInThisMonth.getFullYear(),
        lastDayInThisMonth.getMonth()
      )
    );

    let firstDayInLastMonth = new Date();
    firstDayInLastMonth = new Date(
      firstDayInLastMonth.getFullYear(),
      firstDayInLastMonth.getMonth() - 1,
      1
    );

    let lastDayInLastMonth = new Date();
    lastDayInLastMonth = new Date(
      lastDayInLastMonth.getFullYear(),
      lastDayInLastMonth.getMonth() - 1,
      getlastDayInAMonth(
        lastDayInLastMonth.getFullYear(),
        lastDayInLastMonth.getMonth() - 1
      )
    );

    const { documents: orders } = getCollection("orders", null, {
      from: convertToTimestamp(new Date(firstDayInThisMonth)),
      to: convertToTimestamp(lastDayInThisMonth),
    });
    const { documents: ordersLastMonth } = getCollection("orders", null, {
      from: convertToTimestamp(firstDayInLastMonth),
      to: convertToTimestamp(lastDayInLastMonth),
    });

    const { documents: reports } = getCollection("reports", null, {
      from: convertToTimestamp(firstDayInThisMonth),
      to: convertToTimestamp(lastDayInThisMonth),
    });
    const { documents: reportsLastMonth } = getCollection("reports", null, {
      from: convertToTimestamp(firstDayInLastMonth),
      to: convertToTimestamp(lastDayInLastMonth),
    });

    // today sales from orders
    const { documents: sales } = getCollection("orders", null, {
      from: convertToTimestamp(nowFromMorning),
      to: convertToTimestamp(nowUntilMidnight),
    });
    const { documents: salesYesterday } = getCollection("orders", null, {
      from: convertToTimestamp(yesterdayFromMorning),
      to: convertToTimestamp(yesterDayUntilMidnight),
    });

    // today sales from reports
    const { documents: salesInReport } = getCollection("reports", null, {
      from: convertToTimestamp(nowFromMorning),
      to: convertToTimestamp(nowUntilMidnight),
    });
    const { documents: salesInReportYesterday } = getCollection(
      "reports",
      null,
      {
        from: convertToTimestamp(yesterdayFromMorning),
        to: convertToTimestamp(yesterDayUntilMidnight),
      }
    );

    watchEffect(() => {
      comparisonTotal.value = totalIncome.value - totalIncomeLastMonth.value;
      comparisonTotal.value =
        comparisonTotal.value > 100 || comparisonTotal.value < -100
          ? comparisonTotal.value > 100
            ? 100
            : -100
          : comparisonTotal.value;

      comparisonOrders.value = totalOrder.value - totalOrderLastMonth.value;
      comparisonOrders.value =
        comparisonOrders.value > 100 || comparisonOrders.value < -100
          ? comparisonOrders.value > 100
            ? 100
            : -100
          : comparisonOrders.value;

      comparisonSales.value = totalSales.value - totalSalesYesterday.value;
      comparisonSales.value =
        comparisonSales.value > 100 || comparisonSales.value < -100
          ? comparisonSales.value > 100
            ? 100
            : -100
          : comparisonSales.value;
    });

    watch(sales, () => {
      sales.value?.forEach((sale) => {
        if (sale.amountTotal) {
          totalSales.value += sale.amountTotal / 100;
        }
      });

      totalSales.value = Math.round(totalSales.value);
    });

    watch(salesInReport, () => {
      salesInReport.value?.forEach((report) => {
        totalSales.value += report.amount;
      });
    });

    watch(salesYesterday, () => {
      salesYesterday.value?.forEach((sale) => {
        if (sale.amountTotal) {
          totalSalesYesterday.value += sale.amountTotal / 100;
        }
      });

      totalSalesYesterday.value = Math.round(totalSalesYesterday.value);
    });

    watch(salesInReportYesterday, () => {
      salesInReportYesterday.value?.forEach((report) => {
        totalSalesYesterday.value += report.amount;
      });
    });

    watch(ordersLastMonth, () => {
      ordersLastMonth.value?.forEach((order) => {
        if (order.amountTotal) {
          totalIncomeLastMonth.value += order.amountTotal / 100;
          totalOrderLastMonth.value++;
        }
      });
    });

    watch(reportsLastMonth, () => {
      totalOrderLastMonth.value += reportsLastMonth.value?.length;
      reportsLastMonth.value?.forEach((report) => {
        totalIncomeLastMonth.value += report.amount;
      });
    });

    watch(orders, () => {
      orders.value?.forEach((order) => {
        if (order.amountTotal) {
          totalIncome.value += order.amountTotal / 100;
          totalOrder.value++;
        }
      });
    });

    watch(reports, () => {
      totalOrder.value += reports.value?.length;
      reports.value?.forEach((report) => {
        totalIncome.value += report.amount;
      });
    });

    function getlastDayInAMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    return {
      totalIncome,
      totalOrder,
      totalSales,
      totalSalesYesterday,
      comparisonSales,
      comparisonOrders,
      comparisonTotal,
    };
  },
};
</script>

<style></style>
