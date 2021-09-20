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
        class="bg-white w-12 h-12 rounded-full shadow flex justify-center items-center text-purple-700 cursor-pointer hover:text-purple-900"
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
      :class="animate"
      class="h-auto hover:translate-y-2 transform transition duration-150"
      v-show="index >= start && index <= end"
    >
      <div class="relative w-full border-purple-100 border-2 rounded">
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
            class="h-48 min-w-full  object-cover object-center rounded"
          />
        </router-link>
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
              v-show="i < 5"
              :class="{ hoverColor: indexActiveBorder[index] == i }"
              class="p-px h-5 w-5 rounded-full shadow object-cover object-center cursor-pointer"
              :src="image.url"
            />
            <div
              v-if="product.images.length >= 6"
              class="relative group text-purple-800 cursor-pointer"
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
                class="absolute top-7 w-36 right-0 bg-yellow-300 p-3 h-auto hidden group-hover:grid grid-cols-5 gap-1 rounded rounded-tr-none rounded-bl-none"
              >
                <img
                  v-for="(image, i) in product.images"
                  :key="image"
                  v-show="i >= 5"
                  @mouseover="handleChangeImage(image.url, index, i)"
                  @mouseleave="handleResetImage"
                  @click="handleAddToCart(product, i)"
                  :class="{ hoverColor: indexActiveBorder[index] == i }"
                  class="p-px h-5 w-5 rounded-full shadow object-cover object-center cursor-pointer"
                  :src="image.url"
                />
              </div>
            </div>
          </div>

          <h4
            class="text-purple-700 font-semibold font-mono tracking-wide uppercase"
          >
            {{ product.name }}
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
                >USD{{ Number(product.price).toFixed(2) }}
              </span>
              <span class="text-red-600 font-semibold inline-block">
                USD{{
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
            <div
              v-if="!myWhistlist.includes(product.name)"
              @click="handleAddWhistlist(product, name)"
              class="rounded-full border-2 p-1 border-purple-400 w-7 h-7 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400 hover:text-purple-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            <div
              v-else
              @click="handleRemoveWhistlist(product.name)"
              class="rounded-full border-2 p-1 border-purple-400 w-7 h-7 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-700 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
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
        class="bg-white w-12 h-12 rounded-full shadow flex justify-center items-center text-purple-700 cursor-pointer hover:text-purple-900"
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
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { useStore } from "vuex";

import { onMounted, ref, watch, watchEffect } from "vue";

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
    const animate = ref(null);
    const indexActiveBorder = ref([]);
    const windowWidth = ref(window.innerWidth);
    const myWhistlist = ref([]);

    const store = useStore();
    const tempWhistlist = ref(store.state.whistlist);

    const { user } = getUser();
    const { documents: products } = getDocument(
      "inventory",
      props.name,
      "products"
    );
    const {
      addDoc: addToMyWhistlist,
      deleteDoc: removeMyWhistlist,
    } = useDocument("whistlist", user.value?.uid, "items");
    const { documents: whistlist } = getDocument(
      "whistlist",
      user.value?.uid,
      "items"
    );

    watch(whistlist, () => {
      const results = [];
      whistlist.value?.forEach((item) => {
        if (item?.name) {
          results.push(item.name);
        }
      });
      myWhistlist.value = results;
    });

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
      if (!user.value) {
        const results = [];
        tempWhistlist.value?.forEach((item) => {
          if (item.name) {
            results.push(item.name);
          }
        });
        myWhistlist.value = results;
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
      //for applying animate style once button was interacted
      animate.value = "animate__animated animate__slideInLeft animate__faster";

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
      //for applying animate style once button was interacted
      animate.value = "animate__animated animate__slideInRight animate__faster";

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

    const handleAddWhistlist = async (item, name) => {
      item.categoryName = name;
      if (user.value) {
        await addToMyWhistlist(item);
      } else {
        store.commit("addToWhistlist", item);
        console.log(store.state.whistlist);
      }
    };

    const handleRemoveWhistlist = async (name) => {
      if (user.value) {
        await removeMyWhistlist(name);
      } else {
        store.commit("removeFromWhistlist", name);
      }
    };

    return {
      handleAddToCart,
      handleNext,
      handlePrevious,
      handleChangeImage,
      handleResetImage,
      handleAddWhistlist,
      handleRemoveWhistlist,
      start,
      end,
      currentComponent,
      item,
      windowWidth,
      urls,
      indexActiveBorder,
      index,
      products,
      animate,
      myWhistlist,
    };
  },
};
</script>

<style scoped>
.br {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #fcd34d;
}
</style>
