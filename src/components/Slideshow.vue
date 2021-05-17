<template>
  <div class="relative">
    <vueper-slides fade :bullets="false" progress fractions>
      <vueper-slide
        v-for="(slide, index) in slides"
        :key="index"
        :image="slide.link"
        @click="handleNavigation(slide.categoryId)"
      >
      </vueper-slide>
    </vueper-slides>
    <!-- <div
      v-if="windowWidth >= 648"
      class="absolute shadow top-0 h-32 w-64 p-3 right-20 bg-gray-700 bg-opacity-50 sm:h-32 sm:w-72 sm:top-1/4 md:top-1/3 lg:h-44 lg:w-80 lg:p-5 lg:top-1/3 xl:top-1/3 z-10 items-center"
    >
      <div class="text-white font-bold mt-3 lg:mt-6">Product Quotes</div>
      <div
        class="text-gray-100 font-mono text-sm leading-none mt-1 mb-3 lg:mb-6"
      >
        Good products can be sold by honest advertising. If you don’t think the
        product is good, you have no business to be advertising it.
      </div>
      <div
          class="h-8 w-20 lg:h-10 lg:w-24 text-gray-700 cursor-pointer hover:text-pink-500 uppercase text-xs font-semibold bg-white shadow flex justify-center items-center"
        >
          Shop Now
        </div>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import { useRouter } from "vue-router";
import getCollection from "@/composables/getCollection";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  setup() {
    const windowWidth = ref(window.innerWidth);
    const slides = ref([]);
    const router = useRouter();

    const { documents: categories } = getCollection("inventory");

    watch(categories, () => {
      categories.value?.forEach((category) => {
        category.products.forEach((product) => {
          if (product.discount >= 10) {
            product.images.forEach((image) => {
              slides.value.push({
                categoryId: category.id,
                title: product.productName,
                content: product.description,
                link: image.url,
              });
            });
          }
        });
      });
    });

    const handleNavigation = (id) => {
      router.push({
        path: `/categories/${id}`,
      });
    };

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    return { slides, windowWidth, handleNavigation };
  },
};
</script>

<style scoped>
.vueperslides .vueperslide {
  background-size: 30% 80%;
}
.vueperslides .vueperslide--titile {
  color: red;
}

.vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
  color: #ec4899;
}
.vueperslides__arrow svg {
  stroke-width: 1;
  font-size: 15px;
  color: #ec4899;
}
@media only screen and (max-width: 768px) {
  .vueperslides__arrow svg {
    stroke-width: 1;
    font-size: 12px;
  }
}
.vueperslides__arrow:focus {
  outline: none;
}
.vueperslides__bullet--active .default {
  color: #ec4899;
}
.vueperslides__bullet--active:focus {
  outline: none;
}
.vueperslides__bullet--active .default:focus {
  outline: none;
}
</style>
