<template>
  <div v-for="category in categories" :key="category.id">
    <div
      class="grid grid-cols-4 gap-4 bg-white h-96 p-5 shadow-lg hover:translate-y-2 transform transition"
    >
      <div
        v-for="product in category.products"
        :key="product.id"
        class="bg-white h-96 p-5 shadow-lg hover:translate-y-2 transform transition"
      >
        <div>
          <div>
            <img
              :src="product.images[0].url"
              class="w-full h-48 object-cover object-center"
            />
          </div>
          <div class="relative">
            <div
              class="absolute bg-white left-3 -top-10 shadow-lg text-gray-100 p-6 w-11/12"
            >
              <h4
                class="mt-1 text-xl text-pink-400 font-semibold uppercase leading-tight"
              >
                {{ product.productName }}
              </h4>

              <div class="mt-1">
                <span class="text-gray-400 text-sm"
                  >Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.</span
                >
              </div>
              <div class="mt-4 relative">
                <div class="flex">
                  <span class="text-gray-700 font-semibold">
                    USD {{ product.price }}
                    <span class="text-gray-400 font-normal">/piece</span>
                  </span>
                </div>
                <div class="text-gray-400 ">
                  <svg
                    @click="handleAddToCart(product)"
                    :class="{ added: cartIds.includes(product.id) }"
                    fill="currentColor"
                    viewBox="-2 -3 24 24"
                    class="absolute -right-12 -bottom-7 hover:shadow-sm rounded-full shadow-lg hover:text-pink-500 h-10 w-10 border-2 border-gray-100 inline-block p-1 mr-2 cursor-pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

export default {
  props: ["categories"],
  setup(props) {
    const { user } = getUser();
    const router = useRouter();
    const cartIds = ref([]);

    const { document: cart } = getDocument("carts", user.value?.uid);
    const { addDoc, updateDoc: updateCart } = useDocument(
      "carts",
      user.value?.uid
    );

    watch(cart, () => {
      for (let i in cart.value.items) {
        cartIds.value[i] = cart.value.items[i].productId;
      }
    });

    const handleAddToCart = async (product) => {
      if (!user.value) {
        router.push({ name: "Login" });
      } else {
        const item = cart.value.items.filter(
          (item) => item.productId == product.id
        );
        const items = cart.value.items.filter(
          (item) => item.productId != product.id
        );

        if (item.length > 0) {
          await updateCart({
            items: [...items],
          });
        } else {
          const item = {
            productId: product.id,
            productName: product.productName,
            price: product.price,
            discount: product.discount,
            sizes: product.sizes,
            images: product.images,
          };
          await addDoc({
            items: [...items, item],
            createdAt: timestamp(),
          });
        }
      }
    };

    return { handleAddToCart, cartIds };
  },
};
</script>

<style></style>
