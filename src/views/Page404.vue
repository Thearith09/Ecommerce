<template>
  <div
    class="bg-page-404 bg-cover bg-center flex justify-center w-full h-screen"
  >
    <!-- <img
      class="object-cover object-center min-w-full min-h-full"
      src="@/assets/images/page404.jpg"
      alt=""
    /> -->
    <div class="absolute top-1/4">
      <router-link
        class="bg-white tracking-wide shadow py-2 px-12 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white"
        :to="{ name: 'Home' }"
      >
        Home
      </router-link>
    </div>
  </div>
</template>
