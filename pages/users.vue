<template>
  <div>
    <Nav />
    <UserData />
  </div>
</template>

<script>
import axios from "axios";
import Nav from "~/components/Nav.vue";

// User Data component
import UserData from "~/components/UserData.vue";

export default {
  components: {
    Nav,
    UserData
  }
};
</script>

<style scoped>
</style>
