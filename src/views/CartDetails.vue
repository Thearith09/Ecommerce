<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>
    <div class="mb-auto">
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
            ><span
              v-if="pieces && pieces < 3"
              class="text-gray-700 font-semibold"
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
    </div>
    <div>
      <Footer />
    </div>
  </div>
  <component
    :is="currentComponent"
    :orders="orders"
    @close="handleClose"
    :invoiceNum="ordersCollection?.length || 0"
  />
</template>

<script>
import getDocument from "@/composables/getDocument";
import getUserDoc from "@/composables/getUserDoc";
import getCollection from "@/composables/getCollection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getUser from "@/composables/getUser";
import Cart from "@/components/Cart.vue";
import PrintInvoice from "@/components/PrintInvoice";
import { ref } from "@vue/reactivity";
import { watch } from "vue";

export default {
  components: {
    Navbar,
    Footer,
    Cart,
    PrintInvoice,
  },
  setup() {
    const total = ref(null);
    const items = ref([]);
    const pieces = ref(0);
    const shipping = ref(2);
    const orders = ref(null);
    const currentComponent = ref("");

    const { user } = getUser();
    const { _user } = getUserDoc("users");
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { documents: ordersCollection } = getCollection("orders");

    watch(pieces, () => {
      if (pieces.value >= 3) shipping.value = 0;
      else shipping.value = 2;
    });

    const handleClose = (completed) => {
      if (completed) {
        total.value = null;
        items.value = [];
        pieces.value = 0;
        shipping.value = 2;
        orders.value = null;
      }
      currentComponent.value = "";
    };

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
          piecesTemp += parseFloat(item.qty);
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
      //insert into orders if the item.size and item.qty exist
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
      if (order.items.length > 0) {
        currentComponent.value = "PrintInvoice";
      }
    };

    return {
      handleOrder,
      emitOrder,
      handleClose,
      cart,
      total,
      items,
      pieces,
      shipping,
      _user,
      currentComponent,
      orders,
      ordersCollection,
    };
  },
};
</script>

<style></style>
