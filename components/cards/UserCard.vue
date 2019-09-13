<template>
  <!-- display more user's information for each row -->
  <b-card border-variant="primary">
    <p class="title">{{row['name']}}</p>
    <div v-for="(value, key) in row" :key="key">
      <div v-if="key==='address'">
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right">
            <b>{{key}}:</b>
          </b-col>
          <ul>
            <div v-for="(value, key) in value" :key="key">
              <li v-if="key!=='geo'">
                <b>{{key}}</b>
                : {{value}}
              </li>
            </div>

            <!-- component for  google map -->
            <component
              v-bind:is="component"
              v-bind:lat="value['geo']['lat']"
              v-bind:lng="value['geo']['lng']"
            ></component>
          </ul>
        </b-row>
      </div>
      <div v-else-if="key==='company' ">
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right">
            <b>{{key}}:</b>
          </b-col>
          <ul>
            <div v-for="(value, key) in value" :key="key">
              <li>
                <b>{{key}}:</b>
                {{value}}
              </li>
            </div>
          </ul>
        </b-row>
      </div>
      <div v-else-if="key==='email' ">
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right">
            <b>{{key}}:</b>
          </b-col>
          <ul>
            <li>
              <a :href="`mailto:${value}`">{{value}}</a>
            </li>
          </ul>
        </b-row>
      </div>
      <div v-else-if="key==='website' ">
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right">
            <b>{{key}}:</b>
          </b-col>
          <ul>
            <li>
              <a :href="`http://${value}`" target="_blank">{{value}}</a>
            </li>
          </ul>
        </b-row>
      </div>
      <div v-else-if="key!=='_showDetails'">
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right">
            <b>{{key}}:</b>
          </b-col>
          <b-col>{{ value }}</b-col>
        </b-row>
      </div>
    </div>
    <b-button size="sm" @click="rowtoggleDetails">Hide Details</b-button>
  </b-card>
</template>
 
<script>
import mapComponent from "~/components/googleMap.vue";

export default {
  components: { mapComponent },

  data() {
    return {
      mapTypeId: "roadmap",
      component: "mapComponent",
      name: ""
    };
  },
  // row:each user data, rowtoggleDetails: to hide this component
  props: ["row", "rowtoggleDetails"],
  mounted() {
    this.name = this.row["name"];
  }
};
</script>
 
<style scoped>
</style>