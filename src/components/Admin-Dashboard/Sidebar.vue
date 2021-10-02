<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-96 md:py-0 md:px-0 shadow bg-white flex flex-wrap items-center justify-between relative z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        v-if="windowWidth < 768"
        class="cursor-pointer text-purple-700 hover:text-purple-900 focus:outline-none"
        type="button"
        @click="toggleCollapseShow('bg-white m-1 py-3 px-6')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      <!-- Brand -->
      <a
        v-if="windowWidth < 768"
        class="text-left text-purple-700 inline-block whitespace-nowrap uppercase font-bold p-4 font-serif"
      >
        Easy4shopping
      </a>
      <!-- User -->
      <div v-if="windowWidth < 768" class="flex items-center space-x-3">
        <SwitchingLanguageDropdown class="cursor-pointer" />
        <NotificationDropdown class="cursor-pointer" />
        <UserDropdown class="cursor-pointer" />
      </div>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:relative md:shadow-none shadow-xl absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        :class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block mb-2 border-b border-solid border-purple-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12 md:w-full">
              <a
                class="md:block md:text-xl md:my-3 md:px-6 text-purple-700 text-left inline-block whitespace-nowrap uppercase font-bold py-4 font-serif tracking-widest"
              >
                Easy4shopping
              </a>
            </div>
            <div v-if="windowWidth < 768" class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer px-3 py-1 text-purple-700 hover:text-purple-900 focus:outline-none"
                @click="toggleCollapseShow('hidden')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
            </div>
          </div>
        </div>
        <!-- Navigation -->
        <div
          class="md:flex-col md:min-w-full flex flex-col space-y-2 font-serif tracking-wider"
        >
          <a
            href="#dashboard"
            class="cursor-pointer text-gray-500 hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-6 py-2"
          >
            <div class="text-xs uppercase py-3 font-bold flex space-x-3">
              <i class="fas fa-tachometer-alt text-sm"></i>
              <p>Dashboard</p>
            </div>
          </a>

          <a
            href="#catalog"
            class="relative flex justify-between cursor-pointer items-center text-gray-500 hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-6 py-2"
            @click="toggleCatelog"
          >
            <div class="text-xs uppercase py-3 font-bold flex space-x-4">
              <i class="fas fa-database text-sm"></i>
              <div>
                Catalog
              </div>
            </div>
            <div :class="toggle ? 'hidden' : 'block'">
              <i class="fas fa-chevron-left text-sm"></i>
            </div>
            <div
              class="absolute top-4 right-5"
              :class="!toggle ? 'hidden' : 'block'"
            >
              <i class="fas fa-chevron-down text-sm"></i>
            </div>
          </a>

          <div
            class="flex flex-col font-semibold space-y-2 text-gray-500 capitalize text-sm font-serif tracking-wider px-10"
            :class="!toggle ? 'hidden' : 'block'"
          >
            <a
              href="#category-list"
              class="hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-4"
            >
              <div class="text-xs uppercase py-5 font-bold flex space-x-4">
                <i class="fas fa-arrow-right sm"></i>
                <p>Category List</p>
              </div></a
            >
            <a
              href="#category"
              class="hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-4"
            >
              <div class="text-xs uppercase py-5 font-bold flex space-x-4">
                <i class="fas fa-arrow-right sm"></i>
                <p>Category</p>
              </div></a
            >
            <a
              href="#product-list"
              class="hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-4"
            >
              <div class="text-xs uppercase py-5 font-bold flex space-x-4">
                <i class="fas fa-arrow-right sm"></i>
                <p>Product List</p>
              </div></a
            >
            <a
              href="#product"
              class="hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-4"
              ><div class="text-xs uppercase py-5 font-bold flex space-x-4">
                <i class="fas fa-arrow-right sm"></i>
                <p>Product</p>
              </div></a
            >
          </div>

          <a
            href="#orders"
            class="cursor-pointer text-gray-500 hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-6 py-2"
          >
            <div class="text-xs uppercase py-3 font-bold flex space-x-3">
              <i class="fab fa-opencart text-sm"></i>
              <p>Orders</p>
            </div>
          </a>

          <a
            href="#customers"
            class="text-gray-500 cursor-pointer hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-6 py-2"
          >
            <div class="text-xs uppercase py-3 font-bold flex space-x-5">
              <i class="fas fa-user text-sm"></i>
              <p>Customers</p>
            </div>
          </a>
        </div>

        <!-- Divider -->
        <hr class="my-2 md:min-w-full border-purple-200" />

        <div
          class="md:flex-col md:min-w-full flex flex-col space-y-2 font-serif tracking-wider"
        >
          <a
            href="#profile"
            class="text-gray-500 cursor-pointer hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-6 py-2"
          >
            <div
              class="text-xs uppercase py-3 font-bold flex space-x-3"
              href="#/profile"
            >
              <i class="fas fa-user-circle text-sm"></i>
              <p>Profile</p>
            </div>
          </a>
          <a
            href="#languages"
            class="text-gray-500 cursor-pointer hover:text-purple-600 hover:bg-purple-100 focus:text-purple-600 focus:bg-purple-100 px-6 py-2"
          >
            <div class="text-xs uppercase py-3 font-bold flex space-x-3">
              <i class="fas fa-globe  text-sm"></i>
              <p>{{ $t("Languages") }}</p>
            </div>
          </a>
        </div>

        <!-- Divider -->
        <hr class="my-2 md:min-w-full border-purple-200" />

        <ul
          class="md:flex-col md:min-w-full flex flex-col list-none font-serif tracking-wider"
        >
          <li
            class="text-gray-500 cursor-pointer hover:text-purple-600 hover:bg-purple-100 px-6 py-2"
          >
            <a class="text-xs uppercase py-3 font-bold flex space-x-3"
              ><i class="fas fa-sign-out-alt text-sm"></i>
              <p @click="handleLogout">Logout</p></a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import NotificationDropdown from "@/components/Admin-Dashboard/NotificationDropdown.vue";
import UserDropdown from "@/components/Admin-Dashboard/UserDropdown.vue";
import SwitchingLanguageDropdown from "@/components/Admin-Dashboard/SwitchingLanguageDropdown";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { projectAuth } from "@/firebase/config";
import { useRouter } from "vue-router";
export default {
  components: {
    NotificationDropdown,
    UserDropdown,
    SwitchingLanguageDropdown,
  },
  setup() {
    const collapseShow = ref("hidden");
    const toggle = ref(false);

    const windowWidth = ref(window.innerWidth);
    const router = useRouter();

    watch(windowWidth, () => {
      if (windowWidth.value >= 768) {
        collapseShow.value = "bg-white";
      } else {
        collapseShow.value = "bg-white m-1 py-3 px-6";
      }
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
      if (windowWidth.value >= 768) {
        collapseShow.value = "bg-white";
      }
    });

    const toggleCollapseShow = (classes) => {
      collapseShow.value = classes;
    };

    const toggleCatelog = () => {
      toggle.value = !toggle.value;
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
    };

    return {
      collapseShow,
      toggle,
      toggleCatelog,
      toggleCollapseShow,
      windowWidth,
      handleLogout,
    };
  },
};
</script>
