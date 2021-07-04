<template>
  <div
    class="h-screen w-full fixed left-0 top-0 bg-gray-900 bg-opacity-50 z-40"
  >
    <div class="flex justify-center items-center w-full h-3/4">
      <div
        class="bg-white shadow w-full sm:w-3/4 md:w-3/4 lg:w-1/2 2xl:w-1/3 rounded-md"
      >
        <div class="py-3 px-2 flex justify-between items-end">
          <span class="font-semibold text-gray-700 font-mono">New Product</span>

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
          <form @submit.prevent="handleAdd" class="space-y-7">
            <div class="relative w-full z-0 tracking-wide">
              <input
                v-model="productName"
                type="text"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
              />
              <label
                for="Username"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Product name</label
              >
            </div>

            <div class="relative w-full z-0 tracking-wide">
              <input
                v-model="description"
                type="text"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
              />
              <label
                for="Username"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Description</label
              >
            </div>

            <div class="relative w-full z-0 tracking-wide">
              <input
                v-model="price"
                type="number"
                step=".01"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
              />
              <label
                for="Username"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Price</label
              >
            </div>

            <div class="relative w-full z-0 tracking-wide">
              <input
                v-model="discount"
                type="number"
                step=".01"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
              />
              <label
                for="Username"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Discount</label
              >
            </div>

            <div class="relative w-full z-0 tracking-wide">
              <input
                @keypress.space="handleInsertSize"
                v-model="size"
                type="text"
                placeholder=" "
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-600 border-gray-200"
              />
              <label
                for="Username"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Size(s)</label
              >
            </div>
            <label class="text-purple-600 text-sm tracking-wide">
              press (space) in order to insert into sizes:[
              <ur
                class="p-1 relative group"
                v-for="(size, index) in sizes"
                :key="index"
              >
                <li
                  class="inline-block text-gray-700"
                  @click="handleUpdateSize(size, index)"
                >
                  {{ size }}
                </li>
                <span
                  @click="handleRemoveSize(index)"
                  class="absolute top-0 right-0 cursor-pointer bg-red-600 w-3 h-3 rounded-full hidden group-hover:flex justify-center items-center"
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
              </ur>
              ]
            </label>

            <label
              class="w-full rounded h-16 flex flex-col py-1 items-center bg-white shadow tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150"
            >
              <span class="material-icons-outlined">
                cloud_upload
              </span>
              <span class="text-base leading-normal">Select a file</span>
              <input @change="handleInsertImage" type="file" class="hidden" />
            </label>

            <lable
              v-if="!fileError"
              class="text-purple-600 text-sm tracking-wide"
            >
              select image in order to insert into images[
              <ur class="p-1" v-for="(image, index) in images" :key="index">
                <li
                  class="relative group cursor-pointer inline-block ml-2 text-gray-700"
                >
                  {{ image.name }}
                  <span
                    @click="handleRemoveImage(index)"
                    class="absolute -top-1 -right-1 bg-red-600 w-3 h-3 rounded-full hidden group-hover:flex justify-center items-center"
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
            <h4 v-if="fileError" class="text-red-600 text-sm">
              {{ fileError }}
            </h4>
            <h4 v-if="warning" class="text-red-600 text-sm">
              {{ warning }}
            </h4>
            <h4 v-if="error" class="text-red-600">{{ error }}</h4>
            <button
              v-if="!isPending"
              class="bg-white rounded text-purple-600 hover:text-purple-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-600 tracking-wide shadow w-full p-2"
            >
              {{ product ? "Edit" : "Add" }}
            </button>
            <button
              v-else
              class="relative flex justify-center items-center bg-white rounded text-purple-600 hover:text-purple-700 focus:ring focus:ring-offset-2 focus:ring-purple-600 tracking-wide shadow w-full p-2 focus:outline-none"
            >
              <div>
                {{ product ? "Editing..." : "Saving..." }}
              </div>
              <div class="absolute top-3 right-2">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
                ></div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";

export default {
  emits: ["close"],
  props: ["name", "products", "product"],
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

    const { error, addDoc, updateDoc, isPending } = useDocument(
      "inventory",
      props.name,
      "products"
    );
    const { url, uploadImage, deleteImage } = useStorage();

    if (props.product) {
      const p = props.product;
      productName.value = p.name;
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
            description: description.value,
            discount: discount.value,
            price: price.value,
            sizes: sizes.value,
            images: images.value,
          };

          await updateDoc(product);
        } else {
          //insert

          const newProduct = {
            name: productName.value,
            description: description.value,
            discount: discount.value,
            price: Number(price.value).toFixed(2),
            sizes: sizes.value,
            images: images.value,
          };

          await addDoc(newProduct);
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

<style scoped>
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
