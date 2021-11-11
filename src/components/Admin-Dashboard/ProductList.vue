<template>
  <div
    v-if="categories && categories.length > 0"
    class="pt-8 px-5 md:px-10 lg:px-16 overflow-auto bg-gray-50"
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
        <p
          @click="handleSwitchingComponent('CategoryList')"
          class="hover:underline cursor-pointer"
        >
          Categories
        </p>
        <p>/</p>
        <p>
          Products
        </p>
      </div>
      <div class="flex justify-between font-bold text-gray-900">
        <div class="text-xl font-serif">
          Products
        </div>
        <div
          v-if="user?.admin || user?.packer"
          @click="handleSwitchingComponent('AddProduct')"
          class="relative bg-yellow-400 opacity-80 py-2 px-6 rounded cursor-pointer hover:opacity-100"
        >
          New Product
        </div>
      </div>
    </div>

    <div
      class="relative shadow border border-gray-300 bg-white rounded min-w-tablet max-h-itemList overflow-auto"
    >
      <div class="relative p-5">
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
          @input="handleSearchProduct"
          type="search"
          v-model="searching"
          placeholder="Search for products"
          class="border-2 border-gray-200 w-full rounded pl-9 py-2 px-3 focus:outline-none focus:shadow focus:border-gray-300"
        />
      </div>
      <div
        class="grid grid-cols-12 gap-4 font-bold border-b border-t px-7 py-3 rounded-t border-gray-200"
      >
        <div class="col-span-5">
          Product
        </div>

        <div class="col-span-2">
          Category
        </div>

        <div class="col-span-2">
          Stock
        </div>

        <div class="col-span-2 text-center">
          Price
        </div>
      </div>

      <div v-if="allProducts && allProducts.length > 0">
        <div
          v-for="(item, i) in allProducts"
          :key="item.id"
          v-show="i >= start && i < end"
          class="grid grid-cols-12 gap-4 border-b items-center border-gray-200 pl-10 pr-7 py-3 font-medium text-gray-700"
        >
          <div class="col-span-5 flex">
            <div>
              <img
                class="w-8 h-6 object-cover object-center transform -translate-x-3 translate-y-2 scale-150"
                :src="item.images[0].url"
              />
            </div>
            <div class="capitalize tracking-wide">
              <p>{{ item.name }}</p>
              <p class="text-xs text-gray-400 font-normal leading-3">
                Code: {{ item.code }}
              </p>
            </div>
          </div>
          <div class="col-span-2 capitalize tracking-wide">
            {{ item.categoryName }}
          </div>
          <div class="col-span-2">
            <p
              v-if="item.status?.toLowerCase() == 'in stock'"
              class=" inline-block bg-green-500 text-green-500 bg-opacity-40 px-3 rounded text-sm capitalize"
            >
              in stock
            </p>
            <p
              v-else
              class="inline-block bg-red-500 text-red-500 bg-opacity-30 px-3 rounded text-sm capitalize"
            >
              out of stock
            </p>
          </div>
          <div class="col-span-2 text-center">${{ item.price }}</div>
          <div class="relative flex justify-end">
            <a
              href="#"
              class="cursor-pointer p-1"
              :class="{ activeActionModal: activeModals[i].active }"
            >
              <svg
                @click="toggleAction(i)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </a>

            <div
              v-if="user?.admin || user?.packer"
              class="absolute top-4 right-0 border border-gray-300 bg-white h-24 w-10 text-base z-40 py-2 list-none text-left rounded shadow mt-3"
              :class="{
                hidden: !activeModals[i].active,
              }"
              style="min-width: 12rem"
            >
              <a
                @click="handleSwitchingComponent('AddProduct', item)"
                href="#edit"
                class="flex items-center space-x-3 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
              >
                <i class="fas fa-pen"></i>
                <p>Edit</p>
              </a>
              <a
                @click="
                  handleSwitchingComponent('DeleteProductConfirmation', item)
                "
                href="#remove"
                class="flex items-center space-x-3 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
              >
                <i class="fas fa-trash"></i>
                <p>Remove</p>
              </a>
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
            @click="handlePrevious(allProducts.length)"
            :class="{ frozen: start <= 0 }"
            :disabled="start <= 0"
            class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
          >
            previous
          </button>
          <div class="flex items-center space-x-1">
            <ul
              v-for="i in Math.ceil(allProducts.length / limitedPerPage)"
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
            @click="handleNext(allProducts.length)"
            :class="{
              frozen: end >= Math.ceil(allProducts.length),
            }"
            :disabled="end >= Math.ceil(allProducts.length)"
            class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
          >
            Next
          </button>
        </div>

        <div class="flex space-x-1 items-center">
          <p class="font-medium">
            Showing {{ pageFrom }} to {{ pageTo }} of {{ allProducts.length }} /
            Row per page
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
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  props: ["category"],
  setup(props, { emit }) {
    const indexActive = ref(1);
    const limitedPerPage = ref(10);
    const start = ref(0);
    const end = ref(limitedPerPage.value);
    const previous = ref(1);
    const next = ref(5);
    const pageFrom = ref(1);
    const pageTo = ref(end.value);

    const activeModals = ref([]);

    const allProducts = ref([]);
    const cloneAllProducts = ref([]);
    const searching = ref(null);

    const { user } = getUser();
    const { documents: categories } = getCollection("inventory");

    if (props.category) {
      //navigate from category list
      const category = props.category;
      const { documents: products } = getDocument(
        "inventory",
        category.id,
        "products"
      );
      watch(products, () => {
        products.value.forEach((item, i) => {
          item.categoryName = category.name;
          allProducts.value.push(item);
          cloneAllProducts.value.push(item);
          activeModals.value.push({ active: false });
        });
      });
    } else {
      //directly to product list
      watch(categories, () => {
        categories.value.forEach((category, index) => {
          const { documents: products } = getDocument(
            "inventory",
            category.id,
            "products"
          );
          watch(products, () => {
            products.value.forEach((item, i) => {
              item.categoryName = category.name;
              allProducts.value.push(item);
              cloneAllProducts.value.push(item);
              activeModals.value.push({ active: false });
            });
          });
        });
        // getAllProducts(categories);
      });
    }

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
      if (pageTo.value >= allProducts.value.length)
        pageTo.value = allProducts.value.length;
      else {
        pageTo.value = end.value;
      }
    });

    const handleSwitchingComponent = (component, category) => {
      emit("onSwitchingComponent", component, category);
    };

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

    const handleSearchProduct = () => {
      if (searching.value) {
        limitedPerPage.value = limitedPerPage.value || 10;
        allProducts.value = cloneAllProducts.value;

        const results = [];
        allProducts.value.forEach((product) => {
          if (
            product.name.toLowerCase().includes(searching.value.toLowerCase())
          ) {
            results.push(product);
          } else {
            allProducts.value = [];
          }
        });

        if (results.length > 0) {
          allProducts.value = results;
          end.value = parseInt(limitedPerPage.value);
          start.value = 0;
          pageTo.value = end.value;
          pageFrom.value = 1;
          previous.value = 1;
          next.value = 5;
          indexActive.value = 1;
        }

        // if there is not records assgin limit page to 0
        if (allProducts.value.length <= 0) {
          limitedPerPage.value = 0;
        }
      } else {
        allProducts.value = cloneAllProducts.value;
        limitedPerPage.value = 10;
      }
    };

    const toggleAction = (i) => {
      if (activeModals.value[i].active) {
        activeModals.value[i].active = false;
      } else {
        for (let index in activeModals.value) {
          if (index == i) {
            activeModals.value[index].active = true;
          } else {
            activeModals.value[index].active = false;
          }
        }
      }
    };

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
      allProducts,
      searching,
      activeModals,
      toggleAction,
      handleSwitchingComponent,
      handlePrevious,
      handleNext,
      handleSearchProduct,
    };
  },
};
</script>

<style></style>
