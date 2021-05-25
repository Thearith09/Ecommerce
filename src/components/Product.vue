<template>
  <div class="bg-white w-full rounded">
    <div
      v-if="total"
      class="h-auto w-full border-b-2 border-gray-200 bg-white min-w-max"
    >
      <div
        class="w-full sm:w-2/4 lg:w-1/3 xl:w-1/4 ml-auto py-10 text-gray-700 font-bold space-x-10"
      >
        <div class="px-5 text-gray-400">
          <div class="flex justify-between pb-2">
            <p class="underline">{{ pieces }}pieces</p>
            <span>{{ total.toFixed(2) }}</span>
          </div>
          <div v-if="pieces < 3" class="flex justify-between mb-2">
            <p>Shipping</p>
            <p>{{ shipping.toFixed(2) }}</p>
          </div>
          <div v-else class="flex justify-between mb-2">
            <p>Free Shipping</p>
            <p>0.00</p>
          </div>
          <hr class="border-white" />
          <div class="flex justify-between my-5 space-x-5">
            <span class="font-semibold">Order Amount </span
            ><span v-if="pieces < 3" class="font-semibold"
              >USD {{ (total + shipping)?.toFixed(2) }}</span
            >
            <span v-else class="font-semibold">
              USD
              {{ total?.toFixed(2) }}
            </span>
          </div>
          <div
            @click="handleCheckout"
            class="text-pink-500 hover:text-pink-600 cursor-pointer flex justify-center bg-white py-2 shadow"
          >
            Checkout
          </div>
        </div>
      </div>
    </div>

    <!--start screen greater than or equal 1024px-->
    <div v-if="windowWidth >= 1024" class="flex px-5 min-w-max bg-white">
      <div class="h-full w-96 py-5">
        <div class="relative w-80">
          <img
            class="h-52 w-96 object-center object-cover rounded"
            :src="url ? url : item.images[0].url"
          />
          <h3
            v-if="item.discount > 0"
            class="absolute bottom-0 right-0 bg-pink-500 bg-opacity-90 font-mono text-white p-1 rounded"
          >
            {{ item.discount }}% OFF
          </h3>
        </div>

        <div class="flex w-80 space-x-5 my-5">
          <div class="w-full space-y-3">
            <h3 class="text-gray-700 font-semibold uppercase">
              {{ item.productName }}
            </h3>
            <h5 class="text-gray-400 leading-none">
              {{ item.description }}
            </h5>
          </div>

          <div class="text-gray-400 w-1/4 flex justify-end">
            <svg
              @click="handleAddToCart(item)"
              :class="{ added: cartIds.includes(item.id) }"
              fill="currentColor"
              viewBox="-2 -3 24 24"
              class="rounded-full hover:text-pink-500 h-10 w-10 border-2 border-gray-200 inline-block p-1 cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="w-full py-7">
        <div class="relative">
          <div
            :class="{ invisiblePreAndNext: start == 0 }"
            @click="handlePreviousImage"
            class="absolute -top-3 left-12 w-8 h-8 hover:text-pink-600 bg-white shadow rounded-full flex justify-center items-center cursor-pointer text-pink-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            class="flex space-x-3 space-y-2 items-center px-5"
            v-for="(image, index) in item.images"
            :key="index"
            v-show="index >= start && index <= end"
          >
            <div class="w-24">
              <img
                @click="handleChangeImage(image.url)"
                class="col-span-1 h-10 w-full object-cover object-center cursor-pointer inline-block rounded"
                :src="image.url"
              />
            </div>

            <div class="w-44 flex space-x-1">
              <span class="w-full text-gray-700 font-semibold line-through"
                >USD {{ Number(item.price).toFixed(2) }}</span
              >
              <span
                v-if="item.discount > 0"
                class="w-full text-red-600 font-semibold"
                >USD
                {{
                  (item.price - (item.price * item.discount) / 100).toFixed(2)
                }}</span
              >
            </div>

            <div class="w-40 flex items-center">
              <button
                :class="{ frozen: qtys[index] <= 1 }"
                :disabled="qtys[index] <= 1"
                @click="handleDecrement(index, item)"
                class="border-2 h-10 p-1 focus:outline-none border-gray-200 inline-block text-gray-400 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <input
                @keydown="handleInput"
                @change="handleChanges($event, index, item)"
                class="inline-block focus:outline-none border-2 border-b-2 border-l-0 border-r-0 border-gray-200 w-24 h-10 text-center text-sm text-gray-700"
                type="text"
                :value="qtys[index]"
              />

              <button
                @click="handleIncrement(index, item)"
                class="border-2 p-1 h-10 focus:outline-none border-gray-200 inline-block text-gray-400 cursor-pointer hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div class="w-96 flex items-center">
              <div
                :class="{
                  invisiblePreAndNext: starts[index] == 0,
                }"
                class="border-2 h-10 flex items-center border-gray-200 text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  @click="handlePreviousSize(index)"
                  class="h-7 w-7 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <div v-for="(size, i) in item.sizes" :key="i">
                <span
                  @click="handleActiveSize(index, i, size)"
                  :class="{
                    activeSize: i == indexSizes[index],
                  }"
                  v-if="i >= starts[index] && i <= ends[index]"
                  class="px-10 mx-px font-semibold text-gray-400 uppercase border-2 border-gray-200 h-10 w-10 flex items-center justify-center cursor-pointer"
                >
                  {{ size }}
                </span>
              </div>

              <div
                :class="{
                  invisiblePreAndNext: item.sizes.length - 1 <= ends[index],
                }"
                class="border-2 h-10 flex items-center border-gray-200 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  @click="handleNextSize(index)"
                  class="h-7 w-7 inline-block text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            :class="{ invisiblePreAndNext: end >= item.images.length - 1 }"
            @click="handleNextImage"
            class="absolute -bottom-3 left-12 w-8 h-8 hover:text-pink-600 bg-white shadow rounded-full flex justify-center items-center cursor-pointer text-pink-500"
          >
            <svg
              class="h-6 w-6 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!--end screen greater than or equal 1024pxx-->

    <!--start screen less than 1024px-->
    <div
      v-if="windowWidth < 1024"
      class="flex flex-col h-auto pb-5 min-w-max bg-white"
    >
      <div
        class="flex flex-col sm:flex-row sm:space-x-5 h-full w-full p-5 pb-0"
      >
        <div class="relative w-80">
          <img
            class="h-52 w-full object-cover object-center rounded"
            :src="url ? url : item.images[0].url"
          />
          <h3
            v-if="item.discount > 0"
            class="absolute bottom-0 right-0 bg-pink-500 bg-opacity-90 font-mono text-white p-1 rounded"
          >
            {{ item.discount }}% OFF
          </h3>
        </div>

        <div class="flex justify-between my-2 sm:my-0 w-80">
          <div class="w-full sm:space-y-2">
            <h3 class="text-gray-700 font-semibold uppercase">
              {{ item.productName }}
            </h3>
            <h5 class="text-gray-400 leading-none">
              {{ item.description }}
            </h5>
            <div v-if="windowWidth >= 768" class="w-full pt-3 space-x-3">
              <span class="w-full text-gray-700 font-semibold line-through"
                >USD {{ Number(item.price).toFixed(2) }}</span
              >
              <span
                v-if="item.discount > 0"
                class="w-full text-red-600 font-semibold"
                >USD
                {{
                  (item.price - (item.price * item.discount) / 100).toFixed(2)
                }}</span
              >
            </div>
          </div>

          <div class="text-gray-400 w-1/4 flex justify-end">
            <svg
              @click="handleAddToCart(item)"
              :class="{ added: cartIds.includes(item.id) }"
              fill="currentColor"
              viewBox="-2 -3 24 24"
              class="rounded-full hover:text-pink-500 h-10 w-10 border-2 border-gray-200 inline-block p-1 cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        v-if="windowWidth >= 640 && windowWidth < 768"
        class="space-x-5 px-5 pt-3"
      >
        <span class="w-full text-gray-700 font-semibold line-through"
          >USD {{ Number(item.price).toFixed(2) }}</span
        >
        <span v-if="item.discount > 0" class="w-full text-red-600 font-semibold"
          >USD
          {{
            (item.price - (item.price * item.discount) / 100).toFixed(2)
          }}</span
        >
      </div>

      <div class="py-1 sm:py-3 w-full">
        <div class="relative space-y-3 w-full">
          <div
            :class="{ invisiblePreAndNext: start == 0 }"
            @click="handlePreviousImage"
            class="absolute -top-4 left-12 w-8 h-8 hover:text-pink-600 bg-white shadow rounded-full flex justify-center items-center cursor-pointer text-pink-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            class="flex items-center px-5 space-x-2 sm:space-x-5 md:space-x-8"
            v-for="(image, index) in item.images"
            :key="index"
            v-show="index >= start && index <= end"
          >
            <div class="w-24 bg-green-300">
              <img
                @click="handleChangeImage(image.url)"
                class="w-full h-10 object-cover object-center cursor-pointer inline-block rounded"
                :src="image.url"
              />
            </div>

            <div class="w-40 flex items-center">
              <button
                :class="{ frozen: qtys[index] <= 1 }"
                :disabled="qtys[index] <= 1"
                @click="handleDecrement(index, item)"
                class="border-2 p-1 h-10 focus:outline-none border-gray-200 inline-block text-gray-400 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <input
                @keydown="handleInput"
                @change="handleChanges($event, index, item)"
                class="inline-block focus:outline-none border-2 border-r-0 border-l-0 border-gray-200 h-10 w-full text-center text-sm text-gray-700"
                type="text"
                :value="qtys[index]"
              />

              <button
                @click="handleIncrement(index, item)"
                class="border-2 p-1 h-10 focus:outline-none border-gray-200 inline-block text-gray-400 cursor-pointer hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div class="w-96 flex items-center justify-center">
              <div
                :class="{
                  invisiblePreAndNext: starts[index] == 0,
                }"
                class="border-2 h-10 flex items-center border-gray-200 text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  @click="handlePreviousSize(index)"
                  class="h-7 w-7 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <div v-for="(size, i) in item.sizes" :key="i">
                <span
                  @click="handleActiveSize(index, i, size)"
                  :class="{
                    activeSize: i == indexSizes[index],
                  }"
                  v-if="i >= starts[index] && i <= ends[index]"
                  class="mx-px px-8 font-semibold text-gray-400 uppercase border-2 border-gray-200 h-10 w-10 flex items-center justify-center cursor-pointer"
                >
                  {{ size }}
                </span>
              </div>

              <div
                :class="{
                  invisiblePreAndNext: item.sizes.length - 1 <= ends[index],
                }"
                class="border-2 h-10 flex items-center border-gray-200 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  @click="handleNextSize(index)"
                  class="h-7 w-7 inline-block text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            :class="{ invisiblePreAndNext: end >= item.images.length - 1 }"
            @click="handleNextImage"
            class="absolute -bottom-3 left-12 w-8 h-8 hover:text-pink-600 bg-white shadow rounded-full flex justify-center items-center cursor-pointer text-pink-500"
          >
            <svg
              class="h-6 w-6 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!--end screen less than 1024px-->
  </div>

  <component
    :is="currentComponent"
    :orders="orders"
    @close="handleClose"
    :invoiceNum="ordersCollection?.length || 0"
  />
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { computed, onMounted, watch } from "vue";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import { timestamp } from "@/firebase/config";
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import PrintInvoice from "@/components/PrintInvoice";

export default {
  components: {
    PrintInvoice,
  },
  emits: ["order"],
  props: ["item"],
  setup(props, { emit }) {
    const url = ref(null); // image url
    const qtys = ref([]); //store each qty in qtys
    const start = ref(0); // limit image shows
    const end = ref(3); //limit image shows
    const starts = ref([]); //limit size shows
    const ends = ref([]); //limit size shows
    const total = ref(null); //total price
    const items = ref([]);
    const indexSizes = ref([]); //for active size (chosen size)
    const cartIds = ref([]);
    const shipping = ref(2);
    const orders = ref(null);
    const pieces = ref(0);
    const windowWidth = ref(window.innerWidth);
    const currentComponent = ref("");

    const router = useRouter();
    const docs = computed(() => cart.value && cart.value.items); //watching items change

    const { _user } = getUserDoc("users");
    const { user } = getUser();
    const { documents: ordersCollection } = getCollection("orders");
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { addDoc, updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.uid
    );

    onMounted(() => {
      //listening for resizing
      window.addEventListener("resize", onResize);

      if (windowWidth.value < 410) {
        //explicitly assign value to each element in array once the component mount
        for (let index in props.item?.images) {
          starts.value[index] = 0;
          ends.value[index] = 0;
          qtys.value[index] = 1;
        }
      } else {
        for (let index in props.item?.images) {
          starts.value[index] = 0;
          ends.value[index] = 3;
          qtys.value[index] = 1;
        }
      }
    });

    watch(cart, () => {
      let temp = [];
      for (let item of docs.value) temp.push(item.productId);
      cartIds.value = temp;
    });

    watch(pieces, () => {
      if (pieces.value >= 3) shipping.value = 0;
      else shipping.value = 2;
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;

      if (windowWidth.value > 410) {
        //re-assign value to each element in array once the screen is resized
        for (let index in props.item?.images) {
          starts.value[index] = 0;
          ends.value[index] = 3;
          qtys.value[index] = 1;
        }
      } else {
        for (let index in props.item?.images) {
          starts.value[index] = 0;
          ends.value[index] = 0;
          qtys.value[index] = 1;
        }
      }
    };

    const handleClose = (completed) => {
      if (completed) {
        router.push({ name: "Home" });
      } else {
        currentComponent.value = "";
      }
    };

    const handleCheckout = async () => {
      //insert into orders if the item.size and item.qty exist
      if (!user.value) {
        return router.push({ name: "Login" });
      }

      const orderedItems = items.value.filter((item) => item.size && item.qty);
      const order = {
        name: user.value.displayName,
        tel: _user.value.telephone,
        facebook: _user.value.facebook,
        telegram: _user.value.telegram,
        items: orderedItems,
        shipping: shipping.value,
      };
      orders.value = order;

      if (order.items?.length > 0) {
        currentComponent.value = "PrintInvoice";
      }
    };

    const handleAddToCart = async (product) => {
      if (!user.value) {
        router.push({ name: "Login" });
      } else {
        const item = cart.value?.items.filter(
          (item) => item.productId == product.id
        );
        const items = cart.value?.items.filter(
          (item) => item.productId != product.id
        );

        if (item?.length > 0) {
          await updateCart({
            items: [...items],
          });
        } else {
          const item = {
            productId: product.id,
            productName: product.productName,
            price: product.price,
            discount: product.discount,
            sizes: product.sizes,
            images: product.images,
          };
          if (items?.length > 0) {
            await addDoc({
              items: [...items, item],
              createdAt: timestamp(),
            });
          } else {
            await addDoc({
              items: [item],
              createdAt: timestamp(),
            });
          }
        }
      }
    };

    const handleChangeImage = (imageUrl) => {
      //change Big image by selecting small image
      url.value = imageUrl;
    };

    const handlePreviousImage = () => {
      end.value--;
      start.value--;
    };

    const handleNextImage = () => {
      end.value++;
      start.value++;
    };

    const handleInput = (e) => {
      //validate input only 0-9
      if (e.keyCode > 57 || e.keyCode < 48) {
        if (e.key.length === 1) {
          e.preventDefault();
        }
      }
    };

    const handleNextSize = (i) => {
      //create next function for sizes
      ends.value[i]++;
      starts.value[i]++;
    };

    const handlePreviousSize = (i) => {
      //create previous function for sizes
      ends.value[i]--;
      starts.value[i]--;
    };

    const handleActiveSize = (index, i, size) => {
      //active size (chosen size)
      indexSizes.value[index] = i;

      if (items.value[index]) {
        //input qty first
        items.value[index].size = size;
      } else {
        //select size first
        const doc = {};
        doc.size = size;

        doc.name = props.item.productName;
        doc.id = props.item.id;
        doc.price = props.item.price;
        doc.discount = props.item.discount;
        doc.qty = qtys.value[index];
        doc.color = props.item.images[index].url;
        items.value[index] = doc;
      }
      handleTotal();
    };

    const handleTotal = () => {
      //total price for each cart
      let temp = 0;
      let piecesTemp = 0;
      for (let item of items.value) {
        if (item && item.qty > 0 && item.size) {
          piecesTemp += parseFloat(item.qty);
          temp +=
            item.price * item.qty -
            (item.discount * item.price * item.qty) / 100;
        } else {
          piecesTemp = piecesTemp;
          temp = temp;
        }
      }

      pieces.value = piecesTemp;
      total.value = temp;
      emit("order", items.value);
    };

    const handleChanges = (e, i, item) => {
      //handle input by listen to the changes
      if (e.target.value[0] == 1) {
        qtys.value[i] = 1;

        handleOrder(i, item);
      } else {
        qtys.value[i] = e.target.value;

        handleOrder(i, item);
      }
    };

    const handleIncrement = (i, item) => {
      //handle input by clicking the button +
      qtys.value[i]++;

      handleOrder(i, item);
    };

    const handleDecrement = (i, item) => {
      //handle input by clicking the button -
      qtys.value[i]--;

      handleOrder(i, item);
    };

    const handleOrder = (i, item) => {
      const exist = items.value[i] && items.value[i].id == item.id;
      if (exist) {
        items.value[i].qty = qtys.value[i];
      } else {
        const doc = {};
        doc.name = item.productName;
        doc.id = item.id;
        doc.price = item.price;
        doc.discount = item.discount;
        doc.qty = qtys.value[i];
        doc.color = item.images[i].url;
        items.value[i] = doc;
      }
      handleTotal();
    };

    return {
      handleChangeImage,
      handlePreviousImage,
      handleNextImage,
      handleInput,
      handleChanges,
      handleNextSize,
      handlePreviousSize,
      handleActiveSize,
      handleIncrement,
      handleDecrement,
      handleAddToCart,
      handleCheckout,
      handleClose,
      ordersCollection,
      items,
      cartIds,
      orders,
      url,
      currentComponent,
      qtys,
      starts,
      ends,
      start,
      end,
      indexSizes,
      total,
      pieces,
      shipping,
      windowWidth,
    };
  },
};
</script>

<style></style>
