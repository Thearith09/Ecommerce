<template>
  <div
    id="menu"
    class="animate__animated animate__faster flex h-screen fixed inset-0 w-screen bg-gray-700 bg-opacity-50 z-40 min-w-max"
  >
    <div v-if="subMenu" id="main-menu" class="bg-white w-80">
      <div class="flex px-2 py-3 border-b-2 border-gray-200">
        <div class="relative">
          <div v-if="user?.photoURL">
            <img
              class="w-8 h-8 rounded-full object-cover object-center"
              :src="user.photoURL"
            />
          </div>
          <div v-else>
            <h1
              class="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-center font-semibold uppercase text-white rounded-full"
            >
              {{ user.displayName[0] }}
            </h1>
          </div>

          <div
            v-if="myProfile && !myProfile.phone"
            class="absolute w-3 h-3 bg-red-600 rounded-full right-0 top-0"
          ></div>
        </div>
        <div class="ml-2 leading-none text-gray-700 tracking-wide">
          <p class="font-bold">{{ user.displayName }}</p>
          <span class="text-sm text-gray-500">{{ user.email }}</span>
        </div>
      </div>

      <div>
        <div
          v-if="!user.admin && !user.delivery && !user.packer"
          class="font-light px-2 py-3 space-y-3 bg-white border-b-2 border-gray-200"
        >
          <div
            @click="handleShowCategory"
            class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <p>
              Categories
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="relative w-full">
            <router-link
              class="text-gray-700 hover:text-purple-700 cursor-pointer block"
              :to="{ name: 'Profile', params: { info: 'base-information' } }"
            >
              Profile Settings
            </router-link>

            <div
              v-if="myProfile && !myProfile.phone"
              class="absolute top-0 right-0 text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <!-- <p class="text-gray-700 hover:text-purple-700 cursor-pointer">
            Order History
          </p> -->

          <router-link
            :to="{ name: 'Purchase-History' }"
            class="text-gray-700 hover:text-purple-700 cursor-pointer block"
          >
            Purchase History
          </router-link>
        </div>

        <div
          v-else
          class="font-light px-2 py-3 space-y-3 bg-white border-b-2 border-gray-200"
        >
          <div
            @click="handleShowCategory"
            class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <p>
              Categories
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            v-if="user.admin"
            @click="handleShowCategoryForm"
            class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <p>
              Add Category
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            v-if="user.admin"
            @click="handleShowPromoteForm"
            class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <p>
              Promote as Admin
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            @click="handleShowGetUserInfoForm"
            class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <p>
              Get a User Info
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            @click="handleShowUserOrderForm"
            class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <p>
              Get a User Order Info
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="text-gray-700 hover:text-purple-700 cursor-pointer">
            <router-link
              class="relative cursor-pointer items-center"
              :to="{ name: 'CheckoutOrder' }"
            >
              {{ $t("Checkout Order") }}
            </router-link>
          </div>

          <div
            class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <router-link
              class="text-gray-700 hover:text-purple-700 cursor-pointer block"
              :to="{ name: 'Profile', params: { info: 'base-information' } }"
            >
              Profile Settings
            </router-link>
          </div>

          <div
            v-if="user.admin || user.packer"
            class="text-gray-700 hover:text-purple-700 cursor-pointer"
          >
            <router-link :to="{ name: 'Reports' }">
              <span class="text-center">{{ $t("Reports") }}</span>
            </router-link>
          </div>
        </div>

        <div class="flex px-2 py-3 border-b-2 border-gray-200">
          <div
            @click="handleSwitchLanguage"
            class="w-28 px-2 py-1 flex justify-center space-x-2 items-center rounded cursor-pointer border-2 border-gray-400 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clip-rule="evenodd"
              />
            </svg>
            <span>English</span>
          </div>
        </div>

        <div class="px-2 py-3 bg-white border-gray-200">
          <span
            @click="handleLogout"
            class="text-gray-700 cursor-pointer hover:text-purple-700 flex items-center space-x-1"
          >
            <!-- <span class="material-icons text-md">
              logout
            </span> -->
            <span>sign out</span></span
          >
        </div>
      </div>
    </div>

    <!--start show category-->
    <div
      v-else
      id="sub-menu"
      class="animate__animated animate__fadeInRight animate__faster font-light bg-white w-80 h-screen"
    >
      <div
        v-if="succeedMessage"
        class="animate_animated animate__zoomIn animate_faster fixed top-0 w-full h-auto p-2 bg-green-500 bg-opacity-90 rounded-b z-20"
      >
        <p class="text-white text-center">
          {{ succeedMessage }}
        </p>
      </div>
      <div
        v-if="failedMessage"
        class="animate_animated animate__zoomIn animate__faster fixed top-0 w-full h-auto bg-red-600 bg-opacity-90 rounded-b p-2 z-20"
      >
        <p class="text-white">
          {{ failedMessage }}
        </p>
      </div>

      <div
        @click="handleCloseSubMenu"
        class="flex justify-start items-center space-x-1 bg-gray-100 p-2 text-gray-700 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Menu</span>
      </div>

      <!--show category-->
      <div v-show="!showCategory" class="px-2 py-3 cursor-pointer">
        <p
          class="py-2 hover:text-blue-700 tracking-wide text-gray-700"
          v-for="category in categories"
          :key="category.id"
          @click="handleNavigation(category.id)"
        >
          {{ category.name }}
        </p>
        <router-link
          class="py-2 hover:text-blue-700 tracking-wide text-gray-700"
          :to="{ name: 'Categories' }"
          >All Categories</router-link
        >
      </div>

      <!--show category form-->
      <form v-show="!showCategoryForm" @submit.prevent="handleAddCategory">
        <div class="w-full h-full text-gray-700 space-y-5 p-5">
          <h3 class="text-gray-700 font-mono">Add a New Category</h3>
          <div class="group relative w-full z-0">
            <input
              v-model="categoryName"
              type="text"
              placeholder=" "
              required
              class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
            />
            <label
              for="Username"
              class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
              >Enter category name</label
            >
          </div>
          <div
            id="img"
            class="w-full rounded h-60 border-2 boder-gray-500 p-2"
          ></div>
          <label
            class="w-full rounded h-20 flex flex-col items-center px-4 py-3 bg-white shadow tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150"
          >
            <span class="material-icons-outlined">
              cloud_upload
            </span>
            <span class="mt-2 text-base leading-normal">Select a file</span>
            <input
              @change="handleChanges"
              type="file"
              class="hidden"
              required
            />
          </label>
          <h4 v-if="fileError" class="text-red-600 text-sm">
            {{ fileError }}
          </h4>
          <h4 v-if="error" class="text-red-600">{{ error }}</h4>
          <button
            v-if="!isPending"
            class="focus:outline-none rounded tracking-wide bg-white shadow w-full p-2 text-purple-600 hover:text-white hover:bg-purple-600"
          >
            Add
          </button>
          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded tracking-wide bg-white shadow w-full p-2 text-purple-600"
          >
            <div>
              Saving...
            </div>
            <div class="absolute top-3 right-2">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
              ></div>
            </div>
          </button>
        </div>
      </form>

      <!--show promote user form-->
      <form
        v-show="!showPromoteForm"
        @submit.prevent="handlePromoteUser"
        class="text-gray-500"
      >
        <div class="w-full h-full space-y-5 p-5">
          <h3 class="text-gray-700 font-mono">
            Promote a User
          </h3>
          <div class="relative w-full z-0">
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder=" "
              required
              class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
            />
            <label
              for="email"
              class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
              >Enter user's email</label
            >
          </div>
          <div class="text-gray-500 font-mono">
            <label for="">User roles:</label>
            <select
              required
              v-model="role"
              class="border-2 border-gray-500 px-3 py-1 mx-3 rounded"
            >
              <option value="admin">Admin</option>
              <option value="packer">Packer</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <button
            v-if="!pending"
            class="focus:outline-none rounded tracking-wide shadow w-full p-2 bg-white text-purple-600 hover:text-white hover:bg-purple-600"
          >
            Promote
          </button>
          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded tracking-wide bg-white shadow w-full p-2 text-purple-600"
          >
            <div>
              Promoting...
            </div>
            <div class="absolute top-3 right-2">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
              ></div>
            </div>
          </button>
        </div>
      </form>

      <!--show get a user info form-->
      <form
        v-show="!showUserInfoForm"
        @submit.prevent="handleGetUserInfo"
        class="text-gray-500"
      >
        <div class="w-full h-full space-y-5 p-5">
          <h3 class="text-gray-700 font-mono">
            Get a User Info
          </h3>
          <div class="border-2 border-gray-500 p-3 rounded" v-if="userInfo">
            <p class="flex justify-between items-center">
              Username: <span>{{ userInfo.name }}</span>
            </p>
            <p class="flex justify-between items-center">
              Phone: <span>{{ userInfo.phone }}</span>
            </p>
            <p class="flex justify-between items-center">
              Email: <span>{{ userInfo.email }}</span>
            </p>
          </div>
          <div class="relative w-full z-0">
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder=" "
              required
              class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
            />
            <label
              for="email"
              class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
              >Enter user's email</label
            >
          </div>
          <button
            v-if="!pending"
            class="focus:outline-none rounded shadow tracking-wide w-full p-2 bg-white text-purple-600 hover:bg-purple-600 hover:text-white"
          >
            Submit
          </button>
          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded tracking-wide bg-white shadow w-full p-2 text-purple-600"
          >
            <div>
              Requesting...
            </div>
            <div class="absolute top-3 right-2">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
              ></div>
            </div>
          </button>
        </div>
      </form>

      <!--show get a user order info-->
      <form
        v-show="!showUserOrderForm"
        @submit.prevent="handleGetUserOrder"
        class="text-gray-500"
      >
        <div class="w-full h-full space-y-5 p-5">
          <h3 class="text-gray-700 font-mono">
            Get a User Order Info
          </h3>
          <div class="border-2 border-gray-500 p-3 rounded" v-if="orderInfo">
            <p class="flex justify-between items-center">
              Customer name:
              <span>{{ orderInfo.shippingInfo?.name }}</span>
            </p>
            <p class="flex justify-between items-center">
              Phone:
              <span>{{ orderInfo.phone }}</span>
            </p>
            <div v-for="(item, i) in orderInfo.items" :key="i">
              <p class="flex justify-between items-center">
                Item ID:
                <span>{{ item.name }}</span>
              </p>
              <p class="flex justify-between items-center">
                Color:
                <span><img class="h-8 w-12" :src="item.color" alt=""/></span>
              </p>
              <p class="flex justify-between items-center">
                Size:
                <span>{{ item.size }}</span>
              </p>
              <p class="flex justify-between items-center">
                Quantity:
                <span>{{ item.qty }}</span>
              </p>
            </div>
            <p class="flex justify-between items-start">
              Address:
              <span class="flex flex-col justify-end">
                <span>{{ orderInfo.shippingInfo.address.line1 }},</span>
                <span>{{ orderInfo.shippingInfo.address.line2 }},</span>
                <span>{{ orderInfo.shippingInfo.address.city }},</span>
              </span>
            </p>
          </div>
          <div class="relative w-full z-0">
            <input
              v-model="parcelId"
              type="text"
              placeholder=" "
              required
              class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
            />
            <label
              for="email"
              class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
              >Enter parcel ID</label
            >
          </div>
          <button
            v-if="!pending"
            class="focus:outline-none rounded tracking-wide shadow w-full p-2 bg-white text-purple-600 hover:bg-purple-600 hover:text-white"
          >
            Submit
          </button>
          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded tracking-wide bg-white shadow w-full p-2 text-purple-600"
          >
            <div>
              Requesting...
            </div>
            <div class="absolute top-3 right-2">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
              ></div>
            </div>
          </button>
        </div>
      </form>
    </div>

    <div
      @click="handleClose"
      class="bg-white rounded-full w-10 h-10 text-gray-500 flex justify-center items-center cursor-pointer my-2 ml-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
  <component
    class="z-40"
    :is="currentComponent"
    @close="currentComponent = ''"
  />
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import getCollection from "@/composables/getCollection";
import useCollection from "@/composables/useCollection";
import { projectAuth, functions, timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useStorage from "@/composables/useStorage";
const { url, uploadImage } = useStorage();

export default {
  components: {
    SwitchLanguage,
  },
  setup(props, { emit }) {
    const currentComponent = ref("");
    const subMenu = ref(true);
    const email = ref(null);
    const file = ref(null);
    const role = ref("");
    const categoryName = ref("");
    const parcelId = ref(null);
    const orderInfo = ref(null);
    const userInfo = ref(null);
    const fileError = ref(null);
    const pending = ref(false);
    const succeedMessage = ref(null);
    const failedMessage = ref(null);
    const showCategory = ref(true);
    const showPromoteForm = ref(true);
    const showCategoryForm = ref(true);
    const showUserInfoForm = ref(true);
    const showUserOrderForm = ref(true);

    const router = useRouter();
    const { user } = getUser();
    const { _user: myProfile } = getUserDoc("users");
    const { documents: categories } = getCollection("inventory");
    const { documents: orders } = getCollection("orders");
    const { documents: users } = getCollection("users");
    const { addDoc, isPending, error } = useCollection("inventory");

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    onMounted(() => {
      document.getElementById("menu").classList.add("animate__fadeInLeft");
    });

    const handleShowCategory = () => {
      subMenu.value = !subMenu.value;
      showCategory.value = false;
    };

    const handleShowCategoryForm = () => {
      subMenu.value = !subMenu.value;
      showCategoryForm.value = false;
    };

    const handleShowPromoteForm = () => {
      subMenu.value = !subMenu.value;
      showPromoteForm.value = false;
    };

    const handleCloseSubMenu = () => {
      showCategory.value = true;
      showPromoteForm.value = true;
      showCategoryForm.value = true;
      showUserInfoForm.value = true;
      showUserOrderForm.value = true;

      document
        .getElementById("sub-menu")
        .classList.remove("animate__fadeInRight");
      document
        .getElementById("sub-menu")
        .classList.add("animate__fadeOutRight");

      setTimeout(() => {
        subMenu.value = true;
      }, 200);
    };

    const handleClose = () => {
      document.getElementById("menu").classList.remove("animate__fadeInLeft");
      document.getElementById("menu").classList.add("animate__fadeOutLeft");
      setTimeout(() => {
        emit("close");
        subMenu.value = true;
      }, 200);
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
    };

    const handleSwitchLanguage = () => {
      currentComponent.value = "SwitchLanguage";
    };

    const handleNavigation = (id) => {
      router.push({
        path: `/categories/${id}`,
      });

      showCategory.value = !showCategory.value;
      emit("close");
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
        email.value = "";
        setTimeout(() => {
          failedMessage.value = null;
        }, 4000);
      } else {
        succeedMessage.value = res.data.message;
        email.value = "";
        pending.value = false;
        setTimeout(() => {
          succeedMessage.value = null;
        }, 3000);
      }
    };

    const handleChanges = (e) => {
      const selected = e.target.files[0];
      const limitedMB = 1048576; //1MB

      if (selected.size > limitedMB) {
        fileError.value = `Size of the image must be less than 1MB.`;
        file.value = null;
      } else {
        if (selected && types.includes(selected.type)) {
          //append profile to the div with id(img) immediately
          const div = document.getElementById("img");
          //check whether div has children or not
          if (div.firstChild) {
            div.removeChild(div.firstChild);
          }
          const image = document.createElement("img");
          image.style.height = "100%";
          image.style.width = "100%";
          image.style.objectFit = "cover";
          image.style.objectPosition = "center";
          image.src = URL.createObjectURL(selected);
          div.append(image);

          file.value = selected;
          fileError.value = null;
        } else {
          file.value = null;
          fileError.value = `Only file of type jpg, jpeg, png, svg are allowed!`;
        }
      }
    };

    const handleAddCategory = async () => {
      if (file.value) {
        await uploadImage(file.value);

        await addDoc({
          name: categoryName.value,
          url: url.value,
          createdAt: timestamp(),
        });

        if (!error.value) {
          router.push({ name: "Categories" });
          categoryName.value = "";
        }
      }
    };

    const handleShowGetUserInfoForm = () => {
      subMenu.value = false;
      showUserInfoForm.value = false;
    };

    const handleShowUserOrderForm = () => {
      subMenu.value = false;
      showUserOrderForm.value = false;
    };

    const handleGetUserOrder = () => {
      pending.value = true;
      orders.value.forEach((order) => {
        if (order.id == parcelId.value.trim()) orderInfo.value = order;
      });
      pending.value = false;
    };

    const handleGetUserInfo = async () => {
      pending.value = true;
      const getUserInfo = functions.httpsCallable("getUserInfo");
      const res = await getUserInfo({
        email: email.value,
      });
      pending.value = false;
      email.value = "";
      users.value?.forEach((user) => {
        if (user.id == res.data?.uid) userInfo.value = user;
      });
    };

    return {
      handleClose,
      handleLogout,
      handleShowCategory,
      handleShowCategoryForm,
      handleShowPromoteForm,
      handleShowGetUserInfoForm,
      handleShowUserOrderForm,
      handleCloseSubMenu,
      handleSwitchLanguage,
      handleGetUserOrder,
      handleGetUserInfo,
      handleNavigation,
      handleChanges,
      handleAddCategory,
      handlePromoteUser,
      categories,
      user,
      pending,
      role,
      parcelId,
      orderInfo,
      myProfile,
      userInfo,
      categoryName,
      currentComponent,
      showCategory,
      showPromoteForm,
      showCategoryForm,
      showUserOrderForm,
      showUserInfoForm,
      subMenu,
      email,
      fileError,
      succeedMessage,
      failedMessage,
    };
  },
};
</script>

<style scoped>
.max-h-0 {
  max-width: 0;
}

.origin-0 {
  transform-origin: 0%;
}
.-z-1 {
  z-index: -1;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label,
textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label,
select:focus ~ label,
select:not([value=""]):valid ~ label {
  /* @apply transform; scale-75; -translate-y-6; */
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-scale-x: 0.75;
  --tw-scale-y: 0.75;
  --tw-translate-y: -1.3rem;
}
input:focus ~ label,
select:focus ~ label {
  /* @apply text-black; left-0; */
  --tw-text-opacity: 1;
  color: rgba(124, 58, 237, var(--tw-text-opacity));
  left: 0px;
  z-index: 10;
}
</style>
