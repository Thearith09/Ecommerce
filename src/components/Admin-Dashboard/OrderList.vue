<template>
  <div
    v-if="orders && orders.length > 0 && !showModal"
    class="pt-8 px-5 md:px-10 lg:px-16 mx-auto h-auto overflow-auto"
  >
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 text-sm font-medium pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          {{ $t("Dashboard") }}
        </p>
        <p>/</p>
        <p>
          {{ $t("Orders") }}
        </p>
      </div>
      <div class="font-bold text-xl text-gray-900 font-serif">
        {{ $t("Orders") }}
      </div>
    </div>

    <div
      class="relative shadow border rounded bg-white min-w-tablet max-h-itemList overflow-auto"
    >
      <div>
        <div
          class="flex items-center font-semibold h-12 px-5 py-10 border-b bg-gray-900 text-white rounded-t border-gray-300"
        >
          <div class="w-2/4">Parcel ID</div>

          <div class="w-full">
            Date
          </div>

          <div class="w-full">Customers</div>

          <div class="w-2/4">
            Status
          </div>

          <div class="w-2/4">
            Items
          </div>

          <div class="w-2/4">
            Amount
          </div>

          <div class="w-2/4 leading-none">
            Tracking Orders
          </div>
        </div>

        <div
          v-for="(order, i) in orders"
          :key="order.id"
          v-show="i >= start && i < end"
        >
          <div
            class="flex items-center text-gray-700 font-medium p-5 h-auto bg-white border-b border-gray-200 text-sm"
          >
            <div
              @click="handleSwitchingComponent('OrderDetails', order)"
              class="w-2/4 cursor-pointer hover:underline"
            >
              <p>
                #{{ order.id.substring(order.id.length - 5, order.id.length) }}
              </p>
            </div>

            <div class="w-full">
              {{ date(order.createdAt.toDate()).format("ddd D, MMMM YYYY") }}
            </div>

            <div
              @click="handleSwitchingComponent('OrderDetails', order)"
              class="w-full leading-none text-purple-600 capitalize hover:underline cursor-pointer"
            >
              <p v-if="order.shippingInfo?.name">
                {{ order.shippingInfo?.name }}
              </p>
              <p v-else>
                anonymous
              </p>
            </div>

            <div class="w-2/4">
              <div
                v-if="order.paymentMethod"
                class="inline-block px-5 py-1 text-sm capitalize ounded bg-opacity-10 bg-green-500 text-green-700"
              >
                {{ order.paymentStatus }}
              </div>
              <div
                v-else
                class="inline-block px-5 py-1 text-sm rounded bg-opacity-10 bg-pink-500 text-pink-700"
              >
                Failed
              </div>
            </div>

            <div class="w-2/4">
              <div>{{ order.items?.length }} items</div>
            </div>

            <div class="w-2/4">
              <div>${{ order.amountTotal / 100 || 0 }}</div>
            </div>

            <div class="w-2/4">
              <i
                @click="handleTrackingOrder(order)"
                class="fas fa-truck text-lg text-purple-600 cursor-pointer bg-purple-100 p-3 rounded"
              ></i>
            </div>
          </div>
        </div>

        <div class="h-20 flex justify-between items-center px-5">
          <div class="flex space-x-1">
            <button
              @click="handlePrevious(orders.length)"
              :class="{ frozen: start <= 0 }"
              :disabled="start <= 0"
              class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
            >
              previous
            </button>
            <div class="flex items-center space-x-1">
              <ul
                v-for="i in Math.ceil(orders.length / limitedPerPage)"
                :key="i"
                v-show="i >= previous && i <= next"
                class="flex items-center text-gray-900 font-bold bg-gray-100"
              >
                <li
                  class="rounded px-3 py-1"
                  :class="{ activePaginateForAdminPage: i == indexActive }"
                >
                  {{ i }}
                </li>
              </ul>
            </div>

            <button
              @click="handleNext(orders.length)"
              :class="{
                frozen: end >= Math.ceil(orders.length),
              }"
              :disabled="end >= Math.ceil(orders.length)"
              class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
            >
              Next
            </button>
          </div>

          <div class="flex space-x-1 items-center">
            <p class="font-medium">
              Showing {{ pageFrom }} to {{ pageTo }} of {{ orders.length }} /
              Row per page
            </p>
            <select
              class="form-select bg-white border border-gray-200 cursor-pointer  text-gray-700 px-3 py-1 focus:outline-none rounded"
              v-model="limitedPerPage"
            >
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="orders?.length <= 0"
    class="pt-8 px-5 md:px-10 lg:px-16 mx-auto h-auto overflow-auto"
  >
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 text-sm font-medium pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          Dashboard
        </p>
        <p>/</p>
        <p>
          Orders
        </p>
      </div>
      <div class="font-bold text-xl text-gray-900 font-serif">
        Orders
      </div>
    </div>
    <div
      class="w-96 space-y-5 p-10 rounded border-2 border-gray-200 flex flex-col items-center justify-center"
    >
      <div>
        <img
          class="w-16 h-16"
          src="@/assets/images/empty.png"
          alt="empty orders icon"
        />
      </div>
      <div class="text-purple-900 font-semibold">
        There is no orders left!
      </div>
    </div>
  </div>

  <div
    v-if="showModal"
    class="pt-8 w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto h-auto"
  >
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 text-sm font-medium pb-2"
      >
        <div
          @click="handleSwitchingComponent('Dashboard')"
          class="cursor-pointer hover:underline"
        >
          Dashboard
        </div>
        <p>/</p>
        <div @click="showModal = false" class="cursor-pointer hover:underline">
          Orders
        </div>
        <p>/</p>
        <p>tracking orders #{{ last5digitOrderId }}</p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900">
        Tracking Orders
      </div>
    </div>

    <div
      v-if="user"
      class="flex flex-col items-center justify-center h-auto bg-white shadow rounded border p-8"
    >
      <div
        class="w-full py-10 flex justify-center items-center my-5 h-12 text-purple-700 shadow-inner border bg-white rounded"
      >
        <div class="font-bold text-xl capitalize tracking-wider">
          Tracking Orders
        </div>
      </div>

      <div
        class="font-semibold text-purple-900 text-sm shadow-inner border w-full py-3 rounded text-center"
      >
        <span>
          {{ liveTimeStamp }}
        </span>
      </div>

      <div class="my-5 py-5 px-5 w-full shadow-inner border rounded">
        <div class="flex pb-3 justify-between  border-b-2 border-purple-100">
          <h3 class="font-semibold text-gray-700">
            Order ID
          </h3>
          <p class="text-purple-900 font-mono tracking-wide">
            #{{ last5digitOrderId }}
          </p>
        </div>

        <div class="mt-5 w-2 relative">
          <button
            :disabled="!user.admin || acceptedTime != null"
            @click="handleTrackingParcel('acceptedTime')"
            class="flex justify-center items-center bg-red-600 h-6 w-6 absolute top-0 -ml-3 -mt-1 z-10 shadow rounded-full cursor-pointer"
            :style="{
              cursor: !user.admin || acceptedTime ? 'not-allowed' : 'pointer',
            }"
            style="left: 50%"
          >
            <svg
              v-if="acceptedTime"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <span class="absolute w-60 left-10 -top-2 text-gray-700 font-mono"
            >Pick-Up Payment Accepted</span
          >
          <span
            v-if="acceptedTime"
            class="flex items-center text-purple-900 space-x-1 text-xs absolute w-60 left-10 top-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ acceptedTime }}</span>
          </span>
        </div>

        <div class="h-32 w-2 rounded-full relative">
          <button
            :disabled="!user.packer || packedTime != null || !acceptedTime"
            @click.once="handleTrackingParcel('packedTime')"
            class="bg-yellow-400  h-6 w-6 absolute bottom-0 -ml-3 -mt-1 z-10 shadow rounded-full cursor-pointer"
            :style="{
              cursor:
                !user.packer || packedTime || !acceptedTime
                  ? 'not-allowed'
                  : 'pointer',
            }"
            style="left: 50%"
          >
            <img
              v-if="packedTime"
              src="@/assets/images/pack.svg"
              alt="packed icon"
            />
          </button>

          <span class="absolute w-72 left-10 bottom-2 text-gray-700 font-mono"
            >Item packed & ready to deliver</span
          >
          <span
            v-if="packedTime"
            class="flex items-center text-purple-900 space-x-1 text-xs absolute w-60 left-10 -bottom-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ packedTime }}</span>
          </span>
          <span
            class="bg-purple-700 h-32 absolute left-1 top-0 rounded-full"
            :style="{
              border: packedTime ? '1px dashed white' : '0%',
            }"
          ></span>
        </div>

        <div class="h-32 w-2 relative">
          <button
            :disabled="!user.delivery || deliveredTime != null || !packedTime"
            @click.once="handleTrackingParcel('deliveredTime')"
            class="bg-green-400 h-6 w-6 absolute bottom-0 -ml-3 -mt-1 z-10 shadow rounded-full cursor-pointer"
            :style="{
              cursor:
                !user.delivery || deliveredTime || !acceptedTime || !packedTime
                  ? 'not-allowed'
                  : 'pointer',
            }"
            style="left: 50%"
          >
            <img
              v-if="deliveredTime"
              src="@/assets/images/delivery.svg"
              alt="delivery icon"
            />
          </button>

          <span class="absolute w-40 left-10 bottom-2 text-gray-700 font-mono"
            >Parcel delivered</span
          >
          <span
            v-if="deliveredTime"
            class="flex items-center space-x-1 text-purple-900 text-xs absolute w-60 left-10 -bottom-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ deliveredTime }}</span>
          </span>

          <span
            class="bg-purple-700 h-32 absolute left-1 top-0"
            :style="{
              border: deliveredTime ? '1px dashed white' : '0%',
            }"
          ></span>
        </div>
      </div>
      <div v-if="!ordered.paymentStatus && user?.admin" class="w-full">
        <button
          v-if="!pending"
          @click="handleRemoveFailedPayment"
          class="focus:outline-none tracking-wide rounded font-medium py-2 w-full bg-white text-purple-700 shadow-inner border hover:bg-purple-100"
        >
          Remove
        </button>
        <button
          v-else
          class="relative flex justify-center items-center font-medium focus:outline-none rounded shadow-inner border p-2 tracking-wide bg-white text-purple-700 w-full"
        >
          <div>
            Removing...
          </div>
          <div class="absolute top-3 right-2">
            <div
              class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-700"
            ></div>
          </div>
        </button>
      </div>

      <div
        v-if="user.admin && acceptedTime && packedTime && deliveredTime"
        class="w-full"
      >
        <button
          v-if="!isPending"
          @click="handleCompleteOrder"
          class="focus:outline-none tracking-wide rounded py-2 w-full shadow-inner border font-medium bg-white text-purple-700 hover:bg-purple-100"
        >
          Complete
        </button>
        <button
          v-else
          class="relative flex justify-center items-center focus:outline-none rounded shadow-inner border p-2 tracking-wide bg-white text-purple-700 font-medium w-full"
        >
          <div>
            Saving...
          </div>
          <div class="absolute top-3 right-2">
            <div
              class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-700"
            ></div>
          </div>
        </button>
      </div>

      <div
        class="mb-5 mt-10 py-5 w-full flex items-center justify-center shadow-inner border rounded"
      >
        <img src="@/assets/images/logo1.png" alt="easy4shopping logo" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import getCollection from "@/composables/getCollection";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";

export default {
  setup(props, { emit }) {
    const date = moment;
    const ordered = ref(null);
    const last5digitOrderId = ref(null);
    const acceptedTime = ref(null);
    const packedTime = ref(null);
    const deliveredTime = ref(null);
    const pending = ref(false);
    const indexActive = ref(1);
    const windowWidth = ref(window.innerWidth);
    const showModal = ref(false);
    const liveTimeStamp = ref(null);

    const limitedPerPage = ref(5);
    const start = ref(0);
    const end = ref(limitedPerPage.value);
    const pageFrom = ref(1);
    const pageTo = ref(end.value);
    const previous = ref(1);
    const next = ref(5);

    const store = useStore();
    const { user } = getUser();
    const { documents: orders } = getCollection("orders");

    const { deleteDoc } = useCollection("orders");
    const { addDoc, isPending } = useCollection("reports");

    watch(limitedPerPage, () => {
      end.value = parseInt(limitedPerPage.value);
      start.value = 0;
      pageTo.value = end.value;
      pageFrom.value = 1;
      previous.value = 1;
      next.value = 5;
      indexActive.value = 1;
    });

    watch(pageTo, () => {
      if (pageTo.value >= orders.value.length)
        pageTo.value = orders.value.length;
      else {
        pageTo.value = end.value;
      }
    });

    onMounted(() => {
      window.addEventListener("resize", onResize);
      setInterval(() => {
        liveTimeStamp.value = moment().format("dddd Do, MMM YYYY, h:mm:ss A");
      }, 1000);
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    const handleSwitchingComponent = (component, order) => {
      emit("onSwitchingComponent", component, order);
    };

    const handlePrevious = async (limitedDecrement) => {
      limitedDecrement = Math.ceil(limitedDecrement / limitedPerPage.value);
      if (next.value > 5) {
        next.value--;
        previous.value--;
      }

      start.value -= parseInt(limitedPerPage.value);
      end.value -= parseInt(limitedPerPage.value);

      pageFrom.value -= parseInt(limitedPerPage.value);
      pageTo.value -= parseInt(limitedPerPage.value);

      indexActive.value--;
    };
    const handleNext = (limitedIncrement) => {
      limitedIncrement = Math.ceil(limitedIncrement / limitedPerPage.value);
      if (next.value < limitedIncrement) {
        next.value++;
        previous.value++;
      }

      start.value += parseInt(limitedPerPage.value);
      end.value += parseInt(limitedPerPage.value);

      pageFrom.value += parseInt(limitedPerPage.value);
      pageTo.value += parseInt(limitedPerPage.value);

      indexActive.value++;
    };

    const handleTrackingOrder = (order) => {
      showModal.value = true;
      last5digitOrderId.value = order.id.substring(
        order.id.length - 5,
        order.id.length
      );
      ordered.value = order;
      setTimeforTrackingParcel();
    };

    const setTimeforTrackingParcel = () => {
      deliveredTime.value = null;
      packedTime.value = null;
      acceptedTime.value = null;

      let parcel;
      store.state.trackingDate?.forEach((box) => {
        if (box.id == last5digitOrderId.value) parcel = box;
      });

      acceptedTime.value = parcel?.acceptedTime;
      packedTime.value = parcel?.packedTime;
      deliveredTime.value = parcel?.deliveredTime;
    };

    const handleClose = () => {
      last5digitOrderId.value = null;
      showModal.value = false;
    };

    const handleTrackingParcel = (name) => {
      store.commit("addTrackingDate", {
        parcelID: last5digitOrderId.value,
        name: name,
        value: date().format("ddd MM YYYY, h:mm"),
      });
      setTimeforTrackingParcel();
      console.log(store.state.trackingDate);
      // store.commit("removeTrackingDate", { parcelID: last5digitOrderId.value });
    };

    const handleRemoveFailedPayment = async () => {
      pending.value = true;
      await deleteDoc(ordered.value.id);
      store.commit("removeTrackingDate", { parcelID: last5digitOrderId.value });
      pending.value = false;
      showModal.value = false;
    };

    const handleCompleteOrder = async () => {
      const order = ordered.value;
      const checkoutOrder = {
        admin: user.value?.displayName,
        name: order?.id,
        userContact: {
          phone: order?.phone,
          email: order.email,
        },
        amount: order?.amountTotal / 100,
        paymentMethod: order?.paymentMethod,
        paymentStatus: order?.paymentStatus,
        items: order?.items,
        shippingInfo: order?.shippingInfo,
        createdAt: timestamp(),
      };
      await addDoc(checkoutOrder);
      await deleteDoc(order.id);
      store.commit("removeTrackingDate", { parcelID: last5digitOrderId.value });
      showModal.value = false;
    };

    return {
      orders,
      user,
      showModal,
      date,
      liveTimeStamp,
      last5digitOrderId,
      acceptedTime,
      packedTime,
      deliveredTime,
      ordered,
      start,
      end,
      pageFrom,
      pageTo,
      previous,
      next,
      indexActive,
      handleNext,
      windowWidth,
      isPending,
      pending,
      limitedPerPage,
      handlePrevious,
      handleClose,
      handleTrackingOrder,
      handleTrackingParcel,
      handleCompleteOrder,
      handleRemoveFailedPayment,
      handleSwitchingComponent,
    };
  },
};
</script>

<!--
<style>
.br {
  border-bottom: 10px solid transparent;
  border-top: 10px solid transparent;
  border-left: 26px solid #fbcfe8;
}
</style>
-->
