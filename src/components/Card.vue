<template>
  <div
    class="bg-white rounded-md p-5 shadow-lg hover:translate-y-2 transform transition"
  >
    <div class="grid grid-cols-2">
      <div>
        <img
          src="https://source.unsplash.com/random"
          alt=" random imgee"
          class="w-full h-48 object-cover object-center"
        />
      </div>
      <div class="relative">
        <div
          class="bg-gradient-to-r from-indigo-600 to-indigo-900 text-gray-100 p-6 h-48 hover:h-auto"
        >
          <h4
            class="mt-1 text-xl text-pink-500 font-semibold uppercase leading-tight"
          >
            A random Title
          </h4>

          <div class="mt-1">
            <span
              class="text-gray-300 text-md line-clamp-3 hover:line-clamp-none"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, quae nemo impedit vel provident aut molestiae alias
              veritatis ducimus ipsam sint eius illo, dolor repudiandae?
              Distinctio sapiente expedita eum in.</span
            >
          </div>
          <div class="mt-4 relative">
            <div class="flex">
              <span class="text-red-600 text-md font-semibold">23$ </span>
              <span class="text-md  text-gray-300">/pcs</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute -right-14 -bottom-7 hover:text-pink-500 text-white h-12 w-24 inline-block p-1 mr-2 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>