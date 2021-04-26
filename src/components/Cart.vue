<template>
  <div class="bg-white">
    <div class="flex h-auto w-full">
      <div class="h-full w-2/4 space-y-5 p-5">
        <div>
          <div class="relative">
            <img
              class="h-52 w-full object-center object-cover"
              :src="url ? url : item.images[0].url"
            />
            <h3
              v-if="item.discount > 0"
              class="absolute bottom-0 right-0 bg-pink-500 font-mono text-white p-1"
            >
              {{ item.discount }}% OFF
            </h3>
          </div>
          <div>
            <h4 class="text-gray-400">
              Lorem ipsum dolor sit amet
            </h4>
          </div>
        </div>
      </div>
      <div class="relative py-3 w-full">
        <div class="col-span-2 space-y-3 w-full">
          <div
            :class="{ invisiblePreAndNext: start == 0 }"
            @click="handlePreviousImage"
            class="absolute top-2 left-3 w-8 h-8 hover:text-pink-600 bg-white shadow-inner rounded-full flex justify-center items-center cursor-pointer text-pink-500"
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
            class="grid grid-cols-9 gap-4 items-center"
            v-for="(image, index) in item.images"
            :key="index"
          >
            <div
              :class="{ hideImage: index > end }"
              class="col-span-1 bg-blue-500 w-full"
            >
              <img
                @click="handleChangeImage(image.url)"
                class="col-span-1 h-10 w-full object-cover object-center cursor-pointer inline-block"
                :src="image.url"
              />
            </div>
            <div :class="{ hideImage: index > end }" class="col-span-2 w-full">
              <span class="w-full text-gray-700 font-semibold"
                >USD {{ item.price
                }}<span class="text-gray-400 font-normal"> /piece</span></span
              >
            </div>
            <div :class="{ hideImage: index > end }" class="col-span-2">
              <div class=" flex items-center">
                <button
                  :class="{ frozen: qtys[index] <= 0 }"
                  :disabled="qtys[index] <= 0"
                  @click="handleDecrement(index, item)"
                  class="border-2 p-1 focus:outline-none border-gray-100 inline-block text-gray-400 hover:bg-gray-100"
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
                  class="inline-block focus:outline-none border-t-2 border-b-2 border-gray-100 w-2/4 h-8 text-center text-sm text-gray-700"
                  type="text"
                  min="0"
                  placeholder="0"
                  :value="qtys[index]"
                />
                <button
                  @click="handleIncrement(index, item)"
                  class="border-2 p-1 focus:outline-none border-gray-100 inline-block text-gray-400 cursor-pointer hover:bg-gray-100"
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
            </div>

            <div class="col-span-4 " :class="{ hideImage: index > end }">
              <div class="flex items-center justify-start space-x-1">
                <div
                  :class="{
                    invisiblePreAndNext: starts[index] == 0,
                  }"
                  class="border-2 border-gray-100 hover:bg-gray-100 cursor-pointer"
                >
                  <svg
                    @click="handlePreviousSize(index)"
                    class="h-6 w-6 inline-block text-gray-400"
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
                <div
                  class="text-gray-400"
                  v-for="(size, i) in item.sizes"
                  :key="i"
                >
                  <span
                    @click="handleActiveSize(index, i, size)"
                    :class="{
                      hideSize: !(i >= starts[index] && i <= ends[index]),
                      activeSize: i == indexSizes[index],
                    }"
                    class="font-semibold uppercase shadow-inner px-2 py-1 cursor-pointer"
                  >
                    {{ size }}
                  </span>
                </div>
                <div
                  :class="{
                    invisiblePreAndNext: item.sizes.length - 1 <= ends[index],
                  }"
                  class="border-2 border-gray-100 hover:bg-gray-100 cursor-pointer"
                >
                  <svg
                    @click="handleNextSize(index)"
                    class="h-6 w-6 inline-block text-gray-400"
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
          </div>
          <div
            :class="{ invisiblePreAndNext: end >= item.images.length - 1 }"
            @click="handleNextImage"
            class="absolute bottom-9 left-3 w-8 h-8 hover:text-pink-600 bg-white shadow-inner rounded-full flex justify-center items-center cursor-pointer text-pink-500"
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
    <div v-if="total" class="h-auto w-full bg-gray-100">
      <div class="flex justify-end p-2 text-gray-700 font-bold">
        Total Price: USD {{ total.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
export default {
  props: ["item"],
  setup(props, { emit }) {
    const url = ref(null); // image url
    const qtys = ref([]); //store each qty in qtys
    const start = ref(0); // limit image shows
    const end = ref(3); //limit image shows
    const starts = ref([]); //limit size shows
    const ends = ref([]); //limit size shows
    const items = ref([]); //order items
    const total = ref(null); //total price
    const indexSizes = ref([]); //for active size (chosen size)

    onMounted(() => {
      //explicitly assign value to each element in array once the component mount
      for (let index in props.item.images) {
        starts.value[index] = 0;
        ends.value[index] = 3;
        qtys.value[index] = 0;
      }
    });

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
        items.value[index] = doc;
      }
      handleTotal();
    };

    const handleTotal = () => {
      //total price for each cart
      let temp = 0;
      for (let item of items.value) {
        if (item && item.qty > 0 && item.size) {
          temp +=
            item.price * item.qty -
            (item.discount * item.price * item.qty) / 100;
        } else {
          temp = temp;
        }
      }
      total.value = temp;
      emit("order", items.value);
    };

    const handleChanges = (e, i, item) => {
      //handle input by listen to the changes
      if (e.target.value[0] == 0) {
        qtys.value[i] = 0;

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
      if (items.value[i]) {
        //select size first
        items.value[i].name = item.productName;
        items.value[i].id = item.productId;
        items.value[i].price = item.price;
        items.value[i].discount = item.discount;
        items.value[i].qty = qtys.value[i];
        items.value[i].color = item.images[i].url;
      } else {
        //input qty first
        const exist = items.value[i] && items.value[i].id == item.productId;
        if (exist) {
          items.value[i].qty = qtys.value[i];
        } else {
          const doc = {};
          doc.name = item.productName;
          doc.id = item.productId;
          doc.price = item.price;
          doc.discount = item.discount;
          doc.qty = qtys.value[i];
          doc.color = item.images[i].url;
          items.value[i] = doc;
        }
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
      url,
      qtys,
      starts,
      ends,
      start,
      end,
      indexSizes,
      total,
    };
  },
};
</script>

<style></style>