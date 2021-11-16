<template>
  <div
    v-if="users && users.length > 0"
    class="pt-8 px-5 md:px-10 lg:px-16 h-auto overflow-auto"
  >
    <div class="pb-3">
      <div class="relative flex space-x-1 text-gray-500 font-medium pb-2">
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          {{ $t("Dashboard") }}
        </p>
        <p>/</p>
        <p>{{ $t("Users") }}</p>
      </div>
      <div class="font-bold text-lg text-gray-900">
        {{ $t("Users") }}
      </div>
    </div>

    <div
      class="relative shadow bg-white border rounded min-w-tablet max-h-itemList overflow-auto"
    >
      <div>
        <div
          class="grid grid-cols-6 gap-4 font-semibold py-5 px-7 border-b bg-gray-900 text-white rounded-t border-gray-200"
        >
          <div class="w-full col-span-2">
            Name
          </div>

          <div class="w-full col-span-2">Registered</div>

          <div class="w-full">
            Status
          </div>

          <div class="w-full">
            Login With
          </div>
        </div>

        <div
          v-for="(user, i) in allUsers?.data"
          :key="user.id"
          v-show="i >= start && i < end"
        >
          <div
            class="grid grid-cols-6 gap-4 text-gray-700 font-medium px-10 py-5 h-auto bg-white text-sm border-b border-gray-200"
          >
            <div class="col-span-2">
              <div class="flex items-center space-x-1">
                <img
                  @click="handleSwitchingComponent('UserDetails', user)"
                  class="h-6 w-8 object-cover object-center rounded cursor-pointer transform -translate-x-2 scale-150"
                  :src="user.photoURL"
                />
                <div class="leading-3">
                  <p
                    @click="handleSwitchingComponent('UserDetails', user)"
                    class="font-semibold hover:underline cursor-pointer"
                  >
                    {{ user.displayName }}
                  </p>
                  <p class="text-gray-400 text-sm">{{ user.email }}</p>
                </div>
              </div>
            </div>

            <div class="col-span-2">
              {{
                toDate(user.metadata.creationTime).format("dddd, D MMM YYYY")
              }}
            </div>

            <div>
              {{
                user.customClaims
                  ? user.customClaims.admin
                    ? "Admin"
                    : user.customClaims.packer
                    ? "Packer"
                    : "Delivery"
                  : "Customer"
              }}
            </div>

            <div>
              {{ user.providerData[0].providerId }}
            </div>
          </div>
        </div>

        <div class="h-20 flex justify-between items-center px-5">
          <div class="flex space-x-1">
            <button
              @click="handlePrevious(users.length)"
              :class="{ frozen: start <= 0 }"
              :disabled="start <= 0"
              class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
            >
              previous
            </button>
            <div class="flex items-center space-x-1">
              <ul
                v-for="i in Math.ceil(users.length / limitedPerPage)"
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
              @click="handleNext(users.length)"
              :class="{
                frozen: end >= Math.ceil(users.length),
              }"
              :disabled="end >= Math.ceil(users.length)"
              class="focus:outline-none px-4 py-1 bg-gray-100 text-gray-400 capitalize hover:bg-gray-200 hover:text-gray-700 rounded"
            >
              Next
            </button>
          </div>

          <div class="flex space-x-1 items-center">
            <p class="font-medium">
              Showing {{ pageFrom }} to {{ pageTo }} of {{ users.length }} / Row
              per page
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

  <div v-if="users?.length <= 0" class="flex justify-center items-center my-10">
    <div
      class="w-96 space-y-5 p-5 rounded-md border-2 border-gray-200 flex flex-col items-center justify-center"
    >
      <div class="text-purple-900 font-semibold">
        There is no customers!
      </div>
      <router-link
        :to="{ name: 'Home' }"
        class="bg-white text-purple-700 hover:bg-purple-700 hover:text-white shadow rounded py-1 px-12"
      >
        Back
      </router-link>
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import getCollection from "@/composables/getCollection";
import { functions } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import moment from "moment";

export default {
  setup(props, { emit }) {
    const pending = ref(false);
    const windowWidth = ref(window.innerWidth);
    const toDate = moment;

    const indexActive = ref(1);
    const limitedPerPage = ref(5);
    const start = ref(0);
    const end = ref(limitedPerPage.value);
    const pageFrom = ref(1);
    const pageTo = ref(end.value);
    const previous = ref(1);
    const next = ref(5);
    const allUsers = ref(null);

    const { user } = getUser();
    const { _user } = getUserDoc("users");
    const { documents: users } = getCollection("users");

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
      if (pageTo.value >= users.value.length) pageTo.value = users.value.length;
      else {
        pageTo.value = end.value;
      }
    });

    onMounted(async () => {
      window.addEventListener("resize", onResize);
      const getAllUsers = functions.httpsCallable("getAllUsers");
      allUsers.value = await getAllUsers();
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    const handleSwitchingComponent = (component, user) => {
      emit("onSwitchingComponent", component, user);
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

    const handleNext = async (limitedIncrement) => {
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

    return {
      toDate,
      allUsers,
      users,
      _user,
      user,
      pageTo,
      pageFrom,
      start,
      end,
      previous,
      next,
      indexActive,
      handleNext,
      windowWidth,
      pending,
      limitedPerPage,
      handlePrevious,
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
