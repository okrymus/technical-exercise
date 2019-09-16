<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <img src="~/assets/nav-logo.png" />
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <NuxtLink class="navbar-item" to="/instructions">Instructions</NuxtLink>
        <NuxtLink class="navbar-item" to="/users">Users Page</NuxtLink>
      </div>
    </div>
    <h1 style="  height: 90px;
  line-height: 90px;  ">{{title}}</h1>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: [Number, String],
      default: ""
    }
  },
  components: {}
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 75px;
  border-bottom: solid #c0c3cf 2px;
}
.navbar-brand {
  height: 75px;
  width: 75px;
}
</style>
