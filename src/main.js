import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { projectAuth, functions } from "@/firebase/config";
import { useRouter } from "vue-router";
import i18n from "./i18n";

import store from "./store/store.js";

let app;

projectAuth.onAuthStateChanged(async () => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(i18n)
      .use(router)
      .mount("#app");
  }
  const _router = useRouter();
  try {
    const idToken = await projectAuth.currentUser?.getIdToken(true);

    const verifyToken = functions.httpsCallable("verifyToken");
    const result = await verifyToken({ idToken });
    if (result.data == "auth/id-token-revoked") {
      await projectAuth.signOut();
      _router.push({ name: "Login" });
    }
  } catch (err) {
    if (err.code == "auth/user-token-expired") {
      await projectAuth.signOut();
      _router.push({ name: "Login" });
    }
  }
});
