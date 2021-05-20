<template>
  <div
    class="relative grid grid-cols-1 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full"
  >
    <div
      :class="{ hideImage: end >= category.products.length - 1 }"
      class="absolute -right-6 top-16 z-10"
    >
      <div
        @click="handleNext"
        class="bg-white w-12 h-12 rounded-full shadow flex justify-center items-center text-pink-500 cursor-pointer hover:text-pink-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
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
      v-for="(product, index) in category.products"
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
              categoryId: category.id,
              productId: product.id,
            },
          }"
        >
          <img
            :src="product.images[0].url"
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
          <h4 class="text-pink-500 font-semibold uppercase">
            {{ product.productName }}
          </h4>

          <div class="leading-none">
            <span class="text-gray-400 text-sm leading-none"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.</span
            >
          </div>
          <div class="mt-2 flex justify-between items-center">
            <div>
              <span
                v-if="product.discount > 0"
                class="text-red-600 font-semibold line-through block"
                >USD {{ Number(product.price).toFixed(2) }}
              </span>
              <span class="text-gray-700 font-semibold">
                USD
                {{
                  (
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)
                }}
                <span class="text-gray-400 font-normal">/piece</span>
              </span>
            </div>
            <div class="text-gray-400">
              <svg
                @click="handleAddToCart(product)"
                :class="{ added: cartIds.includes(product.id) }"
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
      </div>
    </div>
    <div
      :class="{ hideImage: start == 0 }"
      class="absolute -left-6 top-16 z-10"
    >
      <div
        @click="handlePrevious"
        class="bg-white w-12 h-12 rounded-full shadow flex justify-center items-center text-pink-500 cursor-pointer hover:text-pink-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
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
</template>

<script>
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

export default {
  props: ["category"],
  setup(props) {
    const { user } = getUser();
    const router = useRouter();
    const cartIds = ref([]);
    const start = ref(0);
    const end = ref(4);
    const windowWidth = ref(window.innerWidth);
    const items = computed(() => cart.value && cart.value.items); //watching items change

    const { document: cart } = getDocument("carts", user.value?.uid);
    const { addDoc, updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.uid
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

    watch(cart, () => {
      let temp = [];
      for (let item of items.value) temp.push(item.productId);
      cartIds.value = temp;
    });

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
      cartIds,
      start,
      end,
      windowWidth,
    };
  },
};
</script>

<style></style>
