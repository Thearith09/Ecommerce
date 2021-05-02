<template>
  <div class="relative">
    <vueper-slides :parallax="parallax" :bullets="false" progress fractions>
      <vueper-slide
        v-for="(slide, index) in slides"
        :key="index"
        :image="slide.image"
      />
    </vueper-slides>

    <div
      class="absolute top-1/4 right-20 sm:top-1/4 md:top-1/3 lg:top-1/3 xl:top-1/3  bg-gray-700 bg-opacity-50 h-32 w-72 p-3 lg:h-44 lg:w-80 lg:p-5 z-10 items-center"
    >
      <div class="text-white font-bold lg:mt-1">Aurora Borealis</div>
      <div
        class="text-gray-100 font-semibold text-sm leading-none mt-1 mb-3 lg:mb-6"
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <div
        class="h-8 w-20 lg:h-10 lg:w-24 text-gray-700 cursor-pointer hover:text-pink-500 uppercase text-xs font-semibold bg-white shadow-lg flex justify-center items-center"
      >
        Shop Now
      </div>
    </div>
  </div>
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
        title: "Aurora Borealis",
        content:
          "This Youtube video has params in the URL and extra attributes on the iframe.",
        image: require("@/assets/images/access.jpg"),
        link: "https://source.unsplash.com/random/350*350",
      },
      {
        title: "Aurora Borealis",
        content:
          "This Youtube video has params in the URL and extra attributes on the iframe.",
        image: require("@/assets/images/admin.jpg"),
        link: "https://source.unsplash.com/random/240*240",
      },
      {
        title: "Aurora Borealis",
        content:
          "This Youtube video has params in the URL and extra attributes on the iframe.",
        image: require("@/assets/images/admin1.jpg"),
        link: "https://source.unsplash.com/random/320*320",
      },
      {
        title: "Aurora Borealis",
        content:
          "This Youtube video has params in the URL and extra attributes on the iframe.",
        image: require("@/assets/images/admin3.jpg"),
        link: "https://source.unsplash.com/random/380*380",
      },

      {
        title: "Aurora Borealis",
        content:
          "This Youtube video has params in the URL and extra attributes on the iframe.",
        image: require("@/assets/images/pro1.jpg"),
        link: "https://source.unsplash.com/random/420*420",
      },

      {
        title: "Aurora Borealis",
        content:
          "This Youtube video has params in the URL and extra attributes on the iframe.",
        image: require("@/assets/images/csab.jpg"),
        link: "https://source.unsplash.com/random/520*520",
      },
    ]);

    return { slides, parallax };
  },
};
</script>

<style>
.vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
  color: #ec4899;
}
.vueperslides__arrow svg {
  stroke-width: 1;
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
