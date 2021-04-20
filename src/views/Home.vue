<template>
  <div class="h-auto">
    <div>
      <Navbar />
    </div>

    <div>
      <div class="grid grid-cols-4 my-12 mx-5 bg-white shadow-lg">
        <div class="col-span-1">
          <img
            class="h-full"
            src="https://images.unsplash.com/photo-1563357732-31978202a214?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGRpc2NvdW50fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div class="col-span-2 my-auto p-4 focus:outline-none">
          <Slideshow />
        </div>
        <div class="col-span-1">
          <img
            class="h-full"
            src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRpc2NvdW50fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 w-full my-12 px-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Slideshow from "@/components/Slideshow";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import getUser from "@/composables/getUser";

export default {
  name: "Home",
  components: {
    Navbar,
    Slideshow,
    Card,
    Footer,
  },
  setup() {
    const { user } = getUser();

    return { user };
  },
};
</script>
