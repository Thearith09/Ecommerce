<template>
  <div>
    <div @click.prevent="toggleDropdown" ref="btnDropdownRef" class="relative ">
      <div v-if="user" class="items-center flex">
        <span
          class="w-8 h-6 sm:w-9 sm:h-7 text-white inline-flex items-center justify-center"
        >
          <img
            class="w-full h-full rounded object-cover object-center shadow cursor-pointer transform scale-105"
            :src="user.photoURL"
          />
        </span>
        <div v-if="windowWidth > 640" class="px-2 font-mono justify-end">
          <p class="text-sm font-semibold text-gray-700 capitalize leading-3">
            {{ user.displayName }}
          </p>
          <p class="text-xs text-gray-600">{{ user.email }}</p>
        </div>
      </div>
      <div
        ref="popoverDropdownRef"
        class="absolute right-0 bg-white border text-base z-50 py-2 list-none text-left rounded shadow mt-4"
        :class="{
          hidden: !dropdownPopoverShow,
          block: dropdownPopoverShow,
        }"
        style="min-width: 12rem"
      >
        <a
          @click="handleSwitchingComponent('UserProfile')"
          href="#profile"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
        >
          <i class="fas fa-user-circle"></i>
          <p>{{ $t("Profile") }}</p>
        </a>
        <a
          @click="handleSwitchingComponent('UserProfile', 'AccountSettings')"
          href="#account-settings"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
        >
          <i class="fas fa-cog"></i>
          <p>{{ $t("Account settings") }}</p>
        </a>
        <a
          @click="handleSwitchingComponent('Dashboard')"
          href="#dashboard"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
        >
          <i class="fas fa-tachometer-alt"></i>
          <p>{{ $t("Dashboard") }}</p>
        </a>
        <div class="h-0 my-2 border border-solid border-purple-100" />
        <a
          href="#pablo"
          @click="handleLogout"
          class="flex items-center space-x-2 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
        >
          <i class="fas fa-sign-out-alt"></i>
          <p>{{ $t("Logout") }}</p>
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
import getUser from "@/composables/getUser";
import { onMounted } from "@vue/runtime-core";
export default {
  setup(props, { emit }) {
    const dropdownPopoverShow = ref(false);
    const btnDropdownRef = ref(null);
    const popoverDropdownRef = ref(null);
    const windowWidth = ref(window.innerWidth);

    const router = useRouter();
    const { user } = getUser();

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

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handleSwitchingComponent = (component, dynamicParam) => {
      emit("onSwitchingComponent", { component, dynamicParam });
    };

    return {
      dropdownPopoverShow,
      btnDropdownRef,
      popoverDropdownRef,
      windowWidth,
      user,
      toggleDropdown,
      handleLogout,
      handleSwitchingComponent,
    };
  },
};
</script>
