<template>
  <Navbar />
  <div
    v-if="cart && cart.items.length > 0"
    class="grid grid-cols-4 grid-flow-col bg-gray-100 gap-4 m-5"
  >
    <div class="row-span-2 col-span-3 shadow-md">
      <div
        class="border-t-2 border-b-2 border-gray-100"
        v-for="item in cart.items"
        :key="item.productId"
      >
        <Cart :item="item" @order="emitOrder" />
      </div>
    </div>
    <div class="col-span-1 p-3 bg-white overflow-hidden shadow-md">
      <div v-if="pieces > 0" class="flex justify-between my-5">
        <p class="text-gray-400 underline">{{ pieces }}Pieces</p>
        <p class="text-gray-700">{{ total?.toFixed(2) }}</p>
      </div>
      <div v-if="pieces > 0" class="my-5">
        <div v-if="pieces < 3" class="flex justify-between">
          <p class="text-gray-400">Shipping</p>
          <p class="text-gray-700">{{ shipping.toFixed(2) }}</p>
        </div>
        <div v-else class="flex justify-between">
          <p class="text-gray-400">Free Shipping</p>
          <p class="text-gray-700">0.00</p>
        </div>
      </div>
      <hr />
      <p class="flex justify-between my-5">
        <span class="text-gray-400 font-semibold">Order Amount: </span
        ><span v-if="pieces && pieces < 3" class="text-gray-700 font-semibold"
          >USD {{ (total + shipping)?.toFixed(2) }}</span
        >
        <span v-else class="text-gray-700 font-semibold">
          USD
          {{ total?.toFixed(2) }}
        </span>
      </p>
      <div>
        <button
          @click="handleOrder"
          class="focus:outline-none active:bg-pink-500 active:text-white bg-white shadow-lg p-2 flex justify-center items-center cursor-pointer w-full text-pink-500 font-semibold hover:text-pink-600"
        >
          Order Now
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUserDoc from "@/composables/getUserDoc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getUser from "@/composables/getUser";
import Cart from "@/components/Cart.vue";
import { ref } from "@vue/reactivity";
import { watch } from "vue";

export default {
  components: {
    Navbar,
    Footer,
    Cart,
  },
  setup() {
    const total = ref(null);
    const items = ref([]);
    const pieces = ref(0);
    const shipping = ref(2);

    const { user } = getUser();
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { updateDoc: updateCart } = useDocument("carts", user.value?.uid);
    const { _user } = getUserDoc("users");

    watch(pieces, () => {
      if (pieces.value >= 3) shipping.value = 0;
      else shipping.value = 2;
    });

    const emitOrder = (e) => {
      for (let doc of e) {
        if (doc) {
          const index = items.value.findIndex(
            (item) => item.id == doc.id && item.color == doc.color
          );
          if (index != -1) {
            items.value[index] = doc;
          } else {
            items.value.push(doc);
          }
        }
      }
      handleTotal();
    };

    const handleTotal = () => {
      //total price for each cart
      let totalTemp = 0;
      let piecesTemp = 0;
      for (let item of items.value) {
        if (item && item.qty > 0 && item.size) {
          piecesTemp += item.qty;
          totalTemp +=
            item.price * item.qty -
            (item.discount * item.price * item.qty) / 100;
        } else {
          piecesTemp = piecesTemp;
          totalTemp = totalTemp;
        }
      }
      pieces.value = piecesTemp;
      total.value = totalTemp;
    };

    const handleOrder = async () => {
      let tempItems = cart.value.items.filter((doc) => {
        let temp;
        items.value.forEach((item) => {
          if (item.id == doc.productId && item.qty > 0 && item.size) {
            temp = item;
          }
        });
        if (!temp) return doc;
      });
      await updateCart({
        items: [...tempItems],
      });
      const order = {
        name: user.value.displayName,
        tel: _user.value.telephone,
        facebook: _user.value.facebook,
        telegram: _user.value.telegram,
        items: items.value,
        shipping: shipping.value,
      };
      console.log(order);
    };

    return {
      handleOrder,
      emitOrder,
      cart,
      total,
      items,
      pieces,
      shipping,
      _user,
    };
  },
};
</script>

<style></style>
