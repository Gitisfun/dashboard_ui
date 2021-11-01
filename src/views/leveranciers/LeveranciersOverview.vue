<template>
  <div class="content-body" >
    <div class="box">

    <b-table
      :data="data"
      :loading="loading"
      paginated
      backend-pagination
      :total="total"
      :per-page="perPage"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column field="leveranciers_nr" label="Lev. nr" v-slot="props">
        {{ props.row.leveranciers_nr }}
      </b-table-column>

      <b-table-column field="naam" label="Naam" v-slot="props">
        {{ props.row.naam }}
      </b-table-column>

      <b-table-column field="isBlacklisted" label="Blacklist" v-slot="props">
        {{ props.row.isBlacklisted }}
      </b-table-column>

      <b-table-column field="updated_time" label="Gewijzigd" v-slot="props">
        {{ props.row.updated_time | dataFormatter }}
      </b-table-column>

      <b-table-column label="updated_by" v-slot="props">
        {{ props.row.updated_by_voornaam }} {{ props.row.updated_by_achternaam }}
      </b-table-column>
    </b-table>
  </div>
  </div>
</template>

<script>
import LeveranciersController from '../../api/calls/leveranciers';
import moment from "moment"

export default {
  name: "LeveranciersOverview",
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 10,
      params: {
        search: "",
        sort_by: "",
        sort_order: "",
        limit: 2,
        page: ""
      }
    };
  },
  mounted(){
    this.loadTable();
  },
  methods: {
    loadTable() {
      LeveranciersController.all(this, this.params, (res) => {console.log(res.data); this.perPage = this.params.limit; this.total = res.data.total; this.data = res.data.list; })
    },
    onPageChange(page) {
      this.page = page;
      this.loadTable();
    },
    navToLeveranciersCreateview() {
      this.$router.push({
        name: "LeveranciersCreateview",
      });
    },
  },
  filters: {
    dataFormatter(value){
      const time = moment(value).format("hh:mm");
      const date = moment(value).format("DD-MM-YYYY");
      return `${time} \t ${date}`
    }
  }
};
</script>

<style></style>
