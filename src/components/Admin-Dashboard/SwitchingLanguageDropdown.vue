<template>
  <div>
    <div @click.prevent="toggleDropdown" ref="btnDropdownRef">
      <div class="relative">
        <!-- <i
          class="fas fa-globe text-xl text-purple-700 hover:text-purple-900 cursor-pointer"
        ></i> -->
        <img
          class="cursor-pointer shadow border border-gray-300 object-center object-cover"
          src="@/assets/images/kh32px.png"
        />
        <div
          ref="popoverDropdownRef"
          class="absolute right-0 bg-white z-40 py-2 text-left text-gray-500 rounded shadow border mt-4 flex flex-col"
          :class="{
            hidden: !dropdownPopoverShow,
            block: dropdownPopoverShow,
          }"
          style="min-width:12rem"
        >
          <div v-for="(lang, i) in locales" :key="lang" class="">
            <a
              href="#pablo"
              :value="lang"
              @click="handleSwicthing(lang)"
              :class="{ activeDropdownLanguage: lang == locale }"
              class="text-sm py-2 px-4 font-normal block w-full hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
            >
              {{ languages[i] }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { createPopper } from "@popperjs/core";
import { ref } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const dropdownPopoverShow = ref(false);
    const btnDropdownRef = ref(null);
    const popoverDropdownRef = ref(null);

    const languages = ref(["English", "ខ្មែរ", "ภาษาไทย", "中文"]);
    const { locale } = useI18n({ useScope: "global" });
    const locales = ref(process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(","));

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

    const handleSwicthing = (lang) => {
      if (locale.value != lang) {
        locale.value = lang;
      }
    };

    return {
      toggleDropdown,
      dropdownPopoverShow,
      btnDropdownRef,
      popoverDropdownRef,
      handleSwicthing,
      languages,
      locales,
      locale,
    };
  },
};
</script>
