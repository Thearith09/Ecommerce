<template>
  <div
    class="flex justify-center fixed w-full h-screen inset-0 bg-gray-900 bg-opacity-50 z-20"
  >
    <div class="flex justify-center items-center w-full h-2/4 mx-5 sm:mx-0">
      <div
        class="relative px-2 py-5 sm:px-5 text-purple-800 bg-white rounded-md w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-6/12 h-auto"
      >
        <div class="flex justify-between items-end">
          <p class="font-mono font-bold text-lg">
            Choose a Language
          </p>
          <svg
            @click="handleClose"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-purple-800 cursor-pointer"
            viewBox="0 0 20 20x"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div
          class="locale-changer grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 text-purple-900"
        >
          <div v-for="(lang, i) in locales" :key="lang">
            <p
              :value="lang"
              @click="handleSwicthing(lang)"
              :class="{ activeLanguage: lang == locale }"
              class="font-semibold rounded p-2 cursor-pointer"
            >
              {{ languages[i] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useI18n } from "vue-i18n";

export default {
  name: "locale-changer",
  setup(props, { emit }) {
    const languages = ref(["English", "ខ្មែរ", "ภาษาไทย", "中文"]);
    const { locale } = useI18n({ useScope: "global" });
    const locales = ref(process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(","));

    const handleClose = () => {
      emit("close");
    };

    const handleSwicthing = (lang) => {
      if (locale.value != lang) {
        locale.value = lang;
      }

      emit("close");
    };

    return { handleClose, handleSwicthing, languages, locales, locale };
  },
};
</script>
