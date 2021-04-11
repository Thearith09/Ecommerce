<template>
  <vueper-slides class="shadow-lg mt-12 overflow-hidden" autoplay>
    <vueper-slide
      v-for="(slide, index) in slides"
      :key="index"
      :image="slide.link"
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
        link: "https://source.unsplash.com/random/350*350",
      },
      {
        image: require("@/assets/images/logon.png"),
        link: "https://source.unsplash.com/random/240*240",
      },
      {
        image: require("@/assets/images/shopping-logo.png"),
        link: "https://source.unsplash.com/random/320*320",
      },
      {
        image: require("@/assets/images/logo.png"),
        link: "https://source.unsplash.com/random",
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
.vueperslides__bullet--active:focus {
  outline: none;
}
.vueperslides__bullet--active .default:focus {
  outline: none;
}
</style>
