import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { projectAuth } from "@/firebase/config";
import i18n from "./i18n";

import store from "./store/store.js";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(i18n)
      .use(router)
      .mount("#app");
  }
});
