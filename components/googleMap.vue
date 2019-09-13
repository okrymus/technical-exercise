<template>
  <div>
    <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="5">
      <gmap-marker :position="center" />
    </gmap-map>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapTypeId: "roadmap",
      center: { lat: 0, lng: 0 }
    };
  },
  props: {
    lat: [Number, String],
    lng: [Number, String]
  },
  mounted() {
    // Set the initial number of items
    this.center["lat"] = Number(this.lat);
    this.center["lng"] = Number(this.lng);
  }
};
</script>
 
<style scoped>
.vue-map-container {
  height: 300px;
  max-width: 992px;
  width: 300px;
  position: absolute;
  top: 15px;
  right: 15px;
}

@media (max-width: 800px) {
  .vue-map-container {
    position: relative;
    height: 200px;
    width: 200px;
  }
}
</style>