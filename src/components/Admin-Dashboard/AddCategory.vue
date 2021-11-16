<template>
  <div
    class="px-5 mt-8 md:px-0 md:w-9/12 lg:w-7/12 md:min-w-0 min-w-full mx-auto max-w-2xl"
  >
    <div class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 font-medium text-sm pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          {{ $t("Dashboard") }}
        </p>
        <p>/</p>
        <p
          @click="handleSwitchingComponent('CategoryList')"
          class="hover:underline cursor-pointer"
        >
          {{ $t("Categories") }}
        </p>
        <p>/</p>
        <p>
          {{ category?.id ? $t("Edit Category") : $t("Add a new Category") }}
        </p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900">
        {{ category?.id ? $t("Edit Category") : $t("Add a new Category") }}
      </div>
    </div>
    <form
      @submit.prevent="handleImplementCategory"
      class="shadow bg-white rounded border"
    >
      <div class="w-full h-full text-gray-700 space-y-5 p-7">
        <div class="w-full space-y-px relative">
          <label class="block text-sm">Category name</label>
          <input
            v-model="categoryName"
            type="text"
            placeholder="category name"
            required
            class="px-2 py-2 block w-full rounded border hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
          />
        </div>
        <div class="relative w-full">
          <div
            class="relative border-2 border-dashed border-gray-300 p-5 w-full h-auto flex flex-col items-center tracking-wide text-purple-700 ease-linear transition-all duration-150"
          >
            <div
              v-if="file"
              @click="handleClearImage"
              class="absolute top-7 right-7 flex items-center justify-center cursor-pointer w-5 h-5 rounded-full bg-red-600 z-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-white"
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
            <div
              id="img"
              class="max-h-0 w-full overflow-hidden h-full"
              :style="file ? 'max-height: 420px;' : ''"
            ></div>
            <div
              class="relative max-h-0 w-full overflow-hidden h-full"
              :style="isEdition ? 'max-height: 420px;' : ''"
            >
              <img
                class="w-full h-full object-cover object-center"
                :src="categoryUrl"
                alt="category image"
              />
            </div>
            <span class="material-icons-outlined text-5xl">
              cloud_upload
            </span>
            <span
              class="border-t border-b inline-block border-purple-700 py-2 my-5 text-center capitalize font-semibold"
            >
              Upload Category's Image
            </span>
            <label
              v-if="fileError"
              class="text-red-600 text-sm text-center mb-5"
            >
              {{ fileError }}
            </label>
            <label v-if="error" class="text-red-600 text-sm text-center mb-5">{{
              error
            }}</label>
            <label
              class="cursor-pointer hover:bg-purple-700 hover:text-white py-2 px-20 border border-purple-700 rounded-full text-center"
              >Select a file
              <input @change="handleChanges" type="file" class="hidden" />
            </label>
          </div>
        </div>
        <div v-if="!successful" class="py-3">
          <button
            v-if="!isPending"
            class="focus:outline-none tracking-wide bg-white text-purple-700 border border-purple-700 rounded-full w-full py-3 font-medium hover:text-white hover:bg-purple-700"
          >
            {{ category?.id ? "Edit Category" : "Add Category" }}
          </button>

          <button
            v-else
            class="relative flex justify-center items-center focus:outline-none rounded-full cursor-wait font-medium tracking-wide bg-white border border-purple-700 w-full py-3 text-purple-700"
          >
            <div>
              Saving...
            </div>
            <div class="absolute top-4 right-4">
              <div
                class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-700"
              ></div>
            </div>
          </button>
        </div>
        <div v-else class="py-3">
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
</template>

<script>
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import { timestamp } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["category"],
  setup(props, { emit }) {
    const file = ref(null);
    const fileError = ref(null);
    const categoryName = ref(null);
    const categoryUrl = ref(null);
    const categoryId = ref(null);
    const isEdition = ref(false);
    const successful = ref(false);

    const { addDoc, updateDoc, isPending, error } = useCollection("inventory");
    const { url, uploadImage, deleteImage } = useStorage();

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    onMounted(() => {
      if (props.category) {
        categoryName.value = props.category?.name;
        categoryUrl.value = props.category?.url;
        categoryId.value = props.category?.id;
        isEdition.value = true; // for changing image's div in the box
        file.value = categoryUrl.value;
      }
    });

    const handleChanges = (e) => {
      const selected = e.target.files[0];
      const limitedMB = 1048576; //1MB

      if (selected.size > limitedMB) {
        fileError.value = `Size of the image must be less than 1MB.`;
        file.value = null;
      } else {
        if (selected && types.includes(selected.type)) {
          // changing image'div in the box
          // depend on a file is selected or not
          isEdition.value = false;

          //append profile to the div with id(img) immediately
          const div = document.getElementById("img");
          //check whether div has children or not
          if (div.firstChild) {
            div.removeChild(div.firstChild);
          }
          const image = document.createElement("img");
          image.style.height = "100%";
          image.style.width = "100%";
          image.style.objectFit = "cover";
          image.style.objectPosition = "center";
          image.style.zIndex = "10";
          image.src = URL.createObjectURL(selected);
          div.append(image);

          file.value = selected;
          console.log(file.value);
          fileError.value = null;
        } else {
          file.value = null;
          fileError.value = `Only file of type jpg, jpeg, png, svg are allowed!`;
        }
      }
    };
    const handleImplementCategory = async () => {
      if (file.value) {
        //clear the old one before add the new one
        if (categoryUrl.value && categoryUrl.value != file.value) {
          await deleteImage(categoryUrl.value);
          categoryUrl.value = null;
        }

        await uploadImage(file.value);
        const category = {
          id: categoryId.value,
          name: categoryName.value,
          url: categoryUrl.value || url.value,
        };

        if (props.category) {
          await updateDoc(category);
        } else {
          await addDoc({
            name: categoryName.value,
            url: url.value,
            createdAt: timestamp(),
          });
        }

        if (!error.value) {
          successful.value = true;
          setTimeout(() => {
            successful.value = false;
            handleSwitchingComponent("CategoryList");
          }, 2000);
        }
      }
    };

    const handleClearImage = async () => {
      if (categoryUrl.value) {
        await deleteImage(categoryUrl.value);
      }
      file.value = null;
      isEdition.value = false;
    };

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
    };

    return {
      handleSwitchingComponent,
      handleImplementCategory,
      handleClearImage,
      handleChanges,
      categoryName,
      categoryUrl,
      isEdition,
      fileError,
      isPending,
      file,
      successful,
    };
  },
};
</script>

<style></style>
