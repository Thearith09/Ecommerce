import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import Categories from "../views/Categories.vue";
import CategoryDetails from "../views/CategoryDetails.vue";
import CartDetails from "../views/CartDetails.vue";
import ProductSearching from "../views/ProductSearching.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Reports from "../views/Reports.vue";
import Success from "../views/Success.vue";
import Cancel from "../views/Cancel.vue";
import Profile from "../views/Profile.vue";
import PageNotFound from "../views/Page404.vue";
import PurchaseHistory from "../views/PurchaseHistory.vue";
import OrderHistory from "../views/OrderHistory.vue";
import MyWhistlist from "../views/MyWhistlist.vue";
import AdminDashboard from "../views/Admin-Dashboard/AdminDashboard";

import { projectAuth } from "@/firebase/config";

const requireAuth = (from, to, next) => {
  const user = projectAuth.currentUser;
  if (user?.admin || user?.packer || user?.delivery) {
    next();
  } else {
    next({ name: "Home" });
  }
};

const routes = [
  //for admin
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    beforeEnter: requireAuth,
  },

  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    beforeEnter: requireAuth,
  },

  //for user
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const user = projectAuth.currentUser;
      if (user?.admin || user?.packer || user?.delivery) {
        next("/admin-dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/categories/:id",
    name: "CategoryDetails",
    component: CategoryDetails,
    props: true,
  },
  {
    path: "/carts/addtocart",
    name: "CartDetails",
    component: CartDetails,
  },
  {
    path: "/products/search/:id",
    name: "ProductSearching",
    component: ProductSearching,
    props: true,
  },
  {
    path: "/category/products/:id",
    name: "ProductDetails",
    component: ProductDetails,
    props: true,
  },
  {
    path: "/profile/:info",
    name: "Profile",
    component: Profile,
    props: true,
  },
  {
    path: "/profile/purchase-history",
    name: "Purchase-History",
    component: PurchaseHistory,
  },
  {
    path: "/profile/order-history",
    name: "Order-History",
    component: OrderHistory,
  },
  {
    path: "/products/my-whistlist",
    name: "MyWhistlist",
    component: MyWhistlist,
  },
  {
    path: "/order/success/",
    name: "Success",
    component: Success,
  },
  {
    path: "/order/cancel/",
    name: "Cancel",
    component: Cancel,
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
