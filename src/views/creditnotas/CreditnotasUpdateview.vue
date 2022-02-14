<template>
  <div class="content-body">
    <div v-show="isReadVisible" >
      <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <ReadHeaderWithPrint :title="orderTitle" @print="print" @edit="edit" />
          <UpdatedByInfo :updatedObj="creditnota" />
          <br>
          <div class="columns">
            <div class="column">
              <InfoLine info="Order nr." :value="creditnota.order_nr" />
            </div>
            <div class="column"></div>
          </div>
          <div class="columns">
            <div class="column">
              <InfoLine info="Datum" :value="creditnota.read_datum" />
              <InfoLine info="Klant" :value="creditnota.klant_naam" />
              <InfoLine info="Betalingsdatum" :value="creditnota.read_betalingsdatum" />
              <InfoAdresLine info="Facturatie adres" :value="creditnota.read_factuuradres" />
            </div>
            <div class="column">
              <InfoLine info="Referentie nr." :value="creditnota.ref_nr" />
              <InfoLine info="Valuta" :value="creditnota.valuta" />
              <InfoLine info="Btw categorie" :value="btwInfo" />
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <InfoLine info="Eindtekst" :value="creditnota.eindtekst" />
            </div>
            <div class="column">
              <InfoLine info="Opmerking order" :value="creditnota.opmerking_order" />
            </div>
          </div>
          <div>
            <ArtikelTableBox :artikels="creditnota.tempArtikels" />
          </div>
        </div>
          <div>
            <TotalBox :subtotaal="creditnota.subtotaal" :btw="btw" :totaal="creditnota.totaal" />
          </div>
      </div>
      <div>
        <opmerking-box-read v-model="creditnota.opmerking" />
      </div>
    </div>
    <div v-show="!isReadVisible">
      <div class="box"> 
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <ValidationObserver v-slot="{ handleSubmit }">
              <UpdateHeader title="Creditnota aanpassen" @save="handleSubmit(onSubmit)" @cancel="cancelEdit" @deleteItem="deleteItem" />
              <ErrorField :showError="showError"/>
              <div class="columns">
                <div class="column">
                  <ValidatedTextInput v-model="creditnota.order_nr" name="Order nr." rules="required" />
                </div>
                <div class="column"></div>
              </div>
             <div class="columns">
                <div class="column">
                    <ValidatedTextInput type="date" v-model="creditnota.update_datum" name="Datum" rules="required" />
                    <ValidatedSearchInput @changeto="changeKlant" ref="klantField" v-model="creditnota.klant_naam" name="Klant" rules="required" />
                    <ValidatedTextInput type="date" v-model="creditnota.update_betalingsdatum" name="Vervaldag" rules="required" />
                </div>
                <div class="column">
                    <ValidatedTextInput v-model="creditnota.ref_nr" name="Referentie nr." rules="required" />
                    <ValidatedTextInput v-model="creditnota.valuta" name="Valuta" rules="required" />
                    <ValidatedSelectInput v-model="creditnota.btw_id" name="Btw categorie" rules="required">
                        <option v-for="option in btws" :value="option.id" :key="option.id">
                        {{ option.naam }}
                        </option>
                    </ValidatedSelectInput>
                </div>
            </div>
             <div class="columns">
                    <div class="column is-6">
                        <AdresSearch :klant="creditnota.klant_naam" ref="facAdresField" text="Facturatie adres" />
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <MultilineTextInput v-model="creditnota.eindtekst" name="Eindtekst" />
                    </div>
                    <div class="column">
                        <MultilineTextInput v-model="creditnota.opmerking_order" name="Opmerking order" />
                    </div>
                </div>
          </ValidationObserver>
        </div>
        <div>
            <ArtikelBox ref="artikelbox" :btw="btw" />
        </div>
      </div>
      <div>
        <OpmerkingBox v-model="creditnota.opmerking" />
    </div>
    </div>
  </div>
</template>

<script>
import ReadHeaderWithPrint from "../../components/general/ReadHeaderWithPrint.vue";
import UpdateHeader from "../../components/general/UpdateHeader.vue";
import { ValidationObserver } from "vee-validate";
import CreditnotasController from '../../api/calls/creditnotas';
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
import ErrorField from '../../components/common/ErrorField.vue'
import ModalFactory from '../../logic/factories/modalFactory';
import ConfirmationModal from "../../modals/ConfirmationModal.vue";

export default {
    name: "CreditnotasUpdateview",
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
      ErrorField
    },
    data: () => ({
      creditnota: {
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
      copyCreditnota: null,
      showError: false
    }),
    computed: {
      orderTitle(){
        if(!this.creditnota.order_nr) return "Creditnota: ..."
        return `Creditnota: ${this.creditnota.order_nr}`
      },
      btw() {
        const value = UtilsFactory.searchValueById(this.btws, this.creditnota.btw_id)
        if(value) return value
        return "..."
      },
      btwInfo() {
        return UtilsFactory.searchName(this.btws, this.creditnota.btw_id);
      },
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        CreditnotasController.getPreDataUpdate(this, this.$route.params.id, (res) => {
          this.btws = res[0].data
          this.creditnota = res[1].data
          this.creditnota.read_factuuradres = JSON.parse(this.creditnota.factuuradres)
          this.creditnota.tempArtikels = this.creditnota.artikels
          this.$refs.artikelbox.setArtikels(UtilsFactory.copyObject(this.creditnota.artikels))

          this.$refs.facAdresField.setAdres(this.creditnota.read_factuuradres);

          this.creditnota.update_datum = moment(this.creditnota.datum).format('yyyy-MM-DD');
          this.creditnota.update_betalingsdatum = moment(this.creditnota.betalingsdatum).format('yyyy-MM-DD');
          this.creditnota.read_datum = moment(this.creditnota.datum).format('DD-MM-yyyy');
          this.creditnota.read_betalingsdatum = moment(this.creditnota.betalingsdatum).format('DD-MM-yyyy');
          
          this.$refs.artikelbox.setId(this.creditnota.tempArtikels)
          this.$refs.klantField.setId(this.creditnota.klant_id);
          this.copyCreditnota = UtilsFactory.copyObject(this.creditnota)
          this.fetchAdressen(this.creditnota.klant_id)
        })
        this.$refs.klantField.setModal(KlantModal);
      },
      edit(){
        this.isReadVisible = false;
        this.showError = false;
      },
      print(){
        Navigation.navigate(this, Navigation.CR_PRINT, this.creditnota)
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
          this.creditnota.datum = this.creditnota.update_datum
          this.creditnota.betalingsdatum = this.creditnota.update_betalingsdatum
          this.creditnota.klant_id = this.$refs.klantField.getId()
          this.creditnota.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
          this.creditnota.artikels = this.$refs.artikelbox.getArtikels()
          this.creditnota.subtotaal = this.$refs.artikelbox.getSubtotaal();
          this.creditnota.totaal = this.$refs.artikelbox.getTotaal();
          CreditnotasController.update(this, this.creditnota, this.socket)
        }
      },
      cancelEdit(){
        this.isReadVisible = true
        this.creditnota = UtilsFactory.copyObject(this.copyCreditnota)
        this.fetchData()
        this.$refs.facAdresField.setError(false);
        this.$refs.artikelbox.setError(false)
      },
      deleteItem(){
        ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u deze factuur wilt verwijderen?", null, (isConfirmed) => {
          if(isConfirmed){
            CreditnotasController.deleteById(this, this.creditnota, this.socket)
          }
        })        
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
        this.creditnota.factuuradres = null
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