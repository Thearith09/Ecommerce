<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 my-5"
  >
    <div v-for="(month, i) in labels" :key="i">
      <div class="relative space-y-4 text-center h-28 shadow rounded">
        <div class="text-center font-semibold text-yellow-500">
          {{ month }}
        </div>
        <div class="flex justify-center items-center space-x-2">
          <div class="leading-none">
            <div class="font-medium text-lg text-left">
              <span class="text-xs">$</span>{{ monthlyIncomes[i].toFixed(2) }}
            </div>
            <div class="text-xs">
              Monthly Income
            </div>
          </div>
          <div v-if="i != 0">
            <div
              v-if="monthlyIncomes[i] > monthlyIncomes[i - 1]"
              class="bg-green-500 bg-opacity-10 p-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div
                :style="{
                  width:
                    monthlyIncomes[i - 1] == 0 || monthlyIncomes[i] == 0
                      ? 100 + '%'
                      : (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100 + '%',
                }"
                class="absolute bottom-1 left-0 text-xs text-right"
              >
                {{
                  monthlyIncomes[i - 1] == 0 || monthlyIncomes[i] == 0
                    ? 100
                    : Math.round(
                        (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100
                      )
                }}%
              </div>
              <div
                :style="{
                  width:
                    monthlyIncomes[i - 1] == 0 || monthlyIncomes[i] == 0
                      ? 100 + '%'
                      : (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100 + '%',
                }"
                class="absolute bottom-0 left-0 h-1 bg-green-500 rounded"
              ></div>
            </div>

            <div
              v-else-if="monthlyIncomes[i] < monthlyIncomes[i - 1]"
              class="bg-red-500 bg-opacity-10 p-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div
                :style="{
                  width:
                    monthlyIncomes[i - 1] == 0 || monthlyIncomes[i] == 0
                      ? 100 + '%'
                      : (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100 + '%',
                }"
                class="absolute bottom-1 left-0 text-xs text-right"
              >
                {{
                  monthlyIncomes[i - 1] == 0 || monthlyIncomes[i] == 0
                    ? 100
                    : Math.round(
                        (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100
                      )
                }}%
              </div>
              <div
                :style="{
                  width:
                    monthlyIncomes[i - 1] == 0 || monthlyIncomes[i] == 0
                      ? 100 + '%'
                      : (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100 + '%',
                }"
                class="absolute bottom-0 left-0 h-1 bg-red-500 rounded"
              ></div>
            </div>

            <div v-else class="bg-yellow-400 bg-opacity-10 p-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
                />
              </svg>
              <div
                :style="{
                  width:
                    monthlyIncomes[i - 1] == 0
                      ? 100 + '%'
                      : (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100 + '%',
                }"
                class="absolute bottom-1 left-0 text-xs text-right"
              >
                {{
                  monthlyIncomes[i - 1] == 0
                    ? 100
                    : Math.round(
                        (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100
                      )
                }}%
              </div>
              <div
                :style="{
                  width:
                    monthlyIncomes[i - 1] == 0
                      ? 100 + '%'
                      : (monthlyIncomes[i] / monthlyIncomes[i - 1]) * 100 + '%',
                }"
                class="absolute bottom-0 left-0 h-1 bg-yellow-400 rounded"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="height:auto; width: auto;">
    <vue3-chart-js
      :id="config.id"
      ref="chartRef"
      :type="config.type"
      :data="config.data"
      :options="config.options"
    ></vue3-chart-js>

    <!-- <button @click="updateChart">Update Chart</button> -->
  </div>
</template>
<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import { ref } from "@vue/reactivity";
import { Utils } from "@/composables/utils.js";

export default {
  components: {
    Vue3ChartJs,
  },
  props: ["date", "totals"],
  setup(props) {
    let config;
    let width, height, gradient;
    const chartRef = ref(null);
    let labels = [];
    let monthlyIncomes = [];

    for (let doc of props.totals) {
      console.log(doc);
      labels.push(Utils.MONTHS[doc.month]);
      monthlyIncomes.push(doc.total);
    }

    console.log(labels);
    console.log(monthlyIncomes);

    const data = {
      labels: labels,
      datasets: [
        {
          label: `Reports from ${props.date.dateFrom} to ${props.date.dateTo}`,
          data: monthlyIncomes,
          backgroundColor: "rgb(255,255,255)",
          borderColor: function(context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return null;
            }
            return getGradient(ctx, chartArea);
          },
        },
      ],
    };

    config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    };

    function getGradient(ctx, chartArea) {
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (gradient === null || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0, Utils.CHART_COLORS.blue);
        gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow);
        gradient.addColorStop(1, Utils.CHART_COLORS.red);
      }

      return gradient;
    }

    // const updateChart = () => {
    //   lineChart.options.plugins.title = {
    //     text: "Updated Chart",
    //     display: true,
    //   };
    //   lineChart.data.labels = ["Cats", "Dogs", "Hamsters", "Dragons"];
    //   lineChart.data.datasets = [
    //     {
    //       backgroundColor: ["#333333", "#E46651", "#00D8FF", "#DD1B16"],
    //       data: [100, 20, 800, 20],
    //     },
    //   ];

    //   chartRef.value.update(250);
    // };

    return {
      config,
      chartRef,
      labels,
      monthlyIncomes,
    };
  },
};
</script>
