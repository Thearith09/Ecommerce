<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto 2xl:w-3/4 2xl:mx-auto bg-gray-50">
      <div class="mx-5 my-5 h-auto">
        <component
          :is="currentComponent"
          :name="id"
          :key="id"
          :previous="previous"
          :next="next"
          @emitProducts="handleReceiveBack"
        />

        <div
          v-if="products && products.length > 0"
          class="flex justify-center items-center mt-10 w-1/4 mx-auto space-x-2"
        >
          <button
            @click="handlePrevious(products.length)"
            :class="{ frozen: previous <= 0 }"
            :disabled="previous <= 0"
            class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-blue-600 text-blue-600 flex justify-center hover:text-blue-700 items-center"
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
              v-for="i in Math.ceil(products.length / 5)"
              :key="i"
              v-show="i >= start && i <= end"
              class="flex items-center px-2 text-blue-600 font-bold lg:text-lg"
            >
              <li class="px-1" :class="{ activePaginate: i == indexActive }">
                {{ i }}
              </li>
            </ul>
          </div>
          <button
            @click="handleNext(products.length)"
            :class="{ frozen: next >= products.length }"
            :disabled="next >= products.length"
            class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-blue-600 text-blue-600 hover:text-blue-700 flex justify-center items-center"
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
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ListProducts from "@/components/ListProducts.vue";
import { ref } from "@vue/reactivity";

export default {
  props: ["id"],
  components: {
    Navbar,
    Footer,
    ListProducts,
  },
  setup(props) {
    const products = ref(null);
    const start = ref(1);
    const end = ref(5);
    const previous = ref(0);
    const next = ref(5);
    const indexActive = ref(1);
    console.log(props.id);
    const currentComponent = ref("ListProducts");

    const handleReceiveBack = (prods) => {
      products.value = prods;
    };

    const handleNext = (limitedIncrement) => {
      limitedIncrement = Math.ceil(limitedIncrement / 5);
      if (end.value < limitedIncrement) {
        start.value++;
        end.value++;
      }

      next.value += 5;
      previous.value += 5;

      indexActive.value++;
    };

    const handlePrevious = (limitedDecrement) => {
      limitedDecrement = Math.ceil(limitedDecrement / 5);
      if (end.value > 5) {
        start.value--;
        end.value--;
      }

      next.value -= 5;
      previous.value -= 5;

      indexActive.value--;
    };

    return {
      currentComponent,
      handleReceiveBack,
      products,
      start,
      end,
      indexActive,
      previous,
      next,
      handleNext,
      handlePrevious,
    };
  },
};
</script>

<style></style>
