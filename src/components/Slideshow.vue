<template>
  <vueper-slides autoplay :parallax="parallax">
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
    const parallax = ref(1);
    const slides = ref([
      {
        image: require("@/assets/images/access.jpg"),
        link: "https://source.unsplash.com/random/350*350",
      },
      {
        image: require("@/assets/images/admin.jpg"),
        link: "https://source.unsplash.com/random/240*240",
      },
      {
        image: require("@/assets/images/admin1.jpg"),
        link: "https://source.unsplash.com/random/320*320",
      },
      {
        image: require("@/assets/images/admin3.jpg"),
        link: "https://source.unsplash.com/random",
      },

      {
        image: require("@/assets/images/pro1.jpg"),
        link: "https://source.unsplash.com/random",
      },

      {
        image: require("@/assets/images/csab.jpg"),
        link: "https://source.unsplash.com/random",
      },
    ]);

    return { slides, parallax };
  },
};
</script>

<style>
.vueperslides__arrow {
  font-size: 12px;
  display: none;
}
.vueperslides__arrow:focus {
  outline: none;
}
.vueperslides__bullet--active .default {
  color: rgb(205, 54, 174);
}
.vueperslides__bullet--active:focus {
  outline: none;
}
.vueperslides__bullet--active .default:focus {
  outline: none;
}
</style>
