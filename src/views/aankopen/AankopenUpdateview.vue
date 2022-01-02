<template>
  <div class="content-body">
    <div v-show="isReadVisible" >
      <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <ReadHeaderWithPrint :title="bestellingTitle" @print="print" @edit="edit" />
          <br>
          <div class="columns">
            <div class="column">
              <InfoLine info="Bestelling nr." :value="aankoop.bestellings_nr" />
            </div>
            <div class="column"></div>
          </div>
          <div class="columns">
            <div class="column">
              <InfoLine info="Datum" :value="aankoop.read_datum" />
              <InfoLine info="Klant" :value="aankoop.klant_naam" />
              <InfoLine info="Referentie nr." :value="aankoop.ref_nr" />
              <InfoLine info="Vervaldag" :value="aankoop.read_vervaldag" />
              <InfoLine info="Leveringsdatum" :value="aankoop.read_leverdatum" />
              <InfoAdresLine info="Facturatie adres" :value="aankoop.read_factuuradres" />
              <InfoLine info="Begintekst" :value="aankoop.begintekst" />
            </div>
            <div class="column">
              <InfoLine info="Valuta" :value="aankoop.valuta" />
              <InfoLine info="Leverancier" :value="aankoop.leverancier_naam" />
              <InfoLine info="Incoterm" :value="aankoop.incoterm" />
              <InfoLine info="Btw categorie" :value="btwInfo" />
              <InfoLine info="  " value="..." />
              <InfoAdresLine info="Leveringsadres" :value="aankoop.read_leveradres" />
              <InfoLine info="Eindtekst" :value="aankoop.eindtekst" />
            </div>
          </div>
          <br>
          <div>
            <ArtikelTableBox :artikels="aankoop.tempArtikels" />
          </div>
        </div>
          <div>
            <TotalBox :subtotaal="aankoop.subtotaal" :btw="btw" :totaal="aankoop.totaal" />
          </div>
      </div>
      <div>
        <opmerking-box-read v-model="aankoop.opmerking" />
      </div>
    </div>
    <div v-show="!isReadVisible">
      <div class="box"> 
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <ValidationObserver v-slot="{ handleSubmit }">
              <UpdateHeader title="Bestelling aanpassen" @save="handleSubmit(onSubmit)" @cancel="cancelEdit" @deleteItem="deleteItem" />
              <div class="columns">
                <div class="column">
                  <ValidatedTextInput v-model="aankoop.bestellings_nr" name="Bestelling nr." rules="required" />
                </div>
                <div class="column"></div>
              </div>
             <div class="columns">
                <div class="column">
                    <ValidatedTextInput type="date" v-model="aankoop.update_datum" name="Datum" rules="required" />
                    <ValidatedSearchInput @changeto="changeKlant" ref="klantField" v-model="aankoop.klant_naam" name="Klant" rules="required" />
                    <ValidatedTextInput v-model="aankoop.ref_nr" name="Referentie nr." rules="required" />
                    <ValidatedTextInput type="date" v-model="aankoop.update_vervaldag" name="Vervaldag" rules="required" />
                    <ValidatedTextInput type="date" v-model="aankoop.update_leverdatum" name="Leveringsdatum" rules="required" />
                </div>
                <div class="column">
                    <ValidatedTextInput v-model="aankoop.valuta" name="Valuta" rules="required" />
                    <ValidatedSearchInput ref="leverancierField" v-model="aankoop.leverancier_naam" name="Leverancier" rules="required" />
                    <ValidatedTextInput v-model="aankoop.incoterm" name="Incoterm" rules="required" />
                    <ValidatedSelectInput @change.native="setTotaal" v-model="aankoop.btw_id" name="Btw categorie" rules="required">
                        <option v-for="option in btws" :value="option.id" :key="option.id">
                        {{ option.naam }}
                        </option>
                    </ValidatedSelectInput>
                </div>
            </div>
             <div class="columns">
                    <div class="column">
                        <AdresSearch :klant="aankoop.klant_naam" ref="facAdresField" text="Facturatie adres" />
                    </div>
                    <div class="column">
                        <AdresSearch :klant="aankoop.klant_naam" ref="levAdresField" text="Leveringsadres" />
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <MultilineTextInput v-model="aankoop.begintekst" name="Begintekst" />
                    </div>
                    <div class="column">
                        <MultilineTextInput v-model="aankoop.eindtekst" name="Eindtekst" />
                    </div>
                </div>
          </ValidationObserver>
        </div>
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
          <SmallHeaderAdder title="Artikels" @add="addArtikel" />
          <div>
              <AddArtikelBox ref="addArtikelBox" v-show="isArtikelBoxShown" @addArtikelToList="addArtikelToList" @closeArtikelBox="closeArtikelBox" @deleteArtikelFromList="deleteArtikelFromList" />
          </div>
          <b-table striped :key="tableKey" @dblclick="updateArtikel" :data="aankoop.tempArtikels">
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
          <TotalBox :subtotaal="aankoop.subtotaal" :btw="btw" :totaal="aankoop.totaal" />
        </div>
      </div>
      <div>
        <OpmerkingBox v-model="aankoop.opmerking" />
    </div>
    </div>
  </div>
</template>

<script>
// TODO: fix facturatie en leveringsadres default click when is filled in


import ReadHeaderWithPrint from "../../components/general/ReadHeaderWithPrint.vue";
import UpdateHeader from "../../components/general/UpdateHeader.vue";
import { ValidationObserver } from "vee-validate";
import AankopenController from '../../api/calls/aankopen'
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
import LeverancierModal from '../../modals/LeverancierModal.vue';
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
    name: "AankopenUpdateview",
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
    data: () =>({
      isReadVisible: true,
      btws: [],
      tableKey: 0,
      selectedKlant: null,
      isArtikelBoxShown: false,
      hasError: false,
      copyAankoop: null,
      aankoop: {
        bestellings_nr: null,
        datum: null,
        update_datum: null,
        klant_id: null,
        klant_naam: null,
        ref_nr: null,
        btw_id: null,
        vervaldag: null,
        leverdatum: null,
        leverancier_id: null,
        leverancier_naam: null,
        incoterm: null,
        valuta: null,
        begintekst: null,
        eindtekst: null,
        factuuradres: null,
        read_factuuradres: null,
        leveradres: null,
        read_leveradres: null,
        subtotaal: null,
        totaal: null,
        isGeleverd: null,
        isBetaald: null,
        isActive: null,
        updated_time: null,
        updated_by: null,
        bedrijfs_id: null,
        opmerking: null,
        tempArtikels: [],
        artikels: []
      },
    }),
    computed: {
      bestellingTitle(){
        if(!this.aankoop.bestellings_nr) return "Bestelling: ..."
        return `Bestelling: ${this.aankoop.bestellings_nr}`
      },
      btw() {
        const value = UtilsFactory.searchValueById(this.btws, this.aankoop.btw_id)
        if(value) return value
        return "..."
      },
      btwInfo() {
        return UtilsFactory.searchName(this.btws, this.aankoop.btw_id);
      },
    },
    mounted(){
      AankopenController.getPreDataUpdate(this, this.$route.params.id, (res) => {
        this.btws = res[0].data
        this.aankoop = res[1].data[0]
        this.aankoop.read_factuuradres = JSON.parse(this.aankoop.factuuradres)
        this.aankoop.read_leveradres = JSON.parse(this.aankoop.leveradres)
        this.aankoop.tempArtikels = JSON.parse(this.aankoop.artikels)
        this.$refs.facAdresField.setAdres(this.aankoop.read_factuuradres);
        this.$refs.levAdresField.setAdres(this.aankoop.read_leveradres);
        this.aankoop.update_datum = moment.utc(this.aankoop.datum).format('yyyy-MM-DD');
        this.aankoop.update_vervaldag = moment.utc(this.aankoop.vervaldag).format('yyyy-MM-DD');
        this.aankoop.update_leverdatum = moment.utc(this.aankoop.leverdatum).format('yyyy-MM-DD');
        this.aankoop.read_datum = moment.utc(this.aankoop.datum).format('DD-MM-yyyy');
        this.aankoop.read_vervaldag = moment.utc(this.aankoop.vervaldag).format('DD-MM-yyyy');
        this.aankoop.read_leverdatum = moment.utc(this.aankoop.leverdatum).format('DD-MM-yyyy');
        this.$refs.addArtikelBox.setId(this.aankoop.tempArtikels)
        this.setSubtotaal()
        this.setTotaal()
        this.$refs.klantField.setId(this.aankoop.klant_id);
        this.$refs.leverancierField.setId(this.aankoop.leverancier_id);
        this.copyAankoop = UtilsFactory.copyObject(this.aankoop)
      })
      this.$refs.klantField.setModal(KlantModal);
      this.$refs.leverancierField.setModal(LeverancierModal);
    },
    methods: {
      setSubtotaal(){
        if(this.aankoop.tempArtikels.length != 0){
            const sum = UtilsFactory.sum(this.aankoop.tempArtikels, "totaal");
            this.aankoop.subtotaal = sum
        }
        else{
          this.aankoop.subtotaal = 0
        }
      },
      setTotaal(){
        if(this.btw === "...") this.aankoop.totaal = 0
        if(this.aankoop.subtotaal === 0) this.aankoop.totaal = 0
        this.aankoop.totaal = UtilsFactory.addPercentage(this.aankoop.subtotaal, this.btw)
      },
      edit(){
        this.isReadVisible = false;
      },
      print(){
        console.log(this.aankoop);
        Navigation.navigate(this, Navigation.AK_PRINT, this.aankoop)
      },
      onSubmit(){
        console.log(this.aankoop);
        let isValidated = true;

        if(this.$refs.facAdresField.isEmpty()){
            this.$refs.facAdresField.setError(true); 
            isValidated = false;
        }
        if(this.$refs.levAdresField.isEmpty()) {
            this.$refs.levAdresField.setError(true); 
            isValidated = false;
        }
        if(this.aankoop.tempArtikels.length === 0) {
            this.hasError = true; 
            isValidated = false;
        }

        if(isValidated){
          this.aankoop.datum = this.aankoop.update_datum
          this.aankoop.vervaldag = this.aankoop.update_vervaldag
          this.aankoop.leverdatum = this.aankoop.update_leverdatum
          this.aankoop.klant_id = this.$refs.klantField.getId()
          this.aankoop.leverancier_id = this.$refs.leverancierField.getId()
          this.aankoop.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
          this.aankoop.leveradres = JSON.stringify(this.$refs.levAdresField.getAdres())
          this.aankoop.artikels = JSON.stringify(this.aankoop.tempArtikels) 
          AankopenController.update(this, this.aankoop, this.socket)
          console.log(this.aankoop);
        }
      },
      cancelEdit(){
        this.isReadVisible = true
        this.aankoop = UtilsFactory.copyObject(this.copyAankoop)
      },
      deleteItem(){
        AankopenController.deleteById(this, this.aankoop, this.socket)
      },
      changeKlant(item){
        this.clearAdressen()
        if(item){
            KlantenController.getKlant(this, item.id, (res) => { 
                this.selectedKlant = res.data[0]
                this.$refs.facAdresField.setAdressen(JSON.parse(this.selectedKlant.facturatie_adressen));
                this.$refs.levAdresField.setAdressen(JSON.parse(this.selectedKlant.leverings_adressen));
            })
        }
      },
      addArtikelToList(item){
        this.hasError = false
        const index = UtilsFactory.searchIndexById(this.aankoop.tempArtikels, item)
        if(index == -1) {
          this.aankoop.tempArtikels.push(item); 
          this.tableKey++
        }
        else {
          this.aankoop.tempArtikels[index].id = item.id
          this.aankoop.tempArtikels[index].artikelcode = item.artikelcode
          this.aankoop.tempArtikels[index].naam = item.naam
          this.aankoop.tempArtikels[index].memo = item.memo
          this.aankoop.tempArtikels[index].prijs = item.prijs
          this.aankoop.tempArtikels[index].hoeveelheid = item.hoeveelheid
          this.aankoop.tempArtikels[index].korting_een = item.korting_een
          this.aankoop.tempArtikels[index].korting_twee = item.korting_twee
          this.aankoop.tempArtikels[index].totaal = item.totaal
          this.tableKey++
        } 
        this.setSubtotaal()
        this.setTotaal()
        this.closeArtikelBox()
      },
      deleteArtikelFromList(item){
        ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit artikel wilt verwijderen?", null, (isConfirmed) => {
            if (isConfirmed) {
                UtilsFactory.deleteItemFromList(this.aankoop.tempArtikels, item.id)
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
        this.aankoop.factuuradres = null
        this.aankoop.leveradres = null
        this.$refs.facAdresField.clear();
        this.$refs.levAdresField.clear();
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