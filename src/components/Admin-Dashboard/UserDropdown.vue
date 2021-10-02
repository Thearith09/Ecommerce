<template>
  <div>
    <div @click.prevent="toggleDropdown" ref="btnDropdownRef" class="relative ">
      <div class="items-center flex">
        <span
          class="w-8 h-8 text-white bg-yellow-300 rounded-full inline-flex items-center justify-center"
        >
          <img
            alt="..."
            class="w-full rounded-full object-cover object-center shadow"
            src="@/assets/images/me.jpg"
          />
        </span>
      </div>
      <div
        ref="popoverDropdownRef"
        class="absolute right-0 bg-white text-base z-50 py-2 list-none text-left rounded shadow-lg mt-1"
        :class="{
          hidden: !dropdownPopoverShow,
          block: dropdownPopoverShow,
        }"
        style="min-width: 12rem"
      >
        <a
          href="#pablo"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-100 hover:text-purple-600 focus:bg-purple-700 focus:text-white"
        >
          <i class="fas fa-user-circle"></i>
          <p>Profile</p>
        </a>
        <a
          href="#account-settings"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-100 hover:text-purple-600 focus:bg-purple-700 focus:text-white"
        >
          <i class="fas fa-cog"></i>
          <p>Account settings</p>
        </a>
        <a
          href="#pablo"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-100 hover:text-purple-600 focus:bg-purple-700 focus:text-white"
        >
          <i class="fas fa-tachometer-alt"></i>
          <p>Dashboard</p>
        </a>
        <div class="h-0 my-2 border border-solid border-purple-100" />
        <a
          href="#pablo"
          @click="handleLogout"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-100 hover:text-purple-600 focus:bg-purple-700 focus:text-white"
        >
          <i class="fas fa-sign-out-alt"></i>
          <p>Logout</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// import { createPopper } from "@popperjs/core";
import { ref } from "@vue/reactivity";
import { projectAuth } from "@/firebase/config";
import { useRouter } from "vue-router";
export default {
  setup() {
    const dropdownPopoverShow = ref(false);
    const btnDropdownRef = ref(null);
    const popoverDropdownRef = ref(null);

    const router = useRouter();

    const toggleDropdown = () => {
      if (dropdownPopoverShow.value) {
        dropdownPopoverShow.value = false;
      } else {
        dropdownPopoverShow.value = true;
        // createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
        //   placement: "bottom",
        // });
      }
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
    };

    return {
      toggleDropdown,
      dropdownPopoverShow,
      btnDropdownRef,
      popoverDropdownRef,
      handleLogout,
    };
  },
};
</script>
