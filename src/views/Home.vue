<template>
  <div class="home">
    <Navbar />
    <h1 class="text-2xl text-blue-500 text-center">Home</h1>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>
