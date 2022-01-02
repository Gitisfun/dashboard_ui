<template>
    <div class="content-body">
    <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
            <ValidationObserver v-slot="{ handleSubmit }">
                <CreateHeader title="Nieuwe verkoopfactuur" @save="handleSubmit(onSubmit)" />
                <div class="columns">
                    <div class="column">
                        <ValidatedTextInput type="date" v-model="verkoop.datum" name="Datum" rules="required" />
                        <ValidatedSearchInput @changeto="changeKlant" ref="klantField" v-model="verkoop.klant_naam" name="Klant" rules="required" />
                        <ValidatedTextInput type="date" v-model="verkoop.betalingsdatum" name="Betalingsdatum" rules="required" />
                    </div>
                    <div class="column">
                        <ValidatedTextInput v-model="verkoop.ref_nr" name="Referentie nr." rules="required" />
                        <ValidatedTextInput v-model="verkoop.valuta" name="Valuta" rules="required" />
                        <ValidatedSelectInput v-model="verkoop.btw_id" name="Btw categorie" rules="required">
                            <option v-for="option in btws" :value="option.id" :key="option.id">
                            {{ option.naam }}
                            </option>
                        </ValidatedSelectInput>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6">
                        <AdresSearch :klant="verkoop.klant_naam" ref="facAdresField" text="Facturatie adres" />
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <MultilineTextInput v-model="verkoop.eindtekst" name="Eindtekst" />
                    </div>
                    <div class="column">
                        <MultilineTextInput v-model="verkoop.opmerking_order" name="Opmerking" />
                    </div>
                </div>
            </ValidationObserver>
        </div>
         <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
            <SmallHeaderAdder title="Artikels" @add="addArtikel" />
            <div>
                <AddArtikelBox ref="addArtikelBox" v-show="isArtikelBoxShown" @addArtikelToList="addArtikelToList" @closeArtikelBox="closeArtikelBox" @deleteArtikelFromList="deleteArtikelFromList" />
            </div>
            <b-table striped :key="tableKey" @dblclick="updateArtikel" :data="verkoop.tempArtikels">
                <b-table-column width="10%" field="artikel_nr" label="Artikelcode" v-slot="props" sortable>
                    {{ props.row.artikelcode }}
                </b-table-column>
                <b-table-column width="15%" field="naam" label="Naam" v-slot="props" sortable>
                    {{ props.row.naam }}
                </b-table-column>
                <b-table-column width="20%" field="memo" label="Memo" v-slot="props" sortable>
                    {{ props.row.memo }}
                </b-table-column>
                <b-table-column width="10%" centered field="prijs" label="Prijs" v-slot="props" sortable>
                    {{ props.row.prijs | currencyFormatter }}
                </b-table-column>
                <b-table-column width="8%" centered field="hoeveelheid" label="Aantal" v-slot="props" sortable>
                    {{ props.row.hoeveelheid }}
                </b-table-column>
                <b-table-column width="12%" centered field="korting_een" label="Korting I" v-slot="props" sortable>
                    {{ props.row.korting_een | kortingFormatter }}
                </b-table-column>
                <b-table-column width="12%" centered field="korting_twee" label="Korting I" v-slot="props" sortable>
                    {{ props.row.korting_twee | kortingFormatter }}
                </b-table-column>
                <b-table-column width="13%" centered field="totaal" label="Totaal" v-slot="props" sortable>
                    {{ props.row.totaal | currencyFormatter }}
                </b-table-column>
                <template #empty>
                    <div class="custom-table-empty">Nog geen artikels toegevoegd...</div>
                </template>
            </b-table>
            <span v-if="hasError" class="artikeltableerror">Kies minstens een artikel</span>
          </div>

          <div>
              <TotalBox :subtotaal="subtotaal" :btw="btw" :totaal="totaal" />
          </div>
    </div>
    <div>
        <OpmerkingBox v-model="verkoop.opmerking" />
    </div>
  </div>
</template>

<script>
import CreateHeader from "../../components/general/CreateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import ValidatedSearchInput from "../../components/inputfields/ValidatedSearchInput.vue"
import KlantenController from '../../api/calls/klanten';
import socketMixin from "../../mixins/socketMixin"
import KlantModal from "../../modals/KlantModal.vue"
import MultilineTextInput from "../../components/inputfields/MultilineTextInput.vue"
import AdresSearch from "../../components/inputfields/AdresSearch.vue"
import SmallHeaderAdder from "../../components/general/SmallHeaderAdder.vue"
import ValidatedSelectInput from "../../components/inputfields/ValidatedSelectInput.vue"
import VerkopenController from '../../api/calls/verkopen';
import AddArtikelBox from '../../components/boxes/AddArtikelBox.vue';
import UtilsFactory from '../../logic/utils/utilsFactory';
import ViewStates from '../../logic/constants/viewStates';
import ModalFactory from '../../logic/factories/modalFactory';
import ConfirmationModal from '../../modals/ConfirmationModal.vue';
import OpmerkingBox from "../../components/boxes/OpmerkingBox.vue";
import TotalBox from "../../components/boxes/TotalBox.vue"

export default {
    name: "VerkopenCreateview",
    mixins: [socketMixin],
    components: {
        CreateHeader,
        ValidationObserver,
        ValidatedTextInput,
        ValidatedSelectInput,
        ValidatedSearchInput,
        AdresSearch,
        MultilineTextInput,
        SmallHeaderAdder,
        AddArtikelBox,
        OpmerkingBox,
        TotalBox,
    },
    computed: {
      subtotaal(){
          if(this.verkoop.tempArtikels.length != 0){
              return UtilsFactory.sum(this.verkoop.tempArtikels, "totaal");   
          }
          return 0
      },
      btw() {
          const value = UtilsFactory.searchValueById(this.btws, this.verkoop.btw_id)
          if(value) return value
          return "..."
      },
      totaal(){
          if(this.btw === "...") return 0
          if(this.subtotaal === 0) return 0
          return UtilsFactory.addPercentage(this.subtotaal, this.btw)
      }
    },
    data: () => ({
      verkoop: {
        order_nr: null,
        datum: null,
        klant_id: null,
        klant_naam: null,
        ref_nr: null,
        btw_id: null,
        betalingsdatum: null,
        leverancier_id: null,
        leverancier_naam: null,
        valuta: null,
        opmerking_order: null,
        eindtekst: null,
        factuuradres: null,
        subtotaal: null,
        totaal: null,
        isBetaald: null,
        isActive: null,
        updated_time: null,
        updated_by: null,
        bedrijfs_id: null,
        opmerking: null,
        tempArtikels: [],
        artikels: []
      },
      tableKey: 0,
      btws: [],
      selectedKlant: null,
      isArtikelBoxShown: false,
      hasError: false
    }),
    mounted(){
      VerkopenController.getPreData(this, (res) => {
          this.btws = res[0].data
      })
      this.$refs.klantField.setModal(KlantModal);
    },
    methods: {
      changeKlant(item){
          this.clearAdressen()
          if(item){
              KlantenController.getKlant(this, item.id, (res) => { 
                  this.selectedKlant = res.data[0]
                  this.$refs.facAdresField.setAdressen(JSON.parse(this.selectedKlant.facturatie_adressen));
              })
          }
      },
      addArtikelToList(item){
        this.hasError = false
        const index = UtilsFactory.searchIndexById(this.verkoop.tempArtikels, item)
        if(index == -1) this.verkoop.tempArtikels.push(item)
        else {
            this.verkoop.tempArtikels[index].id = item.id
            this.verkoop.tempArtikels[index].artikelcode = item.artikelcode
            this.verkoop.tempArtikels[index].naam = item.naam
            this.verkoop.tempArtikels[index].memo = item.memo
            this.verkoop.tempArtikels[index].prijs = item.prijs
            this.verkoop.tempArtikels[index].hoeveelheid = item.hoeveelheid
            this.verkoop.tempArtikels[index].korting_een = item.korting_een
            this.verkoop.tempArtikels[index].korting_twee = item.korting_twee
            this.verkoop.tempArtikels[index].totaal = item.totaal
            this.tableKey++
        } 
        this.closeArtikelBox()
      },
      deleteArtikelFromList(item){
        ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit artikel wilt verwijderen?", null, (isConfirmed) => {
            if (isConfirmed) {
                UtilsFactory.deleteItemFromList(this.verkoop.tempArtikels, item.id)
                this.closeArtikelBox()
                this.$refs.addArtikelBox.clear()
            }
        });
      },
      onSubmit(){
        let isValidated = true;

        if(this.$refs.facAdresField.isEmpty()){
            this.$refs.facAdresField.setError(true); 
            isValidated = false;
        }
        if(this.verkoop.tempArtikels.length === 0) {
            this.hasError = true; 
            isValidated = false;
        }

        if(isValidated){
            this.verkoop.klant_id = this.$refs.klantField.getItem().id
            this.verkoop.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
            this.verkoop.artikels = JSON.stringify(this.verkoop.tempArtikels)
            this.verkoop.subtotaal = this.subtotaal;
            this.verkoop.totaal = this.totaal;
            VerkopenController.create(this, this.verkoop, this.socket)
        }
      },
      addArtikel(){
        this.$refs.addArtikelBox.setType(ViewStates.ADD);
        this.isArtikelBoxShown = true;
      },
      updateArtikel(row){
        this.$refs.addArtikelBox.setType(ViewStates.UPDATE);
        this.$refs.addArtikelBox.setArtikel(row);
        this.isArtikelBoxShown = true;
      },
      closeArtikelBox(){
        this.isArtikelBoxShown = false;
      },
      clearAdressen(){
        this.verkoop.factuuradres = null
        this.$refs.facAdresField.clear();
      }
    }
}
</script>

<style>
.custom-table-empty {
    text-align: center;
    padding: 25px;
    font-size: 14px;
    font-weight: 400;
}
.custom-opmerking-info {
    cursor: help;
}
.multilinetextareainputfieldinput {
    resize: none;
    width: 100%;
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 6px;
    outline: none;
}
.artikeltableerror{
    color: red;
    font-size: 12px;
}
</style>