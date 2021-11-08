<template>
  <div class="content-body">
    <SearchBar :search.sync="params.search" :limit.sync="params.limit" @searchTable="searchTable" navigateRouteName="LeveranciersCreateview" />
    <div class="box">
      <b-table
        @dblclick="rowClicked"
        narrowed
        hoverable
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
        <b-table-column width="20%" field="leveranciers_nr" label="Lev. nr" v-slot="props" sortable>
          {{ props.row.leveranciers_nr }}
        </b-table-column>

        <b-table-column width="25%" field="naam" label="Naam" v-slot="props" sortable>
          {{ props.row.naam }}
        </b-table-column>

        <b-table-column width="10%" field="isBlacklisted" centered label="Blacklist" v-slot="props">
          <div style="text-align:center; width: 100%;">
            <b-checkbox @input="blacklist($event, props.row.id)" true-value="1" false-value="0" size="is-small" style="vertical-align:middle" v-model="props.row.isBlacklisted " type="is-danger" />
          </div>
        </b-table-column>

        <b-table-column width="10%" field="updated_time" centered label="Tijdstip" v-slot="props">
          {{ props.row.updated_time | timeFormatter }}
        </b-table-column>

        <b-table-column widh="15%" field="updated_time" centered label="Datum" v-slot="props">
          {{ props.row.updated_time | dateFormatter }}
        </b-table-column>

        <b-table-column width="20%" field="updated_by" label="Door" v-slot="props"> {{ props.row.updated_by_voornaam }} {{ props.row.updated_by_achternaam }} </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import LeveranciersController from "../../api/calls/leveranciers";
import SearchBar from "../../components/common/SearchBar";
import moment from "moment";

export default {
  name: "LeveranciersOverview",
  components: {
    SearchBar
  },
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
        limit: 10,
        page: "",
      },
    };
  },
  mounted() {
    this.loadTable();
  },
  methods: {
    loadTable() {
      //this.loading = true;
      LeveranciersController.all(this, this.params, (res) => {
        //this.loading = false;
        this.perPage = this.params.limit;
        this.total = res.data.total;
        this.data = res.data.list;
        });
    },
    onPageChange(page) {
      this.params.page = page;
      this.loadTable();
    },
    onSort(field, order) {
      this.params.sort_by = field;
      this.params.sort_order = order;
      this.loadTable();
    },
    blacklist(value, id){
      LeveranciersController.esp(this, { id: id, isBlacklisted: value })
    },
    rowClicked(row){
      this.$router.push({
        name: "LeveranciersUpdateview",
        params: {
          id: row.id
        }
      });
    },
    navCreate(){
      this.$router.push({
        name: "LeveranciersCreateview",
      });
    },
    searchTable(obj){
      this.params.search = obj.search
      this.params.limit = obj.limit
      this.loadTable()
    }
  },
  filters: {
    timeFormatter(value) {
      return moment(value).format("HH:mm");
    },
    dateFormatter(value) {
      return moment(value).format("DD-MM-YYYY");
    },
  },
};
</script>

<style></style>
