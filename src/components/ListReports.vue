<template>
  <div class="h-auto bg-white">
    <div v-if="reports?.length > 0">
      <div class="mx-5 sm:mx-10 py-5 md:mb-10">
        <div class="w-10/12 mx-auto">
          <LineChart :date="{ dateFrom, dateTo }" :totals="totals" />
        </div>
      </div>
    </div>

    <div v-if="reports?.length <= 0" class="p-5 lg:p-10 my-5 bg-gray-100">
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
import LineChart from "@/components/LineChart.vue";
import { ref } from "@vue/reactivity";
import { convertToTimestamp } from "@/firebase/config";
import { onMounted, watch } from "@vue/runtime-core";

export default {
  components: {
    LineChart,
  },
  props: ["dateFrom", "dateTo"],
  setup(props, { emit }) {
    const date = moment;
    const start = ref(1);
    const end = ref(10);
    const previous = ref(0);
    const next = ref(1);
    const indexActive = ref(1);
    const total = ref(null);
    const totals = ref([]);
    const months = ref([]);
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
      const from = new Date(props.dateFrom).getUTCMonth();
      const to = new Date(props.dateTo).getUTCMonth();
      for (let i = from; i <= to; i++) {
        months.value.push(i);
        totals.value.push({
          month: i,
          total: 0,
        });
      }
      console.log(months.value);
      reports?.value.forEach((doc) => {
        const month = doc.createdAt.toDate().getUTCMonth();
        for (let i in months.value) {
          if (totals.value[i].month == month) {
            totals.value[i].total += doc.amount;
          }
        }
        total.value += doc.amount;
      });

      console.log(totals.value);
      emit("responseData");
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
      totals,
      months,
      windowWidth,
    };
  },
};
</script>

<style></style>
