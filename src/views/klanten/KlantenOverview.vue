<template>
  <div class="content-body">
    <SearchBar :search.sync="params.search" :limit.sync="params.limit" @searchTable="searchTable" navigateRouteName="KlantenCreateview" />
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
        <b-table-column width="20%" field="klant_nr" label="Klant nr" v-slot="props" sortable>
          {{ props.row.klant_nr }}
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
import KlantenController from "../../api/calls/klanten";
import SearchBar from "../../components/common/SearchBar";
import socketMixin from "../../mixins/socketMixin"
import Socket from "../../logic/factories/socketFactory"

export default {
  name: "KlantenOverview",
  mixins: [socketMixin],
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
        sort_by: "klant_nr",
        sort_order: "asc",
        limit: 10,
        page: "",
      },
    };
  },
  mounted() {
    Socket.listen(this.socket, Socket.KLANTEN, () => { this.loadTable() })
    this.loadTable();
  },
  methods: {
    loadTable() {
      //this.loading = true;
      KlantenController.all(this, this.params, (res) => {
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
      KlantenController.esp(this, { id: id, isBlacklisted: value }, this.socket)
    },
    rowClicked(row){
      this.$router.push({
        name: "KlantenUpdateview",
        params: {
          id: row.id
        }
      });
    },
    navCreate(){
      this.$router.push({
        name: "KlantenCreateview",
      });
    },
    searchTable(obj){
      this.params.search = obj.search
      this.params.limit = obj.limit
      this.loadTable()
    }
  },
};
</script>

<style></style>
