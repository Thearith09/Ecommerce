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
          @click="handleSwitchingComponent('PromotionList')"
          class="hover:underline cursor-pointer"
        >
          Promotions
        </p>
        <p>/</p>
        <p>
          {{ promotion?.id ? "Edit Promotion" : "Add a New Promotion" }}
        </p>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900">
        {{ promotion?.id ? "Edit Promotion" : "Add a New Promotion" }}
      </div>
    </div>
    <div>
      <div class="h-auto w-full">
        <form
          @submit.prevent="handleAddPromotion"
          class="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5"
        >
          <div class="space-y-5 w-full lg:w-7/12 max-w-3xl">
            <div class="shadow bg-white border p-5">
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
                  :style="file ? 'max-height: 500px;' : ''"
                ></div>
                <div
                  class="relative max-h-0 w-full overflow-hidden h-full"
                  :style="isEdition ? 'max-height: 500px;' : ''"
                >
                  <img
                    class="w-full h-full object-cover object-center"
                    :src="promotionURL"
                    alt="category image"
                  />
                </div>
                <span class="material-icons-outlined text-5xl">
                  cloud_upload
                </span>
                <span
                  class="border-t border-b inline-block border-purple-700 py-2 my-5 text-center capitalize font-semibold"
                >
                  Upload Promotion Image
                </span>
                <label
                  v-if="fileError"
                  class="text-red-600 text-sm text-center mb-5"
                >
                  {{ fileError }}
                </label>
                <label
                  v-if="error"
                  class="text-red-600 text-sm text-center mb-5"
                  >{{ error }}</label
                >
                <label
                  class="cursor-pointer hover:bg-purple-700 hover:text-white py-2 px-20 border border-purple-700 rounded-full text-center"
                  >Select a file
                  <input @change="handleChanges" type="file" class="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div class="relative space-y-5 w-full lg:w-5/12 max-w-3xl">
            <div class="bg-white shadow border rounded p-5">
              <div v-if="!promotion?.id">
                <label
                  class="font-semibold text-purple-700 uppercase block pb-2"
                  >Promotion as</label
                >
                <div class="flex space-x-2 text-gray-500 text-sm">
                  <label for="asCategory" class="inline-flex items-center">
                    <input
                      id="asCategory"
                      type="radio"
                      v-model="promotionAs"
                      value="category"
                    />
                    <span class="ml-2">a Whole Category</span>
                  </label>
                  <label id="asProduct" class="inline-flex items-center ml-6">
                    <input
                      id="asProduct"
                      type="radio"
                      v-model="promotionAs"
                      name="accountType"
                      value="item"
                      class="text-purple-600"
                    />
                    <span class="ml-2">an Indvidual Item</span>
                  </label>
                </div>
                <hr class="my-5 border-purple-700" />
              </div>

              <div class="py-3">
                <label class="font-semibold" for="categoryName">Category</label>
                <select
                  :disabled="promotion?.id"
                  class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                  :class="{ frozen: promotion?.id }"
                  required
                  v-model="categoryName"
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

              <div
                ref="productShow"
                class="max-h-0 h-full overflow-hidden transition-all ease-in-out duration-500"
                :style="
                  promotionAs != 'category'
                    ? 'max-height: ' +
                      $refs.productShow.scrollHeight +
                      'px; margin-bottom: 12px'
                    : ''
                "
              >
                <label class="font-semibold" for="categoryName">Product</label>
                <select
                  :disabled="promotion?.id"
                  class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                  :class="{ frozen: promotion?.id }"
                  v-model="productName"
                >
                  <option v-for="item in products" :key="item.id" selected>
                    <p>{{ item.name }}</p>
                  </option>
                </select>
              </div>

              <div class="w-full">
                <label for="discount" class="font-semibold">Discount</label>
                <input
                  v-model="discount"
                  type="number"
                  step=".01"
                  id="discount"
                  required
                  class="px-3 py-2 rounded block w-full focus:shadow border focus:border-gray-300 focus:outline-none"
                />
              </div>

              <div class="py-3">
                <label for="description" class="font-semibold"
                  >Description</label
                >
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

              <div v-if="!successful" class="py-3">
                <button
                  v-if="!isPending"
                  class="bg-white rounded-full text-purple-600 hover:text-white hover:bg-purple-700 focus:outline-none tracking-wide border border-purple-700 w-full py-3"
                >
                  {{ promotion?.id ? "Edit Promotion" : "Save Promotion" }}
                </button>
                <button
                  v-else
                  class="relative flex justify-center items-center cursor-wait bg-white rounded-full text-purple-600 tracking-wide border border-purple-700 w-full py-3 focus:outline-none"
                >
                  <div>
                    {{ promotion?.id ? "Editing..." : "Saving..." }}
                  </div>
                  <div class="absolute top-4 right-4">
                    <div
                      class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
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
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import { timestamp } from "@/firebase/config";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
export default {
  props: ["promotion"],
  setup(props, { emit }) {
    const promotionAs = ref("category");
    const fileError = ref(null);
    const file = ref(null);
    const isEdition = ref(false);
    const categoryName = ref("");
    const productName = ref("");
    const discount = ref(0.0);
    const description = ref("");
    const products = ref([]);
    const item = ref(null);
    const promotionURL = ref(null);
    const successful = ref(false);
    let promotion;

    let addDoc, updateDoc;

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const { url, uploadImage, deleteImage } = useStorage();
    const { documents: categories } = getCollection("inventory");
    const {
      error,
      isPending,
      addDoc: addPromotion,
      updateDoc: updatePromotion,
    } = useCollection("promotions");

    onMounted(() => {
      if (props.promotion) {
        promotion = props.promotion;
        console.log(promotion);
        categoryName.value = promotion.categoryName;
        discount.value = promotion.discount;
        description.value = promotion.description;
        isEdition.value = true;
        promotionURL.value = promotion.url;
        file.value = promotion.url;

        promotion.item
          ? ((promotionAs.value = "item"),
            (productName.value = promotion.item.name))
          : (promotionAs.value = "category");
      }
    });

    watch(categoryName, () => {
      if (categoryName.value) {
        ({ addDoc, updateDoc } = useDocument(
          "inventory",
          categoryName.value,
          "products"
        ));

        const { documents } = getDocument(
          "inventory",
          categoryName.value,
          "products"
        );

        watch(documents, () => (products.value = documents.value));
      }
    });

    watch(productName, () => {
      products.value?.forEach((product) => {
        if (product.name == productName.value) {
          item.value = product;
        }
      });
    });

    const handleChanges = (e) => {
      const selected = e.target.files[0];
      const limitedMB = 1048576 * 2; //2MB

      if (selected.size > limitedMB) {
        fileError.value = `Size of the image must be less than 2MB.`;
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
          image.src = URL.createObjectURL(selected);
          div.append(image);

          file.value = selected;
          fileError.value = null;
        } else {
          file.value = null;
          fileError.value = `Only file of type jpg, jpeg, png, svg are allowed!`;
        }
      }
    };

    const handleClearImage = async () => {
      if (promotionURL.value) {
        await deleteImage(promotionURL.value);
      }
      file.value = null;
      isEdition.value = false;
    };

    const handleAddPromotion = async () => {
      if (file.value) {
        if (promotionURL.value && promotionURL.value != file.value) {
          await deleteImage(promotionURL.value);
          promotionURL.value = null;
        }

        await uploadImage(file.value);

        // for updating
        if (promotion) {
          if (promotion.item) {
            item.value.discount = discount.value;
            item.value.promotionDescription = description.value;

            await updateDoc(item.value);

            promotion.url = promotionURL.value || file.value;
            promotion.discount = discount.value;
            promotion.description = description.value;

            await updatePromotion(promotion);

            successful.value = true;
            setTimeout(() => {
              successful.value = false;
              return handleSwitchingComponent("PromotionList");
            }, 2000);
          } else {
            products.value?.forEach(async (product) => {
              product.discount = discount.value;
              product.promotionDescription = description.value;

              await updateDoc(product);

              promotion.url = promotionURL.value || file.value;
              promotion.discount = discount.value;
              promotion.description = description.value;

              await updatePromotion(promotion);
              successful.value = true;
              setTimeout(() => {
                successful.value = false;
                return handleSwitchingComponent("PromotionList");
              }, 2000);
            });
          }
        } else {
          // for insertion
          if (promotionAs.value == "category") {
            products.value?.forEach(async (product) => {
              product.discount = discount.value;
              product.promotionDescription = description.value;

              await updateDoc(product);
            });

            await addPromotion({
              name: categoryName.value,
              categoryName: categoryName.value,
              discount: discount.value,
              description: description.value,
              url: url.value,
              createdAt: timestamp(),
            });

            if (!error.value) {
              successful.value = true;
              setTimeout(() => {
                successful.value = false;
                clearText();
              }, 2000);
            }
          } else {
            item.value.discount = discount.value;
            item.value.promotionDescription = description.value;

            await updateDoc(item.value);

            await addPromotion({
              name: categoryName.value,
              categoryName: categoryName.value,
              item: item.value,
              discount: discount.value,
              description: description.value,
              url: url.value,
              createdAt: timestamp(),
            });
            if (!error.value) {
              successful.value = true;
              setTimeout(() => {
                successful.value = false;
                clearText();
              }, 2000);
            }
          }
        }
      } else {
        error.value = "There's no promotion image yet.";
      }
    };

    function clearText() {
      file.value = null;
      fileError.value = null;
      promotionAs.value = "category";
      categoryName.value = "";
      productName.value = "";
      discount.value = null;
      description.value = "";
    }

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
    };

    return {
      handleAddPromotion,
      handleChanges,
      handleClearImage,
      handleSwitchingComponent,
      promotionAs,
      file,
      fileError,
      error,
      isPending,
      isEdition,
      categoryName,
      productName,
      discount,
      description,
      categories,
      products,
      promotionURL,
      successful,
    };
  },
};
</script>

<style></style>
