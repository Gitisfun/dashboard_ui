<template>
    <div class="content-body">
    <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
            <ValidationObserver v-slot="{ handleSubmit }">
                <CreateHeader title="Nieuwe verkoopfactuur" @save="handleSubmit(onSubmit)" />
                <ErrorField :showError="showError"/>
                <div class="columns">
                    <div class="column">
                        <ValidatedTextInput v-model="verkoop.order_nr" name="Order nr." rules="required" />
                    </div>
                    <div class="column"></div>
                </div>
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
        <div>
            <ArtikelBox ref="artikelbox" :btw="btw" />
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
import ValidatedSelectInput from "../../components/inputfields/ValidatedSelectInput.vue"
import VerkopenController from '../../api/calls/verkopen';
import UtilsFactory from '../../logic/utils/utilsFactory';
import OpmerkingBox from "../../components/boxes/OpmerkingBox.vue";
import ArtikelBox from '../../components/boxes/ArtikelBox.vue';
import ErrorField from '../../components/common/ErrorField.vue'
import DateHelper from '../../logic/utils/dateHelper';

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
        OpmerkingBox,
        ArtikelBox,
        ErrorField
    },
    computed: {
      btw() {
          const value = UtilsFactory.searchValueById(this.btws, this.verkoop.btw_id)
          if(value) return value
          return "..."
      },
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
      btws: [],
      selectedKlant: null,
      showError: false
    }),
    mounted(){
      VerkopenController.getPreData(this, (res) => {
          this.btws = res[0].data
          this.verkoop.order_nr = `${DateHelper.getCurrentYear()}-${res[1].data[0].verkopen}`
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
      onSubmit(){
        let isValidated = true;

        if(this.$refs.facAdresField.isEmpty()){
            this.$refs.facAdresField.setError(true); 
            isValidated = false;
            this.showError = true
        }

        if(this.$refs.artikelbox.isEmpty()) {
            this.$refs.artikelbox.setError(true) 
            isValidated = false;
            this.showError = true
        }

        if(isValidated){
            this.showError = false
            this.verkoop.klant_id = this.$refs.klantField.getItem().id
            this.verkoop.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
            this.verkoop.artikels = this.$refs.artikelbox.getArtikels()
            this.verkoop.subtotaal = this.$refs.artikelbox.getSubtotaal();
            this.verkoop.totaal = this.$refs.artikelbox.getTotaal();
            VerkopenController.create(this, this.verkoop, this.socket)
        }
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
</style>