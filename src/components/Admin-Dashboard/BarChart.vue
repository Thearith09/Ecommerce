<template>
  <div class="w-full px-5">
    <div
      class="relative flex flex-col bg-gray-900 w-full mb-6 shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6
              class="uppercase text-blueGray-400 mb-1 text-xs font-semibold"
            ></h6>
            <h2 class="text-white text-xl font-semibold">
              {{ $t("Orders value") }}
            </h2>
          </div>
        </div>
      </div>
      <div class="p-4 flex-auto">
        <!-- Chart -->
        <div id="ab" class="relative" style="height:350px">
          <canvas id="barChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart } from "chart.js";
import { onMounted } from "@vue/runtime-core";
export default {
  mounted: function() {
    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "Octorber",
          "November",
          "December",
        ],
        datasets: [
          {
            label: new Date().getFullYear() - 1,
            backgroundColor: "#7C3AED",
            borderColor: "#7C3AED",
            data: [30, 78, 56, 34, 100, 45, 13, 88, 60, 66, 90, 96],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear(),
            fill: false,
            backgroundColor: "#FCD34D",
            borderColor: "#FCD34D",
            data: [27, 68, 86, 74, 10, 4, 87, 90, 100, 120, 88],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("barChart").getContext("2d");
    new Chart(ctx, config);
  },

  setup() {
    onMounted(() => {
      console.log(document.getElementById("barChart"));
    });
  },
};
</script>
