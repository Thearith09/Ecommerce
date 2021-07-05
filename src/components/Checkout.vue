<template>
  <div v-if="orders && orders.length > 0">
    <div class="mx-10">
      <div class="text-blue-700 font-bold text-xl py-5 font-mono leading-none">
        {{ orders.length }} order(s) left for checking out
      </div>
    </div>

    <div v-if="paginateOrders" class="relative mx-10">
      <!--for screen greater than 768px-->
      <div v-if="windowWidth >= 768">
        <div
          class="flex items-center text-blue-800 font-semibold h-12 p-2 bg-yellow-200"
        >
          <div class="w-full">Parcel ID</div>

          <div class="w-full">Customer</div>

          <div class="w-full">
            Date
          </div>

          <div class="w-2/4">
            Status
          </div>

          <div class="w-full">
            Payment Method
          </div>

          <div class="w-2/4 leading-none">
            Tracking Order
          </div>
        </div>

        <div class="mb-5" v-for="order in paginateOrders" :key="order.id">
          <div
            class="flex items-center text-blue-800 p-3 h-auto bg-white border-b-2 border-yellow-200 transform transition hover:translate-y-1"
          >
            <div class="w-full">
              <p
                class="break-words md:w-28 lg:w-40 line-clamp-1 lg:hover:line-clamp-4 md:hover:line-clamp-5"
              >
                {{ order.id }}
              </p>
            </div>

            <div class="w-full leading-none">
              <span class="block text-pink-600 font-semibold">{{
                order.shippingInfo?.name
              }}</span>
              <span class="text-sm">{{ order.email }}</span>
            </div>

            <div class="w-full font-semibold">
              {{ date(order.createdAt).format("ddd D, MMMM YYYY") }}
            </div>

            <div class="w-2/4">
              <div
                v-if="order.paymentMethod"
                class="inline-block px-3 py-0.5 text-sm rounded-full bg-opacity-10 bg-green-500 text-green-700"
              >
                {{ order.paymentStatus }}
              </div>
              <div
                v-else
                class="inline-block px-2 py-0.5 text-sm rounded-full bg-opacity-10 bg-pink-500 text-pink-700"
              >
                failed
              </div>
            </div>

            <div
              class="w-full flex flex-col leading-none lg:flex-row lg:items-center lg:space-x-1"
            >
              <div>${{ order.amountTotal / 100 || 0 }}</div>
              <div v-if="order.paymentMethod" class="flex items-center">
                <img
                  class="w-10 h-10"
                  src="@/assets/images/visa128.png"
                  alt=""
                />
                <p>****{{ order.paymentMethod.last4 }}</p>
              </div>
            </div>

            <div class="w-2/4">
              <img
                @click="handleTrackingOrder(order)"
                class="w-10 h-10  cursor-pointer"
                src="https://img.icons8.com/nolan/64/order-shipped.png"
              />
            </div>
          </div>
        </div>
      </div>
      <!--end for screen greater than 768px-->

      <!--for screen less than 768px-->
      <div v-if="windowWidth < 768">
        <div
          v-if="windowWidth >= 640"
          class="flex items-center font-semibold text-blue-800 bg-yellow-200 p-2"
        >
          <div class="w-full">Customer</div>

          <div class="w-full">
            Date
          </div>

          <div class="w-1/3">
            Status
          </div>

          <div class="w-full text-right">
            Payment Method
          </div>
        </div>
        <div
          v-for="order in paginateOrders"
          :key="order.id"
          class="border-b-2 border-yellow-200"
        >
          <div
            class="my-5 transform transition hover:translate-y-1 items-center"
          >
            <div>
              <div
                v-if="windowWidth >= 640"
                class="flex flex-col justify-between space-y-2"
              >
                <div class="flex items-center text-blue-800">
                  <div class="w-full leading-none">
                    <span class="block text-pink-600 font-semibold">{{
                      order.shippingInfo?.name
                    }}</span>
                    <span class="block text-sm">{{ order.email }}</span>
                  </div>

                  <div class="w-full font-semibold">
                    {{ date(order.createdAt).format("ddd D, MMMM YYYY") }}
                  </div>

                  <div class="w-1/3">
                    <div
                      v-if="order.paymentMethod"
                      class="inline-block px-3 py-0.5 text-sm rounded-full bg-opacity-10 bg-green-500 text-green-700"
                    >
                      {{ order.paymentStatus }}
                    </div>
                    <div
                      v-else
                      class="inline-block px-2 py-0.5 text-sm rounded-full bg-opacity-10 bg-pink-500 text-pink-700"
                    >
                      "failed"
                    </div>
                  </div>

                  <div class="w-full flex flex-col items-end leading-none">
                    <div>${{ order.amountTotal / 100 }}</div>
                    <div class="flex items-center">
                      <img
                        class="w-10 h-10"
                        src="@/assets/images/visa128.png"
                        alt=""
                      />
                      <p>****{{ order.paymentMethod.last4 }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-blue-800 pb-2">
                <fieldset class="border-2 border-yellow-200 rounded p-2">
                  <legend class="text-xs">Parcel ID</legend>
                  <p
                    class="text-left break-words w-40 line-clamp-1 hover:line-clamp-4"
                  >
                    {{ order.id }}
                  </p>
                </fieldset>

                <fieldset class="border-2 border-yellow-200 rounded p-2">
                  <legend class="text-xs">Customer</legend>
                  <span class="block text-pink-600 font-semibold">{{
                    order.shippingInfo?.name
                  }}</span>
                  <span class="block text-sm">{{ order.email }}</span>
                </fieldset>

                <fieldset class="border-2 border-yellow-200 rounded p-2">
                  <legend class="text-xs">Date</legend>
                  <p class="break-words">
                    {{ date(order.createdAt).format("ddd D, MMMM YYYY") }}
                  </p>
                </fieldset>

                <fieldset class="border-2 border-yellow-200 rounded p-2">
                  <legend class="text-xs">Status</legend>
                  <div
                    v-if="order.paymentMethod"
                    class="inline-block px-3 py-0.5 text-sm rounded-full bg-opacity-10 bg-green-500 text-green-700"
                  >
                    {{ order.paymentStatus }}
                  </div>
                  <div
                    v-else
                    class="inline-block px-2 py-0.5 text-sm rounded-full bg-opacity-10 bg-pink-500 text-pink-700"
                  >
                    "failed"
                  </div>
                </fieldset>

                <fieldset
                  class="flex items-center border-2 border-yellow-200 rounded p-2 leading-none"
                >
                  <legend class="text-xs">Payment Method</legend>
                  <div>${{ order.amountTotal / 100 }}</div>
                  <div class="flex items-center">
                    <img
                      class="w-10 h-10"
                      src="@/assets/images/visa128.png"
                      alt=""
                    />
                    <p>****{{ order.paymentMethod?.last4 }}</p>
                  </div>
                </fieldset>
              </div>

              <div
                class="flex flex-col space-y-2 sm:flex-row sm:justify-between"
              >
                <fieldset
                  v-if="windowWidth >= 640"
                  class="border-2 border-yellow-200 rounded p-3 text-blue-800"
                >
                  <legend class="text-xs">Parcel ID</legend>
                  <p
                    class="text-left break-words w-40 line-clamp-1 hover:line-clamp-4"
                  >
                    {{ order.id }}
                  </p>
                </fieldset>
                <div
                  @click="handleTrackingOrder(order)"
                  class="bg-pink-600 hover:bg-pink-700 py-1 px-12 cursor-pointer h-8 text-white rounded text-center"
                >
                  Tracking Order
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end for screen less than 768px-->

    <div
      v-if="orders?.length > 0"
      class="flex items-center w-1/4 mx-auto space-x-2 py-5 md:pb-10"
    >
      <button
        @click="handlePrevious(orders.length)"
        :class="{ frozen: previous <= 0 }"
        :disabled="previous <= 0"
        class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-blue-600 text-blue-600 flex justify-center hover:text-blue-700 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 lg:w-9 lg:h-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="flex items-center">
        <ul
          v-for="i in Math.ceil(orders.length / 10)"
          :key="i"
          v-show="i >= start && i <= end"
          class="flex items-center px-2 text-blue-600 font-bold lg:text-lg"
        >
          <li class="px-1" :class="{ activePaginate: i == indexActive }">
            {{ i }}
          </li>
        </ul>
      </div>
      <button
        @click="handleNext(orders.length)"
        :class="{ frozen: next >= Math.ceil(orders.length / 10) }"
        :disabled="next >= Math.ceil(orders.length / 10)"
        class="h-8 w-8 lg:h-9 lg:w-9 rounded-full focus:outline-none border-2 border-blue-600 text-blue-600 hover:text-blue-700 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 lg:h-9 lg:w-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>

  <div
    v-if="orders?.length <= 0"
    class="flex justify-center items-center my-10"
  >
    <div
      class="w-96 space-y-5 p-5 rounded-md border-2 border-yellow-200 flex flex-col items-center justify-center"
    >
      <div>
        <img
          class="w-16 h-16"
          src="@/assets/images/empty.png"
          alt="empty orders icon"
        />
      </div>
      <div class="text-blue-800 font-semibold">
        There is no orders left!
      </div>
      <router-link
        :to="{ name: 'Home' }"
        class="bg-blue-600 text-white hover:bg-blue-700 py-1 px-12"
      >
        Back
      </router-link>
    </div>
  </div>

  <div
    v-if="showModal"
    class="inset-0 w-full h-screen fixed bg-gray-900 bg-opacity-50 z-40"
  >
    <div class="flex justify-center items-center h-full">
      <div
        class="flex flex-col items-center justify-center w-96 h-auto bg-white rounded-md p-8"
      >
        <div
          class="w-full flex items-center space-x-14 py-5 my-5 h-12 text-white bg-pink-600 rounded"
        >
          <div
            @click="handleClose"
            class="cursor-pointer transform transition hover:-translate-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
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
          <div class="font-bold text-lg font-mono">
            DELIVERY STATUS
          </div>
        </div>

        <div class="font-semibold text-blue-900">
          <span>
            {{ date().format("MMMM Do YYYY, h:mm:ss a") }}
          </span>
        </div>

        <div class="my-5 py-5 px-5 w-80 shadow rounded-md">
          <div class="flex pb-3 justify-between  border-b-2 border-yellow-200">
            <h3 class="font-semibold text-gray-700">
              Tracking Order
            </h3>
            <p class="text-blue-600 font-mono tracking-wide">
              {{ last5digitOrderId }}
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

            <span class="absolute w-60 left-10 -top-2 text-gray-700"
              >Pick-Up Payment Accepted</span
            >
            <span
              v-if="acceptedTime"
              class="flex items-center text-blue-800 space-x-1 text-xs absolute w-60 left-10 top-4"
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

            <span class="absolute w-60 left-10 bottom-2 text-gray-700"
              >Item packed & ready to deliver</span
            >
            <span
              v-if="packedTime"
              class="flex items-center text-blue-800 space-x-1 text-xs absolute w-60 left-10 -bottom-2"
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
              class="bg-blue-500 h-32 absolute left-1 top-0 rounded-full"
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
                  !user.delivery ||
                  deliveredTime ||
                  !acceptedTime ||
                  !packedTime
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

            <span class="absolute w-40 left-10 bottom-2 text-gray-700"
              >Parcel delivered</span
            >
            <span
              v-if="deliveredTime"
              class="flex items-center space-x-1 text-blue-800 text-xs absolute w-60 left-10 -bottom-2"
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
              class="bg-blue-500 h-32 absolute left-1 top-0"
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
            class="focus:outline-none tracking-wide rounded py-2 w-full bg-pink-600 text-white hover:bg-pink-700"
          >
            Remove
          </button>
          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded shadow p-2 tracking-wide bg-pink-600 text-white w-full"
          >
            <div>
              Removing...
            </div>
            <div class="absolute top-3 right-2">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-white"
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
            class="focus:outline-none tracking-wide rounded py-2 w-full bg-pink-600 text-white hover:bg-pink-700"
          >
            Complete
          </button>
          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded shadow p-2 tracking-wide bg-pink-600 text-white w-full"
          >
            <div>
              Saving...
            </div>
            <div class="absolute top-3 right-2">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-white"
              ></div>
            </div>
          </button>
        </div>

        <div
          class="mb-5 mt-10 py-5 w-full flex items-center justify-center shadow rounded-md"
        >
          <img src="@/assets/images/logo.png" alt="easy4shopping logo" />
        </div>
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
import { onMounted, watchEffect } from "@vue/runtime-core";

export default {
  props: ["orders"],
  setup() {
    const date = moment;
    const ordered = ref(null);
    const last5digitOrderId = ref(null);
    const acceptedTime = ref(null);
    const packedTime = ref(null);
    const deliveredTime = ref(null);
    const start = ref(1);
    const end = ref(5);
    const previous = ref(0);
    const pending = ref(false);
    const next = ref(1);
    const indexActive = ref(1);
    const paginateOrders = ref(null);
    const windowWidth = ref(window.innerWidth);
    const showModal = ref(false);

    const store = useStore();
    const { user } = getUser();
    const {
      documents: ordersCollection,
      nextPage,
      previousPage,
    } = getCollection("orders", 10);
    const { deleteDoc } = useCollection("orders");
    const { addDoc, isPending } = useCollection("reports");

    watchEffect(() => {
      paginateOrders.value = ordersCollection?.value;
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handlePrevious = async (limitedDecrement) => {
      paginateOrders.value = await previousPage();

      limitedDecrement = Math.ceil(limitedDecrement / 10);
      if (end.value > 10) {
        start.value--;
        end.value--;
      }

      next.value--;
      previous.value--;

      indexActive.value--;
    };
    const handleNext = async (limitedIncrement) => {
      paginateOrders.value = await nextPage();

      limitedIncrement = Math.ceil(limitedIncrement / 10);
      if (end.value < limitedIncrement) {
        start.value++;
        end.value++;
      }

      next.value++;
      previous.value++;

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
      user,
      showModal,
      date,
      paginateOrders,
      last5digitOrderId,
      acceptedTime,
      packedTime,
      deliveredTime,
      ordered,
      start,
      end,
      previous,
      next,
      indexActive,
      handleNext,
      windowWidth,
      isPending,
      pending,
      handlePrevious,
      handleClose,
      handleTrackingOrder,
      handleTrackingParcel,
      handleCompleteOrder,
      handleRemoveFailedPayment,
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
