<template>
  <div class="content">
    <!-- User Interface controls -->
    <div b-container fluid>
      <b-card>
        <template v-slot:header>
          <b-row>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Filter/Search"
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
                  <b-form-checkbox style="font-size:12px" value="username">Username</b-form-checkbox>
                  <b-form-checkbox style="font-size:12px" value="name">Name</b-form-checkbox>
                  <b-form-checkbox style="font-size:12px" value="email">Email</b-form-checkbox>
                  <b-form-checkbox style="font-size:12px" value="company">Company&nbsp;</b-form-checkbox>
                  <b-form-checkbox style="font-size:12px" value="phone">Phone</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="9" class="my-1" align-self="end">
              <b-form-group
                label="Per page"
                label-cols-sm="10"
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
          </b-row>
        </template>
        <!-- Main table element -->
        <b-card-body>
          <b-card-title>User Data from Spill Center 2019</b-card-title>
          <b-table
            :busy="isBusy"
            show-empty
            small
            striped
            :stacked="stacked"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            @filtered="onFiltered"
            responsive
            class="table"
          >
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template v-slot:cell(show_details)="row">
              <b-button
                size="sm"
                style="font-size:10px"
                @click="row.toggleDetails"
              >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
            </template>
            <template v-slot:cell(company)="row"></template>
            <template v-slot:cell(email)="row">
              <a :href="`mailto:${row.item['email']}`">{{row.item['email']}}</a>
            </template>
            <template v-slot:cell(website)="row">
              <a :href="`http://${row.item['website']}`" target="_blank">{{row.item['website']}}</a>
            </template>

            <!-- to see more user information -->
            <template v-slot:row-details="row">
              <component
                v-bind:is="component"
                v-bind:row="row.item"
                v-bind:rowtoggleDetails="row.toggleDetails"
              ></component>
            </template>
          </b-table>
        </b-card-body>
        <b-pagination
          style="  padding: 15px 32px;   font-size: 2px;"
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
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import userCard from "~/components/cards/UserCard.vue";

export default {
  components: { userCard },
  data() {
    return {
      //
      // Table export
      //
      stacked: false,
      dark: false,
      isBusy: true,
      component: "userCard",
      items: [],
      fields: [
        {
          key: "username",
          label: "username",
          sortable: true,
          sortDirection: "desc"
        },
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
          key: "company",
          label: "Company",
          class: "text-left",
          thClass: "d-none",
          tdClass: "d-none"
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

    // on resize window's width, allows to stack the table
    window.onresize = () => {
      if (window.innerWidth < 800) {
        this.stacked = true;
      } else {
        this.stacked = false;
      }
    };

    if (window.innerWidth < 800) {
      this.stacked = true;
    } else {
      this.stacked = false;
    }
  },

  methods: {
    getUser() {
      // get user's data from web
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(resp => {
          this.items = resp.data;
          this.totalRows = this.items.length;
          this.isBusy = false;
        })
        .catch(error => {
          this.isBusy = false;
          console.log(error);
        });
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

.table {
  font-size: 10px;
}
</style>
