<template>
  <div class="px-10 max-w-md sm:max-w-none mx-auto">
    <div class="h-full border-b-2 border-purple-100">
      <div class="relative flex justify-between my-5">
        <div v-if="search && products && products.length > 0">
          <div class="text-gray-700 font-bold text-2xl">
            {{ products?.length }} results for "{{ search }}"
            <span class="block text-purple-700 tracking-wide font-bold text-lg"
              >{{ name }} Products</span
            >
          </div>
        </div>

        <div v-if="user && user.admin" class="absolute top-5 right-0 z-10">
          <img
            @click="mountComponent('AddProduct')"
            class="h-8 w-8 cursor-pointer"
            src="@/assets/images/add-package.png"
            alt="add product icon"
          />
        </div>
      </div>

      <div
        v-if="products && products.length > 0 && !search"
        class="h-auto mb-5 w-full"
      >
        <div class="font-bold text-xl text-gray-700 uppercase mb-5">
          {{ $t("MOST POPULAR") }}
        </div>
        <Card :name="name" />
      </div>
    </div>
  </div>

  <div
    v-if="products"
    class="max-w-sm sm:max-w-none mx-auto grid lg:grid-cols-2 sm:px-10"
  >
    <div
      v-for="(product, index) in products"
      v-show="index >= previous && index < next"
      :key="product.id"
      :class="animate"
      class="flex flex-col sm:flex-row sm:items-center py-5 h-auto transition transform hover:translate-y-2 border-b-2 border-purple-100"
    >
      <div
        class="relative w-full sm:max-w-xs lg:max-w-none lg:w-96 xl:w-full h-48"
      >
        <router-link
          :to="{
            name: 'ProductDetails',
            params: {
              id: product.id,
              categoryName: name,
            },
          }"
        >
          <img
            class="h-full w-full object-cover object-center overflow-hidden rounded border-2 border-purple-100"
            :src="product.images[product.images.length - 1]?.url"
          />
        </router-link>
      </div>

      <div class="w-full h-auto sm:h-48 mt-2 sm:mt-0">
        <div class="flex flex-col justify-between h-full text-gray-500 sm:px-5">
          <div class="space-y-2 sm:space-y-3">
            <div class="leading-none tracking-wide space-y-2">
              <p
                class="font-semibold text-purple-700 tracking-wide font-mono uppercase"
              >
                {{ product.name }}
              </p>
              <p>Lorem ipsum dolor sit.</p>
            </div>

            <div class="space-y-2">
              <p class="text-purple-700 tracking-wide">In stock</p>
              <div class="flex items-center space-x-3">
                <p v-for="size in product.sizes" :key="size">
                  <span class="text-gray-500 font-semibold uppercase">{{
                    size
                  }}</span>
                </p>
              </div>
            </div>

            <div
              v-if="!myWhistlist.includes(product.name)"
              @click="handleAddWhistlist(product, name)"
              class="rounded-full border-2 p-1 border-purple-400 w-7 h-7 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400 hover:text-purple-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            <div
              v-else
              @click="handleRemoveWhistlist(product.name)"
              class="rounded-full border-2 p-1 border-purple-400 w-7 h-7 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-700 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-700 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg> -->
          </div>

          <div v-if="user?.admin" class="flex space-x-3">
            <button
              @click="handleEditProduct(product)"
              class="focus:outline-none text-gray-500 tracking-wide hover:text-blue-700"
            >
              Edit
            </button>
            <button
              @click="handleRemoveProduct(product)"
              class="focus:outline-none text-gray-500 tracking-wide hover:text-blue-700"
            >
              Remove
            </button>
          </div>
        </div>

        <div class="pt-2 sm:pt-0">
          <div class="flex space-x-3" v-if="product.discount > 0">
            <span class="text-gray-700 font-semibold line-through"
              >USD {{ Number(product.price).toFixed(2) }}</span
            >
            <span class="text-red-600 font-semibold"
              >USD
              {{
                (
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)
              }}</span
            >
          </div>

          <div v-else>
            <span class="text-gray-700 font-semibold"
              >USD
              {{
                (
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <component
    @close="unmountComponent"
    :is="currentComponent"
    :name="name"
    :product="product"
    :products="products"
  />
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import AddProduct from "@/components/AddProduct";
import Card from "@/components/Card.vue";
import DeleteProductConfirmation from "@/components/DeleteProductConfirmation";
import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    AddProduct,
    Card,
    DeleteProductConfirmation,
  },
  props: ["name", "search", "previous", "next", "animate"],
  setup(props, { emit }) {
    const currentComponent = ref(null);
    const windowWidth = ref(window.innerWidth);
    const product = ref(null); //for updating product
    const myWhistlist = ref([]);

    const store = useStore();
    const tempWhistlist = ref(store.state.whistlist);

    const { user } = getUser();

    const { error, documents: products } = getDocument(
      "inventory",
      props.name,
      "products"
    );
    const { documents: cart } = getDocument("carts", user.value?.uid, "items");
    const {
      addDoc: addToMyWhistlist,
      deleteDoc: removeMyWhistlist,
    } = useDocument("whistlist", user.value?.uid, "items");
    const { documents: whistlist } = getDocument(
      "whistlist",
      user.value?.uid,
      "items"
    );

    watch(whistlist, () => {
      const results = [];
      whistlist.value?.forEach((item) => {
        if (item?.name) {
          results.push(item.name);
        }
      });
      myWhistlist.value = results;
    });

    watchEffect(() => {
      if (!user.value) {
        const results = [];
        tempWhistlist.value?.forEach((item) => {
          if (item.name) {
            results.push(item.name);
          }
        });
        myWhistlist.value = results;
      }
    });

    watch(products, () => {
      emit("emitProducts", products.value);
    });

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const mountComponent = (component) => {
      currentComponent.value = component;
    };

    const unmountComponent = () => {
      currentComponent.value = null;
      product.value = null;
    };

    const handleEditProduct = (prod) => {
      product.value = prod;
      mountComponent("AddProduct");
    };

    const handleRemoveProduct = (prod) => {
      product.value = prod;
      mountComponent("DeleteProductConfirmation");
    };

    const handleAddWhistlist = async (item, name) => {
      item.categoryName = name;
      if (user.value) {
        await addToMyWhistlist(item);
      } else {
        store.commit("addToWhistlist", item);
        console.log(store.state.whistlist);
      }
    };

    const handleRemoveWhistlist = async (name) => {
      if (user.value) {
        await removeMyWhistlist(name);
      } else {
        store.commit("removeFromWhistlist", name);
      }
    };

    return {
      myWhistlist,
      cart,
      error,
      product,
      products,
      user,
      windowWidth,
      currentComponent,
      mountComponent,
      unmountComponent,
      handleRemoveProduct,
      handleEditProduct,
      handleAddWhistlist,
      handleRemoveWhistlist,
    };
  },
};
</script>
<style></style>
