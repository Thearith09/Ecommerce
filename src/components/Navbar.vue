<template>
  <div class="grid grid-cols-5 gap-4 bg-white items-center p-5">
    <div>
      <img
        @click="handleNavigation"
        class="w-44 cursor-pointer"
        src="@/assets/images/logo.png"
      />
    </div>

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

    <div class="relative items-center flex justify-end">
      <div
        @mouseleave="dropdown = true"
        v-if="myProfile"
        :class="{ dropdown: dropdown }"
        class="absolute top-20 -right-5 h-auto w-96 z-10 shadow-lg"
      >
        <div class="flex items-center p-3 bg-white shadow-lg ">
          <div>
            <h1
              class="h-10 w-10 leading-10 bg-pink-500 text-center text-semibold font-mono text-lg uppercase text-white rounded-full inline-block"
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
          <h4 class="border-white p-2 transform transition hover:translate-y-1">
            <img
              class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
              src="@/assets/images/phone.png"
            />{{ myProfile.telephone }}
          </h4>
          <h4 class="border-white p-2 transform transition hover:translate-y-1">
            <img
              class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
              src="@/assets/images/telegram.png"
            />{{ myProfile.telegram }}
          </h4>
          <h4 class="border-white p-2 transform transition hover:translate-y-1">
            <img
              class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
              src="@/assets/images/fb.png"
            />
            {{ myProfile.facebook }}
          </h4>
        </div>
        <div class="p-3 bg-white shadow-lg">
          <span
            @click="handleLogout"
            class="text-gray-700 cursor-pointer hover:text-pink-500 text-md font-semibol"
            >Log out</span
          >
        </div>
      </div>

      <div class="flex justify-end">
        <div v-if="user" class="grid grid-cols-2 rounded-full w-full shadow-lg">
          <div
            class="bg-white group rounded-l-full grid grid-cols-1 hover:grid-cols-2 items-center active:bg-pink-500 active:text-white text-pink-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-full inline-block p-2 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            <span
              class="text-thin text-gray-500 hidden group-hover:inline-block"
              >Cart</span
            >
          </div>
          <div
            @click="toggleDropdown"
            class="bg-white group border-l-2 border-gray-100 rounded-r-full grid grid-cols-1 hover:grid-cols-2 items-center active:bg-pink-500 active:text-white text-pink-500"
          >
            <span
              class="text-thin text-gray-500 hidden pl-3 group-hover:inline-block"
              >Profile</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-full inline-block p-2 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-white text-gray-400 shadow-lg border-t-2 border-gray-100 grid grid-cols-8"
  >
    <div
      class="group relative border-r-2 border-white hover:text-pink-400 h-12 col-span-1 flex space-x-2 shadow-lg cursor-pointer hover:shadow-sm items-center"
    >
      <div
        class="absolute w-96 left-0 text-thin text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100 top-12 z-10 shadow-lg"
      >
        <h4
          class="border-b-2 border-gray-100 hover:border-white hover:shadow-md hover:bg-white hover:text-pink-400 px-5 py-3"
          v-for="category in categories"
          :key="category.id"
          @click="handleNavigation(undefined, category.id)"
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
      class="group relative hover:text-pink-400 border-r-2 focus:outline-none  active:bg-pink-500 active:text-white border-gray-200 h-12 flex justify-center shadow-lg cursor-pointer hover:shadow-sm items-center"
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
              <button
                class="hover:text-pink-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 font-semibold bg-white shadow-lg w-full p-2 text-gray-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="group relative hover:text-pink-400 border-r-2 focus:outline-none active:bg-pink-500 active:text-white border-gray-200 flex justify-center h-12 shadow-lg cursor-pointer hover:shadow-sm items-center"
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
        class="hover:text-pink-500 border-l-2 border-gray-200 focus:outline-none  active:bg-pink-500 active:text-white bg-white cursor-pointer inline-block p-3 text-gray-400 hover:shadow-sm shadow-lg"
        :to="{ name: 'Login' }"
      >
        Log in
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import { projectAuth, timestamp } from "@/firebase/config";
import getUserDoc from "@/composables/getUserDoc";
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getCollection from "@/composables/getCollection";

export default {
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const dropdown = ref(true);
    const file = ref(null);
    const fileError = ref(null);
    const categoryName = ref("");

    const { documents: categories } = getCollection("inventory");
    const { _user: myProfile } = getUserDoc("users");
    const { error, addCategory } = useCollection("inventory");
    const { url, uploadImage } = useStorage();

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const handleNavigation = (event, id) => {
      if (id) {
        router.push({
          path: `/categories/${id}`,
        });
      } else {
        router.push({ name: "Home" });
      }
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

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = `Only file of type jpg, jpeg, png, svg are allowed!`;
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

        router.push({ name: "Categories" });

        categoryName.value = "";
      }
    };

    return {
      handleChanges,
      handleAddCategory,
      handleNavigation,
      user,
      handleLogout,
      myProfile,
      dropdown,
      toggleDropdown,
      categoryName,
      categories,
    };
  },
};
</script>

<style></style>
