<template>
  <div class="flex justify-between bg-white items-center h-24 p-5 shadow-lg">
    <div>
      <img
        @click="handleNavigation"
        class="w-44 cursor-pointer"
        src="@/assets/images/logo.png"
      />
    </div>
    <div class="relative">
      <div
        v-if="myProfile"
        class="absolute top-20 right-0 h-auto w-1/2 z-10 shadow-lg"
      >
        <div class="flex items-center p-3 bg-white shadow-lg ">
          <div>
            <h1
              class="h-10 w-10 leading-10 bg-indigo-600 text-center text-semibold font-mono text-lg uppercase text-white rounded-full inline-block"
            >
              {{ user.displayName[0] }}{{ user.displayName[1] }}
            </h1>
          </div>
          <div class="ml-2 leading-none text-gray-800">
            {{ user.displayName }}
            {{ user.email }}
          </div>
        </div>
        <div
          class="p-3 space-y-2 bg-gray-100 text-gray-800 text-md font-semibol"
        >
          <h4>Tel: {{ myProfile.telephone }}</h4>
          <h4>Telegram: {{ myProfile.telegram }}</h4>
          <h4>Facebook: {{ myProfile.facebook }}</h4>
        </div>
        <div class="p-3 bg-white shadow-lg">
          <span
            @click="handleLogout"
            class="text-gray-800 cursor-pointer hover:text-indigo-600 text-md font-semibol"
            >Log out</span
          >
        </div>
      </div>
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline text-white"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-5 h-5"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 rounded-md font-semibold text-gray-800 bg-pink-500 p-2 mr-2 pl-10 shadow-lg"
        type="search"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hover:text-pink-400 text-pink-500 h-12 w-24 inline-block p-1 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        />
      </svg>

      <router-link
        v-if="!user"
        class="hover:bg-pink-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 inline-block bg-pink-500 font-semibold font-mono cursor-pointer p-2 mr-2 rounded-md text-white shadow-lg"
        :to="{ name: 'Login' }"
      >
        Login
      </router-link>
      <svg
        v-if="user"
        xmlns="http://www.w3.org/2000/svg"
        class="-ml-8 text-pink-500 h-12 w-24 inline-block p-1 mr-2 cursor-pointer"
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
</template>

<script>
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import { projectAuth } from "@/firebase/config";
import getUserDoc from "@/composables/getUserDoc";

export default {
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const { _user: myProfile } = getUserDoc("users");

    console.log(myProfile);

    const handleNavigation = () => {
      router.push({ name: "Home" });
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
    };

    return { handleNavigation, user, handleLogout, myProfile };
  },
};
</script>

<style></style>
