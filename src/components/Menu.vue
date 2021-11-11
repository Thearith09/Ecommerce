<template>
  <div
    id="menu"
    class="animate__animated animate__faster flex h-screen fixed inset-0 w-screen bg-gray-700 bg-opacity-50 z-40 min-w-max"
  >
    <div v-if="subMenu" id="main-menu" class="bg-white w-80">
      <div v-if="user" class="flex px-2 py-3 border-b-2 border-purple-100">
        <div class="relative">
          <div v-if="user.photoURL">
            <img
              class="w-8 h-8 rounded-full object-cover object-center"
              :src="user.photoURL"
            />
          </div>
          <div v-else>
            <h1
              class="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center bg-yellow-300 hover:text-purple-900 text-purple-700 text-center font-semibold uppercase rounded-full"
            >
              {{ user.displayName[0] }}
            </h1>
          </div>

          <div
            v-if="myProfile && !myProfile.phone"
            class="absolute w-3 h-3 bg-red-600 rounded-full right-0 top-0"
          ></div>
        </div>
        <div class="ml-2 leading-none text-gray-700 tracking-wide">
          <p class="font-bold uppercase">{{ user.displayName }}</p>
          <span class="text-sm text-gray-500 font-mono">{{ user.email }}</span>
        </div>
      </div>

      <div>
        <div
          class="px-2 py-3 space-y-3 bg-white border-b-2 border-purple-100 text-gray-700 font-medium"
        >
          <div
            @click="handleShowCategory"
            class="flex justify-between items-center hover:text-purple-700 cursor-pointer"
          >
            <p>
              Categories
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            class="flex justify-between hover:text-purple-700 cursor-pointer"
          >
            <router-link :to="{ name: 'MyWhistlist' }">
              My Wishlist
            </router-link>
            <div
              v-if="tempWhistlist?.length > 0 || whistlist?.length > 0"
              class="bg-yellow-300 font-bold text-purple-900 font-mono w-6 h-6 rounded-full text-sm flex justify-center items-center"
            >
              {{ tempWhistlist?.length || whistlist?.length }}
            </div>
          </div>

          <div
            class="flex justify-between hover:text-purple-700 cursor-pointer"
          >
            <router-link :to="{ name: 'CartDetails' }">My Cart</router-link>
            <p
              v-if="tempCart?.length > 0 || cart?.length > 0"
              class="bg-yellow-300 font-bold text-purple-900 font-mono w-6 h-6 rounded-full text-sm flex justify-center items-center"
            >
              {{ tempCart?.length || cart?.length }}
            </p>
          </div>

          <div v-if="user" class="hover:text-purple-700 cursor-pointer">
            Payment Methods
          </div>

          <router-link
            v-if="user"
            :to="{ name: 'Order-History' }"
            class="hover:text-purple-700 cursor-pointer"
          >
            Order History
          </router-link>

          <router-link
            v-if="user"
            :to="{ name: 'Purchase-History' }"
            class="hover:text-purple-700 cursor-pointer block"
          >
            Purchase History
          </router-link>

          <div
            v-if="user"
            class="hover:text-purple-700 cursor-pointer flex justify-between items-center"
          >
            <router-link
              :to="{ name: 'Profile', params: { info: 'base-information' } }"
            >
              Profile Settings
            </router-link>

            <div
              v-if="myProfile && !myProfile.phone"
              class="text-white font-bold bg-red-600 h-4 w-4 text-sm rounded-full flex justify-center items-center"
            >
              !
            </div>
          </div>
        </div>

        <div class="flex px-2 py-3 border-b-2 border-purple-100 font-medium">
          <div
            @click="handleSwitchLanguage"
            class="w-28 px-2 py-1 flex justify-center space-x-2 items-center rounded cursor-pointer border-2 border-purple-100 text-gray-700 hover:text-purple-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clip-rule="evenodd"
              />
            </svg>
            <span>English</span>
          </div>
        </div>

        <div
          v-if="user"
          @click="handleLogout"
          class="mx-2 my-3 border-purple-100 hover:text-purple-700 cursor-pointer font-medium"
        >
          sign out
        </div>

        <div
          v-else
          class="mx-2 my-3 border-purple-100 font-medium flex flex-col space-y-2"
        >
          <router-link
            class="hover:text-purple-700 cursor-pointer"
            :to="{ name: 'Login' }"
          >
            Login
          </router-link>
          <router-link
            class="hover:text-purple-700 cursor-pointer"
            :to="{ name: 'Signup' }"
          >
            Signup
          </router-link>
        </div>
      </div>
    </div>

    <!--start show category-->
    <div
      v-else
      id="sub-menu"
      class="animate__animated animate__slideInRight font-light bg-white w-80 h-screen"
    >
      <div
        @click="handleCloseSubMenu"
        class="flex justify-start items-center font-serif space-x-1 bg-purple-50 p-2 text-purple-800 font-bold cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Menu</span>
      </div>

      <!--show category-->
      <div v-show="!showCategory" class="px-2 py-3 cursor-pointer font-medium">
        <p
          class="text-gray-700 hover:text-purple-700 mb-3 tracking-wide"
          v-for="category in categories"
          :key="category.id"
          @click="handleNavigation(category.id)"
        >
          {{ category.name }}
        </p>
        <router-link
          class="my-3 text-gray-700 hover:text-purple-700 tracking-wide block"
          :to="{ name: 'Categories' }"
          >All Categories</router-link
        >
      </div>
    </div>

    <div
      @click="handleClose"
      class="bg-white rounded-full w-10 h-10 text-purple-900 flex justify-center items-center cursor-pointer my-2 ml-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
  <component
    class="z-40"
    :is="currentComponent"
    @close="currentComponent = ''"
  />
</template>

<script>
import getUser from "@/composables/getUser";
import getUserDoc from "@/composables/getUserDoc";
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import { projectAuth } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    SwitchLanguage,
  },
  setup(props, { emit }) {
    const currentComponent = ref("");
    const subMenu = ref(true);
    const pending = ref(false);
    const showCategory = ref(true);

    const store = useStore();
    const tempCart = ref(store.state.cart);
    const tempWhistlist = ref(store.state.whistlist);

    const router = useRouter();
    const { user } = getUser();
    const { _user: myProfile } = getUserDoc("users");
    const { documents: categories } = getCollection("inventory");

    const { documents: cart } = getDocument("carts", user.value?.uid, "items");
    const { documents: whistlist } = getDocument(
      "whistlist",
      user.value?.uid,
      "items"
    );

    onMounted(() => {
      document.getElementById("menu").classList.add("animate__fadeInLeft");
    });

    const handleShowCategory = () => {
      subMenu.value = !subMenu.value;
      showCategory.value = false;
    };

    const handleCloseSubMenu = () => {
      showCategory.value = true;

      document
        .getElementById("sub-menu")
        .classList.remove("animate__slideInRight");
      document
        .getElementById("sub-menu")
        .classList.add("animate__slideOutRight");

      setTimeout(() => {
        subMenu.value = true;
      }, 200);
    };

    const handleClose = () => {
      document.getElementById("menu").classList.remove("animate__slideInLeft");
      document.getElementById("menu").classList.add("animate__slideOutRight");
      setTimeout(() => {
        emit("close");
        subMenu.value = true;
      }, 200);
    };

    const handleLogout = async () => {
      await projectAuth.signOut();
      router.push({ name: "Login" });
    };

    const handleSwitchLanguage = () => {
      currentComponent.value = "SwitchLanguage";
    };

    const handleNavigation = (id) => {
      router.push({
        path: `/categories/${id}`,
      });

      showCategory.value = !showCategory.value;
      emit("close");
    };

    return {
      handleClose,
      handleLogout,
      handleShowCategory,
      handleCloseSubMenu,
      handleSwitchLanguage,
      handleNavigation,
      categories,
      user,
      pending,
      myProfile,
      currentComponent,
      showCategory,
      subMenu,
      cart,
      whistlist,
      tempCart,
      tempWhistlist,
    };
  },
};
</script>

<style scoped>
.max-h-0 {
  max-width: 0;
}

.origin-0 {
  transform-origin: 0%;
}
.-z-1 {
  z-index: -1;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label,
textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label,
select:focus ~ label,
select:not([value=""]):valid ~ label {
  /* @apply transform; scale-75; -translate-y-6; */
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-scale-x: 0.75;
  --tw-scale-y: 0.75;
  --tw-translate-y: -1.3rem;
}
input:focus ~ label,
select:focus ~ label {
  /* @apply text-black; left-0; */
  --tw-text-opacity: 1;
  color: rgba(124, 58, 237, var(--tw-text-opacity));
  left: 0px;
  z-index: 10;
}
</style>
