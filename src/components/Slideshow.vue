<template>
  <div class="relative">
    <vueper-slides :dragging-distance="70" :bullets="false" fractions>
      <vueper-slide
        v-for="(slide, index) in slides"
        :key="index"
        :image="slide.image"
        @click="handleNavigation(slide)"
      >
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { onMounted, ref, watch } from "vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import { useRouter } from "vue-router";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  setup() {
    const windowWidth = ref(window.innerWidth);
    const slides = ref([]);
    const router = useRouter();

    const { documents: promotions } = getCollection("promotions");
    watch(promotions, () => {
      promotions.value?.forEach((promotion) => {
        slides.value.push({
          cateogryName: promotion.categoryName,
          title: promotion.description,
          image: promotion.url,
          item: promotion.item,
        });
      });
    });

    const handleNavigation = (slide) => {
      console.log(slide);
      if (slide.item) {
        router.push({
          name: "ProductDetails",
          params: {
            id: slide.item.id,
            categoryName: slide.cateogryName,
          },
        });
      } else {
        router.push({
          name: "CategoryDetails",
          params: { id: slide.cateogryName },
        });
      }
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

<style>
.vueperslides__image {
  min-height: 100%;
  max-width: 100%;
}
.vueperslides .vueperslide {
  background-size: 100% 100%;
}
.vueperslides .vueperslide--titile {
  color: red;
}

.vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
  color: #6d28d9;
}
.vueperslides__arrow svg {
  stroke-width: 1;
  color: #6d28d9;
}
@media only screen and (max-width: 768px) {
  .vueperslides__arrow svg {
    stroke-width: 1;
    font-size: 14px;
  }
}
.vueperslides__arrow:focus {
  /* outline: none; */
}
.vueperslides__bullet--active .default {
  /* color: #ec4899; */
}
.vueperslides__bullet--active:focus {
  outline: none;
}
.vueperslides__bullet--active .default:focus {
  outline: none;
}
</style>
