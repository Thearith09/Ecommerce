<template>
  <div class="flex h-screen min-w-max">
    <div
      id="main-menu"
      class="bg-white w-64 transform -translate-x-full transition duration-500"
    >
      <div class="flex px-2 py-3 border-b-2 border-gray-200">
        <span
          class="uppercase bg-pink-500 rounded-full w-8 h-8 flex justify-center items-center text-white"
          >{{ user.displayName[0] }}</span
        >
        <div class="ml-2 leading-none text-gray-700">
          <p class="font-bold">{{ user.displayName }}</p>
          <span class="text-sm text-gray-500">{{ user.email }}</span>
        </div>
      </div>

      <div>
        <div
          v-if="!user.admin"
          class="font-light px-2 py-3 space-y-3 bg-white border-b-2 border-gray-200"
        >
          <div
            @click="handleSubMenu"
            class="flex justify-between text-gray-700 hover:text-pink-700 cursor-pointer"
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
          <p class="text-gray-700 hover:text-pink-700 cursor-pointer">
            Account Settings
          </p>
          <p class="text-gray-700 hover:text-pink-700 cursor-pointer">
            Order History
          </p>
          <p class="text-gray-700 hover:text-pink-700 cursor-pointer">
            Purchase History
          </p>
        </div>

        <div
          v-else
          class="font-light px-2 py-3 space-y-3 bg-white border-b-2 border-gray-200"
        >
          <div
            class="flex justify-between text-gray-700 hover:text-pink-700 cursor-pointer"
          >
            <p>
              Account Settings
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
            class="flex justify-between text-gray-700 hover:text-pink-700 cursor-pointer"
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
            class="flex justify-between text-gray-700 hover:text-pink-700 cursor-pointer"
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
            @click="handleSubMenu"
            class="flex justify-between text-gray-700 hover:text-pink-700 cursor-pointer"
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

          <div class="text-gray-700 hover:text-pink-700 cursor-pointer">
            <router-link
              class="relative cursor-pointer items-center"
              :to="{ name: 'CheckoutOrder' }"
            >
              {{ $t("Checkout Order") }}
            </router-link>
          </div>

          <div class="text-gray-700 hover:text-pink-700 cursor-pointer">
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
            class="text-gray-700 cursor-pointer hover:text-pink-700 flex items-center space-x-1"
          >
            <!-- <span class="material-icons text-md">
              logout
            </span> -->
            <span>sign out</span></span
          >
        </div>
      </div>
    </div>

    <div
      id="sub-menu"
      v-show="!show"
      class="font-light bg-white w-64 h-screen transform transition duration-500"
    >
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

      <div class="px-2 py-3 cursor-pointer">
        <p
          class="py-2 hover:text-pink-700 text-gray-700"
          v-for="category in categories"
          :key="category.id"
          @click="handleNavigation(category.id)"
        >
          {{ category.categoryName }}
        </p>
      </div>
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
  <component :is="currentComponent" @close="currentComponent = ''" />
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import getCollection from "@/composables/getCollection";
import { projectAuth } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  components: {
    SwitchLanguage,
  },
  setup(props, { emit }) {
    const currentComponent = ref("");
    const show = ref(true);

    const router = useRouter();
    const { user } = getUser();
    const { _user: myProfile } = getUserDoc("users");
    const { documents: categories } = getCollection("inventory");

    onMounted(() => {
      setTimeout(() => {
        document
          .getElementById("main-menu")
          .classList.remove("-translate-x-full");
      }, 200);
    });

    const handleSubMenu = () => {
      show.value = !show.value;
      setTimeout(() => {
        document.getElementById("sub-menu").classList.add("-translate-x-full");
      });
    };

    const handleCloseSubMenu = () => {
      document.getElementById("sub-menu").classList.remove("-translate-x-full");
      setTimeout(() => {
        show.value = !show.value;
      }, 200);
    };

    const handleClose = () => {
      document.getElementById("main-menu").classList.add("-translate-x-full");
      setTimeout(() => {
        emit("close");
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

      document.getElementById("sub-menu").classList.remove("-translate-x-full");
      setTimeout(() => {
        show.value = !show.value;
        emit("close");
      }, 200);
    };

    return {
      handleClose,
      handleLogout,
      handleSubMenu,
      handleCloseSubMenu,
      handleSwitchLanguage,
      handleNavigation,
      categories,
      user,
      myProfile,
      currentComponent,
      show,
    };
  },
};
</script>

<style>
.max-h-0 {
  max-width: 0;
}
</style>
