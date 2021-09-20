<template>
  <div
    class="flex flex-col space-y-10 md:space-y-0 md:flex-row-reverse p-5 lg:w-10/12 xl:w-8/12 mx-auto"
  >
    <div class="h-60 w-full md:w-3/4">
      <div class="md:pl-10 text-gray-700 font-semibold space-y-3">
        <div class="flex justify-end space-x-10">
          <p class="underline">{{ pieces }}pieces</p>
          <span>${{ item.price }}</span>
        </div>

        <div
          class="bg-yellow-300 text-purple-700 space-x-10 flex justify-end p-2 rounded"
        >
          <span> Discount </span>
          <span>- ${{ discount }} </span>
        </div>

        <div
          class="flex justify-end space-x-10 pb-3 border-b-2 border-purple-100"
        >
          <p>Shipping</p>
          <p>${{ shipping }}</p>
        </div>

        <div class="flex uppercase justify-end space-x-10">
          <span>Total Amount</span>
          <span class="text-purple-700 text-xl font-mono font-bold"
            >${{ total.toFixed(2) }}</span
          >
        </div>

        <div class="border-b-2 border-purple-100 pb-5">
          <button
            v-if="!isPending"
            @click="handleCheckout(item.name)"
            class="rounded focus:outline-none w-full shadow font-bold text-purple-700 bg-yellow-300 hover:translate-y-1 transform transition-all duration-150 p-2"
          >
            Checkout
          </button>
          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded shadow p-2 tracking-wide bg-yellow-300 text-purple-700 font-bold w-full"
          >
            <div>
              Checking out...
            </div>
            <div class="absolute top-3 right-2">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-white"
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!--start screen greater than or equal 1024px-->
    <div class="md:w-3/4 flex space-x-5 sm:space-x-10">
      <div v-if="windowWidth >= 435">
        <div
          class="flex flex-col w-12 py-1"
          v-for="(image, index) in item.images"
          :key="index"
        >
          <img
            @click="handleChangeImage(image.url)"
            class="h-12 w-12 rounded-full object-cover object-center block cursor-move border-2 border-purple-700 p-px"
            :src="image.url"
          />
        </div>
      </div>

      <div>
        <div class="relative">
          <img
            class="flex-none w-full object-cover object-center rounded"
            :src="url"
          />
        </div>

        <div class="flex" v-if="windowWidth < 435">
          <div
            class="flex w-8 py-1 mr-2"
            v-for="(image, index) in item.images"
            :key="index"
          >
            <img
              @click="handleChangeImage(image.url)"
              class="h-8 w-8 rounded-full object-cover object-center cursor-move"
              :src="image.url"
            />
          </div>
        </div>

        <div class="w-full sm:w-96 space-y-3">
          <div class="space-y-1 lg:space-y-3">
            <div>
              <h3
                class="text-purple-700 font-semibold font-mono text-lg tracking-wide uppercase py-1"
              >
                {{ item.name }}
              </h3>
              <h5 class="text-gray-500 leading-none">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
                ipsam minima quasi ducimus aperiam repudiandae et ex consectetur
                ipsum facilis? Id, unde!
              </h5>
            </div>

            <div
              v-if="item.discount > 0"
              class="w-full flex pt-2 space-x-1 font-semibold"
            >
              <span class="text-gray-700 line-through block"
                >USD {{ Number(item.price).toFixed(2) }}</span
              >
              <span class="block text-red-600"
                >USD
                {{
                  (item.price - (item.price * item.discount) / 100).toFixed(2)
                }}</span
              >
            </div>
            <div v-else class="w-full flex pt-2 space-x-1 font-semibold">
              <span class="text-gray-700 block"
                >USD {{ Number(item.price).toFixed(2) }}</span
              >
            </div>
          </div>

          <div>
            <p class="text-gray-700">Size:</p>
            <div class="flex space-x-2 text-gray-500">
              <span
                v-for="(size, i) in item.sizes"
                :key="i"
                :class="{ activeSize: indexSize == size }"
                @click="handleActiveSize(size)"
                class="flex items-center justify-center rounded font-semibold uppercase border-2 py-1 px-3 h-10 cursor-pointer"
              >
                {{ size }}
              </span>
            </div>
          </div>

          <div>
            <p class="text-gray-700">Qty:</p>
            <div class="relative text-gray-500">
              <input
                @keydown="handleInput($event, item.name)"
                @input="handleChangeQty($event, item.name)"
                class="inline-block focus:outline-none border-2 border-purple-100 pr-5 pl-5 h-10 w-28 rounded text-center text-sm text-gray-700"
                type="text"
                v-model="qty"
              />

              <div class="absolute top-2 left-20 cursor-pointer">
                <svg
                  @click="qty++"
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
              </div>

              <div v-if="qty > 1" class="absolute top-2 left-3 cursor-pointer">
                <svg
                  @click="qty--"
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
              </div>
            </div>
          </div>

          <div
            v-if="alerting"
            class="bg-red-100 border-2 border-red-200 h-16 rounded flex justify-center items-center"
          >
            <p class="text-red-600 font-mono font-semibold">{{ alerting }}</p>
          </div>

          <div class="py-2">
            <button
              @click="handleAddToCart(item, indexSize)"
              class="rounded focus:outline-none w-full shadow font-bold text-purple-700 bg-yellow-300 hover:translate-y-1 transform transition-all duration-150 p-2"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end screen greater than or equal 1024pxx-->
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import { loadStripe } from "@stripe/stripe-js";
import { timestamp, functions } from "@/firebase/config";
import { onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  emits: ["order"],
  props: ["item", "categoryName"],
  setup(props, { emit }) {
    const url = ref(props.item?.images[0].url); // image url
    const qty = ref(1);
    const isPending = ref(false);
    const shipping = ref(2);
    const windowWidth = ref(window.innerWidth);
    const alerting = ref(null);
    const total = ref(
      Number(props.item.price) +
        shipping.value -
        (props.item.price * props.item.discount) / 100
    );
    const pieces = ref(1);
    const indexSize = ref(null);
    const discount = ref((props.item.price * props.item.discount) / 100);

    const router = useRouter();
    const store = useStore();

    const { _user } = getUserDoc("users");
    const { user } = getUser();
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");
    const { addDoc, updateDoc } = useDocument(
      "carts",
      user.value?.uid,
      "items"
    );

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    watch(qty, () => {
      const item = props.item;
      discount.value = (item.price * item.discount * qty.value) / 100;
      total.value =
        item.price * qty.value +
        shipping.value -
        (item.price * qty.value * item.discount) / 100;
    });

    watch(indexSize, () => {
      if (indexSize.value != null) {
        alerting.value = null;
      }
    });

    const handleCheckout = async (name) => {
      if (!indexSize.value) {
        return (alerting.value = "Please choose one of the sizes above!");
      }

      if (!user.value) {
        return router.push({ name: "Login" });
      } else {
        isPending.value = true;
        const checkoutItem = {
          color: url.value,
          name: name,
          qty: qty.value,
          size: indexSize.value,
        };

        const createStripeCheckout = functions.httpsCallable(
          "createStripeCheckout"
        );

        const stripe = await loadStripe(
          "pk_test_51Is77NBVuXsuKaUY6WAFvG0YNecHXxnU0XPN3yKSZeC49BkY5AUAXpVjTx45zx0HCHKr654nlUHKD9zsqb5X55nz00NN802AgG"
        );

        const res = await createStripeCheckout({
          checkoutItem: checkoutItem,
          categoryName: props.categoryName,
          email: _user.value.email,
          phone: _user.value.phone,
          createdAt: Date.now(),
        });

        const sessionId = await res.data.id;
        store.commit("setSessionId", sessionId);
        stripe.redirectToCheckout({ sessionId });
      }
    };

    const handleAddToCart = async (item, size) => {
      if (!size) {
        return (alerting.value = "Please choose one of the sizes above!");
      }
      if (!user.value) {
        item.color = url.value;
        item.createdAt = timestamp();
        item.size = size;
        item.qty = qty.value;
        delete item.sizes;
        delete item.images;

        store.commit("addToCart", item);
        router.push({ name: "CartDetails" });
      } else {
        cart.value?.forEach((cart) => {
          if (cart.name == item.name) qty.value += cart.qty;
        });

        await addDoc({
          name: item.name,
          description: item.description,
          price: Number(item.price).toFixed(2),
          discount: item.discount,
          size: size,
          color: url.value,
          qty: qty.value,
          createdAt: timestamp(),
        });

        router.push({ name: "CartDetails" });
      }
    };

    const handleActiveSize = (size) => {
      indexSize.value = size;
    };

    const handleInput = (e) => {
      //validate input only 0-9
      if (e.keyCode > 57 || e.keyCode < 48) {
        if (e.key.length === 1) {
          e.preventDefault();
        }
      }
    };

    const handleChangeQty = (e) => {
      //handle input by listen to the changes
      if (e.target.value[0] < 1 || e.target.value[0] == undefined) {
        qty.value = 1;
      } else {
        qty.value = e.target.value;
      }
    };

    const handleChangeImage = (imageUrl) => {
      //change Big image by selecting small image
      url.value = imageUrl;
    };

    return {
      handleActiveSize,
      handleChangeQty,
      handleChangeImage,
      handleAddToCart,
      handleCheckout,
      handleInput,
      url,
      qty,
      total,
      discount,
      pieces,
      shipping,
      indexSize,
      isPending,
      windowWidth,
      alerting,
    };
  },
};
</script>

<style></style>
