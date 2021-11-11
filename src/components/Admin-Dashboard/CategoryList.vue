<template>
  <div
    v-if="categories && categories.length > 0"
    class="pt-8 px-5 md:px-10 lg:px-16 mx-auto overflow-auto"
  >
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 text-sm font-medium pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          Dashboard
        </p>
        <p>/</p>
        <p>
          Categories
        </p>
      </div>
      <div class="flex justify-between font-bold text-gray-900">
        <div class="text-xl font-serif ">
          Categories
        </div>
        <div
          v-if="user?.admin || user?.packer"
          @click="handleSwitchingComponent('AddCategory')"
          class="relative bg-yellow-400 opacity-80 py-2 px-6 rounded  cursor-pointer hover:opacity-100"
        >
          New Category
        </div>
      </div>
    </div>

    <div
      class="relative shadow bg-white rounded border border-gray-300 min-w-miniTablet max-h-itemList overflow-auto"
    >
      <div class="relative p-5 ">
        <span class="absolute top-6 pl-3 py-2"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            /></svg
        ></span>
        <input
          @input="handleSearchCategory"
          type="search"
          v-model="searching"
          placeholder="Search for categories"
          class="border-2 border-gray-200 w-full rounded pl-9 py-2 px-3 focus:outline-none focus:shadow focus:border-gray-300"
        />
      </div>
      <div
        class="grid grid-cols-4 gap-4 font-bold border-b border-t px-7 py-3 rounded-t border-gray-200"
      >
        <div class="w-full col-span-2">
          Name
        </div>

        <div class="w-full">
          Products
        </div>

        <div class="flex justify-center">
          Actions
        </div>
      </div>

      <div v-if="productList && productList.length > 0">
        <div
          v-for="(category, i) in productList"
          :key="category.id"
          v-show="i >= start && i < end"
        >
          <div
            class="grid grid-cols-4 gap-4 text-gray-500 items-center font-medium px-7 py-3 h-auto bg-white border-b border-gray-200"
          >
            <div
              @click="handleSwitchingComponent('ProductList', category)"
              class="col-span-2 cursor-pointer hover:underline capitalize"
            >
              {{ category.name }}
            </div>

            <div
              @click="handleSwitchingComponent('ProductList', category)"
              class="cursor-pointer hover:underline"
            >
              {{ category.products.length }}
            </div>

            <div
              v-if="user?.admin || user?.packer"
              class="flex justify-center space-x-1"
            >
              <div
                @click="handleSwitchingComponent('AddCategory', category)"
                class="flex justify-center hover:text-blue-600 hover:bg-purple-100 cursor-pointer"
              >
                <i class="fas fa-pen p-3 rounded"></i>
              </div>

              <div
                @click="
                  handleSwitchingComponent(
                    'DeleteCategoryConfirmation',
                    category
                  )
                "
                class="flex justify-center hover:text-red-600 hover:bg-purple-100 cursor-pointer"
              >
                <i class="fas fa-trash p-3 rounded"></i>
              </div>
            </div>

            <div
              v-else
              class="flex justify-center font-bold text-xl text-gray-900"
            >
              ...
            </div>
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
            @click="handlePrevious(categories.length)"
            :class="{ frozen: start <= 0 }"
            :disabled="start <= 0"
            class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
          >
            previous
          </button>
          <div class="flex items-center space-x-1">
            <ul
              v-for="i in Math.ceil(categories.length / limitedPerPage)"
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
            @click="handleNext(categories.length)"
            :class="{
              frozen: end >= Math.ceil(categories.length),
            }"
            :disabled="end >= Math.ceil(categories.length)"
            class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
          >
            Next
          </button>
        </div>

        <div class="flex space-x-1 items-center">
          <p class="font-medium">
            Showing {{ pageFrom }} to {{ pageTo }} of {{ productList.length }} /
            Row per page
          </p>
          <select
            class="form-select bg-white border border-gray-200 cursor-pointer  text-gray-700 px-3 py-1 focus:outline-none rounded"
            v-model="limitedPerPage"
          >
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  setup(props, { emit }) {
    const indexActive = ref(1);
    const limitedPerPage = ref(5);
    const start = ref(0);
    const end = ref(limitedPerPage.value);
    const previous = ref(1);
    const next = ref(5);
    const pageFrom = ref(1);
    const pageTo = ref(end.value);

    const productList = ref([]);
    const cloneProductList = ref([]);
    const searching = ref(null);

    const { user } = getUser();
    const { documents: categories } = getCollection("inventory");

    watch(categories, () => {
      categories.value.forEach((category, i) => {
        const { documents } = getDocument("inventory", category.id, "products");
        watch(documents, () => {
          if (documents.value?.length > 0) {
            cloneProductList.value.push({
              products: documents.value || [],
              name: category.name,
              id: category.id,
              url: category.url,
            });
          } else {
            cloneProductList.value.push({
              products: [],
              name: category.name,
              id: category.id,
              url: category.url,
            });
          }
        });
      });
      getAllProducts(categories);
    });

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
      if (pageTo.value >= categories.value.length)
        pageTo.value = categories.value.length;
      else {
        pageTo.value = end.value;
      }
    });

    const handleSwitchingComponent = (component, category) => {
      emit("onSwitchingComponent", component, category);
    };

    const handlePrevious = async (limitedDecrement) => {
      limitedDecrement = Math.ceil(limitedDecrement / limitedPerPage.value);
      if (next.value > 5) {
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

    const handleSearchCategory = () => {
      if (searching.value) {
        // the value of limit page at least 5 or
        // its current value depends on the result of of seaching
        // and the value productList must be set to the original value
        // if it has no records and the search box still has values
        limitedPerPage.value = limitedPerPage.value || 5;
        productList.value = cloneProductList.value;

        const results = [];
        productList.value.forEach((category) => {
          if (
            category.name.toLowerCase().includes(searching.value.toLowerCase())
          ) {
            results.push(category);
          } else {
            productList.value = [];
          }
        });

        if (results.length > 0) {
          productList.value = results;
          end.value = parseInt(limitedPerPage.value);
          start.value = 0;
          pageTo.value = end.value;
          pageFrom.value = 1;
          previous.value = 1;
          next.value = 5;
          indexActive.value = 1;
        }

        // if there is not records assgin limit page to 0
        if (productList.value.length <= 0) {
          limitedPerPage.value = 0;
        }
      } else {
        getAllProducts(categories);
      }
    };

    function getAllProducts(categories) {
      // restart limit page to default value
      // and cleer productList before assigning value to it
      // after clearing the search box
      limitedPerPage.value = 5;
      productList.value = [];

      categories.value.forEach((category, i) => {
        const { documents } = getDocument("inventory", category.id, "products");
        watch(documents, () => {
          if (documents.value?.length > 0) {
            productList.value.push({
              products: documents.value,
              name: category.name,
              id: category.id,
              url: category.url,
            });
          } else {
            productList.value.push({
              products: [],
              name: category.name,
              id: category.id,
              url: category.url,
            });
          }
        });
      });
    }

    return {
      user,
      indexActive,
      limitedPerPage,
      start,
      end,
      previous,
      next,
      pageFrom,
      pageTo,
      categories,
      productList,
      searching,
      handleSwitchingComponent,
      handlePrevious,
      handleNext,
      handleSearchCategory,
    };
  },
};
</script>

<style></style>
