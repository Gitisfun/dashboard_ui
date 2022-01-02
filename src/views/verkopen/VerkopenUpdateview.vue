<template>
  <div class="content-body">
    <div v-show="isReadVisible" >
      <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <ReadHeaderWithPrint :title="orderTitle" @print="print" @edit="edit" />
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
                    <ValidatedSelectInput @change.native="setTotaal" v-model="verkoop.btw_id" name="Btw categorie" rules="required">
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
              <b-table-column width="12%" centered field="korting_twee" label="Korting II" v-slot="props" sortable>
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
          <TotalBox :subtotaal="verkoop.subtotaal" :btw="btw" :totaal="verkoop.totaal" />
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


import VerkopenController from '../../api/calls/verkopen';
import ReadHeaderWithPrint from "../../components/general/ReadHeaderWithPrint.vue";
import UpdateHeader from "../../components/general/UpdateHeader.vue";
import { ValidationObserver } from "vee-validate";
import socketMixin from "../../mixins/socketMixin"
import InfoLine from "../../components/textfields/InfoLine.vue"
import InfoAdresLine from "../../components/textfields/InfoAdresLine.vue"
import ArtikelTableBox from '../../components/boxes/ArtikelTableBox.vue';
import TotalBox from "../../components/boxes/TotalBox.vue";
import UtilsFactory from '../../logic/utils/utilsFactory';
import OpmerkingBoxRead from '../../components/boxes/OpmerkingBoxRead.vue';
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import ValidatedSearchInput from "../../components/inputfields/ValidatedSearchInput.vue"
import KlantenController from "../../api/calls/klanten"
import KlantModal from "../../modals/KlantModal.vue"
import MultilineTextInput from "../../components/inputfields/MultilineTextInput.vue"
import AdresSearch from "../../components/inputfields/AdresSearch.vue"
import SmallHeaderAdder from "../../components/general/SmallHeaderAdder.vue"
import ValidatedSelectInput from "../../components/inputfields/ValidatedSelectInput.vue"
import AddArtikelBox from '../../components/boxes/AddArtikelBox.vue';
import ViewStates from '../../logic/constants/viewStates';
import OpmerkingBox from "../../components/boxes/OpmerkingBox.vue";
import ModalFactory from '../../logic/factories/modalFactory';
import ConfirmationModal from "../../modals/ConfirmationModal.vue";
import moment from  "moment"
import Navigation from '../../logic/factories/navigation';

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
      TotalBox,
      OpmerkingBoxRead,
      ValidatedTextInput,
      ValidatedSelectInput,
      ValidatedSearchInput,
      AdresSearch,
      MultilineTextInput,
      SmallHeaderAdder,
      AddArtikelBox,
      OpmerkingBox,
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
      selectedKlant: null,
      isArtikelBoxShown: false,
      copyVerkoop: null,
      tableKey: 0,
      btws: [],
      hasError: false
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
        this.verkoop = res[1].data[0]
        this.verkoop.read_factuuradres = JSON.parse(this.verkoop.factuuradres)
        this.verkoop.tempArtikels = JSON.parse(this.verkoop.artikels)
        this.$refs.facAdresField.setAdres(this.verkoop.read_factuuradres);
        this.verkoop.update_datum = moment.utc(this.verkoop.datum).format('yyyy-MM-DD');
        this.verkoop.update_betalingsdatum = moment.utc(this.verkoop.betalingsdatum).format('yyyy-MM-DD');
        this.verkoop.read_datum = moment.utc(this.verkoop.datum).format('DD-MM-yyyy');
        this.verkoop.read_betalingsdatum = moment.utc(this.verkoop.betalingsdatum).format('DD-MM-yyyy');
        this.$refs.addArtikelBox.setId(this.verkoop.tempArtikels)
        this.setSubtotaal()
        this.setTotaal()
        this.$refs.klantField.setId(this.verkoop.klant_id);
        this.copyVerkoop = UtilsFactory.copyObject(this.verkoop)
      })
      this.$refs.klantField.setModal(KlantModal);
    },
    methods: {
      setSubtotaal(){
        if(this.verkoop.tempArtikels.length != 0){
            const sum = UtilsFactory.sum(this.verkoop.tempArtikels, "totaal");
            this.verkoop.subtotaal = sum
        }
        else{
          this.verkoop.subtotaal = 0
        }
      },
      setTotaal(){
        if(this.btw === "...") this.verkoop.totaal = 0
        if(this.verkoop.subtotaal === 0) this.verkoop.totaal = 0
        this.verkoop.totaal = UtilsFactory.addPercentage(this.verkoop.subtotaal, this.btw)
      },
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

        if(this.verkoop.tempArtikels.length === 0) {
            this.hasError = true; 
            isValidated = false;
        }

        if(isValidated){
          this.verkoop.datum = this.verkoop.update_datum
          this.verkoop.betalingsdatum = this.verkoop.update_betalingsdatum
          this.verkoop.klant_id = this.$refs.klantField.getId()
          this.verkoop.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
          this.verkoop.artikels = JSON.stringify(this.verkoop.tempArtikels) 
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
            KlantenController.getKlant(this, item.id, (res) => { 
                this.selectedKlant = res.data[0]
                this.$refs.facAdresField.setAdressen(JSON.parse(this.selectedKlant.facturatie_adressen));
            })
        }
      },
      addArtikelToList(item){
        this.hasError = false
        const index = UtilsFactory.searchIndexById(this.verkoop.tempArtikels, item)
        if(index == -1) {
          this.verkoop.tempArtikels.push(item); 
          this.tableKey++
        }
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
        this.setSubtotaal()
        this.setTotaal()
        this.closeArtikelBox()
      },
      deleteArtikelFromList(item){
        ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit artikel wilt verwijderen?", null, (isConfirmed) => {
            if (isConfirmed) {
                UtilsFactory.deleteItemFromList(this.verkoop.tempArtikels, item.id)
                this.closeArtikelBox()
                this.tableKey++
                this.$refs.addArtikelBox.clear()
            }
        });
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