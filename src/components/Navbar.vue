<template>
  <div class="grid grid-cols-5 gap-4 bg-white items-center p-5">
    <divs>
      <router-link :to="{ name: 'Home' }">
        <img
          class="w-44 cursor-pointer focus:outline-none"
          src="@/assets/images/logo.png"
        />
      </router-link>
    </divs>

    <div class="col-span-3 flex justify-between items-center relative">
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        class="absolute text-pink-500 h-5 top-3 ml-3"
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>

      <input
        class="focus:outline-none ring ring-offset-2 ring-pink-400 font-thin hover:shadow-sm w-full shadow-lg rounded-full p-2 mr-2 pl-10"
        type="search"
        placeholder="searching..."
      />
    </div>

    <div class="relative items-center flex justify-end cursor-pointer">
      <!--Dropdown profile-->
      <div
        @mouseleave="dropdown = true"
        v-if="myProfile"
        :class="{ dropdown: dropdown }"
        class="absolute top-20 -right-5 h-auto w-96 z-10 shadow-lg"
      >
        <div class="flex items-center p-2 bg-white shadow-lg ">
          <div>
            <h1
              class="h-8 w-8 flex items-center justify-center bg-pink-500 text-center font-semibold uppercase text-white rounded-full"
            >
              {{ user.displayName[0] }}
            </h1>
          </div>
          <div class="ml-2 leading-none text-gray-700">
            <p>{{ user.displayName }}</p>
            <span class="text-sm text-gray-400">{{ user.email }}</span>
          </div>
        </div>
        <div
          class="p-3 space-y-2 bg-gray-100 text-gray-700 text-md font-semibol"
        >
          <h4
            class="p-2 transform transition hover:translate-y-1 border-b-2 border-white"
          >
            <img
              class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
              src="@/assets/images/phone.png"
            />{{ myProfile.telephone }}
          </h4>
          <h4
            class="border-white  border-b-2 p-2 transform transition hover:translate-y-1"
          >
            <img
              class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
              src="@/assets/images/telegram.png"
            />{{ myProfile.telegram }}
          </h4>
          <h4
            class="border-white border-b-2 p-2 transform transition hover:translate-y-1"
          >
            <img
              class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
              src="@/assets/images/fb.png"
            />
            {{ myProfile.facebook }}
          </h4>
        </div>
        <div class="p-2 bg-white shadow-lg">
          <span
            @click="handleLogout"
            class="text-gray-700 cursor-pointer hover:text-pink-500 text-md font-semibol"
            >Log out</span
          >
        </div>
      </div>

      <div class="flex justify-end w-full">
        <div v-if="user" class="grid grid-cols-2 rounded-full w-full shadow-lg">
          <router-link
            class="bg-white cursor-pointer rounded-l-full grid grid-cols-1  items-center"
            :to="{ name: 'CartDetails' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-11 w-full inline-block p-2 text-pink-500 hover:text-pink-600"
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
            <div
              v-if="cart && cart.items.length > 0"
              class="absolute top-0 left-16 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ cart.items.length }}
            </div>
          </router-link>

          <div
            @click="toggleDropdown"
            class="bg-white group border-l-2 border-gray-100 rounded-r-full grid grid-cols-1 items-center"
          >
            <div class="flex justify-center items-center">
              <div
                class="h-7 w-7 bg-pink-500 text-white rounded-full uppercase font-semibold flex justify-center items-center hover:bg-pink-600"
              >
                {{ user.displayName[0] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-white text-gray-400 shadow-lg border-t-2 border-gray-100 grid grid-cols-8"
  >
    <div
      class="group relative border-r-2 border-gray-100 hover:text-pink-400 h-12 col-span-1 flex space-x-2 cursor-pointer hover:shadow-sm items-center"
    >
      <div
        class="absolute w-96 left-0 text-thin text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100 top-12 z-10 shadow-lg"
      >
        <h4
          class="border-b-2 border-gray-100 hover:border-white hover:shadow-md hover:bg-white hover:text-pink-400 px-5 py-3"
          v-for="category in categories"
          :key="category.id"
          @click="handleNavigation(category.id)"
        >
          {{ category.categoryName }}
        </h4>
        <h4
          class="border-b-2 border-gray-100 hover:border-white hover:shadow-md hover:bg-white hover:text-pink-400 px-5 py-3"
        >
          <router-link :to="{ name: 'Categories' }">All Categories</router-link>
        </h4>
      </div>

      <span class="material-icons material-icons-outlined">
        list
      </span>
      <span>Categories</span>
      <span
        class="hidden group-hover:block material-icons material-icons-outlined"
      >
        expand_less
      </span>
      <span class="group-hover:hidden material-icons material-icons-outlined">
        expand_more
      </span>
    </div>

    <div
      class="group relative hover:text-pink-400 border-r-2 focus:outline-none active:bg-pink-500 active:text-white border-gray-100 h-12 flex justify-center cursor-pointer hover:shadow-sm items-center"
    >
      <span>Add Category</span>

      <div
        class="absolute w-96 text-thin left-0 text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100 top-12 z-10 shadow-lg"
      >
        <div>
          <form @submit.prevent="handleAddCategory">
            <div class="w-full h-full space-y-3 p-5">
              <input
                v-model="categoryName"
                class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 w-full shadow-lg p-2"
                type="text"
                placeholder="category name"
              />
              <input
                @change="handleChanges"
                class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 text-gray-700 w-full shadow-lg p-2"
                type="file"
              />
              <h4 v-if="fileError" class="text-red-500 text-sm">
                {{ fileError }}
              </h4>
              <h4 v-if="error" class="text-red-500">{{ error }}</h4>
              <button
                v-if="!isPending"
                class="hover:text-pink-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 font-semibold bg-white shadow-lg w-full p-2 text-gray-700"
              >
                Add
              </button>
              <button
                v-else
                class="hover:text-pink-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 font-semibold bg-white shadow-lg w-full p-2 text-gray-700"
              >
                Adding...
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="group relative hover:text-pink-400 border-r-2 focus:outline-none active:bg-pink-500 active:text-white border-gray-100 flex justify-center h-12 cursor-pointer hover:shadow-sm items-center"
    >
      <span>Add Admin</span>
      <div
        class="absolute w-96 text-thin left-0 text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100 top-12 z-10 shadow-lg"
      >
        <div>
          <form @submit.prevent="handleAdd">
            <div class="w-full h-full space-y-3 p-5">
              <input
                v-model="categoryName"
                class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 w-full shadow-lg p-2"
                type="email"
                placeholder="email"
              />
              <button
                class="hover:text-pink-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 bg-white font-semibold shadow-lg w-full p-2 text-gray-700"
              >
                promote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="!user" class="col-start-9">
      <router-link
        class="hover:text-pink-500 border-l-2 border-gray-100 focus:outline-none  active:bg-pink-500 active:text-white bg-white cursor-pointer inline-block px-5 py-3 text-gray-400"
        :to="{ name: 'Login' }"
      >
        Log in
      </router-link>
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import { projectAuth, timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const dropdown = ref(true);
    const file = ref(null);
    const fileError = ref(null);
    const categoryName = ref("");

    const { documents: categories } = getCollection("inventory");
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { _user: myProfile } = getUserDoc("users");
    const { addCategory, isPending, error } = useCollection("inventory");
    const { url, uploadImage } = useStorage();

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const handleNavigation = (id) => {
      router.push({
        path: `/categories/${id}`,
      });
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
    };

    const toggleDropdown = () => {
      dropdown.value = !dropdown.value;
    };

    const handleChanges = (e) => {
      const selected = e.target.files[0];
      const limitedMB = 1048576; //1MB

      if (selected.size > limitedMB) {
        fileError.value = `Size of the image must be less than 1MB.`;
        file.value = null;
      } else {
        if (selected && types.includes(selected.type)) {
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

        await addCategory({
          categoryName: categoryName.value,
          url: url.value,
          products: [],
          createdAt: timestamp(),
        });

        if (!error.value) {
          router.push({ name: "Categories" });
          categoryName.value = "";
        }
      }
    };

    return {
      handleChanges,
      handleAddCategory,
      handleNavigation,
      handleLogout,
      user,
      myProfile,
      dropdown,
      toggleDropdown,
      categoryName,
      categories,
      fileError,
      cart,
      isPending,
      error,
    };
  },
};
</script>

<style></style>
