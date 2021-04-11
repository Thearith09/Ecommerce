<template>
  <vueper-slides class="mx-auto w-8/12 bg-white shadow-lg mt-12" autoplay>
    <vueper-slide
      v-for="(slide, index) in slides"
      :key="index"
      :image="slide.image"
    />
  </vueper-slides>
</template>

<script>
import { ref } from "vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  setup() {
    const slides = ref([
      {
        image: require("@/assets/images/logo.png"),
      },
      {
        image: require("@/assets/images/logon.png"),
      },
      {
        image: require("@/assets/images/shopping-logo.png"),
      },
      {
        image: require("@/assets/images/logo.png"),
      },
    ]);

    return { slides };
  },
};
</script>

<style>
.vueperslides__arrow {
  color: rgb(231, 7, 157);
  font-size: 12px;
}
.vueperslides__arrow:focus {
  outline: none;
}
.vueperslides__bullet--active .default {
  color: rgb(231, 7, 157);
}
</style>
