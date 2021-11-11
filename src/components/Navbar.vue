<template>
  <div
    class="px-3 py-5 border-b-2 border-purple-100 sm:px-5 sm:py-9 md:py-8 lg:py-7 2xl:py-6 bg-white min-w-max sm:min-w-0"
  >
    <!--without user-->
    <div v-if="!user" class="flex justify-between items-center sm:space-x-3">
      <div
        v-if="windowWidth < 640"
        class="text-purple-700 cursor-pointer w-full"
        @click="handleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div class="w-full md:w-auto">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-40 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo1.png"
          />
        </router-link>
      </div>

      <div class="flex justify-end items-center space-x-3 sm:space-x-4 w-full">
        <div
          v-if="windowWidth > 640"
          class="relative group lg:mt-1 hover:text-purple-900 text-purple-700 cursor-pointer"
        >
          <div
            class="absolute -bottom-12 z-10 left-0 h-14 bg-transparent w-20"
          ></div>
          <div
            class="absolute top-12 sm:top-16 lg:top-14 w-80 shadow-lg max-h-dropdown overflow-auto rounded-b-md -left-10 sm:left-0 z-20 text-gray-700 hidden group-hover:block bg-white border-2 border-purple-100"
          >
            <h4
              class="hover:shadow-lg hover:text-purple-700 px-5 py-2"
              v-for="category in categories"
              :key="category.id"
              @click="handleNavigation(category.id)"
            >
              {{ category.name }}
            </h4>
            <h4 class="hover:shadow-lg hover:text-purple-700 px-5 py-2">
              <router-link :to="{ name: 'Categories' }"
                >All Categories</router-link
              >
            </h4>
          </div>
          <span>Categories</span>
        </div>

        <div
          v-if="windowWidth > 768"
          class="w-full flex justify-between items-center relative"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="absolute text-purple-700 h-5 top-1 md:top-2 ml-3"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>

          <input
            v-model="search"
            @keypress.enter="handleSearch"
            class="focus:outline-none ring ring-offset-2 ring-purple-700 font-thin hover:shadow-sm w-full shadow-lg rounded-full p-1 md:py-2 text-sm mr-2 pl-10 sm:mr-2 sm:pl-10"
            type="search"
            placeholder="find anything"
          />
        </div>

        <div v-else>
          <svg
            @click="handlePopup"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="text-purple-700 hover:text-purple-900 h-6 w-6 cursor-pointer"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <div v-if="windowWidth > 640" class="lg:mb-1">
          <router-link :to="{ name: 'MyWhistlist' }" class="relative group">
            <svg
              class="h-7 cursor-pointer inline-block text-purple-700 hover:text-purple-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- dropdown whistlist -->
            <div
              class="group  absolute -bottom-14 -left-4 h-16 w-14 bg-transparent z-20"
            ></div>
            <div
              v-if="tempWhistlist?.length > 0"
              class="absolute bg-white border-2 border-purple-100 top-12 sm:top-16 -right-5 w-72 max-h-dropdown overflow-y-scroll z-20 shadow-lg hidden group-hover:block"
            >
              <div
                v-for="item in tempWhistlist"
                :key="item.id"
                class="px-5 py-3 space-y-2 border-b-2 border-purple-100"
              >
                <div class="flex items-start space-x-1">
                  <img
                    class="w-14 h-14 rounded object-cover object-center"
                    :src="item.images[0].url"
                    alt="item image"
                  />
                  <div>
                    <p class="font-bold text-purple-700">{{ item.name }}</p>
                    <div class="flex space-x-2" v-if="item.discount > 0">
                      <span
                        class="inline-block text-gray-700 font-semibold line-through"
                        >$ {{ Number(item.price).toFixed(2) }}
                      </span>
                      <span class="text-red-600 font-semibold inline-block">
                        $
                        {{
                          (
                            item.price -
                            (item.price * item.discount) / 100
                          ).toFixed(2)
                        }}
                      </span>
                    </div>
                    <div v-else>
                      <span class="inline-block text-gray-700 font-semibold"
                        >$ {{ Number(item.price).toFixed(2) }}
                      </span>
                    </div>
                  </div>
                </div>
                <router-link
                  :to="{
                    name: 'ProductDetails',
                    params: { id: item.name, categoryName: item.categoryName },
                  }"
                >
                  <button
                    class="w-full uppercase focus:outline-none border-2 mt-2 border-purple-100 hover:border-purple-400 text-purple-700 p-1 font-semibold font-mono"
                  >
                    product details
                  </button>
                </router-link>
              </div>
              <router-link
                :to="{ name: 'MyWhistlist' }"
                class="sticky bottom-0 h-12 w-full bg-yellow-300 uppercase text-gray-700 font-bold flex justify-center items-center"
              >
                Go to whistlist
              </router-link>
            </div>
          </router-link>
        </div>

        <div>
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CartDetails' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 text-purple-700 hover:text-purple-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            <div
              v-if="tempCart.length > 0"
              class="absolute -top-2 left-3 border-2 border-white bg-yellow-300 w-6 h-6 rounded-full text-purple-800 font-bold flex justify-center items-center text-sm"
            >
              {{ tempCart.length }}
            </div>
          </router-link>
        </div>

        <div v-if="windowWidth > 640">
          <svg
            @click="handleSwitchLanguage"
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 cursor-pointer text-purple-700 hover:text-purple-900"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div v-if="windowWidth > 640">
          <router-link
            class="focus:outline-none font-bold cursor-pointer text-purple-700 border-2 border-purple-400 p-2 rounded"
            :to="{ name: 'Login' }"
          >
            Login
          </router-link>
        </div>

        <div v-if="windowWidth > 640">
          <router-link
            class="focus:outline-none font-semibold cursor-pointer text-white bg-purple-700 border-2 border-purple-400 p-2 rounded"
            :to="{ name: 'Signup' }"
          >
            Signup
          </router-link>
        </div>
      </div>
    </div>
    <!--end without user-->

    <!--screen less than 640px within user-->
    <div
      v-if="user && windowWidth < 640"
      class="flex justify-between items-center space-x-5"
    >
      <div class="w-full text-purple-700 cursor-pointer" @click="handleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div class="w-full">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-48 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo1.png"
          />
        </router-link>
      </div>

      <div class="flex justify-end items-end space-x-1 w-full">
        <div>
          <svg
            @click="handlePopup"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="text-purple-700 h-6 cursor-pointer hover:text-putple-900"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <div v-if="windowWidth > 640">
          <router-link :to="{ name: 'MyWhistlist' }" class="relative group">
            <svg
              class="h-7 cursor-pointer inline-block text-purple-700 hover:text-purple-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- dropdown whistlist -->
            <div
              class="group  absolute -bottom-14 -left-4 h-16 w-14 bg-transparent z-20"
            ></div>
            <div
              v-if="whistlist?.length > 0"
              class="absolute bg-white border-2 border-purple-100 top-14 -right-5 w-72 max-h-dropdown overflow-y-scroll z-20 shadow-lg hidden group-hover:block"
            >
              <div
                v-for="item in whistlist"
                :key="item.id"
                class="px-5 py-3 space-y-2 border-b-2 border-purple-100"
              >
                <div class="flex items-start space-x-1">
                  <img
                    class="w-14 h-14 rounded object-cover object-center"
                    :src="item.images[0].url"
                    alt="item image"
                  />
                  <div>
                    <p class="font-bold text-purple-700">{{ item.name }}</p>
                    <div class="flex space-x-2" v-if="item.discount > 0">
                      <span
                        class="inline-block text-gray-700 font-semibold line-through"
                        >$ {{ Number(item.price).toFixed(2) }}
                      </span>
                      <span class="text-red-600 font-semibold inline-block">
                        $
                        {{
                          (
                            item.price -
                            (item.price * item.discount) / 100
                          ).toFixed(2)
                        }}
                      </span>
                    </div>
                    <div v-else>
                      <span class="inline-block text-gray-700 font-semibold"
                        >$ {{ Number(item.price).toFixed(2) }}
                      </span>
                    </div>
                  </div>
                </div>
                <router-link
                  :to="{
                    name: 'ProductDetails',
                    params: { id: item.name, categoryName: item.categoryName },
                  }"
                >
                  <button
                    class="w-full uppercase focus:outline-none border-2 mt-2 border-purple-100 hover:border-purple-400 text-purple-700 p-1 font-semibold font-mono"
                  >
                    product details
                  </button>
                </router-link>
              </div>
              <router-link
                :to="{ name: 'MyWhistlist' }"
                class="sticky bottom-0 h-12 w-full bg-yellow-300 uppercase text-gray-700 font-bold flex justify-center items-center"
              >
                Go to whistlist
              </router-link>
            </div>
          </router-link>
        </div>

        <div>
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CartDetails' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 text-purple-700 hover:text-purple-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>

            <div
              v-if="cart?.length > 0"
              class="absolute -top-2 left-3 border-2 border-white bg-yellow-300 w-6 h-6 rounded-full text-purple-800 font-bold flex justify-center items-center text-sm"
            >
              {{ cart.length }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!--end screen less than 640px within user-->

    <!--screen greater than 640px within user-->
    <div
      v-if="user && windowWidth >= 640"
      class="flex justify-center items-center space-x-3"
    >
      <div>
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-96 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo1.png"
          />
        </router-link>
      </div>

      <div
        class="group relative px-5 flex justify-center cursor-pointer items-center"
      >
        <div
          class="absolute -bottom-10 z-10 bg-transparent left-0 h-14 w-full"
        ></div>
        <div
          class="absolute left-0 top-16 z-20 border-2 border-purple-100 max-h-dropdown overflow-auto font-medium shadow-lg rounded-b-md text-gray-500 hidden group-hover:block bg-white w-96"
        >
          <h4
            class="hover:shadow-lg hover:bg-white tracking-wide text-gray-500 hover:text-purple-700 px-5 py-3"
            v-for="category in categories"
            :key="category.id"
            @click="handleNavigation(category.id)"
          >
            {{ category.name }}
          </h4>
          <h4
            class="hover:shadow-lg tracking-wide text-gray-500 hover:text-purple-700 px-5 py-3"
          >
            <router-link :to="{ name: 'Categories' }"
              >All Categories</router-link
            >
          </h4>
        </div>
        <span class="text-purple-700 hover:text-purple-900 text-lg"
          >Categories</span
        >
      </div>

      <div class="flex justify-between items-center w-full relative">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="absolute text-purple-700 h-5 lg:top-2 ml-3"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>

        <input
          v-model="search"
          @keypress.enter="handleSearch"
          class="focus:outline-none ring ring-offset-2 ring-purple-700 font-thin hover:shadow-sm w-full rounded-full p-1 lg:p-2 lg:pl-10 text-sm mr-2 pl-10 sm:mr-2 sm:pl-10"
          type="search"
          placeholder="find anything"
        />
      </div>

      <div class="flex justify-between items-end space-x-3">
        <div>
          <router-link :to="{ name: 'MyWhistlist' }" class="relative group">
            <svg
              class="h-7 w-7 cursor-pointer inline-block text-purple-700 hover:text-purple-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- dropdown whistlist -->
            <div
              class="group  absolute -bottom-14 -left-4 h-16 w-14 bg-transparent z-20"
            ></div>
            <div
              v-if="whistlist?.length > 0"
              class="absolute bg-white border-2 border-purple-100 top-16 -right-5 w-72 max-h-dropdown overflow-y-scroll z-20 shadow-lg hidden group-hover:block"
            >
              <div
                v-for="item in whistlist"
                :key="item.id"
                class="px-5 py-3 space-y-2 border-b-2 border-purple-100"
              >
                <div class="flex items-start space-x-1">
                  <img
                    class="w-14 h-14 rounded object-cover object-center"
                    :src="item.images[0].url"
                    alt="item image"
                  />
                  <div>
                    <p class="font-bold text-purple-700">{{ item.name }}</p>
                    <div class="flex space-x-2" v-if="item.discount > 0">
                      <span
                        class="inline-block text-gray-700 font-semibold line-through"
                        >$ {{ Number(item.price).toFixed(2) }}
                      </span>
                      <span class="text-red-600 font-semibold inline-block">
                        $
                        {{
                          (
                            item.price -
                            (item.price * item.discount) / 100
                          ).toFixed(2)
                        }}
                      </span>
                    </div>
                    <div v-else>
                      <span class="inline-block text-gray-700 font-semibold"
                        >$ {{ Number(item.price).toFixed(2) }}
                      </span>
                    </div>
                  </div>
                </div>

                <router-link
                  :to="{
                    name: 'ProductDetails',
                    params: { id: item.name, categoryName: item.categoryName },
                  }"
                >
                  <button
                    class="w-full uppercase focus:outline-none border-2 mt-2 border-purple-100 hover:border-purple-400 text-purple-700 p-1 font-semibold font-mono"
                  >
                    product details
                  </button>
                </router-link>
              </div>
              <router-link
                :to="{ name: 'MyWhistlist' }"
                class="sticky bottom-0 h-12 w-full bg-yellow-300 uppercase text-gray-700 font-bold flex justify-center items-center"
              >
                Go to whistlist
              </router-link>
            </div>
          </router-link>
        </div>

        <div class="flex">
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CartDetails' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 inline-block text-purple-600 hover:text-purple-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            <div
              v-if="cart?.length > 0"
              class="absolute -top-2 left-3 border-2 font-bold border-white bg-yellow-300 w-6 h-6 rounded-full text-purple-900 flex justify-center items-center text-sm"
            >
              {{ cart.length }}
            </div>
          </router-link>
        </div>
        <!--for plain user-->
        <div
          v-if="user"
          class="group relative text-white rounded-full w-7 h-7 bg-purple-700 hover:bg-blue-700 font-semibold flex justify-center items-center"
        >
          <div
            v-if="myProfile && !myProfile.phone"
            class="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"
          ></div>
          <div v-if="user.photoURL">
            <img
              class="w-7 h-7 rounded-full object-cover object-center"
              :src="user.photoURL"
            />
          </div>

          <div v-else>
            <span class="uppercase">{{ user.displayName[0] }}</span>
          </div>
          <!--Dropdown profile-->
          <div
            class="group absolute -bottom-14 -left-4 h-16 w-14 bg-transparent z-20"
          ></div>
          <div
            class="absolute bg-white border-2 border-purple-100 top-16 -right-3 w-72 z-20 max-h-dropdown h-screen shadow-lg hidden group-hover:block"
          >
            <div v-if="subDropdown">
              <div
                class="flex items-center py-3 px-5 shadow-lg border-b-2 border-purple-100"
              >
                <div>
                  <div v-if="user.photoURL">
                    <img
                      class="w-8 h-8 min-w-full rounded-full object-cover object-center"
                      :src="user.photoURL"
                    />
                  </div>
                  <div v-else>
                    <h1
                      class="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center bg-purple-700 hover:bg-purple-900 text-center font-semibold uppercase text-white rounded-full"
                    >
                      {{ user.displayName[0] }}
                    </h1>
                  </div>
                </div>

                <div class="ml-2 leading-none text-gray-700">
                  <p class="font-bold uppercase">{{ user.displayName }}</p>
                  <span class="text-sm text-gray-500">{{ user.email }}</span>
                </div>
              </div>

              <div class="p-5 space-y-4 bg-white text-sm">
                <div>
                  <router-link
                    :to="{ name: 'MyWhistlist' }"
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    My Wishlist</router-link
                  >
                </div>

                <div class="flex justify-between">
                  <router-link
                    :to="{ name: 'CartDetails' }"
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    My Cart</router-link
                  >
                  <p
                    v-if="cart?.length > 0"
                    class="bg-yellow-300 w-6 h-6 rounded-full text-purple-800 font-bold flex justify-center items-center"
                  >
                    {{ cart.length }}
                  </p>
                </div>

                <div>
                  <p
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    Payment Methods
                  </p>
                </div>

                <div>
                  <router-link
                    :to="{ name: 'Order-History' }"
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    Order History
                  </router-link>
                </div>

                <div>
                  <router-link
                    :to="{ name: 'Purchase-History' }"
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    Purchase History
                  </router-link>
                </div>

                <div class="relative">
                  <router-link
                    class="text-gray-700 hover:text-purple-700 cursor-pointer"
                    :to="{
                      name: 'Profile',
                      params: { info: 'base-information' },
                    }"
                  >
                    Profile Settings
                  </router-link>
                  <div
                    v-if="myProfile && !myProfile.phone"
                    class="group absolute right-0 top-0 text-red-600 flex items-center space-x-1"
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
                    <span class="inline-block text-xs">No Phone Number</span>
                  </div>
                </div>
              </div>
              <div
                class="flex justify-between items-center px-5 py-3 bg-white border-t-2 border-purple-100"
              >
                <span
                  @click="handleSwitchLanguage"
                  class="text-gray-700 cursor-pointer hover:text-purple-700 flex items-center space-x-1"
                  >Language</span
                >
                <div
                  class="flex justify-center space-x-2 items-center text-gray-700"
                >
                  <span>English</span>
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
                </div>
              </div>

              <div class="px-5 py-3 bg-white border-t-2 border-purple-100">
                <span
                  @click="handleLogout"
                  class="text-gray-700
                  cursor-pointer
                  hover:text-purple-700"
                  >sign out</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <component :is="currentComponent" @close="handleClose" />
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import Menu from "@/components/Menu.vue";
import SwitchLanguage from "@/components/SwitchLanguage";
import PopupSearch from "@/components/PopupSearch.vue";
import { projectAuth } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    PopupSearch,
    Menu,
    SwitchLanguage,
  },
  setup() {
    const search = ref(null);
    const categoryName = ref("");
    const pending = ref(false);
    const subDropdown = ref(true);
    const currentComponent = ref("");
    const windowWidth = ref(window.innerWidth);

    //cart without user signin
    const store = useStore();
    const tempCart = ref(store.state.cart);
    const tempWhistlist = ref(store.state.whistlist);

    const router = useRouter();
    const { user } = getUser();
    const { documents: categories } = getCollection("inventory");
    const { documents: orders } = getCollection("orders");
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");
    const { documents: whistlist } = getDocument(
      "whistlist",
      user.value?.uid,
      "items"
    );
    const { _user: myProfile } = getUserDoc("users");

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handleSwitchLanguage = () => {
      currentComponent.value = "SwitchLanguage";
    };

    const handleMenu = () => {
      currentComponent.value = "Menu";
    };

    const handlePopup = () => {
      currentComponent.value = "PopupSearch";
    };

    const handleClose = () => {
      currentComponent.value = "";
    };

    const handleSearch = () => {
      if (!search.value) {
        router.push({ name: "Home" });
      } else {
        let categoryName = null;
        categories.value.forEach((doc) => {
          if (doc.name.toLowerCase().includes(search.value.toLowerCase())) {
            categoryName = doc.name;
          }
        });
        router.push({
          name: "ProductSearching",
          params: { id: categoryName, search: search.value },
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

    const handleCloseSubDropdown = () => {
      document
        .getElementById("sub-dropdown")
        .classList.remove("animate__fadeInRightBig");
      document
        .getElementById("sub-dropdown")
        .classList.add("animate__fadeOutRight");

      setTimeout(() => {
        subDropdown.value = true;
      }, 200);
    };

    const handleToggleSubDropdown = () => {
      const dropdown = document.getElementById("dropdown");
      if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
      } else {
        dropdown.classList.add("hidden");
      }
    };

    return {
      handleNavigation,
      handleLogout,
      handleSearch,
      handlePopup,
      handleMenu,
      handleClose,
      currentComponent,
      handleSwitchLanguage,
      handleCloseSubDropdown,
      handleToggleSubDropdown,
      user,
      myProfile,
      categoryName,
      categories,
      cart,
      tempCart,
      pending,
      search,
      orders,
      windowWidth,
      subDropdown,
      whistlist,
      tempWhistlist,
    };
  },
};
</script>

<style></style>
