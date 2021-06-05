<template>
  <div
    class="relative grid grid-cols-1 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full"
  >
    <div
      :class="{ hideImage: end >= products?.length - 1 }"
      class="absolute -right-5 top-16 z-10"
    >
      <div
        @click="handleNext"
        class="bg-white w-12 h-12 rounded-full shadow flex justify-center items-center text-pink-500 cursor-pointer hover:text-pink-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="h-auto hover:translate-y-2 transform transition"
      v-show="index >= start && index <= end"
    >
      <div class="relative">
        <router-link
          :to="{
            name: 'ProductDetails',
            params: {
              id: product.id,
              categoryName: name,
            },
          }"
        >
          <img
            :src="urls[index] ? urls[index] : product.images[0].url"
            class="w-full h-48 object-cover object-center rounded"
          />
        </router-link>
        <h3
          v-if="product.discount > 0"
          class="absolute bottom-0 right-0 bg-pink-500 bg-opacity-90 font-mono text-white p-1 rounded"
        >
          {{ product.discount }}% OFF
        </h3>
      </div>

      <div>
        <div class="text-gray-100 py-2">
          <div class="flex space-x-1 items-center">
            <img
              @mouseover="handleChangeImage(image.url, index, i)"
              @mouseleave="handleResetImage"
              @click="handleAddToCart(product, i)"
              v-for="(image, i) in product.images"
              :key="image"
              v-show="i < 4"
              :class="{ activeBorder: indexActiveBorder[index] == i }"
              class="p-px h-5 w-5 rounded-full object-cover object-center cursor-pointer"
              :src="image.url"
            />
            <div
              v-if="product.images.length >= 5"
              class="relative group text-gray-500 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <div
                class="absolute top-5 right-1 hidden group-hover:block br"
              ></div>
              <div
                class="absolute top-7 -left-24 bg-white p-3 hidden group-hover:grid grid-cols-4 gap-1 rounded rounded-tr-none"
              >
                <img
                  @mouseover="handleChangeImage(image.url, index, i)"
                  @mouseleave="handleResetImage"
                  @click="handleAddToCart(product, i)"
                  v-for="(image, i) in product.images"
                  :key="image"
                  v-show="i >= 4"
                  :class="{ activeBorder: indexActiveBorder[index] == i }"
                  class="p-px h-5 w-5 rounded-full object-cover object-center cursor-pointer"
                  :src="image.url"
                />
              </div>
            </div>
          </div>

          <h4 class="text-pink-500 font-semibold uppercase">
            {{ product.productName }}
          </h4>

          <div class="leading-none">
            <span class="text-gray-500 text-sm leading-none"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.</span
            >
          </div>
          <div class="mt-2 flex justify-between items-center">
            <div class="flex space-x-2" v-if="product.discount > 0">
              <span
                class="inline-block text-gray-700 font-semibold line-through"
                >USD {{ Number(product.price).toFixed(2) }}
              </span>
              <span class="text-red-600 font-semibold inline-block">
                USD
                {{
                  (
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)
                }}
              </span>
            </div>
            <div v-else>
              <span class="inline-block text-gray-700 font-semibold"
                >USD {{ Number(product.price).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :class="{ hideImage: start == 0 }"
      class="absolute -left-5 top-16 z-10"
    >
      <div
        @click="handlePrevious"
        class="bg-white w-12 h-12 rounded-full shadow flex justify-center items-center text-pink-500 cursor-pointer hover:text-pink-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
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
    </div>
  </div>
  <div>
    <component
      :is="currentComponent"
      :item="item"
      :index="index"
      @close="currentComponent = ''"
    />
  </div>
</template>

<script>
import PopupCard from "@/components/PopupCard";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";

import { onMounted, ref, watchEffect } from "vue";

export default {
  components: {
    PopupCard,
  },
  props: ["name", "products"],
  setup(props) {
    const start = ref(0);
    const end = ref(4);
    const currentComponent = ref("");
    const item = ref("");
    const urls = ref([]);
    const index = ref(null);
    const indexActiveBorder = ref([]);
    const windowWidth = ref(window.innerWidth);

    const { user } = getUser();
    const { documents: products } = getDocument(
      "inventory",
      props.name,
      "products"
    );

    const onResize = () => {
      windowWidth.value = window.innerWidth;
      start.value = 0;
      end.value = 4;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    watchEffect(() => {
      if (windowWidth.value < 640) {
        end.value = 0;
      } else if (windowWidth.value < 768) {
        end.value = 1;
      } else if (windowWidth.value < 1024) {
        end.value = 2;
      } else if (windowWidth.value < 1280) {
        end.value = 3;
      } else {
        end.value = 4;
      }
    });

    const handleAddToCart = (product, i) => {
      currentComponent.value = "PopupCard";
      index.value = i;
      item.value = product;
    };

    const handleChangeImage = (imageUrl, index, i) => {
      urls.value[index] = imageUrl;
      indexActiveBorder.value[index] = i;
    };

    const handleResetImage = () => {
      urls.value = [];
      indexActiveBorder.value = [];
    };

    const handlePrevious = () => {
      if (windowWidth.value < 640) {
        start.value -= 1;
        end.value -= 1;
      } else if (windowWidth.value < 768) {
        start.value -= 2;
        end.value -= 2;
      } else if (windowWidth.value < 1024) {
        start.value -= 3;
        end.value -= 3;
      } else if (windowWidth.value < 1280) {
        start.value -= 4;
        end.value -= 4;
      } else {
        start.value -= 5;
        end.value -= 5;
      }
    };

    const handleNext = () => {
      if (windowWidth.value < 640) {
        start.value += 1;
        end.value += 1;
      } else if (windowWidth.value < 768) {
        start.value += 2;
        end.value += 2;
      } else if (windowWidth.value < 1024) {
        start.value += 3;
        end.value += 3;
      } else if (windowWidth.value < 1280) {
        start.value += 4;
        end.value += 4;
      } else {
        start.value += 5;
        end.value += 5;
      }
    };

    return {
      handleAddToCart,
      handleNext,
      handlePrevious,
      handleChangeImage,
      handleResetImage,
      start,
      end,
      currentComponent,
      item,
      windowWidth,
      urls,
      indexActiveBorder,
      index,
      products,
    };
  },
};
</script>

<style>
.br {
  border-left: 10px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 10px solid white;
}
</style>
