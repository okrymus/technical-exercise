<template>
  <div class="background">
    <Nav title="User Data from Spill Center 2019" />
    <UserData />
  </div>
</template>

<script>
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
.background {
  background-color: rgb(220, 220, 220);
  height: 100vh;
}
</style>
