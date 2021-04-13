<template>
  <div
    class="bg-white h-96 p-5 shadow-lg hover:translate-y-2 transform transition"
  >
    <div>
      <div>
        <img
          src="https://source.unsplash.com/random"
          alt=" random imgee"
          class="w-full h-48 object-cover object-center"
        />
      </div>
      <div class="relative">
        <div
          class="absolute left-3 -top-10 bg-white shadow-lg text-gray-100 p-6 w-11/12"
        >
          <h4
            class="mt-1 text-xl text-pink-400 font-semibold uppercase leading-tight"
          >
            A random Title
          </h4>

          <div class="mt-1">
            <span
              class="text-gray-400 text-sm line-clamp-3 hover:line-clamp-none"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, quae nemo impedit vel provident aut molestiae alias
              veritatis ducimus ipsam sint eius illo, dolor repudiandae?
              Distinctio sapiente expedita eum in.</span
            >
          </div>
          <div class="mt-4 relative">
            <div class="flex">
              <span class="text-red-500 text-md font-semibold">23$ </span>
              <span class="text-md  text-gray-400">/pcs</span>
            </div>
            <svg
              @click="handleAddToCart"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute -right-12 -bottom-7 hover:shadow-sm rounded-full shadow-lg text-pink-500 h-12 w-12 inline-block p-1 mr-2 cursor-pointer"
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
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { user } = getUser();
    const router = useRouter();

    const handleAddToCart = () => {
      if (!user.value) {
        router.push({ name: "Login" });
      }
    };

    return { handleAddToCart };
  },
};
</script>

<style></style>
