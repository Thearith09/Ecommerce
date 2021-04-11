<template>
  <div class="flex justify-between bg-white items-center h-24 p-5 shadow-lgd">
    <div>
      <img class="w-44 cursor-pointer" src="@/assets/images/logo.png" />
    </div>
    <div class="relative">
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
        class="hover:text-pink-400 text-pink-500 h-12 w-24 inline-block p-1 mr-2 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        />
      </svg>
      <a
        href="#"
        class="hover:bg-pink-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-400 active:bg-pink-600 inline-block bg-pink-500 font-semibold font-mono cursor-pointer p-2 mr-2 rounded-md text-white shadow-lg"
        >Login</a
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
