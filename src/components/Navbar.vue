<template>
  <div
    class="px-3 py-5 sm:px-5 sm:py-9 md:py-8 lg:py-7 2xl:py-6 bg-white min-w-max sm:min-w-0 border-b-2 border-purple-100"
  >
    <!--without user-->
    <div v-if="!user" class="flex justify-between items-center sm:space-x-3">
      <div>
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-40 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo1.png"
          />
        </router-link>
      </div>

      <div class="flex justify-end items-center space-x-3 sm:space-x-4 w-full">
        <div
          class="relative group lg:mt-1 hover:text-purple-900 text-purple-700 cursor-pointer"
        >
          <div
            class="absolute -bottom-12 z-10 left-0 h-14 bg-transparent w-20"
          ></div>
          <div
            class="absolute top-12 sm:top-16 lg:top-14 w-80 shadow-lg max-h-dropdown overflow-y-scroll rounded-b-md -left-10 sm:left-0 z-20 text-gray-700 hidden group-hover:block bg-white border-2 border-purple-100"
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
          v-if="windowWidth > 640"
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

        <div>
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

        <div class="lg:mb-1">
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

        <div>
          <router-link
            class="focus:outline-none cursor-pointer text-purple-700 hover:text-purple-900"
            :to="{ name: 'Login' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7"
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
    <!--end without user-->

    <!--screen less than 640px within user-->
    <div
      v-if="user && windowWidth < 640"
      class="flex justify-between items-center space-x-5"
    >
      <div class="text-purple-700 cursor-pointer" @click="handleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      <div class="flex justify-center pl-20 w-full">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-48 cursor-pointer focus:outline-none object-cover"
            src="@/assets/images/logo1.png"
          />
        </router-link>
      </div>

      <div class="flex justify-end items-end space-x-1">
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

        <div>
          <svg
            @click="handleSwitchLanguage"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 cursor-pointer text-purple-700 hover:text-purple-900"
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

        <div>
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
          class="absolute left-0 top-16 z-20 border-2 border-purple-100 max-h-dropdown overflow-y-scroll font-medium shadow-lg rounded-b-md text-gray-500 hidden group-hover:block bg-white w-96"
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
          <svg
            @click="handleSwitchLanguage"
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 cursor-pointer text-purple-700 hover:text-purple-900"
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

        <div v-if="user?.admin || user?.delivery || user?.packer" class="flex">
          <router-link
            class="relative cursor-pointer items-center"
            :to="{ name: 'CheckoutOrder' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 inline-block text-purple-700 hover:text-purple-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>

            <div
              v-if="orders?.length > 0"
              class="absolute -top-2 left-3 border-2 border-white bg-yellow-300 font-bold text-purple-800 0 w-6 h-6 rounded-full flex justify-center items-center text-sm"
            >
              {{ orders.length }}
            </div>
          </router-link>
        </div>

        <div v-else>
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
          v-if="!user?.admin && !user?.packer && !user?.delivery"
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
            class="group  absolute -bottom-14 -left-4 h-16 w-14 bg-transparent z-20"
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
                      class="w-8 h-8 rounded-full object-cover object-center"
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
                  <p
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    Wishlist
                  </p>
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
                  <p
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    Order History
                  </p>
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
        <!--for stuff and admin-->
        <div v-else class="relative text-purple-700 hover:text-purple-900 pt-1">
          <svg
            @click="handleToggleSubDropdown"
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <!--Dropdown profile-->
          <div
            id="dropdown"
            class="absolute bg-white h-screen top-14 -right-8 w-96 z-20 shadow-lg hidden"
          >
            <div v-if="subDropdown">
              <div
                class="flex items-center py-3 px-5 shadow-lg border-b-2 border-gray-200"
              >
                <div>
                  <div v-if="user.photoURL">
                    <img
                      class="w-7 h-7 rounded-full object-cover object-center"
                      :src="user.photoURL"
                    />
                  </div>
                  <div v-else>
                    <h1
                      class="h-7 w-7 lg:h-9 lg:w-9 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-center font-semibold uppercase text-white rounded-full"
                    >
                      {{ user.displayName[0] }}
                    </h1>
                  </div>
                </div>

                <div class="ml-2 leading-none text-gray-700">
                  <p class="font-bold">{{ user.displayName }}</p>
                  <span class="text-sm text-gray-500">{{ user.email }}</span>
                </div>
              </div>

              <div
                v-if="!user?.admin && !user?.packer && !user?.delivery"
                class="px-7 py-5 space-y-3 bg-white text-sm"
              >
                <div>
                  <router-link
                    class="text-gray-700 hover:text-purple-700 cursor-pointer"
                    :to="{
                      name: 'Profile',
                      params: { info: 'base-information' },
                    }"
                  >
                    Profile Settings
                  </router-link>
                </div>

                <!-- <div>
                  <p
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    Order History
                  </p>
                </div> -->

                <div>
                  <router-link
                    :to="{ name: 'Purchase-History' }"
                    class="text-gray-700 hover:text-purple-700 cursor-pointer inline-block"
                  >
                    Purchase History
                  </router-link>
                </div>
              </div>

              <div v-else class="text-sm px-7 py-5 space-y-3 bg-white">
                <div
                  v-if="user?.admin"
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
                  v-if="user?.admin"
                  @click="handleShowPromoteForm"
                  class="flex justify-between text-gray-700 hover:text-purple-700 cursor-pointer"
                >
                  <p>
                    Promote a User
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

                <div>
                  <router-link
                    class="text-gray-700 hover:text-purple-700 cursor-pointer"
                    :to="{
                      name: 'Profile',
                      params: { info: 'base-information' },
                    }"
                  >
                    Profile Settings
                  </router-link>
                </div>

                <div v-if="user?.admin || user?.packer">
                  <router-link
                    class="text-gray-700 hover:text-purple-700 cursor-pointer"
                    :to="{ name: 'Reports' }"
                  >
                    <span class="text-center">{{ $t("Reports") }}</span>
                  </router-link>
                </div>
              </div>

              <div
                class="flex justify-between items-center px-5 py-3 bg-white border-t-2 border-gray-200"
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

              <div class="px-5 py-3 bg-white border-t-2 border-gray-200">
                <span
                  @click="handleLogout"
                  class="text-gray-700
                  cursor-pointer
                  hover:text-purple-700"
                  >sign out</span
                >
              </div>
            </div>
            <div
              v-else
              id="sub-dropdown"
              class="animate__animated animate__fadeInRight animate__faster bg-white"
            >
              <div
                v-if="succeedMessage"
                class="animate_animated animate__zoomIn animate_faster fixed top-0 w-full h-auto z-20"
              >
                <div
                  class="flex w-full max-w-sm mx-auto overflow-hidden h-16 bg-white rounded-b shadow-md"
                >
                  <div
                    class="flex items-center justify-center w-12 bg-green-500"
                  >
                    <svg
                      class="animate_animated animate__bounceIn w-6 h-6 text-white fill-current"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                      />
                    </svg>
                  </div>

                  <div class="flex justify-center items-center">
                    <div class="mx-5">
                      <span class="font-semibold text-green-500">
                        {{ succeedMessage }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="failedMessage"
                class="animate_animated animate__zoomIn animate_faster fixed top-0 w-full h-auto z-20"
              >
                <div
                  class="flex w-full max-w-sm mx-auto overflow-hidden h-16 bg-white rounded-b shadow-md"
                >
                  <div class="flex items-center justify-center w-12 bg-red-500">
                    <svg
                      class="animate_animated animate__bounceIn w-6 h-6 text-white fill-current"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                      />
                    </svg>
                  </div>

                  <div class="flex justify-center items-center">
                    <div class="mx-5">
                      <p class="text-red-500">
                        {{ failedMessage }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                @click="handleCloseSubDropdown"
                class="bg-gray-100 p-2 text-gray-500 hover:text-gray-700"
              >
                <div
                  class="flex justify-end font-mono w-20 ml-auto items-center transform transition hover:translate-x-1 space-x-1 cursor-pointer"
                >
                  <span>Back</span>
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
              </div>
              <!--show category form-->
              <form
                v-show="!showCategoryForm"
                @submit.prevent="handleAddCategory"
              >
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

                  <label v-if="fileError" class="text-red-600 text-sm">
                    {{ fileError }}
                  </label>
                  <label v-if="error" class="text-red-600">{{ error }}</label>

                  <label
                    class="w-full rounded h-20 flex flex-col items-center px-4 py-3 bg-white shadow tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150"
                  >
                    <span class="material-icons-outlined">
                      cloud_upload
                    </span>
                    <span class="mt-2 text-base leading-normal"
                      >Select a file</span
                    >
                    <input
                      @change="handleChanges"
                      type="file"
                      class="hidden"
                      required
                    />
                  </label>
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

              <!--show promote admin form-->
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
                    class="focus:outline-none rounded tracking-wide shadow w-full p-2 hover:text-white hover:bg-purple-600 bg-white text-purple-600"
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
                  <div
                    class="border-2 border-gray-500 p-3 rounded"
                    v-if="userInfo"
                  >
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
                  <div
                    class="border-2 border-gray-500 p-3 rounded"
                    v-if="orderInfo"
                  >
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
                        <span
                          ><img class="h-8 w-12" :src="item.color" alt=""
                        /></span>
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
                      for="Username"
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
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="windowWidth > 1280" class="bg-white shadow-lg h-10"></div>
  <component :is="currentComponent" @close="handleClose" />
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import Menu from "@/components/Menu.vue";
import SwitchLanguage from "@/components/SwitchLanguage";
import PopupSearch from "@/components/PopupSearch.vue";
import { projectAuth, timestamp, functions } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    PopupSearch,
    Menu,
    SwitchLanguage,
  },
  setup() {
    const file = ref(null);
    const fileError = ref(null);
    const search = ref(null);
    const categoryName = ref("");
    const email = ref("");
    const parcelId = ref(null);
    const pending = ref(false);
    const role = ref("");
    const userInfo = ref("");
    const orderInfo = ref("");
    const subDropdown = ref(true);
    const showCategoryForm = ref(true);
    const showPromoteForm = ref(true);
    const showUserInfoForm = ref(true);
    const showUserOrderForm = ref(true);
    const currentComponent = ref("");
    const succeedMessage = ref("");
    const failedMessage = ref("");
    const windowWidth = ref(window.innerWidth);

    //cart without user signin
    const store = useStore();
    const tempCart = ref(store.state.cart);
    const tempWhistlist = ref(store.state.whistlist);

    const router = useRouter();
    const { user } = getUser();
    const { documents: categories } = getCollection("inventory");
    const { documents: users } = getCollection("users");
    const { documents: orders } = getCollection("orders");
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");
    const { documents: whistlist } = getDocument(
      "whistlist",
      user.value?.uid,
      "items"
    );
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
        email.value = "";
        pending.value = false;
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

    const handleShowCategoryForm = () => {
      subDropdown.value = false;
      showCategoryForm.value = false;
    };

    const handleShowPromoteForm = () => {
      subDropdown.value = false;
      showPromoteForm.value = false;
    };

    const handleShowGetUserInfoForm = () => {
      subDropdown.value = false;
      showUserInfoForm.value = false;
    };

    const handleShowUserOrderForm = () => {
      subDropdown.value = false;
      showUserOrderForm.value = false;
    };

    const handleGetUserOrder = () => {
      pending.value = true;
      orders.value.forEach((order) => {
        if (order.id == parcelId.value.trim()) orderInfo.value = order;
      });
      pending.value = false;
      parcelId.value = "";
    };

    const handleGetUserInfo = async () => {
      pending.value = true;
      const getUserInfo = functions.httpsCallable("getUserInfo");
      const res = await getUserInfo({
        email: email.value,
      });
      users.value?.forEach((user) => {
        if (user.id == res.data?.uid) userInfo.value = user;
      });
      email.value = "";
      pending.value = false;
    };

    const handleCloseSubDropdown = () => {
      showPromoteForm.value = true;
      showCategoryForm.value = true;
      showUserInfoForm.value = true;
      showUserOrderForm.value = true;
      userInfo.value = "";
      orderInfo.value = "";
      parcelId.value = "";
      fileError.value = null;
      error.value = null;
      console.log(fileError.value);
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
      handleChanges,
      handleAddCategory,
      handleNavigation,
      handleLogout,
      handlePromoteUser,
      handleSearch,
      handlePopup,
      handleMenu,
      handleClose,
      currentComponent,
      handleSwitchLanguage,
      handleShowCategoryForm,
      handleShowPromoteForm,
      handleCloseSubDropdown,
      handleShowGetUserInfoForm,
      handleGetUserInfo,
      handleShowUserOrderForm,
      handleGetUserOrder,
      handleToggleSubDropdown,
      user,
      myProfile,
      categoryName,
      categories,
      fileError,
      cart,
      tempCart,
      isPending,
      pending,
      error,
      search,
      email,
      orders,
      role,
      userInfo,
      orderInfo,
      parcelId,
      failedMessage,
      succeedMessage,
      windowWidth,
      subDropdown,
      showCategoryForm,
      showPromoteForm,
      showUserInfoForm,
      showUserOrderForm,
      whistlist,
      tempWhistlist,
    };
  },
};
</script>

<style scoped>
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
