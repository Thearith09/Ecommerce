<template>
  <div class="relative flex flex-col h-screen bg-gray-50">
    <div>
      <Navbar />
    </div>

    <div class="mb-auto">
      <UserProfile :isCustomer="true" />
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProfile from "@/components/UserProfile";
export default {
  components: {
    Footer,
    Navbar,
    UserProfile,
  },
  setup() {},
};
</script>
