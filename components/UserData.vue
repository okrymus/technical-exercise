<template>
  <!-- <div>
    <b-table responsive :items="items"></b-table>
  <div>-->
  <b-card
    header="User"
    header-text-variant="white"
    header-tag="header"
    header-bg-variant="dark"
    footer="Card Footer"
    footer-tag="footer"
    footer-bg-variant="success"
    footer-border-variant="dark"
    title="Title"
    style="max-width: 20rem;"
  >
    <b-table responsive :items="items"></b-table>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      axios.get("https://jsonplaceholder.typicode.com/users").then(resp => {
        this.items = resp.data;
      });
    }
  }
};
// export default {
//   data() {
//     return {
//       items: []
//     };
//   },
//   created() {
//     this.getUsers();
//   },
//   methods: {
//     getUsers() {
//       // axios.get("https://jsonplaceholder.typicode.com/users").then(resp => {
//       //   this.items = resp.data;
//       // });
//       this.items = [
//         {
//           heading1: "table cell",
//           heading2: "table cell",
//           heading3: "table cell",
//           heading4: "table cell",
//           heading5: "table cell",
//           heading6: "table cell",
//           heading7: "table cell",
//           heading8: "table cell",
//           heading9: "table cell",
//           heading10: "table cell",
//           heading11: "table cell",
//           heading12: "table cell"
//         }
//       ];
//     }
//   }
// };
</script>

<style scoped>
</style>
