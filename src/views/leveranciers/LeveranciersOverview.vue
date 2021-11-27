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
import socketMixin from "../../mixins/socketMixin"
import tableMixin from "../../mixins/tableMixin"
import Socket from "../../logic/factories/socketFactory"
import Navigation from '../../logic/factories/navigation';

export default {
  name: "LeveranciersOverview",
  mixins: [socketMixin, tableMixin],
  components: {
    SearchBar
  },
  created(){
    this.tableController = LeveranciersController
    this.navigateRoute = Navigation.LEV_UPDATE
    this.socketName = Socket.LEVERANCIERS  
  },
  methods: {
    blacklist(value, id){
      LeveranciersController.esp(this, { id: id, isBlacklisted: value }, this.socket)
    },
  },
};
</script>

<style></style>
