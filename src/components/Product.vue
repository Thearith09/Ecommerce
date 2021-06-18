<template>
  <div
    class="flex flex-col space-y-10 md:space-y-0 md:flex-row-reverse p-5 lg:w-10/12 xl:w-8/12 mx-auto"
  >
    <div class="h-60 w-full md:w-3/4">
      <div class="md:pl-10 text-gray-500 font-semibold space-y-3">
        <div class="flex justify-end space-x-10">
          <p class="underline">{{ pieces }}pieces</p>
          <span>${{ item.price }}</span>
        </div>

        <div
          class="bg-red-600 text-white space-x-10 flex justify-end p-2 rounded"
        >
          <span> Discount </span>
          <span>- ${{ discount }} </span>
        </div>

        <div
          class="flex justify-end space-x-10 pb-3 border-b-2 border-gray-200"
        >
          <p>Shipping</p>
          <p>${{ shipping }}</p>
        </div>

        <div class="flex text-gray-700 justify-end space-x-10">
          <span>Total Amount</span>
          <span class="text-red-600 font-bold">${{ total }}</span>
        </div>

        <div class="border-b-2 border-gray-200 pb-5">
          <button
            :disabled="indexSize == null"
            :class="{ frozen: indexSize == null }"
            @click="handleCheckout(item.name)"
            class="rounded focus:outline-none w-full shadow font-semibold text-white bg-pink-500 hover:bg-pink-700 p-2"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>

    <!--start screen greater than or equal 1024px-->
    <div class="md:w-3/4 flex space-x-5 sm:space-x-10">
      <div>
        <div
          class="flex flex-col w-12 py-1"
          v-for="(image, index) in item.images"
          :key="index"
        >
          <img
            @click="handleChangeImage(image.url)"
            class="h-12 w-12 rounded-full object-cover object-center block cursor-move"
            :src="image.url"
          />
        </div>
      </div>

      <div>
        <div class="relative w-full sm:w-96 h-52">
          <img
            class="flex-none w-full h-full object-center object-cover rounded"
            :src="url"
          />
          <h3
            v-if="item.discount > 0"
            class="absolute bottom-0 right-0 bg-pink-500 bg-opacity-90 font-mono text-white p-1 rounded"
          >
            {{ item.discount }}% OFF
          </h3>
        </div>

        <div class="w-full sm:w-96 space-y-3">
          <div class="space-y-1 lg:space-y-3">
            <div>
              <h3 class="text-gray-700 font-semibold uppercase">
                {{ item.name }}
              </h3>
              <h5 class="text-gray-500 leading-none">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
                ipsam minima quasi ducimus aperiam repudiandae et ex consectetur
                ipsum facilis? Id, unde!
              </h5>
            </div>

            <div class="w-44 flex pt-2 space-x-1 font-semibold">
              <span class="text-gray-700 line-through block"
                >USD {{ Number(item.price).toFixed(2) }}</span
              >
              <span v-if="item.discount > 0" class="block text-red-600"
                >USD
                {{
                  (item.price - (item.price * item.discount) / 100).toFixed(2)
                }}</span
              >
            </div>
          </div>

          <div>
            <p class="text-gray-700">Size:</p>
            <div class="flex space-x-2 text-gray-500">
              <span
                v-for="(size, i) in item.sizes"
                :key="i"
                :class="{ activeBorder: indexSize == i }"
                @click="handleActiveSize(i)"
                class="flex items-center justify-center font-semibold uppercase border-2 py-1 px-3 h-10 cursor-pointer"
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
                class="inline-block focus:outline-none border-2 border-gray-200 pr-5 pl-5 h-10 w-28 rounded text-center text-sm text-gray-700"
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

          <div>
            <button
              :disabled="indexSize == null"
              :class="{ frozen: indexSize == null }"
              @click="handleAddToCart(item, item.sizes[indexSize])"
              class="rounded focus:outline-none w-full shadow font-semibold text-white bg-pink-500 hover:bg-pink-700 p-2"
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
import { loadStripe } from "@stripe/stripe-js";
import { timestamp, functions } from "@/firebase/config";
import { watch } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  emits: ["order"],
  props: ["item", "categoryName"],
  setup(props, { emit }) {
    const url = ref(props.item?.images[0].url); // image url
    const qty = ref(1);
    const shipping = ref(2);
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

    const { user } = getUser();
    const { documents: cart } = getDocument(
      "carts",
      user.value?.displayName,
      "items"
    );
    const { addDoc, updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.displayName,
      "items"
    );

    watch(qty, () => {
      const item = props.item;
      discount.value = (item.price * item.discount * qty.value) / 100;
      total.value =
        item.price * qty.value +
        shipping.value -
        (item.price * qty.value * item.discount) / 100;
    });

    const handleCheckout = async (name) => {
      if (!user.value) {
        return router.push({ name: "Login" });
      }

      const checkoutItem = {
        color: url.value,
        name: name,
        qty: qty.value,
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
      });
      const sessionId = await res.data.id;
      stripe.redirectToCheckout({ sessionId });
    };

    const handleAddToCart = async (item, size) => {
      if (!user.value) {
        item.color = item.images[0].url;
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

    const handleActiveSize = (i) => {
      indexSize.value = i;
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
    };
  },
};
</script>

<style></style>
