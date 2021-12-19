<template>
  <div class="content-body">
    <SearchBar :search.sync="params.search" :limit.sync="params.limit" @searchTable="searchTable" navigateRouteName="AankopenCreateview" />
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
        <b-table-column width="11%" field="datum" label="Datum" v-slot="props" sortable>
          {{ props.row.datum | dateFormatter }}
        </b-table-column>

        <b-table-column width="10%" field="factuur_nr" label="Bestelling nr" v-slot="props" sortable>
          {{ props.row.bestellings_nr }}
        </b-table-column>

        <b-table-column width="10%" field="leverings_nr" label="Referentie nr" v-slot="props" sortable>
          {{ props.row.ref_nr }}
        </b-table-column>

        <b-table-column width="10%" field="leverancier_naam" label="Leverancier" v-slot="props">
          {{ props.row.leverancier_naam }}
        </b-table-column>

        <b-table-column width="10%" field="klant_naam" label="Klant" v-slot="props">
          {{ props.row.klant_naam }}
        </b-table-column>

        <b-table-column widh="10%" field="leverdatum" centered label="Leverdatum" v-slot="props">
          {{ props.row.leverdatum | dateFormatter }}
        </b-table-column>

        <b-table-column width="8%" field="isGeleverd" centered label="Geleverd" v-slot="props">
          <div style="text-align:center; width: 100%">
            <b-checkbox @input="changeDelivered($event, props.row.id)" true-value="1" false-value="0" size="is-small" style="vertical-align:middle" v-model="props.row.isGeleverd " type="is-success" />
          </div>
        </b-table-column>

        <b-table-column width="8%" field="isBetaald" centered label="Betaald" v-slot="props">
          <div style="text-align:center; width: 100%">
            <b-checkbox @input="changePaid($event, props.row.id)" true-value="1" false-value="0" size="is-small" style="vertical-align:middle" v-model="props.row.isBetaald " type="is-success" />
          </div>
        </b-table-column>

        <b-table-column width="8%" field="updated_time" centered label="Tijdstip" v-slot="props">
          {{ props.row.updated_time | timeFormatter }}
        </b-table-column>

        <b-table-column widh="15%" field="updated_time" centered label="Datum" v-slot="props">
          {{ props.row.updated_time | dateFormatter }}
        </b-table-column>

        <b-table-column width="10%" field="updated_by" label="Door" v-slot="props"> {{ props.row.updated_by_voornaam }} {{ props.row.updated_by_achternaam }} </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import AankopenController from "../../api/calls/aankopen";
import SearchBar from "../../components/common/SearchBar";
import socketMixin from "../../mixins/socketMixin"
import tableMixin from "../../mixins/tableMixin"
import Socket from "../../logic/factories/socketFactory"
import Navigation from '../../logic/factories/navigation';

export default {
  name: "AankopenOverview",
  mixins: [socketMixin, tableMixin],
  components: {
    SearchBar
  },
  created(){
    this.tableController = AankopenController
    this.navigateRoute = Navigation.AK_UPDATE
    this.socketName = Socket.AANKOPEN
  },
  methods: {
    changeDelivered(value, id){
      AankopenController.delivered(this, { id: id, isGeleverd: value }, this.socket)
    },
    changePaid(value, id){
      AankopenController.paid(this, { id: id, isBetaald: value }, this.socket)
    },
  },
};
</script>