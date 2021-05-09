<template>
  <div class="p-5 bg-white">
    <!--screen less than 640 without user-->
    <div v-if="!user && windowWidth < 640" class="flex justify-between">
      <div class="w-full">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-24 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo.png"
          />
        </router-link>
      </div>

      <div class="flex justify-end w-full">
        <div class="flex justify-between items-center space-x-5">
          <div
            class="col-span-1 group relative hover:text-pink-600 flex justify-end cursor-pointer text-pink-500 items-center"
          >
            <div
              class="absolute -bottom-9 z-10 xl:-bottom-10 left-0 h-12 xl:h-12 bg-transparent w-full"
            ></div>
            <div
              class="absolute top-14 w-screen -right-28 sm:w-96 sm:-right-32 xl:top-16 z-20 text-thin text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100"
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
                <router-link :to="{ name: 'Categories' }"
                  >All Categories</router-link
                >
              </h4>
            </div>
            <span>Categories</span>
          </div>

          <div class="col-span-1 flex justify-end">
            <svg
              @click="handlePopup"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="text-pink-500 h-5 w-5 cursor-pointer hover:text-pink-600"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <div class="flex justify-end">
            <router-link
              class="hover:text-pink-600 inline-block focus:outline-none cursor-pointer text-pink-500"
              :to="{ name: 'Login' }"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!--end screen less than 640px without user-->

    <!-- screen greater than 640px without user-->
    <div
      v-if="!user && windowWidth >= 640"
      class="grid sm:grid-cols-6 sm:space-x-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 items-center"
    >
      <div class="col-span-1">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-20 sm:w-24 xl:w-32 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo.png"
          />
        </router-link>
      </div>

      <div
        class="col-span-1 group relative hover:text-pink-600 flex justify-center lg:justify-start cursor-pointer text-pink-500 items-center"
      >
        <div
          class="absolute -bottom-9 z-10 xl:-bottom-10 left-0 h-12 bg-transparent w-full"
        ></div>
        <div
          class="absolute left-0 top-14 w-96  xl:top-16 z-20 text-thin text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100"
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
            <router-link :to="{ name: 'Categories' }"
              >All Categories</router-link
            >
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

      <div class="col-span-1 flex justify-end items-center w-full pr-5">
        <router-link
          class="hover:text-pink-600 inline-block focus:outline-none cursor-pointer text-pink-500"
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
    <!-- end screen greater than 640px without user-->

    <!--screen less than 640px within user-->
    <div
      v-if="user && windowWidth < 640"
      class="flex justify-between items-center space-x-5"
    >
      <div class="w-full">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-24 sm:w-24 xl:w-32 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo.png"
          />
        </router-link>
      </div>

      <div class="flex justify-end space-x-3 items-center">
        <div
          v-if="!user?.admin"
          class="group relative hover:text-pink-600 flex justify-center cursor-pointer text-pink-500 items-center"
        >
          <div
            class="absolute -bottom-9 z-10 xl:-bottom-10 left-0 h-12 bg-transparent w-full"
          ></div>
          <div
            class="absolute top-14 w-screen -right-36 sm:w-96 sm:-left-28  xl:top-16 z-20 text-thin text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100"
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
              <router-link :to="{ name: 'Categories' }"
                >All Categories</router-link
              >
            </h4>
          </div>
          <span>Categories</span>
        </div>

        <div class="flex justify-end">
          <svg
            @click="handlePopup"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="text-pink-500 h-5 w-5 cursor-pointer hover:text-pink-600"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <div v-if="user?.admin" class="flex justify-end">
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CheckoutOrder' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 lg:h-11 inline-block p-2 text-pink-500 hover:text-pink-600"
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
              class="absolute top-0 left-4 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ orders.length }}
            </div>
          </router-link>
        </div>

        <div class="flex justify-end">
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CartDetails' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 inline-block p-2 text-pink-500 hover:text-pink-600"
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
              class="absolute top-0 left-4 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ cart.items.length }}
            </div>
          </router-link>
        </div>

        <div class="flex justify-end">
          <div
            class="group relative h-6 w-6 bg-pink-500 text-white rounded-full font-semibold flex justify-center items-center hover:bg-pink-600"
          >
            <span class="uppercase">{{ user.displayName[0] }}</span>
            <!--Dropdown profile-->
            <div
              class="group absolute -bottom-9 -left-4 h-10 w-16 bg-transparent z-20"
            ></div>
            <div
              v-if="myProfile"
              class="absolute top-14 lg:top-16 -right-16 w-96 z-20 shadow-lg hidden group-hover:block"
            >
              <div
                class="flex items-center bg-white py-3 px-5 shadow-lg border-b-2 border-gray-200"
              >
                <div>
                  <h1
                    class="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-center font-semibold uppercase text-white rounded-full"
                  >
                    {{ user.displayName[0] }}
                  </h1>
                </div>
                <div class="ml-2 leading-none text-gray-700">
                  <p>{{ user.displayName }}</p>
                  <span class="text-sm text-gray-400">{{ user.email }}</span>
                </div>
              </div>
              <div class="px-7 py-5 space-y-3 bg-white">
                <p
                  class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
                >
                  <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/phone.png"
                />{{ myProfile.telephone }} -->
                  Account Settings
                </p>
                <p
                  class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
                >
                  <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/telegram.png"
                />{{ myProfile.telegram }} -->
                  Order History
                </p>
                <p
                  class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
                >
                  <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/fb.png"
                />
                {{ myProfile.facebook }} -->
                  Purchase History
                </p>
              </div>
              <div class="px-5 py-3 bg-white border-2 border-gray-200">
                <span
                  @click="handleLogout"
                  class="text-gray-400 cursor-pointer hover:text-pink-500 flex items-center space-x-1"
                >
                  <span class="material-icons">
                    logout
                  </span>
                  <span>sign out</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end screen less than 640px within user-->

    <!--screen greater than 640px within user-->
    <div
      v-if="user && !user?.admin && windowWidth >= 640"
      class="grid sm:grid-cols-6 sm:space-x-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 items-center"
    >
      <div class="col-span-1">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-20 sm:w-24 xl:w-32 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo.png"
          />
        </router-link>
      </div>

      <div
        class="col-span-1 group relative hover:text-pink-600 flex justify-center lg:justify-start cursor-pointer text-pink-500 items-center"
      >
        <div
          class="absolute -bottom-9 z-10 xl:-bottom-10 left-0 h-12 bg-transparent w-full"
        ></div>
        <div
          class="absolute left-0 top-14 xl:top-16 z-20 text-thin text-gray-400 hidden group-hover:block bg-white w-96 border-t-2 border-gray-100"
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
            <router-link :to="{ name: 'Categories' }"
              >All Categories</router-link
            >
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
        class="col-span-1 items-center flex justify-end space-x-3 lg:space-x-5 w-full pr-5"
      >
        <div class="flex justify-end">
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CartDetails' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 lg:h-11 inline-block p-2 text-pink-500 hover:text-pink-600"
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
              class="absolute top-0 left-4 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ cart.items.length }}
            </div>
          </router-link>
        </div>

        <div
          class="group relative  h-7 w-7 lg:h-9 lg:w-9 bg-pink-500 text-white rounded-full font-semibold flex justify-center items-center hover:bg-pink-600"
        >
          <span class="uppercase">{{ user.displayName[0] }}</span>
          <!--Dropdown profile-->
          <div
            class="group absolute -bottom-9 -left-4 h-10 w-16 bg-transparent z-20"
          ></div>
          <div
            v-if="myProfile"
            class="absolute top-14 lg:top-16 -right-5 w-96 z-20 shadow-lg hidden group-hover:block"
          >
            <div
              class="flex items-center bg-white py-3 px-5 shadow-lg border-b-2 border-gray-200"
            >
              <div>
                <h1
                  class="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-center font-semibold uppercase text-white rounded-full"
                >
                  {{ user.displayName[0] }}
                </h1>
              </div>
              <div class="ml-2 leading-none text-gray-700">
                <p>{{ user.displayName }}</p>
                <span class="text-sm text-gray-400">{{ user.email }}</span>
              </div>
            </div>
            <div class="px-7 py-5 space-y-3 bg-white">
              <p
                class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
              >
                <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/phone.png"
                />{{ myProfile.telephone }} -->
                Account Settings
              </p>
              <p
                class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
              >
                <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/telegram.png"
                />{{ myProfile.telegram }} -->
                Order History
              </p>
              <p
                class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
              >
                <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/fb.png"
                />
                {{ myProfile.facebook }} -->
                Purchase History
              </p>
            </div>
            <div class="px-5 py-3 bg-white border-2 border-gray-200">
              <span
                @click="handleLogout"
                class="text-gray-400 cursor-pointer hover:text-pink-500 flex items-center space-x-1"
              >
                <span class="material-icons">
                  logout
                </span>
                <span>sign out</span></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end screen greater than 640px within user-->

    <!--screen greater than 640px for admin-->
    <div
      v-if="user?.admin && windowWidth > 640"
      class="grid sm:grid-cols-5 sm:space-x-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 items-center"
    >
      <div class="col-span-1">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-20 sm:w-24 xl:w-32 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo.png"
          />
        </router-link>
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

      <div class="col-span-1 items-center flex justify-between w-full pr-3">
        <div class="flex justify-end">
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CheckoutOrder' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 lg:h-11 inline-block p-2 text-pink-500 hover:text-pink-600"
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
              class="absolute top-0 left-4 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ orders.length }}
            </div>
          </router-link>
        </div>

        <div class="flex justify-end">
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CartDetails' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 lg:h-11 inline-block p-2 text-pink-500 hover:text-pink-600"
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
              class="absolute top-0 left-4 border-2 border-white bg-red-600 w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
            >
              {{ cart.items.length }}
            </div>
          </router-link>
        </div>

        <div
          class="group relative  h-7 w-7 lg:h-9 lg:w-9 bg-pink-500 text-white rounded-full font-semibold flex justify-center items-center hover:bg-pink-600"
        >
          <span class="uppercase">{{ user.displayName[0] }}</span>
          <!--Dropdown profile-->
          <div
            class="group absolute -bottom-9 -left-4 h-10 w-16 bg-transparent uppercase z-20"
          ></div>
          <div
            v-if="myProfile"
            class="absolute top-14 lg:top-16 -right-3 w-96 z-20 shadow-lg hidden group-hover:block"
          >
            <div
              class="flex items-center bg-white py-3 px-5 shadow-lg border-b-2 border-gray-200"
            >
              <div>
                <h1
                  class="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-center font-semibold uppercase text-white rounded-full"
                >
                  {{ user.displayName[0] }}
                </h1>
              </div>
              <div class="ml-2 leading-none text-gray-700">
                <p>{{ user.displayName }}</p>
                <span class="text-sm text-gray-400">{{ user.email }}</span>
              </div>
            </div>
            <div class="px-7 py-5 space-y-3 bg-white">
              <p
                class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
              >
                <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/phone.png"
                />{{ myProfile.telephone }} -->
                Account Settings
              </p>
              <p
                class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
              >
                <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/telegram.png"
                />{{ myProfile.telegram }} -->
                Order History
              </p>
              <p
                class="text-gray-700 text-sm font-normal hover:text-pink-500 cursor-pointer"
              >
                <!-- <img
                  class="w-8 h-8 rounded-full mr-1 inline-block bg-white"
                  src="@/assets/images/fb.png"
                />
                {{ myProfile.facebook }} -->
                Purchase History
              </p>
            </div>
            <div class="px-5 py-3 bg-white border-2 border-gray-200">
              <span
                @click="handleLogout"
                class="text-gray-400 cursor-pointer hover:text-pink-500 flex items-center space-x-1"
              >
                <span class="material-icons">
                  logout
                </span>
                <span>sign out</span></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end screen greater than 640px for admin-->
  </div>

  <!--sub navbar for admin-->
  <div
    v-if="user?.admin"
    class="bg-white text-gray-400 shadow-lg border-t-2 border-gray-100 grid grid-cols-4 space-x-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9"
  >
    <div
      v-if="windowWidth > 640"
      class="group hover:text-pink-500 relative h-12 col-span-1 flex space-x-2 cursor-pointer items-center"
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
      v-else
      class="group relative hover:text-pink-500 h-12 col-span-1 flex justify-center space-x-2 cursor-pointer items-center"
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
      <span>Categories</span>
    </div>

    <div
      class="group relative hover:text-pink-500 focus:outline-none h-12 flex justify-center sm:pl-2 cursor-pointer items-center"
    >
      <span class="break-normal leading-none text-center">Add Category</span>

      <div
        class="absolute w-96 text-thin left-0 text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100 top-12 z-10 shadow-lg"
      >
        <div>
          <form @submit.prevent="handleAddCategory">
            <div class="w-full h-full space-y-3 p-5">
              <input
                v-model="categoryName"
                class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 w-full shadow p-2"
                type="text"
                placeholder="category name"
                required
              />
              <input
                @change="handleChanges"
                class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 text-gray-700 w-full shadow p-2"
                type="file"
                required
              />
              <h4 v-if="fileError" class="text-red-500 text-sm">
                {{ fileError }}
              </h4>
              <h4 v-if="error" class="text-red-500">{{ error }}</h4>
              <button
                v-if="!isPending"
                class="hover:text-pink-600 focus:outline-none font-semibold bg-white shadow w-full p-2 text-pink-500"
              >
                Add
              </button>
              <button
                v-else
                class="hover:text-pink-600 focus:outline-none font-semibold bg-white shadow w-full p-2 text-pink-500"
              >
                Adding...
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="group relative hover:text-pink-500 focus:outline-none flex justify-center h-12 cursor-pointer items-center"
    >
      <span class="text-center leading-none break-normal">Promote Admin</span>
      <div
        class="absolute w-96 text-thin left-0 text-gray-400 hidden group-hover:block bg-white border-t-2 border-gray-100 top-12 z-10 shadow-lg"
      >
        <div>
          <form @submit.prevent="handleAddAdmin">
            <div class="w-full h-full space-y-3 p-5">
              <input
                v-model="email"
                class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 w-full shadow p-2"
                type="email"
                placeholder="email"
                required
              />
              <button
                class="hover:text-pink-600 focus:outline-none bg-white font-semibold shadow w-full p-2 text-pink-500"
              >
                promote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="col-span-1 hover:text-pink-500 focus:outline-none flex h-12 cursor-pointer items-center"
    >
      <router-link :to="{ name: 'Reports' }">
        <span class="text-center">Reports</span>
      </router-link>
    </div>
  </div>
  <!--end sub navbar for admin-->

  <component :is="currentComponent" @close="currentComponent = ''" />
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import PopupSearch from "@/components/PopupSearch.vue";
import { projectAuth, timestamp, functions } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  components: {
    PopupSearch,
  },
  setup() {
    const file = ref(null);
    const fileError = ref(null);
    const search = ref(null);
    const categoryName = ref("");
    const email = ref("");
    const currentComponent = ref(null);
    const windowWidth = ref(window.innerWidth);

    const router = useRouter();
    const { user } = getUser();
    const { documents: categories } = getCollection("inventory");
    const { documents: orders } = getCollection("orders");
    const { document: cart } = getDocument("carts", user.value?.uid);
    const { _user: myProfile } = getUserDoc("users");
    const { addDoc, isPending, error } = useCollection("inventory");
    const { url, uploadImage } = useStorage();

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handlePopup = () => {
      currentComponent.value = "PopupSearch";
    };

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
      handlePopup,
      currentComponent,
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
      windowWidth,
    };
  },
};
</script>

<style></style>
