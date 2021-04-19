<template>
  <div
    class="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white shadow-lg w-1/2">
      <div class="py-3 px-2 flex justify-between items-center">
        <span class="font-semibold text-gray-700 text-md">New Product</span>
        <div
          @click="handleClose"
          class="relative group bg-red-500 border cursor-pointer shadow-lg w-3 h-3 rounded-full flex justify-center items-center"
        >
          <svg
            class="w-2 h-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span
            class="text-gray-900 text-sm absolute bottom-3 -right-2 hidden group-hover:block"
            >close</span
          >
        </div>
      </div>

      <div class="bg-white h-auto my-5 px-5">
        <form @submit.prevent="handleAdd" class="space-y-5">
          <input
            v-model="productName"
            class="p-2 bg-white text-md shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="text"
            placeholder="product name"
            required
          />

          <input
            v-model="price"
            class="p-2 bg-white text-md shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="number"
            placeholder="price"
            required
          />

          <input
            v-model="discount"
            class="p-2 bg-white text-md shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="number"
            placeholder="discount"
            required
          />

          <input
            v-model="size"
            class="p-2 bg-white text-md shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="text"
            placeholder="size"
            @keypress.enter="handleInsertSize"
          />
          <label> press enter in order to insert into sizes{{ sizes }}</label>

          <input
            class="p-2 bg-white text-md shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="file"
            placeholder="image"
            @change="handleInsertImage"
          />
          <label>
            select image in order to insert into images{{ images }}</label
          >

          <button
            class="hover:text-pink-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 bg-white font-semibold shadow-lg w-full p-2 text-gray-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { v4 as uuidv4 } from "uuid";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";

export default {
  props: ["categoryId", "category", "product"],
  setup(props, { emit }) {
    const sizes = ref([]);
    const size = ref(null);
    const images = ref([]);
    const discount = ref(null);
    const price = ref(null);
    const productName = ref("");
    const files = ref([]);
    const fileError = ref(null);
    const urls = ref([]);
    const filePaths = ref([]);

    const { error, updateDoc } = useDocument("inventory", props.categoryId);
    const { url, filePath, uploadImage } = useStorage();

    if (props.product) {
      const p = props.product;
      productName.value = p.productName;
      price.value = p.price;
      discount.value = p.discount;
      sizes.value = p.sizes;
      images.value = p.images;
    }

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const handleClose = () => {
      emit("close");
    };

    const handleInsertSize = () => {
      sizes.value.push(size.value);
      size.value = "";
    };

    const handleInsertImage = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        images.value.push(selected.name);
        files.value.push(selected);
      } else {
        fileError.value = `Must be file of type jpg, jpeg, png, and svg are allowed`;
        files.value = [];
      }
    };

    const handleAdd = async () => {
      if (files.value.length > 0 && sizes.value.length > 0) {
        for (let file of files.value) {
          await uploadImage(file);
          urls.value.push(url.value);
          filePaths.value.push(filePath.value);
        }

        const newProduct = {
          id: uuidv4(),
          productName: productName.value,
          discount: discount.value,
          price: price.value,
          sizes: sizes.value,
          images: images.value,
          imageUrls: urls.value,
          filePaths: filePaths.value,
        };

        await updateDoc({
          products: [...props.category.products, newProduct],
        });

        emit("close");
      }
    };

    return {
      handleClose,
      handleInsertSize,
      handleInsertImage,
      handleAdd,
      sizes,
      size,
      price,
      discount,
      productName,
      images,
    };
  },
};
</script>

<style></style>
