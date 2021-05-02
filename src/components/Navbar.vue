<template>
  <div
    class="grid grid-cols-5 space-x-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 bg-white items-center p-5"
  >
    <div>
      <router-link :to="{ name: 'Home' }">
        <img
          class="w-20 sm:w-24 xl:w-32 cursor-pointer focus:outline-none object-cover"
          src="@/assets/images/logo.png"
        />
      </router-link>
    </div>

    <div
      v-if="!user"
      class="col-span-1 group relative hover:text-pink-400 flex justify-start cursor-pointer text-gray-400 items-center"
    >
      <div
        class="absolute -bottom-5 xl:-bottom-8 left-5 h-8 xl:h-10 bg-transparent w-1/3"
      ></div>
      <div
        class="absolute left-0 top-10 xl:top-14 z-20 text-thin text-gray-400 hidden group-hover:block bg-white w-96 border-t-2 border-gray-100"
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
      <span>Categories</span>
    </div>

    <div
      class="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 flex justify-between items-center relative"
    >
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        class="absolute text-pink-500 h-5 top-1 ml-3 xl:top-2"
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>

      <input
        v-model="search"
        @keypress.enter="handleSearch"
        class="focus:outline-none ring ring-offset-2 ring-pink-400 font-thin hover:shadow-sm w-full shadow-lg rounded-full p-1 text-sm mr-2 pl-10 sm:mr-2 sm:pl-10 xl:text-lg"
        type="search"
        placeholder="searching..."
      />
    </div>

    <div
      v-if="!user"
      class="col-span-1 flex justify-end items-center w-full pr-2"
    >
      <router-link
        class="hover:text-pink-500 inline-block focus:outline-none cursor-pointer text-gray-400"
        :to="{ name: 'Login' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
        sign in
      </router-link>
    </div>

    <div class="items-center flex justify-end cursor-pointer h-full">
      <div class="flex justify-end w-full">
        <div v-if="user" class="flex space-x-5 rounded-full w-full shadow-lg">
          <router-link
            v-if="user?.admin"
            class="
            relative
            w-full
            bg-white
            cursor-pointer
            rounded-l-full
            flex
            justify-center
            items-center
            text-pink-500
            hover:text-pink-600
            border-r-2 border-gray-100"
            :to="{ name: 'CheckoutOrder' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div
              v-if="orders?.length > 0"
              class="absolute top-0 left-8 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ orders.length }}
            </div>
          </router-link>
          <router-link
            class="relative w-full bg-white cursor-pointer rounded-l-full grid grid-cols-1  items-center"
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
              class="absolute top-0 left-8 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ cart.items.length }}
            </div>
          </router-link>

          <div
            class="w-full border-l-2 border-gray-100 rounded-r-full grid grid-cols-1 items-center"
          >
            <div class="flex h-full justify-center items-center">
              <div
                class="group relative h-7 w-7 bg-pink-500 text-white rounded-full uppercase font-semibold flex justify-center items-center hover:bg-pink-600"
              >
                {{ user.displayName[0] }}
                <!--Dropdown profile-->
                <div
                  class="group absolute -bottom-9 -left-4 h-10 w-16 bg-transparent"
                ></div>
                <div
                  v-if="myProfile"
                  class="absolute top-16 -right-16 h-auto w-80 z-20 lowercase shadow-lg hidden group-hover:block"
                >
                  <div class="flex items-center bg-white p-2 shadow-lg">
                    <div>
                      <h1
                        class="h-8 w-8 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-center font-semibold uppercase text-white rounded-full"
                      >
                        {{ user.displayName[0] }}
                      </h1>
                    </div>
                    <div class="ml-2 leading-none text-gray-700">
                      <p>{{ user.displayName }}</p>
                      <span class="text-sm text-gray-400">{{
                        user.email
                      }}</span>
                    </div>
                  </div>
                  <div
                    class="p-2 space-y-2 bg-gray-100 text-gray-700 font-normal"
                  >
                    <p
                      class="transform transition hover:translate-y-1 border-b-2 border-white pb-1"
                    >
                      <img
                        class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                        src="@/assets/images/phone.png"
                      />{{ myProfile.telephone }}
                    </p>
                    <p
                      class="border-white  border-b-2 transform transition hover:translate-y-1 pb-1"
                    >
                      <img
                        class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                        src="@/assets/images/telegram.png"
                      />{{ myProfile.telegram }}
                    </p>
                    <p
                      class="border-white border-b-2 transform transition hover:translate-y-1 pb-1"
                    >
                      <img
                        class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                        src="@/assets/images/fb.png"
                      />
                      {{ myProfile.facebook }}
                    </p>
                  </div>
                  <div class="p-2 bg-white shadow-lg font-normal">
                    <span
                      @click="handleLogout"
                      class="text-gray-700 cursor-pointer hover:text-pink-500"
                    >
                      <svg
                        class="h-5 w-5 inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      sign out</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="user"
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
      v-if="user?.admin"
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
      v-if="user?.admin"
      class="group relative hover:text-pink-400 border-r-2 focus:outline-none active:bg-pink-500 active:text-white border-gray-100 flex justify-center h-12 cursor-pointer hover:shadow-sm items-center"
    >
      <span>Add Admin</span>
      <div
        class="absolute w-96 text-thin left-0 text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100 top-12 z-10 shadow-lg"
      >
        <div>
          <form @submit.prevent="handleAddAdmin">
            <div class="w-full h-full space-y-3 p-5">
              <input
                v-model="email"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
        sign in
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
import { projectAuth, timestamp, functions } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const file = ref(null);
    const fileError = ref(null);
    const search = ref(null);
    const categoryName = ref("");
    const email = ref("");

    const router = useRouter();
    const { user } = getUser();
    const { documents: categories } = getCollection("inventory");
    const { documents: orders } = getCollection("orders");
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { _user: myProfile } = getUserDoc("users");
    const { addDoc, isPending, error } = useCollection("inventory");
    const { url, uploadImage } = useStorage();

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const handleAddAdmin = async () => {
      const addAdminRole = functions.httpsCallable("addAdminRole");
      const result = await addAdminRole({ email: email.value });
      console.log(result);
    };

    const handleSearch = () => {
      if (!search.value) {
        router.push({ name: "Home" });
      } else {
        let categoryId = null;
        categories.value.forEach((doc) => {
          if (
            doc.categoryName.toLowerCase().includes(search.value.toLowerCase())
          ) {
            categoryId = doc.id;
          }
        });
        router.push({
          name: "ProductSearching",
          params: { id: categoryId, search: search.value },
        });
      }
    };

    const handleNavigation = (id) => {
      router.push({
        path: `/categories/${id}`,
      });
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
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

        await addDoc({
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
      handleAddAdmin,
      handleSearch,
      user,
      myProfile,
      categoryName,
      categories,
      fileError,
      cart,
      isPending,
      error,
      search,
      email,
      orders,
    };
  },
};
</script>

<style></style>
