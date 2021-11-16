<template>
  <div class="pt-8 px-5 lg:px-16">
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 font-medium text-sm pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          Dashboard
        </p>
        <p>/</p>
        <p
          @click="handleSwitchingComponent('UserList')"
          class="hover:underline cursor-pointer"
        >
          Users
        </p>
        <p>/</p>
        <p>{{ user.displayName }}</p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900">
        {{ user.displayName }}
      </div>
    </div>

    <div
      class="relative w-full flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5"
    >
      <div
        class="shadow bg-white w-full md:w-5/12 h-phoneHeight border p-10 space-y-5"
      >
        <div
          class="border-b border-gray-300 flex flex-col justify-center items-center pb-5 font-mono font-semibold"
        >
          <img
            class="overflow-hidden rounded-full border border-purple-600 w-16 h-16 object-cover object-center block transform scale-150"
            :src="user.photoURL"
            alt=""
          />
          <div class="pt-5 text-lg">
            {{ user.displayName }}
          </div>
          <div class="text-purple-700">
            {{ user.email }}
          </div>
          <div class="text-purple-700">
            {{ phone }}
          </div>
        </div>
        <div class="space-y-3">
          <div class="font-semibold text-gray-700">
            <p>Last order</p>
            <div
              v-if="lastOrderDate > 0"
              class="text-gray-400 font-normal text-sm flex"
            >
              <p>{{ date(lastOrderDate.toDate()).fromNow() }} -</p>
              &nbsp;
              <p
                @click="handleSwitchingComponent('orderDetails', lastOrder)"
                class="text-purple-700 cursor-pointer hover:underline"
              >
                #{{
                  lastOrderId.substring(
                    lastOrderId.length - 5,
                    lastOrderId.length
                  )
                }}
              </p>
            </div>
            <div v-else class="text-gray-400 font-normal text-sm capitalize">
              No Orders
            </div>
          </div>

          <div class="font-semibold text-gray-700">
            <p>Average per purchase</p>
            <p class="text-gray-400 font-normal text-sm">
              ${{
                averagePurchased
                  ? (averagePurchased / totalLengthPurchase).toFixed(2)
                  : "0.00"
              }}
            </p>
          </div>

          <div class="font-semibold text-gray-700">
            <p>Registered</p>
            <p class="text-gray-400 font-normal text-sm">
              {{ date(user.metadata?.creationTime).format("MMM D, YYYY") }}
            </p>
          </div>

          <div class="font-semibold text-gray-700">
            <p>Last Signin</p>
            <p class="text-gray-400 font-normal text-sm">
              {{
                date(user.metadata?.lastSignInTime).format(
                  "MMM D, YYYY-HH:mm:ss A"
                )
              }}
            </p>
          </div>

          <div class="font-semibold text-gray-700">
            <p>Email Marketing</p>
            <p class="text-gray-400 font-normal text-sm capitalize">
              not subcribed
            </p>
          </div>
        </div>
      </div>

      <div class="w-full md:w-7/12 space-y-5">
        <div
          v-if="staff?.admin"
          class="relative shadow bg-white h-auto border p-5"
        >
          <div
            v-if="failedMessage"
            class="animate__animated animate__fadeInDown flex justify-center items-center text-red-600 absolute top-0 left-0 rounded-t w-full bg-red-100 z-40 p-5"
          >
            {{ failedMessage }}
          </div>
          <h1 class="pb-3 text-lg font-semibold capitalize">Promote a User</h1>
          <form @submit.prevent="handlePromoteUser">
            <div class="w-full h-full space-y-5">
              <div class="relative w-full z-0">
                <input
                  v-model="user.email"
                  type="email"
                  name="email"
                  disabled
                  placeholder="Email"
                  required
                  class="w-full p-2 border border-gray-300 opacity-50 rounded cursor-not-allowed focus:outline-none"
                />
              </div>
              <div class="text-gray-700">
                <label for="">User roles:</label>
                <select
                  required
                  v-model="role"
                  class="text-gray-500 rounded border px-3 py-1 mx-3 focus:shadow focus:border-gray-500 focus:outline-none"
                >
                  <option value="" selected disabled hidden>
                    Select an Option
                  </option>
                  <option value="admin">Admin</option>
                  <option value="packer">Packer</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              <div v-if="!succeedMessage">
                <button
                  v-if="!pending"
                  class="focus:outline-none rounded tracking-wide w-full p-2 border hover:bg-purple-700 hover:text-white bg-white text-purple-700"
                >
                  Promote a user
                </button>
                <button
                  v-else
                  class="relative flex justify-center items-center focus:outline-none rounded tracking-wide bg-white border border-purple-700 cursor-wait w-full p-2 text-purple-700"
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
              <div v-else>
                <button
                  class="flex justify-center items-center rounded bg-green-400 bg-opacity-80 focus:outline-none tracking-wide border w-full py-1"
                >
                  <svg
                    class="animate_animated animate__bounceIn animate__delay-2s text-white h-9 w-9 p-px rounded-full fill-current"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="shadow bg-white h-auto border max-h-dropdown overflow-auto">
          <div
            class="p-5 text-lg font-semibold border-b flex items-center justify-between"
          >
            <div class="capitalize">Orders</div>
            <div v-if="totalPurchased > 0" class="text-gray-400 text-sm">
              Total spent ${{ totalPurchased }} for
              {{ totalLengthPurchase }} orders.
            </div>
          </div>

          <div
            v-if="
              (orderList && orderList.length > 0) ||
                (purchaseList && purchaseList.length > 0)
            "
          >
            <div
              v-for="order in orderList"
              :key="order.id"
              class="grid grid-cols-4 gap-4 border-b p-5 font-medium text-sm"
            >
              <div
                @click="handleSwitchingComponent('orderDetails', order)"
                class="text-purple-700 cursor-pointer hover:underline"
              >
                #{{ order.id.substring(order.id.length - 5, order.id.length) }}
              </div>

              <div>
                {{ date(order.createdAt.toDate()).format("MMM D, YYYY") }}
              </div>

              <div class="text-center">
                {{ order.paymentStatus ? "Processing" : "failed" }}
              </div>

              <div class="text-right">
                ${{
                  order.amountTotal
                    ? (order.amountTotal / 100).toFixed(2)
                    : "0.00"
                }}
              </div>
            </div>
            <div
              v-for="purchase in purchaseList"
              :key="purchase.id"
              class="grid grid-cols-4 gap-4 border-b p-5 font-medium text-sm"
            >
              <div
                @click="handleSwitchingComponent('orderDetails', purchase)"
                class="text-purple-700 cursor-pointer hover:underline"
              >
                #{{
                  purchase.id.substring(
                    purchase.id.length - 5,
                    purchase.id.length
                  )
                }}
              </div>

              <div>
                {{ date(purchase.createdAt.toDate()).format("MMM D, YYYY") }}
              </div>

              <div class="text-center">
                Completed
              </div>

              <div class="text-right">${{ purchase.amount }}</div>
            </div>
          </div>

          <div v-else>
            <div class="text-center border-b p-5 font-medium text-gray-500">
              There is no order records yet!
            </div>
          </div>
        </div>
        <div class="shadow bg-white h-auto border">
          <div class="pb-3 text-lg font-semibold capitalize border-b p-5">
            Addresses
          </div>

          <div v-if="addresses != null">
            <div class="border-b p-5 flex space-x-3 font-medium text-gray-400">
              <p>{{ addresses.line1 }},</p>
              <p>{{ addresses.line2 }},</p>
              <p>{{ addresses.city }} City</p>
            </div>

            <div class="p-5 flex space-x-3 font-medium text-gray-400">
              <p>
                {{
                  addresses.country?.toLowerCase() == "kh"
                    ? `Cambodia(${addresses.country})`
                    : addresses.country
                }},
              </p>
              <p>
                {{
                  addresses.postal_code
                    ? `Postal Code(${addresses.postal_code})`
                    : addresses.postal_code
                }}.
              </p>
            </div>
          </div>

          <div v-else>
            <div class="text-center border-b p-5 font-medium text-gray-500">
              There is no addresses yet!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import { functions } from "@/firebase/config";
import moment from "moment";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  props: ["user"],
  setup(props, { emit }) {
    const date = moment;
    const now = moment();
    const pending = ref(false);
    const email = ref(props.user?.email);
    const phone = ref(null);
    const role = ref(null);
    const failedMessage = ref(null);
    const succeedMessage = ref(null);
    const addresses = ref(null);
    const orderList = ref([]);
    const purchaseList = ref([]);
    const lastOrderId = ref(null);
    const lastOrderDate = ref(0);
    const lastOrder = ref(null);
    const averagePurchased = ref(0);
    const totalPurchased = ref(0);
    const totalLengthPurchase = ref(0);

    const { documents: orders } = getCollection("orders");
    const { documents: reports } = getCollection("reports");
    const { documents: users } = getCollection("users");
    const { user: staff } = getUser();

    watch(users, () => {
      users.value?.forEach((_user) => {
        if (_user.email == props.user?.email) {
          phone.value = _user.phone;
        }
      });
    });

    watch(orders, () => {
      orders.value?.forEach((order) => {
        if (order.email == props.user?.email) {
          phone.value = phone.value ? phone.value : order.phone;
          addresses.value = addresses.value
            ? addresses.value
            : order.shippingInfo?.address;
          //find the last order
          if (lastOrderDate.value >= order.createdAt) {
          } else {
            lastOrderId.value = order.id;
            lastOrderDate.value = order.createdAt;
            lastOrder.value = order;
          }

          // find average purchase
          averagePurchased.value += order.amountTotal / 100 || 0;
          // find total purchase
          totalPurchased.value += order.amountTotal / 100 || 0;
          //find total length purchase
          if (order.amountTotal) {
            totalLengthPurchase.value++;
          }

          orderList.value.push(order);
        }
      });
    });

    watch(reports, () => {
      reports.value?.forEach((report) => {
        if (report.userContact?.email == props.user?.email) {
          phone.value = phone.value ? phone.value : report.userContact?.phone;
          addresses.value = addresses.value
            ? addresses.value
            : report.shippingInfo?.address;

          // find purchase average
          averagePurchased.value += report.amount || 0;
          // find total purchase
          totalPurchased.value += report.amount || 0;
          //find total length purchase
          totalLengthPurchase.value++;

          purchaseList.value.push(report);
        }
      });
    });

    const handleSwitchingComponent = (component, order) => {
      emit("onSwitchingComponent", component, order);
    };

    const handlePromoteUser = async () => {
      pending.value = true;
      let res;
      switch (role.value) {
        case "admin":
          const addAdminRole = functions.httpsCallable("addAdminRole");
          res = await addAdminRole({
            email: email.value,
            role: role.value,
          });
          break;
        case "packer":
          const addPackerRole = functions.httpsCallable("addPackerRole");
          res = await addPackerRole({
            email: email.value,
            role: role.value,
          });
          break;
        case "delivery":
          const addDeliveryRole = functions.httpsCallable("addDeliveryRole");
          res = await addDeliveryRole({
            email: email.value,
            role: role.value,
          });
          break;
        default:
          res = "Unknown role";
          break;
      }
      if (res.data.errorInfo) {
        failedMessage.value = res.data.errorInfo.message;
        pending.value = false;
        setTimeout(() => {
          failedMessage.value = null;
        }, 5000);
      } else {
        succeedMessage.value = res.data.message;
        pending.value = false;
        setTimeout(() => {
          succeedMessage.value = null;
        }, 4000);
      }
    };

    return {
      handleSwitchingComponent,
      handlePromoteUser,
      date,
      now,
      pending,
      email,
      role,
      failedMessage,
      succeedMessage,
      phone,
      addresses,
      orderList,
      purchaseList,
      lastOrderId,
      lastOrderDate,
      lastOrder,
      averagePurchased,
      totalPurchased,
      totalLengthPurchase,
      staff
    };
  },
};
</script>

<style></style>
