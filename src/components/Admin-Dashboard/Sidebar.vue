<template>
  <div class="bg-white border-b border-gray-300 py-3 px-6 shadow">
    <div v-if="input" class="flex justify-between items-center w-full py-1">
      <button
        class="cursor-pointer text-gray-700 hover:text-purple-700 text-left focus:outline-none"
        type="button"
        @click="
          sidebarSelected != 1
            ? ((sidebarSelected = 1), (subSidebarShow = 1))
            : (sidebarSelected = null)
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- User -->
      <div class="flex items-center space-x-4">
        <div>
          <i
            @click="handleToggleInput"
            class="fas fa-search text-gray-700 hover:text-purple-700 cursor-pointer text-lg"
          ></i>
        </div>
        <NotificationDropdown
          class="cursor-pointer"
          @onSwitchingComponent="handleSwitchingComponent($event)"
        />
        <SwitchingLanguageDropdown class="cursor-pointer" />
        <UserDropdown
          class="cursor-pointer pl-2 border-l-2 border-gray-700"
          @onSwitchingComponent="handleSwitchingComponentOnyProfile($event)"
        />
      </div>
    </div>

    <form v-else class="relative w-full py-1">
      <span
        class="z-10 h-full font-normal text-center absolute text-base items-center justify-center w-8 pl-3 py-4"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          /></svg
      ></span>
      <input
        type="text"
        placeholder="find anything"
        autofocus
        class="px-3 py-3 placeholder-gray-700 text-gray-700 relative bg-white shadow outline-none focus:outline-none border focus:border-gray-300 w-full pl-10"
      />
      <span
        class="z-10 h-full font-normal text-center absolute top-3 right-1 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2"
        ><svg
          @click="handleToggleInput"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-900 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
      ></span>
    </form>
  </div>

  <div
    ref="sidebarShow"
    class="max-w-0 w-full overflow-hidden h-screen bg-gray-900 fixed bg-opacity-50 z-50 flex"
    :style="sidebarSelected == 1 ? 'max-width: 100%' : ''"
  >
    <div
      class="transition-all duration-500 overflow-hidden max-w-0 w-full flex flex-col bg-white h-screen"
      :style="
        sidebarSelected == 1 && subSidebarShow == 1 ? 'max-width: 320px' : ''
      "
    >
      <div
        class="px-5 min-w-full block mb-2 border-b border-solid border-gray-300"
      >
        <div>
          <a
            class="text-purple-700 text-lg text-left inline-block whitespace-nowrap uppercase font-bold py-4 font-serif tracking-widest"
          >
            Easy4shopping
          </a>
        </div>
      </div>

      <div class="px-5 flex flex-col space-y-2 font-serif tracking-wider">
        <a
          @click="handleSwitchingComponent('Dashboard')"
          href="#dashboard"
          class="cursor-pointer text-gray-600 hover:text-white hover:bg-purple-700 hover:bg-opacity-90 focus:bg-purple-700 focus:bg-opacity-90 focus:text-white"
        >
          <div class="text-xs uppercase py-5 px-3 font-bold flex space-x-3">
            <i class="fas fa-tachometer-alt text-sm"></i>
            <p>{{ $t("Dashboard") }}</p>
          </div>
        </a>

        <a
          href="#catalog"
          class="group relative cursor-pointer items-center text-gray-600 hover:text-white hover:bg-purple-700 hover:bg-opacity-90 focus:bg-purple-700 focus:bg-opacity-90 focus:text-white"
          @click="
            catalogSelected !== 1
              ? (catalogSelected = 1)
              : (catalogSelected = null)
          "
        >
          <div class="text-xs uppercase py-5 px-3 font-bold flex space-x-4">
            <i class="fas fa-database text-sm"></i>
            <div>
              Catalog
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute right-5 fill-current h-4 w-4 transform transition-all duration-150 ease-in-out"
              :class="
                catalogSelected == 1 ? '-rotate-90 top-4' : 'rotate-0 top-5'
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </a>
        <div
          ref="catalogShow"
          class="max-h-0 overflow-hidden transition-all duration-500 bg-white text-gray-600 w-full"
          :class="catalogSelected == 1 ? 'border' : 'border-0'"
          :style="
            catalogSelected == 1
              ? 'max-height: ' + $refs.catalogShow.scrollHeight + 'px'
              : ''
          "
        >
          <a
            @click="handleSwitchingComponent('PromotionList')"
            href="#promotion-list"
            class="block hover:bg-purple-700 hover:bg-opacity-90 hover:text-white focus:bg-purple-700 focus:bg-opacity-90 focus:text-white px-4"
          >
            <div class="text-xs uppercase py-4 font-bold flex space-x-4">
              <i class="fas fa-arrow-right"></i>
              <p>{{ $t("promotion list") }}</p>
            </div></a
          >
          <a
            v-if="user?.admin || user?.packer"
            @click="handleSwitchingComponent('AddPromotion')"
            href="#add-a-new-promotion"
            class="block hover:bg-purple-700 hover:bg-opacity-90 hover:text-white focus:bg-purple-700 focus:bg-opacity-90 focus:text-white px-4"
          >
            <div class="text-xs uppercase py-4 font-bold flex space-x-4">
              <i class="fas fa-arrow-right"></i>
              <p>{{ $t("Add a new promotion") }}</p>
            </div></a
          >
          <a
            @click="handleSwitchingComponent('CategoryList')"
            href="#category-list"
            class="block hover:bg-purple-700 hover:bg-opacity-90 hover:text-white focus:bg-purple-700 focus:bg-opacity-90 focus:text-white px-4"
          >
            <div class="text-xs uppercase py-4 font-bold flex space-x-4">
              <i class="fas fa-arrow-right"></i>
              <p>{{ $t("Category list") }}</p>
            </div></a
          >
          <a
            v-if="user?.admin || user?.packer"
            @click="handleSwitchingComponent('AddCategory')"
            href="#add-a-new-category"
            class="block hover:bg-purple-700 hover:bg-opacity-90 hover:text-white focus:bg-purple-700 focus:bg-opacity-90 focus:text-white px-4"
          >
            <div class="text-xs uppercase py-4 font-bold flex space-x-4">
              <i class="fas fa-arrow-right"></i>
              <p>{{ $t("Add a New Category") }}</p>
            </div></a
          >
          <a
            @click="handleSwitchingComponent('ProductList')"
            href="#product-list"
            class="block hover:bg-purple-700 hover:bg-opacity-90 hover:text-white focus:bg-purple-700 focus:bg-opacity-90 focus:text-white px-4"
          >
            <div class="text-xs uppercase py-4 font-bold flex space-x-4">
              <i class="fas fa-arrow-right"></i>
              <p>{{ $t("Product List") }}</p>
            </div></a
          >
          <a
            v-if="user?.admin || user?.packer"
            @click="handleSwitchingComponent('AddProduct')"
            href="#dd-a-new-product"
            class="block hover:bg-purple-700 hover:bg-opacity-90 hover:text-white focus:bg-purple-700 focus:bg-opacity-90 focus:text-white px-4"
            ><div class="text-xs uppercase py-4 font-bold flex space-x-4">
              <i class="fas fa-arrow-right"></i>
              <p>{{ $t("Add a new Product") }}</p>
            </div></a
          >
        </div>

        <a
          @click="handleSwitchingComponent('OrderList')"
          href="#orders"
          class="cursor-pointer text-gray-600 hover:bg-purple-700 hover:text-white focus:bg-purple-700 focus:bg-opacity-90 focus:text-white"
        >
          <div class="text-xs uppercase py-5 px-3 font-bold flex space-x-3">
            <i class="fab fa-opencart text-sm"></i>
            <p>{{ $t("Orders") }}</p>
          </div>
        </a>

        <a
          @click="handleSwitchingComponent('UserList')"
          href="#users"
          class="text-gray-600 cursor-pointer hover:text-white hover:bg-purple-700 hover:bg-opacity-90 focus:bg-purple-700 focus:bg-opacity-90 focus:text-white"
        >
          <div class="text-xs uppercase py-5 px-3 font-bold flex space-x-5">
            <i class="fas fa-users text-sm"></i>
            <p>{{ $t("Users") }}</p>
          </div>
        </a>
      </div>

      <hr class="my-2 md:min-w-full border-gray-300" />

      <div class="px-5 flex flex-col space-y-2 font-serif tracking-wider">
        <a
          @click="handleSwitchingComponent('UserProfile')"
          href="#profile"
          class="text-gray-600 cursor-pointer hover:text-white hover:bg-purple-700 hover:bg-opacity-90 focus:bg-purple-700 focus:bg-opacity-90 focus:text-white"
        >
          <div class="text-xs uppercase py-5 px-3 font-bold flex space-x-3">
            <i class="fas fa-user-circle text-sm"></i>
            <p>{{ $t("Profile") }}</p>
          </div>
        </a>
        <a
          v-if="user?.admin || user?.packer"
          @click="handleSwitchingComponent('Reports')"
          href="#sales-report"
          class="text-gray-600 cursor-pointer hover:text-white hover:bg-purple-700 hover:bg-opacity-90 focus:bg-purple-700 focus:bg-opacity-90 focus:text-white"
        >
          <div class="text-xs uppercase py-5 px-3 font-bold flex space-x-3">
            <i class="fas fa-file-pdf text-sm"></i>
            <p>{{ $t("Sales Report") }}</p>
          </div>
        </a>
      </div>

      <hr class="my-2 md:min-w-full border-gray-300" />

      <div class="px-5 flex flex-col list-none font-serif tracking-wider">
        <div
          @click="handleLogout"
          class="text-gray-600 cursor-pointer hover:text-white hover:bg-purple-700 hover:bg-opacity-90"
        >
          <a class="text-xs uppercase py-5 px-3 font-bold flex space-x-3"
            ><i class="fas fa-sign-out-alt text-sm"></i>
            <p>{{ $t("Logout") }}</p></a
          >
        </div>
      </div>
    </div>
    <div class="w-full h-full cursor-move" @click="toggleCollapseShow"></div>
  </div>
</template>
<script>
import NotificationDropdown from "@/components/Admin-Dashboard/NotificationDropdown.vue";
import UserDropdown from "@/components/Admin-Dashboard/UserDropdown.vue";
import SwitchingLanguageDropdown from "@/components/Admin-Dashboard/SwitchingLanguageDropdown";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { projectAuth } from "@/firebase/config";
import { useRouter } from "vue-router";
export default {
  components: {
    NotificationDropdown,
    UserDropdown,
    SwitchingLanguageDropdown,
  },
  setup(props, { emit }) {
    const toggle = ref(false);
    const input = ref(true);
    const windowWidth = ref(window.innerWidth);
    const router = useRouter();
    const catalogSelected = ref(null);
    const sidebarSelected = ref(null);
    const subSidebarShow = ref(null);

    const { user } = getUser();

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const toggleCollapseShow = () => {
      subSidebarShow.value = null;
      setTimeout(() => {
        sidebarSelected.value = null;
      }, 500);
    };

    const toggleCatelog = () => {
      toggle.value = !toggle.value;
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
    };

    const handleSwitchingComponentOnyProfile = ({
      component,
      dynamicParam,
    }) => {
      emit("onSwitching", component, dynamicParam);
    };

    const handleSwitchingComponent = (component) => {
      catalogSelected.value = null;
      sidebarSelected.value = null;
      subSidebarShow.value = null;
      emit("onSwitching", component);
    };

    const handleToggleInput = () => {
      input.value = !input.value;
    };

    return {
      user,
      catalogSelected,
      sidebarSelected,
      subSidebarShow,
      input,
      windowWidth,
      toggle,
      toggleCatelog,
      toggleCollapseShow,
      handleLogout,
      handleSwitchingComponent,
      handleSwitchingComponentOnyProfile,
      handleToggleInput,
    };
  },
};
</script>
