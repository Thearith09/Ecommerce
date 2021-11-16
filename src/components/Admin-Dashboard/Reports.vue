<template>
  <div class="pt-8 px-5 md:px-10 lg:px-16 overflow-auto bg-gray-50">
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 text-sm font-medium pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          {{ $t("Dashboard") }}
        </p>
        <p>/</p>
        <p>
          {{ $t("Reports") }}
        </p>
      </div>
      <div class="flex justify-between items-center font-bold text-gray-900 ">
        <div class="text-xl font-serif ">
          {{ $t("Reports") }}
        </div>

        <div class="flex space-x-5">
          <div
            @click="handleExportToExcel"
            class="relative bg-yellow-400 opacity-80 py-2 px-6 rounded cursor-pointer hover:opacity-100"
          >
            {{ $t("Export to Excel") }}
          </div>
          <div
            @click="handleExportToPDF"
            class="relative bg-yellow-400 opacity-80 py-2 px-6 rounded cursor-pointer hover:opacity-100"
          >
            {{ $t("Export to PDF") }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative shadow border border-gray-300 bg-white rounded min-w-tablet max-h-itemList overflow-auto"
    >
      <div class="relative p-5 flex items-center space-x-3">
        <div class="w-40">
          <label class="block text-sm font-bold">Date</label>
          <select
            @change="handleFilterByDate"
            v-model="byDate"
            class="form-select px-2 py-1 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
          >
            <option value="select" selected disabled hidden>select</option>
            <option
              v-for="date in dates"
              :key="date"
              :selected="date"
              :value="date"
            >
              {{ date }}
            </option>
          </select>
        </div>

        <div class="w-40">
          <label class="block text-sm font-bold">Staff</label>
          <select
            @change="handleFilterByStaff"
            v-model="byStaff"
            class="form-select px-2 py-1 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
          >
            <option value="select" selected disabled hidden>select</option>
            <option v-for="staff in employees" :key="staff" :value="staff">
              <p>{{ staff }}</p>
            </option>
          </select>
        </div>

        <div class="w-40">
          <label class="block text-sm font-bold">Category</label>
          <select
            @change="handleFilterByCategory"
            v-model="byCategory"
            class="form-select px-2 py-1 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
          >
            <option value="select" selected disabled hidden>select</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              <p>{{ category }}</p>
            </option>
          </select>
        </div>

        <div class="w-40">
          <label class="block text-sm font-bold">Item Code</label>
          <select
            @change="handleFilterByCode"
            v-model="byCode"
            class="form-select px-2 py-1 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
          >
            <option value="select" selected disabled hidden>select</option>
            <option v-for="code in itemCodes" :key="code" :value="code">
              <p>{{ code }}</p>
            </option>
          </select>
        </div>
      </div>
      <div
        class="grid grid-cols-12 gap-4 font-bold border-b border-t px-7 py-3 border-gray-200"
      >
        <div class="col-span-2">
          Item
        </div>

        <div class="col-span-2">
          Category
        </div>

        <div class="col-span-2">
          Staff
        </div>

        <div class="col-span-1">
          Qtys
        </div>

        <div class="col-span-1 text-right">
          Discounts
        </div>
        <div class="col-span-2 text-right">
          Gross Sales
        </div>
        <div class="col-span-2 text-right">
          Net Salse
        </div>
      </div>

      <div v-if="items && items.length > 0">
        <div
          v-for="(item, i) in items"
          :key="item.id"
          v-show="i >= start && i < end"
          class="grid grid-cols-12 gap-4 border-b items-center border-gray-200 px-7 py-3 font-medium text-gray-700"
        >
          <div class="col-span-2 capitalize tracking-wide">
            <p>{{ item.name }}</p>
            <p class="text-xs text-gray-400 font-normal leading-3">
              Code: {{ item.code }}
            </p>
          </div>
          <div class="col-span-2 capitalize tracking-wide">
            {{ item.categoryName }}
          </div>
          <div class="col-span-2 capitalize tracking-wide">
            {{ item.admin }}
          </div>

          <div class="col-span-1 capitalize tracking-wide">
            {{ item.qty }}
          </div>

          <div class="col-span-1 capitalize tracking-wide text-right">
            ${{ item.discount }}
          </div>

          <div class="col-span-2 capitalize tracking-wide text-right">
            ${{ item.amount + item.discount }}
          </div>

          <div class="col-span-2 capitalize tracking-wide text-right">
            ${{ item.amount }}
          </div>
        </div>
      </div>

      <div v-else class="border-b-2 border-gray-200 py-3">
        <h1 class="text-gray-700 font-semibold text-center">
          No matching records found!
        </h1>
      </div>

      <div class="h-20 flex justify-between items-center px-5">
        <div class="flex space-x-1">
          <button
            @click="handlePrevious(items.length)"
            :class="{ frozen: start <= 0 }"
            :disabled="start <= 0"
            class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
          >
            previous
          </button>
          <div class="flex items-center space-x-1">
            <ul
              v-for="i in Math.ceil(items.length / limitedPerPage)"
              :key="i"
              v-show="i >= previous && i <= next"
              class="flex items-center text-gray-900 font-bold bg-gray-100"
            >
              <li
                class="rounded px-3 py-1"
                :class="{ activePaginateForAdminPage: i == indexActive }"
              >
                {{ i }}
              </li>
            </ul>
          </div>

          <button
            @click="handleNext(items.length)"
            :class="{
              frozen: end >= Math.ceil(items.length),
            }"
            :disabled="end >= Math.ceil(items.length)"
            class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
          >
            Next
          </button>
        </div>

        <div class="flex space-x-1 items-center">
          <p class="font-medium">
            Showing {{ pageFrom }} to {{ pageTo }} of {{ items.length }} / Row
            per page
          </p>
          <select
            class="form-select bg-white border border-gray-200 cursor-pointer text-gray-700 px-3 py-2 focus:outline-none rounded"
            v-model="limitedPerPage"
          >
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import getCollection from "@/composables/getCollection";
import { ref } from "@vue/reactivity";
import moment from "moment";
import { watch } from "@vue/runtime-core";
export default {
  setup(props, { emit }) {
    const doc = new jsPDF();
    const date = moment;
    const dates = ref([]);
    const categories = ref([]);
    const employees = ref([]);
    const itemCodes = ref([]);
    const items = ref([]);
    const itemClones = ref([]);
    const itemsPrint = ref([]);

    const byDate = ref("select");
    const byStaff = ref("select");
    const byCategory = ref("select");
    const byCode = ref("select");

    const indexActive = ref(1);
    const limitedPerPage = ref(10);
    const start = ref(0);
    const end = ref(limitedPerPage.value);
    const previous = ref(1);
    const next = ref(5);
    const pageFrom = ref(1);
    const pageTo = ref(end.value);

    const { documents: reports } = getCollection("reports");

    watch(limitedPerPage, () => {
      end.value = parseInt(limitedPerPage.value);
      start.value = 0;
      pageTo.value = end.value;
      pageFrom.value = 1;
      previous.value = 1;
      next.value = 5;
      indexActive.value = 1;
    });

    watch(pageTo, () => {
      if (pageTo.value >= items.value.length) pageTo.value = items.value.length;
      else {
        pageTo.value = end.value;
      }
    });

    watch(reports, () => {
      reports.value?.forEach((report, i) => {
        if (dates.value.length > 0) {
          const dateExists = dates.value.some(
            (doc) =>
              doc == date(report.createdAt.toDate()).format("MMM d, YYYY")
          );
          if (!dateExists) {
            dates.value.push(
              date(report.createdAt.toDate()).format("MMM d, YYYY")
            );
          }
          const staffExists = employees.value.some(
            (doc) => doc == report.admin
          );

          if (!staffExists) {
            employees.value.push(report.admin);
          }
        } else {
          dates.value.push(
            date(report.createdAt.toDate()).format("MMM d, YYYY")
          );
          employees.value.push(report.admin);
        }

        report.items.forEach((doc) => {
          if (items.value.length <= 0) {
            itemCodes.value.push(doc.code);
            categories.value.push(doc.categoryName);

            items.value.push({
              categoryName: doc.categoryName,
              name: doc.name,
              code: doc.code,
              admin: report.admin,
              amount: report.amount,
              discount: (report.amount * doc.discount) / 100,
              qty: doc.qty,
              date: date(report.createdAt.toDate()).format("MMM d, YYYY"),
            });

            // for pdf and excel
            itemsPrint.value.push({
              name: doc.name,
              date: date(report.createdAt.toDate()).format("MMM d, YYYY"),
              category: doc.categoryName,
              staff: report.admin,
              client: report.shippingInfo.name,
              qtys: doc.qty,
              discounts: (report.amount * doc.discount) / 100,
              grossSales: report.amount - (report.amount * doc.discount) / 100,
              netSales: report.amount,
            });
          } else {
            let index = items.value.findIndex((item) => item.name == doc.name);

            if (index != -1) {
              items.value[index].amount += report.amount;
              items.value[index].discount +=
                (report.amount * doc.discount) / 100;
              items.value[index].qty += doc.qty;

              // for pdf and excel
              itemsPrint.value[index].netSales += report.amount;
              itemsPrint.value[index].discounts +=
                (report.amount * doc.discount) / 100;
              itemsPrint.value[index].grossSales +=
                report.amount - (report.amount * doc.discount) / 100;
              itemsPrint.value[index].qtys += doc.qty;
            } else {
              if (categories.value.length > 0) {
                const codeExist = itemCodes.value.some(
                  (cod) => cod == doc.code
                );

                if (!codeExist) {
                  itemCodes.value.push(doc.code);
                }

                const categoryExist = categories.value.some(
                  (cate) => cate == doc.categoryName
                );

                if (!categoryExist) {
                  categories.value.push(doc.categoryName);
                }
              } else {
                itemCodes.value.push(doc.code);
                categories.value.push(doc.categoryName);
              }

              items.value.push({
                categoryName: doc.categoryName,
                name: doc.name,
                code: doc.code,
                admin: report.admin,
                amount: report.amount,
                discount: (report.amount * doc.discount) / 100,
                qty: doc.qty,
                date: date(report.createdAt.toDate()).format("MMM d, YYYY"),
              });

              itemsPrint.value.push({
                name: doc.name,
                date: date(report.createdAt.toDate()).format("MMM d, YYYY"),
                category: doc.categoryName,
                staff: report.admin,
                client: report.shippingInfo.name,
                qtys: doc.qty,
                discounts: (report.amount * doc.discount) / 100,
                grossSales:
                  report.amount - (report.amount * doc.discount) / 100,
                netSales: report.amount,
              });
            }
          }
        });
      });

      itemClones.value = items.value;
    });

    const handlePrevious = async (limitedDecrement) => {
      limitedDecrement = Math.ceil(limitedDecrement / limitedPerPage.value);
      if (next.value > 10) {
        next.value--;
        previous.value--;
      }
      start.value -= parseInt(limitedPerPage.value);
      end.value -= parseInt(limitedPerPage.value);

      pageFrom.value -= parseInt(limitedPerPage.value);
      pageTo.value -= parseInt(limitedPerPage.value);

      indexActive.value--;
    };

    const handleNext = async (limitedIncrement) => {
      limitedIncrement = Math.ceil(limitedIncrement / limitedPerPage.value);
      if (next.value < limitedIncrement) {
        next.value++;
        previous.value++;
      }

      start.value += parseInt(limitedPerPage.value);
      end.value += parseInt(limitedPerPage.value);

      pageFrom.value += parseInt(limitedPerPage.value);
      pageTo.value += parseInt(limitedPerPage.value);

      indexActive.value++;
    };

    const handleFilterByDate = () => {
      items.value = itemClones.value;
      items.value = items.value.filter((item) => item.date == byDate.value);

      byStaff.value = "select";
      byCategory.value = "select";
      byCode.value = "select";
    };

    const handleFilterByStaff = () => {
      items.value = itemClones.value;
      items.value = items.value.filter((item) => item.admin == byStaff.value);

      byDate.value = "select";
      byCategory.value = "select";
      byCode.value = "select";
    };

    const handleFilterByCategory = () => {
      items.value = itemClones.value;
      items.value = items.value.filter(
        (item) => item.categoryName == byCategory.value
      );

      byDate.value = "select";
      byStaff.value = "select";
      byCode.value = "select";
    };

    const handleFilterByCode = () => {
      items.value = itemClones.value;
      items.value = items.value.filter((item) => item.code == byCode.value);

      byDate.value = "select";
      byStaff.value = "select";
      byCategory.value = "select";
    };

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
    };

    const handleExportToPDF = () => {
      if (items.value?.length > 0) {
        doc.autoTable({
          theme: "grid",
          styles: { font: "courier", fontStyle: "bold", fontSize: 8 },
          headStyles: { fillColor: [109, 40, 217] },
          alternateRowStyles: { fillColor: [245, 243, 255] },
          pageBreak: "avoid",
          head: [
            [
              "No",
              "Item",
              "Date",
              "Category",
              "Staff",
              "Client",
              "Qty",
              "OFF",
              "Gross Sales",
              "Net Sales",
            ],
          ],
          body: flatArray(itemsPrint.value),
        });
        doc.save(`sales-report-${date().format("MM.d.YYYY")}.pdf`);
      }
    };

    const handleExportToExcel = () => {
      import("@/composables/export2Excel").then((excel) => {
        const tHeader = [
          "Item",
          "Date",
          "Category",
          "Staff",
          "Client",
          "Qty",
          "OFF",
          "Gross Sales",
          "Net Sales",
        ];
        const filterVal = [
          "name",
          "date",
          "category",
          "staff",
          "client",
          "qtys",
          "discounts",
          "grossSales",
          "netSales",
        ];
        const data = formatJson(filterVal, itemsPrint.value);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `sales-report-${date().format("MM.d.YYYY")}`,
          autoWidth: true,
          bookType: "xlsx",
        });
      });
    };

    function formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }

    function flatArray(array) {
      const result = [];
      let i = 1;
      for (let arr of array) {
        const newArr = [];

        for (let [key, value] of Object.entries(arr)) {
          if (key != "qtys" && typeof value == "number") {
            newArr.push(`$${value.toFixed(2)}`);
          } else {
            newArr.push(value);
          }
        }

        newArr.unshift(i);
        i++;
        result.push(newArr);
      }

      return result;
    }

    return {
      handleExportToExcel,
      handleExportToPDF,
      handleSwitchingComponent,
      handleFilterByDate,
      handleFilterByStaff,
      handleFilterByCategory,
      handleFilterByCode,
      handlePrevious,
      handleNext,
      reports,
      items,
      dates,
      itemCodes,
      employees,
      categories,
      byDate,
      byStaff,
      byCategory,
      byCode,
      start,
      end,
      previous,
      next,
      indexActive,
      limitedPerPage,
      pageFrom,
      pageTo,
      itemsPrint,
    };
  },
};
</script>

<style></style>
