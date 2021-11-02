<template>
  <div class="content-body">
    <div class="columns">
      <div class="column is-10">
        <b-input @input.native="loadTable" expanded placeholder="Zoeken..." v-model="params.search" size="is-normal"></b-input>
      </div>
      <div class="column">
        <b-select expanded @change.native="loadTable" v-model="params.limit" size="is-normal">
          <option v-for="option in perPageList" :value="option.value" :key="option.id">
            {{ option.text }}
          </option>
        </b-select>
      </div>
    </div>
    <div class="box">
      <b-table
        narrowed
        striped
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
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[params.sort_by, params.sort_order]"
        @sort="onSort"
      >
        <b-table-column field="leveranciers_nr" label="Lev. nr" v-slot="props" sortable>
          {{ props.row.leveranciers_nr }}
        </b-table-column>

        <b-table-column field="naam" label="Naam" v-slot="props" sortable>
          {{ props.row.naam }}
        </b-table-column>

        <b-table-column field="isBlacklisted" label="Blacklist" v-slot="props">
          {{ props.row.isBlacklisted }}
        </b-table-column>

        <b-table-column field="updated_time" centered label="Tijdstip" v-slot="props">
          {{ props.row.updated_time | timeFormatter }}
        </b-table-column>

        <b-table-column field="updated_time" centered label="Datum" v-slot="props">
          {{ props.row.updated_time | dateFormatter }}
        </b-table-column>

        <b-table-column field="updated_by" label="Door" v-slot="props"> {{ props.row.updated_by_voornaam }} {{ props.row.updated_by_achternaam }} </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import LeveranciersController from "../../api/calls/leveranciers";
import moment from "moment";

export default {
  name: "LeveranciersOverview",
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 10,
      defaultSortOrder: "asc",
      params: {
        search: "",
        sort_by: "leveranciers_nr",
        sort_order: "asc",
        limit: 2,
        page: "",
      },
      perPageList: [
        {
          id: 11,
          text: "2 per pagina",
          value: 2,
        },
        {
          id: 12,
          text: "3 per pagina",
          value: 3,
        },
        {
          id: 13,
          text: "4 per pagina",
          value: 4,
        },
        {
          id: 1,
          text: "10 per pagina",
          value: 10,
        },
        {
          id: 2,
          text: "15 per pagina",
          value: 10,
        },
        {
          id: 3,
          text: "25 per pagina",
          value: 10,
        },
        {
          id: 4,
          text: "50 per pagina",
          value: 10,
        },
      ],
    };
  },
  mounted() {
    this.loadTable();
  },
  methods: {
    loadTable() {
      console.log("hier");
      console.log(this.params.limit);
      LeveranciersController.all(this, this.params, (res) => {
        console.log(res.data);
        this.perPage = this.params.limit;
        this.total = res.data.total;
        this.data = res.data.list;
      });
    },
    onPageChange(page) {
      console.log(page);
      this.params.page = page;
      this.loadTable();
    },
    onSort(field, order) {
      this.params.sort_by = field;
      this.params.sort_order = order;
      this.loadTable();
    },
    navToLeveranciersCreateview() {
      this.$router.push({
        name: "LeveranciersCreateview",
      });
    },
  },
  filters: {
    timeFormatter(value) {
      return moment(value).format("hh:mm");
    },
    dateFormatter(value) {
      return moment(value).format("DD-MM-YYYY");
    },
  },
};
</script>

<style></style>
