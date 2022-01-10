<template>
  <div class="content-body">
    <SearchBar :search.sync="params.search" :limit.sync="params.limit" @searchTable="searchTable" navigateRouteName="ArtikelsCreateview" />
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
        pagination-size="is-small"
        :default-sort-direction="defaultSortOrder"
        :default-sort="[params.sort_by, params.sort_order]"
        @sort="onSort"
      >
        <b-table-column :width="getWidth.artikelcode" field="artikelcode" label="Artikelcode" v-slot="props" sortable>
          {{ props.row.artikelcode }}
        </b-table-column>

        <b-table-column :width="getWidth.naam" field="naam" label="Naam" v-slot="props" sortable>
          {{ props.row.naam }}
        </b-table-column>

        <b-table-column :width="getWidth.inStock" field="inStock" centered label="In stock" v-slot="props">
          <div style="text-align:center; width: 100%">
            <b-checkbox @input="changeStock($event, props.row.id)" true-value="1" false-value="0" size="is-small" style="vertical-align:middle" v-model="props.row.inStock " type="is-success" />
          </div>
        </b-table-column>

        <b-table-column :width="getWidth.omschrijving" field="omschrijving" label="Omschrijving" v-slot="props" sortable>
          {{ props.row.omschrijving }}
        </b-table-column>

        <b-table-column :width="getWidth.prijs" field="prijs" label="Prijs" v-slot="props" sortable>
          <p style="text-align: right; color: green">
          € {{ props.row.prijs }}
          </p>
        </b-table-column>

        <b-table-column :width="getWidth.updated_time" :visible="updatedByIsVisible" field="updated_time" centered label="Tijdstip" v-slot="props">
          {{ props.row.updated_time | timeFormatter }}
        </b-table-column>

        <b-table-column :width="getWidth.updated_date" :visible="updatedByIsVisible" field="updated_time" centered label="Datum" v-slot="props">
          {{ props.row.updated_time | dateFormatter }}
        </b-table-column>

        <b-table-column :width="getWidth.updated_by" :visible="updatedByIsVisible" field="updated_by" label="Door" v-slot="props"> {{ props.row.updated_by_voornaam }} {{ props.row.updated_by_achternaam }} </b-table-column>
      </b-table>
    </div>
    <div class="box" style="padding-top: 25px">            
      <b-checkbox type="is-link" v-model="updatedByIsVisible">Toon aanpassingen</b-checkbox>
    </div>
  </div>
</template>

<script>
import ArtikelsController from "../../api/calls/artikels";
import SearchBar from "../../components/common/SearchBar";
import socketMixin from "../../mixins/socketMixin"
import tableMixin from "../../mixins/tableMixin"
import Socket from "../../logic/factories/socketFactory"
import Navigation from "../../logic/factories/navigation";
import TableColumns from "../../logic/constants/table"

export default {
  name: "ArtikelsOverview",
  mixins: [socketMixin, tableMixin],
  components: {
    SearchBar
  },
  created(){
    this.tableController = ArtikelsController
    this.navigateRoute = Navigation.ART_UPDATE
    this.socketName = Socket.ARTIKELS
  },
  computed: {
    getWidth() {
      return TableColumns.getArtikelColumns(this.updatedByIsVisible)
    }
  },
  methods: {
    changeStock(value, id){
      ArtikelsController.stock(this, { id: id, inStock: value }, this.socket)
    },
  },
};
</script>