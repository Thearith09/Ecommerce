<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>
    <div class="mb-auto 2xl:w-3/4 2xl:mx-auto">
      <div v-if="id != 'null'">
        <component
          :is="currentComponent"
          :name="id"
          :search="search"
          :previous="previous"
          :next="next"
          :animate="animate"
          :key="id"
          @close="handleClose"
          @emitProducts="handleReceiveBack"
        />

        <div
          v-if="items"
          class="flex justify-center items-center my-5 w-1/4 mx-auto space-x-2"
        >
          <button
            @click="handlePrevious(items.length)"
            :class="{ frozen: previous <= 0 }"
            :disabled="previous <= 0"
            class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-purple-700 text-purple-700 flex justify-center hover:text-purple-900 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 lg:h-9 lg:w-9"
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
              v-for="i in Math.ceil(items.length / 5)"
              :key="i"
              v-show="i >= start && i <= end"
              class="flex items-center px-2 text-purple-700 font-bold lg:text-lg"
            >
              <li :class="{ activePaginate: i == indexActive }">{{ i }}</li>
            </ul>
          </div>
          <button
            @click="handleNext(items.length)"
            :class="{ frozen: next >= items.length }"
            :disabled="next >= items.length"
            class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-purple-700 text-purple-700 hover:text-purple-900 flex justify-center items-center"
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
      <div class="p-10 my-10" v-else>
        <h1 class="text-gray-700 font-bold text-2xl mb-5">
          Sorry, we couldn't find any products for "{{ search }}"
        </h1>
        <h3 class="text-gray-700 font-bold text-xl mb-3">
          Here are some tips, you could follow:
        </h3>
        <ul class="list-disc px-5 text-gray-700 text-lg">
          <li>Make sure all words are spelled correctly</li>
          <li>Try different products</li>
          <li>Only english language searching</li>
        </ul>
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
  components: {
    Navbar,
    Footer,
    ListProducts,
  },
  emits: ["emitProducts"],
  props: ["id", "search"],
  setup() {
    const start = ref(1);
    const end = ref(5);
    const previous = ref(0);
    const next = ref(5);
    const indexActive = ref(1);
    const items = ref(null);
    const animate = ref(null);
    const currentComponent = ref("ListProducts");

    const handleClose = () => {
      currentComponent.value = "ListProducts";
    };

    const handleReceiveBack = (products) => {
      items.value = products;
    };

    const handleNext = (limitedIncrement) => {
      animate.value = "animate__animated animate__slideInRight animate__faster";

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
      animate.value = "animate__animated animate__slideInLeft  animate__faster";

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
      start,
      end,
      indexActive,
      previous,
      next,
      items,
      currentComponent,
      handleClose,
      handleNext,
      handlePrevious,
      handleReceiveBack,
      animate,
    };
  },
};
</script>

<style></style>
