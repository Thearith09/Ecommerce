<template>
  <div
    class="flex justify-center w-full h-screen bg-gradient-to-tr from-blue-300 to-blue-400"
  >
    <img
      class="object-cover object-center min-w-full min-h-full"
      src="@/assets/images/404.jpg"
      alt=""
    />
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
