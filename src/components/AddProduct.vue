<template>
  <div
    class="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white shadow-lg w-1/2">
      <div class="py-3 px-2 flex justify-between items-center">
        <span class="font-semibold text-gray-700 text-md">New Product</span>
        <div
          @click="handleClose"
          class="relative group bg-red-500 border cursor-pointer shadow-lg w-4 h-4 rounded-full flex justify-center items-center"
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
            class="p-2 bg-white text-md text-gray-700  shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="text"
            placeholder="product name"
            required
          />

          <input
            v-model="price"
            class="p-2 bg-white text-md text-gray-700  shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="number"
            placeholder="price"
            required
          />

          <input
            v-model="discount"
            class="p-2 bg-white text-md text-gray-700  shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="number"
            placeholder="discount"
            required
          />

          <input
            v-model="size"
            class="p-2 bg-white text-md text-gray-700 shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="text"
            placeholder="size"
            @keypress.space="handleInsertSize"
          />
          <label class="text-indigo-600 text-sm">
            press (space) in order to insert into sizes:[
            <ur class="p-1" v-for="(size, index) in sizes" :key="index">
              <li
                class="relative group cursor-pointer inline-block text-gray-700"
                @click="handleUpdateSize(size, index)"
              >
                {{ size }}
                <span
                  @click="handleRemoveSize(index)"
                  class="absolute -top-2 -right-1 bg-red-500 w-3 h-3 rounded-full hidden group-hover:flex justify-center items-center"
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
                </span>
              </li>
            </ur>
            ]
          </label>

          <input
            class="p-2 bg-white text-md text-gray-700  shadow-lg w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="file"
            placeholder="image"
            @change="handleInsertImage"
          />
          <lable class="text-indigo-600 text-sm">
            select image in order to insert into images[
            <ur class="p-1" v-for="(image, index) in images" :key="index">
              <li
                class="relative group cursor-pointer inline-block ml-2 text-gray-700"
              >
                {{ image.name }}
                <span
                  @click="handleRemoveImage(index)"
                  class="absolute -top-1 -right-2 bg-red-500 w-3 h-3 rounded-full hidden group-hover:flex justify-center items-center"
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
                </span>
              </li>
            </ur>
            ]
          </lable>

          <button
            class="hover:text-pink-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500 bg-white font-semibold shadow-lg w-full p-2 text-gray-700"
          >
            {{ product ? "Edit" : "Add" }}
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
    let conveyIndex;

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

    const handleInsertSize = () => {
      let index = conveyIndex ? conveyIndex() : null;

      if (index !== null) {
        sizes.value[index] = size.value;
        size.value = "";
      } else {
        sizes.value.push(size.value);
        size.value = "";
      }
    };
    const handleUpdateSize = (value, index) => {
      size.value = value;
      conveyIndex = () => {
        return index;
      };
    };

    const handleRemoveSize = (index) => {
      sizes.value.splice(index, 1);
    };

    const handleInsertImage = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        images.value.push({
          name: selected.name,
        });
        files.value.push(selected);
      } else {
        fileError.value = `Must be file of type jpg, jpeg, png, and svg are allowed`;
        files.value = [];
      }
    };

    const handleRemoveImage = (index) => {
      console.log(index);
    };

    const handleAdd = async () => {
      if (images.value.length > 0 && sizes.value.length > 0) {
        for (let i in files.value) {
          await uploadImage(files.value[i]);
          images.value[i].url = url.value;
        }

        if (props.product) {
          //update
          const product = {
            id: props.product.id,
            productName: productName.value,
            discount: discount.value,
            price: price.value,
            sizes: sizes.value,
            images: images.value,
          };

          const products = props.category.products.map((prod) => {
            if (prod.id == product.id) {
              prod = product;
            }
            return prod;
          });

          await updateDoc({ products });
        } else {
          //insert
          const newProduct = {
            id: uuidv4(),
            productName: productName.value,
            discount: discount.value,
            price: price.value,
            sizes: sizes.value,
            images: images.value,
          };

          await updateDoc({
            products: [...props.category.products, newProduct],
          });
        }

        emit("close");
      }
    };

    const handleClose = () => {
      emit("close");
    };

    return {
      handleInsertSize,
      handleUpdateSize,
      handleInsertImage,
      handleRemoveImage,
      handleRemoveSize,
      handleClose,
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
