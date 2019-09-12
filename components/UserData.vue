<template>
  <div class="content">
    <b-container fluid>
      <b-card>
        <!-- User Interface controls -->
        <template v-slot:header>
          <b-container fluid>
            <b-row>
              <b-col lg="6" class="my-1">
                <b-form-group
                  label="Filter"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="filterInput"
                  class="mb-0"
                >
                  <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Type to Search"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col lg="6" class="my-1">
                <b-form-group
                  label="Filter On"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  description="Leave all unchecked to filter on all data"
                  class="mb-0"
                >
                  <b-form-checkbox-group v-model="filterOn">
                    <b-form-checkbox style="font-size:13px" value="name">Name</b-form-checkbox>
                    <b-form-checkbox style="font-size:13px" value="email">Email</b-form-checkbox>
                    <b-form-checkbox style="font-size:13px" value="phone">Phone</b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="my-1">
                <b-form-group
                  label="Per page"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="perPageSelect"
                  class="mb-0"
                >
                  <b-form-select
                    v-model="perPage"
                    id="perPageSelect"
                    size="sm"
                    :options="pageOptions"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col />
            </b-row>
          </b-container>
        </template>
        <!-- Main table element -->
        <b-card-body>
          <b-card-title>User Information</b-card-title>
          <b-card-text>
            <b-table
              show-empty
              small
              :items="items"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filterIncludedFields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered"
              responsive
              class="table"
            >
              <!-- <template v-slot:cell(name)="row">{{ row.value.name }}</template> -->

              <template v-slot:cell(show_details)="row">
                <b-button
                  size="sm"
                  style="font-size:10px"
                  @click="row.toggleDetails"
                >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
              </template>

              <template v-slot:cell(email)="row">
                <a :href="`mailto:${row.item['email']}`">{{row.item['email']}}</a>
              </template>
              <template v-slot:cell(website)="row">
                <a :href="`http://${row.item['website']}`" target="_blank">{{row.item['website']}}</a>
              </template>

              <template v-slot:row-details="row">
                <b-card>
                  <div v-for="(value, key) in row.item" :key="key">
                    <div v-if="key==='address'  || key==='address' ">
                      <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right">
                          <b>{{key}}:</b>
                        </b-col>
                        <ul>
                          <div v-for="(value, key) in value" :key="key">
                            <li>{{key}}: {{value}}</li>
                          </div>
                          <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="5"></gmap-map>
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
                            <li>{{key}}: {{value}}</li>
                          </div>
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
                </b-card>
              </template>
            </b-table>
          </b-card-text>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            size="sm"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
          ></b-pagination>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      //
      //  EXPORT  FOR GOOGLE MAP
      //
      center: {},
      mapTypeId: "roadmap",
      markers: [],
      //
      // Table export
      //
      items: [],
      fields: [
        {
          key: "name",
          label: "Full name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          class: "text-left"
        },
        {
          key: "phone",
          label: "Phone",
          sortable: true,
          class: "text-left"
        },
        {
          key: "website",
          label: "Website",
          sortable: true,
          class: "text-left"
        },
        { key: "show_details", label: "show details" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  created() {
    this.getUser();
    this.totalRows = this.items.length;
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    getUser() {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(resp => {
          this.items = resp.data;
          this.totalRows = this.items.length;
        })
        .catch(error => console.log(error));
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
.content {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  font-size: 10px;
}

.vue-map-container {
  height: 200px;
  max-width: 992px;
  width: 100%;
}

.table {
  font-size: 10px;
}
</style>
