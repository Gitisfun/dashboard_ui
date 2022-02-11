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
        pagination-size="is-small"
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[params.sort_by, params.sort_order]"
        @sort="onSort"
      >
        <b-table-column :width="getWidth.klant_nr" field="leveranciers_nr" label="Lev. nr" v-slot="props" sortable>
          {{ props.row.leveranciers_nr }}
        </b-table-column>

        <b-table-column :width="getWidth.naam" field="naam" label="Naam" v-slot="props" sortable>
          {{ props.row.naam }}
        </b-table-column>

        <b-table-column :width="getWidth.blacklist" field="isBlacklisted" centered label="Blacklist" v-slot="props">
          <div style="text-align:center; width: 100%;">
            <b-checkbox @input="blacklist($event, props.row.id)" true-value="1" false-value="0" size="is-small" style="vertical-align:middle" v-model="props.row.isBlacklisted " type="is-danger" />
          </div>
        </b-table-column>

        <b-table-column :width="getWidth.updated_time" :visible="updatedByIsVisible" field="updated_time" centered label="Tijdstip" v-slot="props">
          {{ props.row.updated_time | timeFormatter }}
        </b-table-column>

        <b-table-column :width="getWidth.updated_date" :visible="updatedByIsVisible" field="updated_time" centered label="Datum" v-slot="props">
          {{ props.row.updated_time | dateFormatter }}
        </b-table-column>

        <b-table-column :width="getWidth.updated_by" :visible="updatedByIsVisible" field="updated_by" label="Door" v-slot="props"> {{ props.row.updated_by_voornaam }} {{ props.row.updated_by_achternaam }} </b-table-column>
        <template #empty>
          <div class="custom-table-empty">Tabel is leeg...</div>
        </template>
      </b-table>
    </div>
    <div class="box" style="padding-top: 25px">            
      <b-checkbox type="is-link" v-model="updatedByIsVisible">Toon aanpassingen</b-checkbox>
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
import TableColumns from "../../logic/constants/table"

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
  computed: {
    getWidth() {
      return TableColumns.getLeverancierColumns(this.updatedByIsVisible)
    }
  },
  methods: {
    blacklist(value, id){
      LeveranciersController.esp(this, { id: id, isBlacklisted: value }, this.socket)
    },
  },
};
</script>

<style></style>
