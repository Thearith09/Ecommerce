<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <Sidebar
      :class="{ hidden: toggleSidebar }"
      @onSwitching="handleSwitchingComponent"
    />
    <div class="relative mb-auto h-auto">
      <!-- <Navbar
        v-if="windowWidth >= 1024"
        @onToggleSidebar="handleToggleSidebar"
      /> -->
      <div class="absolute w-full h-96" :class="background"></div>
      <component
        :is="currentComponent"
        :itemsOrdered="itemsOrdered"
        :category="category"
        :product="product"
        :promotion="promotion"
        :user="user"
        :accountSettings="accountSettings"
        :key="key"
        @onSwitchingComponent="handleSwitchingOrderChildComponent"
      />
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Admin-Dashboard/Navbar";
import Sidebar from "@/components/Admin-Dashboard/Sidebar";
import UserProfile from "@/components/UserProfile";
import Dashboard from "@/components/Admin-Dashboard/Dashboard";
import OrderList from "@/components/Admin-Dashboard/OrderList";
import UserList from "@/components/Admin-Dashboard/UserList";
import Footer from "@/components/Admin-Dashboard/Footer";
import OrderDetails from "@/components/Admin-Dashboard/OrderDetails";
import CategoryList from "@/components/Admin-Dashboard/CategoryList";
import AddCategory from "@/components/Admin-Dashboard/AddCategory";
import DeleteCategoryConfirmation from "@/components/Admin-Dashboard/DeleteCategoryConfirmation";
import AddProduct from "@/components/Admin-Dashboard/AddProduct";
import ProductList from "@/components/Admin-Dashboard/ProductList";
import DeleteProductConfirmation from "@/components/Admin-Dashboard/DeleteProductConfirmation";
import UserDetails from "@/components/Admin-Dashboard/UserDetails";
import AddPromotion from "@/components/Admin-Dashboard/AddPromotion";
import PromotionList from "@/components/Admin-Dashboard/PromotionList";
import DeletePromotionConfirmation from "@/components/Admin-Dashboard/DeletePromotionConfirmation";
import Reports from "@/components/Admin-Dashboard/Reports";
import { ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
export default {
  components: {
    Navbar,
    Sidebar,
    UserProfile,
    Dashboard,
    OrderList,
    Footer,
    OrderDetails,
    UserList,
    CategoryList,
    AddCategory,
    DeleteCategoryConfirmation,
    ProductList,
    AddProduct,
    DeleteProductConfirmation,
    UserDetails,
    AddPromotion,
    PromotionList,
    DeletePromotionConfirmation,
    Reports,
  },
  setup() {
    const windowWidth = ref(window.innerWidth);
    const toggleSidebar = ref(false);
    const marginLeft = ref("ml-0");
    const date = ref(new Date().getFullYear());
    const currentComponent = ref("Dashboard");
    const background = ref("bg-yellow-300");
    const itemsOrdered = ref(null);
    const category = ref(null);
    const product = ref(null);
    const promotion = ref(null);
    const user = ref(null);
    const accountSettings = ref(null);
    const key = ref(Math.random() * 1000 + 1);

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    watchEffect(() => {
      marginLeft.value =
        windowWidth.value >= 768 && !toggleSidebar.value ? "ml-0" : "ml-0";

      if (windowWidth.value < 768) {
        toggleSidebar.value = false;
      }

      if (currentComponent.value == "Dashboard") {
        background.value = "bg-purple-700";
      } else {
        background.value = "";
      }
    });

    const handleToggleSidebar = () => {
      toggleSidebar.value = !toggleSidebar.value;
      marginLeft.value = marginLeft.value == "ml-0" ? "ml-0" : "ml-0";
    };

    const handleSwitchingComponent = (component, dynamicParam) => {
      currentComponent.value = component;
      accountSettings.value = dynamicParam || null;
      key.value = Math.random() * 1000 + 1;
      category.value = null;
      itemsOrdered.value = null;
      product.value = null;
      user.value = null;
      promotion.value = null;
    };

    const handleSwitchingOrderChildComponent = (component, dynamicParam) => {
      currentComponent.value = component;
      key.value = Math.random() * 1000 + 1;
      category.value = dynamicParam || null;
      itemsOrdered.value = dynamicParam || null;
      product.value = dynamicParam || null;
      user.value = dynamicParam || null;
      promotion.value = dynamicParam || null;
    };

    return {
      key,
      date,
      marginLeft,
      windowWidth,
      currentComponent,
      toggleSidebar,
      handleToggleSidebar,
      background,
      itemsOrdered,
      category,
      product,
      promotion,
      user,
      accountSettings,
      handleSwitchingComponent,
      handleSwitchingOrderChildComponent,
    };
  },
};
</script>

<style></style>
