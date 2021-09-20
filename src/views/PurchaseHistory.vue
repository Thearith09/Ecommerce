<template>
  <div class="flex flex-col h-screen w-full">
    <div>
      <Navbar />
    </div>

    <div
      class="mb-auto h-auto px-10 lg:px-0 w-full lg:w-3/4 2xl:w-7/12 mx-auto"
    >
      <div class="bg-yellow-300">
        <h1
          class="text-gray-700 font-bold px-2 py-3 my-10 lg:my-16 text-xl lg:text-4xl font-serif tracking-wider"
        >
          Purchas History
        </h1>
      </div>
      <div v-if="purchasedHistories?.length > 0">
        <div class="pb-5">
          <div
            v-if="windowWidth >= 768"
            class="flex items-center text-purple-700 font-semibold h-12 p-2 bg-purple-100"
          >
            <div class="w-1/3"></div>
            <div class="w-3/4">Purchase ID</div>

            <div class="w-full">
              Date
            </div>

            <div class="w-2/4 md:w-full leading-none">
              Total Amount
            </div>

            <div class="w-full leading-none">
              Payment Method
            </div>

            <div class="w-full"></div>
          </div>

          <div
            v-for="(purchase, i) in purchasedHistories"
            :key="i"
            v-show="i >= previous && i < next"
          >
            <div
              v-if="windowWidth >= 768"
              class="flex items-center text-gray-700 px-3 py-5 h-auto bg-white border-b-2 border-purple-100 transform transition hover:translate-x-1"
            >
              <div class="w-1/3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-purple-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
              </div>

              <div class="w-3/4">
                {{
                  purchase.id.substring(
                    purchase.id.length - 5,
                    purchase.id.length
                  )
                }}
              </div>

              <div class="w-full">
                {{ date(purchase.createdAt.toDate()).format("dddd MMM, YYYY") }}
              </div>

              <div class="w-2/4 md:w-full text-purple-700 font-bold">
                $ {{ purchase.amount }}
              </div>

              <div class="w-full flex items-center">
                <div>{{ purchase.paymentMethod.brand }}</div>
                <div>****{{ purchase.paymentMethod.last4 }}</div>
              </div>

              <div class="w-full">
                <button
                  @click="handleInvoice(purchase)"
                  class="focus:outline-none py-1 px-10 lg:px-14 rounded border-2 border-purple-100 text-purple-700 hover:text-purple-900 hover:border-purple-400"
                >
                  invoice
                </button>
              </div>
            </div>

            <div v-else class="space-y-1 text-gray-700">
              <fieldset class="border-2 border-purple-100 rounded p-2">
                <legend class="text-xs text-purple-700">
                  {{
                    date(purchase.createdAt.toDate()).format("dddd MMM, YYYY")
                  }}
                </legend>
                <div
                  class="grid grid-cols-3 items-center bg-purple-100 text-purple-700 font-semibold p-2"
                >
                  <div>Purchase ID</div>
                  <div>Amount</div>
                  <div class="">Payment Method</div>
                </div>

                <div class="grid grid-cols-3 items-center p-2">
                  <div class="w-full">
                    {{
                      purchase.id.substring(
                        purchase.id.length - 5,
                        purchase.id.length
                      )
                    }}
                  </div>

                  <div class="w-full text-purple-700 font-bold">
                    ${{ purchase.amount }}
                  </div>

                  <div class="w-full flex items-center">
                    <div>{{ purchase.paymentMethod.brand }}</div>
                    <div>****{{ purchase.paymentMethod.last4 }}</div>
                  </div>
                </div>

                <div class="w-full py-1">
                  <button
                    @click="handleInvoice(purchase)"
                    class="focus:outline-none py-1 w-full rounded border-2 border-purple-100 text-purple-700 hover:text-purple-900 hover:border-purple-400"
                  >
                    invoice
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div v-if="purchasedHistories?.length <= 0">
        <div
          class="flex flex-col items-center space-y-5 border-b-2 border-t-2 border-purple-100 py-10"
        >
          <router-link
            :to="{ name: 'Home' }"
            class="shadow rounded-full p-3 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-purple-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
          </router-link>
          <div>
            <div class="text-gray-400">
              You don't have any product purchases.
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="purchasedHistories?.length > 0"
        class="flex justify-center items-center mb-5 md:mt-5 w-1/4 mx-auto space-x-2"
      >
        <button
          @click="handlePrevious(purchasedHistories.length)"
          :class="{ frozen: previous <= 0 }"
          :disabled="previous <= 0"
          class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-purple-700 text-purple-700 flex justify-center hover:text-purple-900 items-center"
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
            v-for="i in Math.ceil(purchasedHistories.length / 5)"
            :key="i"
            v-show="i >= start && i <= end"
            class="flex items-center px-2 text-purple-700 font-bold lg:text-lg"
          >
            <li class="px-1" :class="{ activePaginate: i == indexActive }">
              {{ i }}
            </li>
          </ul>
        </div>
        <button
          @click="handleNext(purchasedHistories.length)"
          :class="{ frozen: next >= purchasedHistories.length }"
          :disabled="next >= purchasedHistories.length"
          class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-purple-700 text-purple-700 hover:text-purple-900  flex justify-center items-center"
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

    <div>
      <Footer />
    </div>

    <component
      :is="currentComponent"
      :purchaseInfo="purchaseInfo"
      @close="currentComponent = null"
    />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import getUser from "@/composables/getUser";
import getPurchaseHistory from "@/composables/getPurchaseHistory";
import PrintInvoice from "@/components/PrintInvoice";
import moment from "moment";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    Footer,
    Navbar,
    PrintInvoice,
  },
  setup() {
    const date = moment;
    const purchaseInfo = ref(null);
    const currentComponent = ref(null);
    const start = ref(1);
    const end = ref(5);
    const previous = ref(0);
    const next = ref(5);
    const indexActive = ref(1);
    const windowWidth = ref(window.innerWidth);

    const { user } = getUser();
    const { documents: purchasedHistories } = getPurchaseHistory(
      "reports",
      user.value?.email
    );

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handleInvoice = (purchase) => {
      purchaseInfo.value = purchase;
      currentComponent.value = "PrintInvoice";
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
      handleNext,
      handlePrevious,
      handleInvoice,
      purchasedHistories,
      date,
      windowWidth,
      currentComponent,
      purchaseInfo,
      indexActive,
      start,
      end,
      previous,
      next,
    };
  },
};
</script>
