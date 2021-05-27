<template>
  <div
    class="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-40"
  >
    <div
      class="bg-white shadow w-full sm:w-3/4 md:w-3/4 lg:w-1/2 2xl:w-1/3 rounded"
    >
      <div class="py-3 px-2 flex justify-between items-end">
        <span class="font-semibold text-gray-700 text-md">New Product</span>

        <svg
          @click="handleClose"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500 cursor-pointer"
          viewBox="0 0 20 20x"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div class="bg-white h-auto my-5 px-5">
        <form @submit.prevent="handleAdd" class="space-y-5">
          <input
            v-model="productName"
            class="p-2 bg-white text-md text-gray-700  shadow w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="text"
            placeholder="product name"
            required
          />

          <input
            v-model="description"
            class="p-2 bg-white text-md text-gray-700  shadow w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="text"
            placeholder="description"
            required
          />

          <input
            v-model="price"
            class="p-2 bg-white text-md text-gray-700  shadow w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="number"
            placeholder="price"
            required
          />

          <input
            v-model="discount"
            class="p-2 bg-white text-md text-gray-700  shadow w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="number"
            placeholder="discount"
            required
          />

          <input
            v-model="size"
            class="p-2 bg-white text-md text-gray-700 shadow w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
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
                  class="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full hidden group-hover:flex justify-center items-center"
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
            class="p-2 bg-white text-md text-gray-700  shadow w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-pink-500"
            type="file"
            placeholder="image"
            @change="handleInsertImage"
          />
          <lable v-if="!fileError" class="text-indigo-600 text-sm">
            select image in order to insert into images[
            <ur class="p-1" v-for="(image, index) in images" :key="index">
              <li
                class="relative group cursor-pointer inline-block ml-2 text-gray-700"
              >
                {{ image.name }}
                <span
                  @click="handleRemoveImage(index)"
                  class="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full hidden group-hover:flex justify-center items-center"
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
          <h4 v-if="fileError" class="text-red-500 text-sm">
            {{ fileError }}
          </h4>
          <h4 v-if="warning" class="text-red-500 text-sm">
            {{ warning }}
          </h4>
          <h4 v-if="error" class="text-red-500">{{ error }}</h4>
          <button
            v-if="!isPending"
            class="hover:text-pink-700 bg-white font-semibold shadow w-full p-2 text-pink-500 focus:outline-none"
          >
            {{ product ? "Edit" : "Add" }}
          </button>
          <button
            v-else
            class="hover:text-pink-700 bg-white font-semibold shadow w-full p-2 text-pink-500 focus:outline-none"
          >
            {{ product ? "Saving..." : "Adding..." }}
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
  emits: ["close"],
  props: ["categoryId", "category", "product"],
  setup(props, { emit }) {
    const sizes = ref([]);
    const size = ref(null);
    const images = ref([]);
    const discount = ref(null);
    const price = ref(null);
    const productName = ref("");
    const description = ref("");
    const files = ref([]);
    const fileError = ref(null);
    const warning = ref(null);
    let conveyIndex;

    const { error, updateDoc, isPending } = useDocument(
      "inventory",
      props.categoryId
    );
    const { url, uploadImage, deleteImage } = useStorage();

    if (props.product) {
      const p = props.product;
      productName.value = p.productName;
      description.value = p.description;
      price.value = p.price;
      discount.value = p.discount;
      sizes.value = p.sizes;
      images.value = p.images;
    }

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const handleInsertSize = () => {
      let index = conveyIndex ? conveyIndex() : null;
      warning.value = null;

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
      const limitedMB = 1048576; //1MB
      const selected = e.target.files[0];
      warning.value = null;

      if (selected?.size > limitedMB) {
        fileError.value = `Size of the image must be less than 1MB.`;
        files.value = [];
      } else {
        if (selected && types.includes(selected.type)) {
          images.value.unshift({
            name: selected.name,
          });
          files.value.unshift(selected);
        } else {
          fileError.value = `Must be file of type jpg, jpeg, png, and svg are allowed.`;
          files.value = [];
        }
      }
      e.target.value = "";
    };

    const handleRemoveImage = async (index) => {
      if (images.value[index].url) {
        await deleteImage(images.value[index].url);
        images.value.splice(index, 1);
        files.value.splice(index, 1);
        return;
      }
      images.value.splice(index, 1);
      files.value.splice(index, 1);
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
            description: description.value,
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
            description: description.value,
            discount: discount.value,
            price: price.value,
            sizes: sizes.value,
            images: images.value,
          };

          await updateDoc({
            products: [...props.category.products, newProduct],
          });
        }

        if (!error.value) {
          emit("close");
        }
      } else {
        warning.value = "Sizes and Images must be exist!";
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
      description,
      images,
      warning,
      isPending,
      error,
    };
  },
};
</script>

<style></style>
