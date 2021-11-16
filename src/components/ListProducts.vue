<template>
  <div class="px-10 max-w-md sm:max-w-none mx-auto">
    <div class="h-full border-b-2 border-purple-100">
      <div class="relative flex justify-between">
        <div v-if="search && products && products.length > 0">
          <div class="text-gray-700 font-bold text-2xl my-5">
            {{ products?.length }} results for "{{ search }}"
            <span class="block text-purple-700 tracking-wide font-bold text-lg"
              >{{ name }} Products</span
            >
          </div>
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
      class="flex flex-col sm:flex-row sm:items-center py-5 h-auto border-b-2 border-purple-100"
    >
      <div
        class="relative w-full sm:w-5/12 xl:w-full h-auto rounded border-2 border-purple-100 overflow-hidden"
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
            class="transform transition duration-500 hover:scale-110 h-full w-full object-cover object-center"
            :src="product.images[product.images.length - 1]?.url"
          />
        </router-link>
        <div
          v-if="product.promotionDescription"
          class="absolute bottom-0 rounded-b py-3 w-full capitalize font-semibold bg-purple-700 bg-opacity-90 text-white text-sm flex justify-center items-center"
        >
          {{ product.promotionDescription }} {{ product.discount }}% OFF
        </div>
      </div>

      <div class="w-full sm:w-7/12 xl:w-full h-auto mt-2 sm:mt-0">
        <div
          class="flex flex-col justify-between h-full text-gray-500 space-y-4 sm:space-y-0 sm:px-5"
        >
          <div class="space-y-2 sm:space-y-3">
            <div class="leading-none tracking-wide space-y-2">
              <p class="font-semibold text-purple-700 tracking-wide uppercase">
                {{ product.name }}
              </p>
              <p>{{ product.description }}</p>
            </div>

            <div>
              <p class="text-purple-700 tracking-wide">
                {{ product.status }}
              </p>
            </div>

            <div
              class="flex items-center space-x-2 py-3 max-w-xs overflow-auto"
            >
              <p v-for="size in product.sizes" :key="size">
                <span
                  class="text-gray-500 font-semibold uppercase border rounded px-3 py-1"
                  >{{ size }}</span
                >
              </p>
            </div>
            <div class="sm:pb-2">
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
            </div>
          </div>
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
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import Card from "@/components/Card.vue";
import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Card,
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

    watch(products, () => {
      emit("emitProducts", products.value);
    });

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

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

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
      handleAddWhistlist,
      handleRemoveWhistlist,
    };
  },
};
</script>
<style></style>
