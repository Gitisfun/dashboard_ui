<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Artikel kiezen" />
    <hr />
    <div style="margin-bottom: 15px">
        <b-input @input.native="searchOnlyTable" expanded placeholder="Zoek een artikel..." v-model="search" size="is-normal"></b-input>
    </div>
    <div style="margin-bottom: 35px">
        <b-table
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
            :selected.sync="selected"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[params.sort_by, params.sort_order]"
            @sort="onSort"
        >
            <b-table-column width="10%" field="inStock" centered label="In stock" v-slot="props">
            <div style="text-align:center; width: 100%;">
                <b-checkbox disabled true-value="1" false-value="0" size="is-small" style="vertical-align:middle" v-model="props.row.inStock " type="is-success" />
            </div>
            </b-table-column>
            <b-table-column width="15%" field="artikel_nr" label="Artikelcode" v-slot="props" sortable>
            {{ props.row.artikelcode }}
            </b-table-column>

            <b-table-column width="25%" field="naam" label="Naam" v-slot="props" sortable>
            {{ props.row.naam }}
            </b-table-column>


            <b-table-column width="35%" field="omschrijving" label="Omschrijving" v-slot="props" sortable>
            {{ props.row.omschrijving }}
            </b-table-column>

            <b-table-column width="15%" field="prijs" centered label="Prijs" v-slot="props" sortable>
            <div  style="color: green; text-align: right">
              {{ props.row.prijs | currencyFormatter }}
              </div> 
            </b-table-column>
        </b-table>
    </div>
    <p v-show="errorMessage" style="color: red">Kies een artikel</p>
    <SaveBottomBar @save="onSubmit" @cancel="close" />
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";
import SaveBottomBar from "../components/general/SaveBottomBar.vue";
import ArtikelsController from "../api/calls/artikels"
import tableMixin from "../mixins/tableMixin"

export default {
  name: "ArtikelsModal",
  mixins: [tableMixin],
  components: {
    Subtitle,
    SaveBottomBar,
  },
  data: () => ({
    errorMessage: false
  }),
  created(){
    this.tableController = ArtikelsController;
  },
  methods: {
    onSubmit() {
      if(this.selected){
          this.errorMessage = false
          this.$emit("confirmation", this.selected)
          this.$parent.close();
      }
      else{
          this.errorMessage = true
      }
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>