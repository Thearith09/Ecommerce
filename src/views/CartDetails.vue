<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto my-5 2xl:w-3/4 2xl:mx-auto">
      <div
        class="bg-white 3sm:p-5 3sm:space-y-2 rounded min-w-max 3sm:min-w-0 "
        v-if="carts"
      >
        <div v-for="item in carts" :key="item.id">
          <Cart :item="item" @order="emitOrder" />
        </div>
      </div>

      <div
        v-if="carts?.length <= 0"
        class="relative rounded w-full h-auto my-10 p-5 md:w-3/4 xl:w-1/2 md:mx-auto lg:my-20 border-2 border-gray-200 bg-white"
      >
        <div class="flex justify-center mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 sm:h-28 inline-block p-5 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <div class="text-gray-700 text-sm flex justify-center mt-7 mb-5">
          <h3>Your cart is empty. Keep shopping for your favorite products.</h3>
        </div>

        <div
          @click="handleNavigation"
          class="text-white p-3 mb-24 flex justify-center bg-pink-500 w-2/4 sm:w-1/4 mx-auto cursor-pointer"
        >
          Keep Shopping
        </div>
      </div>
    </div>

    <div class="mt-5">
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
import { useRouter } from "vue-router";
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

    const router = useRouter();
    const { user } = getUser();
    const { _user } = getUserDoc("users");
    const { documents: carts } = getDocument(
      "carts",
      user.value?.displayName,
      "items"
    );
    const { documents: ordersCollection } = getCollection("orders");

    watch(pieces, () => {
      if (pieces.value >= 3) shipping.value = 0;
      else shipping.value = 2;
    });

    const handleNavigation = () => {
      router.push({ name: "Home" });
    };

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
      handleClose,
      handleNavigation,
      emitOrder,
      carts,
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
