<template>
  <div
    class="bg-page-404 bg-cover bg-center flex justify-center w-full h-screen"
  >
    <div class="absolute top-1/4">
      <router-link
        class="bg-white tracking-wide shadow py-2 px-20 rounded-full text-purple-700 hover:bg-purple-700 hover:text-white"
        :to="{ name: 'Home' }"
      >
        Home
      </router-link>
    </div>
  </div>
</template>
