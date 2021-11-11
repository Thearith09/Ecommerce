<template>
  <div class="pt-8 px-5 md:px-10 lg:px-16 mx-auto w-full">
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 font-medium text-sm pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          Dashboard
        </p>
        <p>/</p>
        <p
          @click="handleSwitchingComponent('CategoryList')"
          class="hover:underline cursor-pointer"
        >
          Categories
        </p>
        <p>/</p>
        <p
          @click="handleSwitchingComponent('ProductList')"
          class="hover:underline cursor-pointer"
        >
          Products
        </p>
        <p>/</p>
        <p>
          {{ product ? "Edit Product" : "Add a New Product" }}
        </p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900">
        {{ product ? "Edit Product" : "Add a New Product" }}
      </div>
    </div>
    <div>
      <div class="h-auto w-full">
        <form
          @submit.prevent="handleAdd"
          class="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5"
        >
          <div class="space-y-5 w-full lg:w-7/12">
            <div
              class="relative w-full z-0 tracking-wide bg-white shadow border rounded space-y-2 p-5"
            >
              <div>
                <label class="font-semibold" for="productName">Name</label>
                <input
                  v-model="productName"
                  type="text"
                  id="productName"
                  placeholder="product name"
                  required
                  class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label class="font-semibold" for="productCode">Code</label>
                <input
                  v-model="productCode"
                  type="text"
                  id="productCode"
                  placeholder="product code"
                  required
                  class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div
              class="relative w-full z-0 tracking-wide bg-white shadow border rounded p-5"
            >
              <label for="description" class="font-semibold">Description</label>
              <textarea
                v-model="description"
                placeholder="write something"
                id="description"
                required
                rows="5"
                class="px-3 py-1 block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
              >
              </textarea>
            </div>

            <div
              class="relative w-full z-0 tracking-wide bg-white shadow border rounded p-5 space-y-3"
            >
              <div class="flex items-center space-x-3">
                <div class="w-full">
                  <label for="price" class="font-semibold">Price</label>
                  <input
                    v-model="price"
                    type="number"
                    step=".01"
                    id="price"
                    placeholder="0.0"
                    required
                    class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                  />
                </div>
                <div class="w-full">
                  <label for="discount" class="font-semibold">Discount</label>
                  <input
                    v-model="discount"
                    type="number"
                    step=".01"
                    id="discount"
                    placeholder="0.0"
                    required
                    class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                  />
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-7/12">
                  <label for="size" class="font-semibold">Size</label>
                  <input
                    @keypress.space="handleInsertSize"
                    v-model="size"
                    type="text"
                    id="size"
                    placeholder="SM, M ..."
                    class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                  />
                  <label class="text-purple-600 text-sm tracking-wide">
                    please press (space) in order to insert into size-list
                  </label>
                  <div
                    v-if="sizes && sizes.length > 0"
                    class="flex items-center space-x-2 p-3 border border-dashed border-gray-300 overflow-auto"
                  >
                    <div v-for="(size, index) in sizes" :key="index">
                      <p
                        class="relative inline-block shadow border px-2 py-1 text-gray-700 text-xl font-semibold uppercase cursor-pointer"
                        @click="handleUpdateSize(size, index)"
                      >
                        {{ size }}
                        <span
                          @click="handleRemoveSize(index)"
                          class="absolute top-0 -right-1 cursor-pointer bg-red-600 w-3 h-3 rounded-full flex justify-center items-center"
                        >
                          <svg
                            class="w-2 h-2 text-white"
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
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-5/12">
                  <label class="font-semibold">Status</label>
                  <div class="flex space-x-2 text-gray-500 text-sm">
                    <label class="inline-flex items-center capitalize">
                      <input type="radio" v-model="status" value="in stock" />
                      <span class="ml-2">in stock</span>
                    </label>
                    <label class="inline-flex items-center ml-6 capitalize">
                      <input
                        type="radio"
                        v-model="status"
                        name="accountType"
                        value="out of stock"
                      />
                      <span class="ml-2">out of stock</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative space-y-5 w-full lg:w-5/12">
            <div class="bg-white shadow border rounded p-5">
              <label class="font-semibold" for="categoryName">Category</label>
              <select
                class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                required
                v-model="categoryName"
                :disabled="product"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  selected
                >
                  <p>{{ category.name }}</p>
                </option>
              </select>
            </div>
            <div class="bg-white shadow border p-5 rounded">
              <div
                class="border-2 border-dashed border-gray-300 pb-10 py-5 space-y-5 w-full h-auto flex flex-col items-center tracking-wide text-purple-700 ease-linear transition-all duration-150"
              >
                <span class="material-icons-outlined text-9xl">
                  cloud_upload
                </span>
                <span
                  class="border-t border-b inline-block border-purple-700 py-3 text-center capitalize font-semibold"
                >
                  Upload Images For a Product
                </span>

                <label
                  @change="handleInsertImage"
                  class="cursor-pointer hover:bg-purple-700 hover:text-white py-2 px-20 border border-purple-700 rounded-full text-center"
                  >Select a file <input type="file" class="hidden"
                /></label>

                <div
                  v-if="fileError || warning || error"
                  class="p-5 text-sm text-red-600"
                >
                  <label v-if="fileError">{{ fileError }} </label>
                  <label v-if="warning">
                    {{ warning }}
                  </label>
                  <label v-if="error">{{ error }}</label>
                </div>

                <div class="relative grid grid-cols-3 gap-4">
                  <div v-for="(image, index) in images" :key="index">
                    <div class="relative group w-24 h-24 hover:opacity-70">
                      <img
                        class="w-full h-full object-cover object-center rounded p-px shadow border cursor-text"
                        :src="image.url ? image.url : image.src"
                        alt=""
                      />
                      <span
                        @click="handleRemoveImage(index)"
                        class="cursor-pointer absolute top-1 right-1 bg-red-600 w-4 h-4 rounded-full flex items-center justify-center"
                      >
                        <svg
                          class="w-2 h-2 text-white"
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
                      <p
                        class="absolute top-1/3 left-2 hidden group-hover:block text-sm text-purple-900 font-semibold"
                      >
                        <span class="break-all cursor-text">{{
                          image.name
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="!successful"
              class="bg-white shadow border rounded p-5 font-semibold text-lg"
            >
              <button
                v-if="!isPending"
                class="bg-white rounded-full text-purple-600 hover:text-white hover:bg-purple-700 focus:outline-none tracking-wide border border-purple-700 w-full py-2"
              >
                {{ product ? "Edit Product" : "Save Product" }}
              </button>
              <button
                v-else
                class="relative flex justify-center items-center cursor-wait bg-white rounded-full text-purple-600 tracking-wide border border-purple-700 w-full py-2 focus:outline-none"
              >
                <div>
                  {{ product ? "Editing..." : "Saving..." }}
                </div>
                <div class="absolute top-4 right-4">
                  <div
                    class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
                  ></div>
                </div>
              </button>
            </div>

            <div v-else class="bg-white shadow border rounded p-5 ">
              <button
                class="flex justify-center items-center rounded-full bg-green-400 bg-opacity-80 focus:outline-none tracking-wide border w-full py-2"
              >
                <svg
                  class="animate_animated animate__bounceIn animate__delay-2s text-white h-9 w-9 p-px rounded-full fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getCollection from "@/composables/getCollection";
import { watch } from "@vue/runtime-core";

export default {
  emits: ["close"],
  props: ["product"],
  setup(props, { emit }) {
    const sizes = ref([]);
    const size = ref(null);
    const images = ref([]);
    const discount = ref(null);
    const price = ref(null);
    const status = ref("in stock");
    const productCode = ref(null);
    const productName = ref("");
    const description = ref("");
    const files = ref([]);
    const fileError = ref(null);
    const warning = ref(null);
    const successful = ref(false);
    const categoryName = ref(props.product?.id);

    let conveyIndex;
    let addDoc, updateDoc, error, isPending;

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const { documents: categories } = getCollection("inventory");
    const { url, uploadImage, deleteImage } = useStorage();
    watch(categoryName, () => {
      ({ addDoc, updateDoc, error, isPending } = useDocument(
        "inventory",
        categoryName.value,
        "products"
      ));
    });

    if (props.product) {
      const p = props.product;
      productName.value = p.name;
      productCode.value = p.code;
      description.value = p.description;
      price.value = p.price;
      discount.value = p.discount;
      sizes.value = p.sizes;
      status.value = p.status;
      images.value = p.images;
      categoryName.value = p.categoryName;
    }

    const handleInsertSize = () => {
      let index = conveyIndex ? conveyIndex() : null;
      warning.value = null;

      if (index !== null) {
        sizes.value[index] = size.value;
        size.value = "";
        conveyIndex = null;
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
            src: URL.createObjectURL(selected),
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
        console.log(images.value[index].url);
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
            name: productName.value,
            code: productCode.value,
            description: description.value,
            discount: discount.value,
            price: price.value,
            sizes: sizes.value,
            status: status.value,
            images: images.value,
          };

          await updateDoc(product);

          successful.value = true;
          setTimeout(() => {
            successful.value = false;
            return handleSwitchingComponent("ProductList");
          }, 2000);
        } else {
          //insert
          const newProduct = {
            name: productName.value,
            code: productCode.value,
            description: description.value,
            price: Number(price.value).toFixed(2),
            discount: discount.value,
            sizes: sizes.value,
            status: status.value,
            images: images.value,
          };

          await addDoc(newProduct);
        }

        if (!error.value) {
          successful.value = true;
          setTimeout(() => {
            successful.value = false;
            clearText();
          }, 2000);
        }
      } else {
        warning.value = "Sizes and Images must be exist!";
      }
    };

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
    };

    function clearText() {
      productName.value = "";
      productCode.value = null;
      description.value = "";
      price.value = null;
      discount.value = null;
      sizes.value = [];
      size.value = null;
      status.value = "in stock";
      images.value = [];
      categoryName.value = null;
    }

    return {
      handleInsertSize,
      handleUpdateSize,
      handleInsertImage,
      handleRemoveImage,
      handleRemoveSize,
      handleAdd,
      handleSwitchingComponent,
      status,
      productCode,
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
      fileError,
      categories,
      categoryName,
      successful,
    };
  },
};
</script>
