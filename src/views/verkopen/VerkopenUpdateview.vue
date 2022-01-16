<template>
  <div class="content-body">
    <div v-show="isReadVisible" >
      <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <ReadHeaderWithPrint :title="orderTitle" @print="print" @edit="edit" />
          <UpdatedByInfo :updatedObj="verkoop" />
          <br>
          <div class="columns">
            <div class="column">
              <InfoLine info="Order nr." :value="verkoop.order_nr" />
            </div>
            <div class="column"></div>
          </div>
          <div class="columns">
            <div class="column">
              <InfoLine info="Datum" :value="verkoop.read_datum" />
              <InfoLine info="Klant" :value="verkoop.klant_naam" />
              <InfoLine info="Betalingsdatum" :value="verkoop.read_betalingsdatum" />
              <InfoAdresLine info="Facturatie adres" :value="verkoop.read_factuuradres" />
              <InfoLine info="Eindtekst" :value="verkoop.eindtekst" />
            </div>
            <div class="column">
              <InfoLine info="Referentie nr." :value="verkoop.ref_nr" />
              <InfoLine info="Valuta" :value="verkoop.valuta" />
              <InfoLine info="Btw categorie" :value="btwInfo" />
              <InfoLine info="Opmerking order" :value="verkoop.opmerking_order" />
            </div>
          </div>
          <br>
          <div>
            <ArtikelTableBox :artikels="verkoop.tempArtikels" />
          </div>
        </div>
          <div>
            <TotalBox :subtotaal="verkoop.subtotaal" :btw="btw" :totaal="verkoop.totaal" />
          </div>
      </div>
      <div>
        <opmerking-box-read v-model="verkoop.opmerking" />
      </div>
    </div>
    <div v-show="!isReadVisible">
      <div class="box"> 
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <ValidationObserver v-slot="{ handleSubmit }">
              <UpdateHeader title="Verkoopfactuur aanpassen" @save="handleSubmit(onSubmit)" @cancel="cancelEdit" @deleteItem="deleteItem" />
              <div class="columns">
                <div class="column">
                  <ValidatedTextInput v-model="verkoop.order_nr" name="Order nr." rules="required" />
                </div>
                <div class="column"></div>
              </div>
             <div class="columns">
                <div class="column">
                    <ValidatedTextInput type="date" v-model="verkoop.update_datum" name="Datum" rules="required" />
                    <ValidatedSearchInput @changeto="changeKlant" ref="klantField" v-model="verkoop.klant_naam" name="Klant" rules="required" />
                    <ValidatedTextInput type="date" v-model="verkoop.update_betalingsdatum" name="Vervaldag" rules="required" />
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
                        <MultilineTextInput v-model="verkoop.opmerking_order" name="Opmerking order" />
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
  </div>
</template>

<script>
// TODO: fix facturatie en leveringsadres default click when is filled in


import ReadHeaderWithPrint from "../../components/general/ReadHeaderWithPrint.vue";
import UpdateHeader from "../../components/general/UpdateHeader.vue";
import { ValidationObserver } from "vee-validate";
import VerkopenController from '../../api/calls/verkopen';
import socketMixin from "../../mixins/socketMixin"
import InfoLine from "../../components/textfields/InfoLine.vue"
import InfoAdresLine from "../../components/textfields/InfoAdresLine.vue"
import ArtikelTableBox from '../../components/boxes/ArtikelTableBox.vue';
import UtilsFactory from '../../logic/utils/utilsFactory';
import OpmerkingBoxRead from '../../components/boxes/OpmerkingBoxRead.vue';
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import ValidatedSearchInput from "../../components/inputfields/ValidatedSearchInput.vue"
import KlantenController from "../../api/calls/klanten"
import KlantModal from "../../modals/KlantModal.vue"
import MultilineTextInput from "../../components/inputfields/MultilineTextInput.vue"
import AdresSearch from "../../components/inputfields/AdresSearch.vue"
import ValidatedSelectInput from "../../components/inputfields/ValidatedSelectInput.vue"
import OpmerkingBox from "../../components/boxes/OpmerkingBox.vue";
import TotalBox from "../../components/boxes/TotalBox.vue";
import moment from  "moment"
import Navigation from '../../logic/factories/navigation';
import UpdatedByInfo from '../../components/common/UpdatedByInfo.vue';
import ArtikelBox from '../../components/boxes/ArtikelBox.vue';

export default {
    name: "VerkopenUpdateview",
    mixins: [socketMixin],
    components: {
      ReadHeaderWithPrint,
      UpdateHeader,
      ValidationObserver,
      InfoLine,
      InfoAdresLine,
      ArtikelTableBox,
      OpmerkingBoxRead,
      ValidatedTextInput,
      ValidatedSelectInput,
      ValidatedSearchInput,
      AdresSearch,
      MultilineTextInput,
      TotalBox,
      OpmerkingBox,
      ArtikelBox,
      UpdatedByInfo,
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
      isReadVisible: true,
      btws: [],
      selectedKlant: null,
      copyVerkoop: null,
    }),
    computed: {
      orderTitle(){
        if(!this.verkoop.order_nr) return "Verkoopfactuur: ..."
        return `Verkoopfactuur: ${this.verkoop.order_nr}`
      },
      btw() {
        const value = UtilsFactory.searchValueById(this.btws, this.verkoop.btw_id)
        if(value) return value
        return "..."
      },
      btwInfo() {
        return UtilsFactory.searchName(this.btws, this.verkoop.btw_id);
      },
    },
    mounted(){
      VerkopenController.getPreDataUpdate(this, this.$route.params.id, (res) => {
        this.btws = res[0].data
        this.verkoop = res[1].data
        this.verkoop.read_factuuradres = JSON.parse(this.verkoop.factuuradres)
        this.verkoop.tempArtikels = this.verkoop.artikels
        this.$refs.artikelbox.setArtikels(UtilsFactory.copyObject(this.verkoop.artikels))

        this.$refs.facAdresField.setAdres(this.verkoop.read_factuuradres);
        
        this.verkoop.update_datum = moment(this.verkoop.datum).format('yyyy-MM-DD');
        this.verkoop.update_betalingsdatum = moment(this.verkoop.betalingsdatum).format('yyyy-MM-DD');
        this.verkoop.read_datum = moment(this.verkoop.datum).format('DD-MM-yyyy');
        this.verkoop.read_betalingsdatum = moment(this.verkoop.betalingsdatum).format('DD-MM-yyyy');
        
        this.$refs.artikelbox.setId(this.verkoop.tempArtikels)
        this.$refs.klantField.setId(this.verkoop.klant_id);
        this.copyVerkoop = UtilsFactory.copyObject(this.verkoop)
        this.fetchAdressen(this.verkoop.klant_id)
      })
      this.$refs.klantField.setModal(KlantModal);
    },
    methods: {
      edit(){
        this.isReadVisible = false;
      },
      print(){
        console.log(this.verkoop);
        Navigation.navigate(this, Navigation.VK_PRINT, this.verkoop)
      },
      onSubmit(){
        console.log(this.verkoop);
        let isValidated = true;

        if(this.$refs.facAdresField.isEmpty()){
            this.$refs.facAdresField.setError(true); 
            isValidated = false;
        }

        if(this.$refs.artikelbox.isEmpty()) {
              this.$refs.artikelbox.setError(true) 
              isValidated = false;
        }

        if(isValidated){
          this.verkoop.datum = this.verkoop.update_datum
          this.verkoop.betalingsdatum = this.verkoop.update_betalingsdatum
          this.verkoop.klant_id = this.$refs.klantField.getId()
          this.verkoop.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
          this.verkoop.artikels = this.$refs.artikelbox.getArtikels()
          this.verkoop.subtotaal = this.$refs.artikelbox.getSubtotaal();
          this.verkoop.totaal = this.$refs.artikelbox.getTotaal();
          VerkopenController.update(this, this.verkoop, this.socket)
          console.log(this.verkoop);
        }
      },
      cancelEdit(){
        this.isReadVisible = true
        this.verkoop = UtilsFactory.copyObject(this.copyVerkoop)
      },
      deleteItem(){
        VerkopenController.deleteById(this, this.verkoop, this.socket)
      },
      changeKlant(item){
        this.clearAdressen()
        if(item){
          this.fetchAdressen(item.id)
        }
      },
      fetchAdressen(id){
        KlantenController.getKlant(this, id, (res) => { 
            this.selectedKlant = res.data[0]
            this.$refs.facAdresField.setAdressen(JSON.parse(this.selectedKlant.facturatie_adressen));
          })
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