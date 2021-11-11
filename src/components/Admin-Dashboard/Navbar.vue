<template>
  <!-- Navbar -->
  <nav
    class="w-full bg-gray-900 md:flex-row md:flex-nowrap md:justify-start flex items-center py-6 shadow"
  >
    <div
      v-if="input"
      class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap px-3"
    >
      <!-- Brand -->
      <div @click="handleToggleSidebar" class="inline-block cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 text-white"
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

      <div class="flex items-center space-x-5">
        <!--icon search-->
        <div>
          <i
            @click="handleToggleInput"
            class="fas fa-search text-white cursor-pointer"
          ></i>
        </div>

        <!--languages-->
        <div>
          <SwitchingLanguageDropdown />
        </div>
        <!--Notification-->
        <div>
          <NotificationDropdown />
        </div>
        <!-- User -->
        <div
          class="flex-col md:flex-row list-none items-center md:flex border-l-2 border-white pl-2"
        >
          <UserDropdown />
        </div>
      </div>
    </div>

    <!-- Form -->
    <form v-else class="relative w-full rounded mx-3 max-h-24">
      <span
        class="z-10 h-full leading-snug font-normal text-center absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-4"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          /></svg
      ></span>
      <input
        type="text"
        autofocus
        placeholder="find anything"
        class="border-0 py-4 placeholder-gray-400 text-gray-400 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-purple-700 w-full pl-10"
      />
      <span
        class="z-10 h-full leading-snug font-normal text-center absolute top-2 right-1 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2"
        ><svg
          @click="handleToggleInput"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-900 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
      ></span>
    </form>
  </nav>

  <!-- End Navbar -->
</template>
<script>
import UserDropdown from "@/components/Admin-Dashboard/UserDropdown.vue";
import NotificationDropdown from "@/components/Admin-Dashboard/NotificationDropdown";
import SwitchingLanguageDropdown from "@/components/Admin-Dashboard/SwitchingLanguageDropdown";
import { ref } from "@vue/reactivity";
export default {
  components: {
    UserDropdown,
    NotificationDropdown,
    SwitchingLanguageDropdown,
  },
  setup(props, { emit }) {
    const input = ref(true);

    const handleToggleSidebar = () => {
      emit("onToggleSidebar");
    };

    const handleToggleInput = () => {
      input.value = !input.value;
    };

    return { handleToggleSidebar, handleToggleInput, input };
  },
};
</script>
