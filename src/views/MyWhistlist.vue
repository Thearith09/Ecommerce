<template>
  <div class="flex flex-col h-screen w-full">
    <div>
      <Navbar />
    </div>

    <div
      class="mb-auto h-auto px-10 xl:px-0 w-full xl:w-3/4 2xl:w-7/12 mx-auto"
    >
      <div>
        <h1
          class="text-gray-700 font-bold py-5 text-2xl font-serif tracking-wider"
        >
          My Whistlist
        </h1>
      </div>
      <div v-if="myWhistlist?.length > 0">
        <div>
          <div
            v-if="windowWidth >= 640"
            class="grid grid-cols-6 lg:grid-cols-5 items-center text-purple-700 font-semibold h-12 p-2 bg-purple-100"
          >
            <div class="w-full col-span-2">Product name</div>

            <div class="w-full">
              Unit Price
            </div>

            <div class="w-full">
              status
            </div>

            <div class="w-full col-span-2 lg:col-span-1"></div>
          </div>

          <div
            v-for="(item, i) in myWhistlist"
            :key="item.id"
            v-show="i >= previous && i < next"
          >
            <div
              v-if="windowWidth >= 640"
              class="grid grid-cols-6 lg:grid-cols-5 items-center sm:mb-5 md:mb-0 text-gray-700 px-3 py-5 h-auto bg-white border-b-2 border-purple-100 transform transition hover:translate-x-1"
            >
              <div class="col-span-2 flex items-center space-x-1 text-gray-700">
                <img
                  @click="handleNavigateToProduct(item)"
                  class="w-12 h-12 object-cover object-center transform -translate-y-1 cursor-pointer"
                  :src="item.images[0].url"
                  alt="product image"
                />
                <div class="text-gray-400 text-sm">
                  <p
                    @click="handleNavigateToProduct(item)"
                    class="text-base font-medium text-gray-500 cursor-pointer"
                  >
                    {{ item.name }}
                  </p>
                  <p>code: {{ item.code }}</p>
                </div>
              </div>

              <div class="w-full text-purple-700 font-semibold">
                $ {{ item.price }}
              </div>

              <div
                v-if="item.status == 'in stock'"
                class="w-full font-semibold text-green-500"
              >
                {{ item.status }}
              </div>
              <div v-else class="w-full font-semibold text-red-500">
                {{ item.status }}
              </div>

              <div class="col-span-2 lg:col-span-1 flex items-center space-x-1">
                <button
                  @click="handleRemoveWhistlist(item.name)"
                  class="focus:outline-none py-1 px-14 rounded border-2 border-purple-100 text-purple-700 hover:text-purple-900 hover:border-purple-400"
                >
                  Remove
                </button>
              </div>
            </div>

            <div v-else class="text-gray-700">
              <fieldset
                class="border-2 border-purple-100 rounded p-2 mb-5 space-y-1"
              >
                <legend class="font-semibold text-purple-700">
                  {{ item.name }}
                </legend>
                <div
                  class="grid grid-cols-3 items-center bg-purple-100 text-purple-700 font-semibold p-2"
                >
                  <div>Image</div>
                  <div>Unit Price</div>
                  <div>Status</div>
                </div>

                <div
                  class="grid grid-cols-3 items-center p-2 hover:bg-purple-50"
                >
                  <div class="w-full">
                    <img
                      @click="handleNavigateToProduct(item)"
                      class="w-12 h-12 object-cover object-center border-2 border-purple-100 rounded shadow cursor-pointer"
                      :src="item.images[0].url"
                      alt="product image"
                    />
                  </div>

                  <div class="w-full text-purple-700 font-bold">
                    $ {{ item.price }}
                  </div>

                  <div
                    v-if="item.status == 'in stock'"
                    class="w-full font-semibold text-green-500"
                  >
                    {{ item.status }}
                  </div>
                  <div v-else class="w-full font-semibold text-red-500">
                    {{ item.status }}
                  </div>
                </div>

                <div class="w-full flex items-center space-x-2">
                  <button
                    @click="handleRemoveWhistlist(item.name)"
                    class="focus:outline-none py-1 w-full rounded border-2 border-purple-100 text-purple-700 hover:text-purple-900 hover:border-purple-400"
                  >
                    Remove
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div v-if="myWhistlist?.length <= 0">
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
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
          </router-link>
          <div>
            <div class="text-gray-400">
              You don't have any whistlist.
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="myWhistlist?.length > 0"
        class="flex justify-center items-center mb-5 md:mt-5 w-1/4 mx-auto space-x-2"
      >
        <button
          @click="handlePrevious(myWhistlist.length)"
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
            v-for="i in Math.ceil(myWhistlist.length / 5)"
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
          @click="handleNext(myWhistlist.length)"
          :class="{ frozen: next >= myWhistlist.length }"
          :disabled="next >= myWhistlist.length"
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
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Footer,
    Navbar,
  },
  setup() {
    const start = ref(1);
    const end = ref(5);
    const previous = ref(0);
    const next = ref(5);
    const indexActive = ref(1);
    const windowWidth = ref(window.innerWidth);
    const myWhistlist = ref([]);

    const store = useStore();
    const tempWhistlist = ref(store.state.whistlist);

    const router = useRouter();

    const { user } = getUser();
    const { documents: whistlist } = getDocument(
      "whistlist",
      user.value?.uid,
      "items"
    );
    const { deleteDoc: removeMyWhistlist } = useDocument(
      "whistlist",
      user.value?.uid,
      "items"
    );

    watch(whistlist, () => {
      myWhistlist.value = whistlist.value;
    });

    watchEffect(() => {
      if (!user.value) {
        myWhistlist.value = tempWhistlist.value;
      }
      console.log("Temp Whistlist", tempWhistlist.value);
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

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

    const handleRemoveWhistlist = async (name) => {
      if (user.value) {
        await removeMyWhistlist(name);
      } else {
        store.commit("removeFromWhistlist", name);
      }
    };

    const handleNavigateToProduct = (item) => {
      router.push({
        name: "ProductDetails",
        params: { id: item.name, categoryName: item.categoryName },
      });
    };

    return {
      handleRemoveWhistlist,
      handleNavigateToProduct,
      handleNext,
      handlePrevious,
      windowWidth,
      indexActive,
      start,
      end,
      previous,
      next,
      myWhistlist,
    };
  },
};
</script>
