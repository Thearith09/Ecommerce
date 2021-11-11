<template>
  <div class="pt-8 px-5 md:px-10 lg:px-16 mx-auto">
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
          @click="handleSwitchingComponent('OrderList')"
          class="hover:underline cursor-pointer"
        >
          Orders
        </p>
        <p>/</p>
        <p>
          Order #{{
            itemsOrdered.id?.substring(
              itemsOrdered.id.length - 5,
              itemsOrdered.id.length
            )
          }}
        </p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900">
        Order #{{
          itemsOrdered.id?.substring(
            itemsOrdered.id.length - 5,
            itemsOrdered.id.length
          )
        }}
      </div>
    </div>
    <div
      class="flex flex-col lg:flex-row justify-center space-y-5 lg:space-y-0 lg:space-x-5"
    >
      <div class="w-full h-auto bg-white shadow rounded border p-5 pb-10">
        <div v-if="itemsOrdered.paymentMethod">
          <div class="border-b border-gray-200 font-medium text-lg">
            Items
          </div>
          <div v-for="(item, i) in itemsOrdered.items" :key="i" class="">
            <div
              class="py-2 grid grid-cols-6 gap-4 items-center font-medium border-b border-gray-200"
            >
              <img
                :src="item.color"
                class="w-12 h-12 object-cover object-center"
              />
              <p class="col-span-2">{{ item.name }}</p>
              <p class="text-right">${{ (item.price / 100).toFixed(2) }}</p>
              <p class="text-right">{{ item.qty }}</p>
              <p class="text-right">
                ${{ ((item.price / 100) * item.qty).toFixed(2) }}
              </p>
            </div>
          </div>

          <div class="border-b border-gray-200 py-3 font-medium">
            <div class="flex justify-between items-center">
              <p>Subtotal</p>
              <p>
                ${{
                  (itemsOrdered.amountTotal
                    ? itemsOrdered.amountTotal / 100 - 2
                    : itemsOrdered.amount - 2
                  ).toFixed(2)
                }}
              </p>
            </div>
            <div class="flex justify-between items-center">
              <p>Shipping</p>
              <p>
                $2.00
              </p>
            </div>
          </div>
          <div
            class="border-b border-gray-200 py-3 font-medium flex justify-between items-center"
          >
            <p>Total</p>
            <p>
              ${{
                (itemsOrdered.amountTotal
                  ? itemsOrdered.amountTotal / 100
                  : itemsOrdered.amount
                ).toFixed(2)
              }}
            </p>
          </div>
          <div
            class="border-b border-gray-200 py-3 font-medium flex justify-between items-center"
          >
            <div>
              <p>Payment</p>
              <p class="text-sm leading-3 text-gray-400">
                via {{ itemsOrdered.paymentMethod?.brand }} Card
              </p>
            </div>
            <p>
              {{
                toDate(itemsOrdered.createdAt.toDate()).format(
                  "dddd Do, MMM YYYY"
                )
              }}
            </p>
            <p>
              ${{
                (itemsOrdered.amountTotal
                  ? itemsOrdered.amountTotal / 100
                  : itemsOrdered.amount
                ).toFixed(2)
              }}
            </p>
          </div>
        </div>

        <div v-else class="font-medium text-lg text-center">
          Payment Failed, Order Unsucessfull!
        </div>
      </div>

      <div
        class="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5 lg:flex-col lg:space-x-0 lg:space-y-5 font-medium"
      >
        <div
          class="h-32 md:h-48 lg:h-32 w-full lg:w-72 bg-white shadow rounded border p-5 tracking-wider"
        >
          <h1 class="pb-3 text-lg">Customer</h1>
          <div
            class="flex md:flex-col lg:flex-row items-center space-x-2 capitalize"
          >
            <img
              :src="user?.photoURL"
              class="w-9 h-9 rounded-full object-cover object-center shadow"
            />
            <div>
              <p>{{ itemsOrdered.shippingInfo?.name }}</p>
              <p
                v-if="itemsOrdered.paymentStatus"
                class="text-sm leading-3 lowercase text-green-500"
              >
                {{ itemsOrdered.paymentStatus }}
              </p>
              <p v-else class="text-sm leading-3 lowercase text-red-600">
                Failed
              </p>
            </div>
          </div>
        </div>
        <div
          class="h-40 md:h-48 lg:h-40 w-full lg:w-72 bg-white shadow rounded border p-5 tracking-wider"
        >
          <h1 class="text-lg pb-3">Customer Contact</h1>
          <div class="text-sm space-y-1">
            <p class="capitalize">{{ itemsOrdered.shippingInfo?.name }}</p>
            <p class="text-purple-600">
              {{
                itemsOrdered.email
                  ? itemsOrdered.email
                  : itemsOrdered.userContact?.email
              }}
            </p>
            <p class="text-purple-600">
              {{
                itemsOrdered.phone
                  ? itemsOrdered.phone
                  : itemsOrdered.userContact?.phone
              }}
            </p>
          </div>
        </div>
        <div
          class="h-48 w-full lg:w-72 bg-white shadow rounded border p-5 tracking-wider"
        >
          <h1 class="text-lg pb-3">Shipping Address</h1>
          <div class="text-sm space-y-1">
            <p class="capitalize">{{ itemsOrdered.shippingInfo?.name }}</p>
            <p>
              {{ itemsOrdered.shippingInfo?.address.line1 }}
            </p>
            <p>
              {{ itemsOrdered.shippingInfo?.address.line2 }}
            </p>
            <p>
              {{ itemsOrdered.shippingInfo?.address.city }},
              {{ itemsOrdered.shippingInfo?.address.postal_code }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { onMounted, ref } from "@vue/runtime-core";
import { functions } from "@/firebase/config";
export default {
  props: ["itemsOrdered"],
  setup(props, { emit }) {
    const toDate = moment;
    const user = ref(null);

    onMounted(async () => {
      const getAllUsers = functions.httpsCallable("getAllUsers");
      const users = await getAllUsers();
      console.log(users);

      if (users.data) {
        users.data.forEach((_user) => {
          if (_user.email === props.itemsOrdered?.email) {
            console.log(_user);
            user.value = _user;
          }
        });
      }
    });

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
    };

    return { user, toDate, handleSwitchingComponent };
  },
};
</script>

<style></style>
