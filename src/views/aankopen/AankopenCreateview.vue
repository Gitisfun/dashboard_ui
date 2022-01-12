<template>
  <div class="content-body">
    <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
            <ValidationObserver v-slot="{ handleSubmit }">
                <CreateHeader title="Nieuwe bestelling" @save="handleSubmit(onSubmit)" />
                <div class="columns">
                    <div class="column">
                        <ValidatedTextInput v-model="aankoop.bestellings_nr" name="Bestelling nr." rules="required" />
                    </div>
                    <div class="column"></div>
                </div>
                <div class="columns">
                    <div class="column">
                        <ValidatedTextInput type="date" v-model="aankoop.datum" name="Datum" rules="required" />
                        <ValidatedSearchInput @changeto="changeKlant" ref="klantField" v-model="aankoop.klant_naam" name="Klant" rules="required" />
                        <ValidatedTextInput v-model="aankoop.ref_nr" name="Referentie nr." rules="required" />
                        <ValidatedTextInput type="date" v-model="aankoop.vervaldag" name="Vervaldag" rules="required" />
                        <ValidatedTextInput type="date" v-model="aankoop.leverdatum" name="Leveringsdatum" rules="required" />
                    </div>
                    <div class="column">
                        <ValidatedTextInput v-model="aankoop.valuta" name="Valuta" rules="required" />
                        <ValidatedSearchInput ref="leverancierField" v-model="aankoop.leverancier_naam" name="Leverancier" rules="required" />
                        <ValidatedTextInput v-model="aankoop.incoterm" name="Incoterm" rules="required" />
                        <ValidatedSelectInput v-model="aankoop.btw_id" name="Btw categorie" rules="required">
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
            <TotalBox :subtotaal="subtotaal" :btw="btw" :totaal="totaal" />
        </div>
    </div>
    <div>
        <OpmerkingBox v-model="aankoop.opmerking" />
    </div>
  </div>
</template>

<script>
import CreateHeader from "../../components/general/CreateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import ValidatedSearchInput from "../../components/inputfields/ValidatedSearchInput.vue"
import KlantenController from "../../api/calls/klanten"
import socketMixin from "../../mixins/socketMixin"
import KlantModal from "../../modals/KlantModal.vue"
import LeverancierModal from '../../modals/LeverancierModal.vue';
import MultilineTextInput from "../../components/inputfields/MultilineTextInput.vue"
import AdresSearch from "../../components/inputfields/AdresSearch.vue"
import SmallHeaderAdder from "../../components/general/SmallHeaderAdder.vue"
import AankopenController from "../../api/calls/aankopen"
import ValidatedSelectInput from "../../components/inputfields/ValidatedSelectInput.vue"
import AddArtikelBox from '../../components/boxes/AddArtikelBox.vue';
import UtilsFactory from '../../logic/utils/utilsFactory';
import ViewStates from '../../logic/constants/viewStates';
import ModalFactory from '../../logic/factories/modalFactory';
import ConfirmationModal from '../../modals/ConfirmationModal.vue';
import OpmerkingBox from "../../components/boxes/OpmerkingBox.vue";
import TotalBox from "../../components/boxes/TotalBox.vue"

export default {
    name: "AankopenCreateview",
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
            if(this.aankoop.tempArtikels.length != 0){
                return UtilsFactory.sum(this.aankoop.tempArtikels, "totaal");   
            }
            return 0
        },
        btw() {
            const value = UtilsFactory.searchValueById(this.btws, this.aankoop.btw_id)
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
        aankoop: {
            bestellings_nr: null,
            datum: null,
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
            leveradres: null,
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
        tableKey: 0,
        btws: [],
        selectedKlant: null,
        isArtikelBoxShown: false,
        hasError: false
    }),
    mounted(){
        AankopenController.getPreData(this, (res) => {
            this.btws = res[0].data
            this.aankoop.bestellings_nr = `BS${res[1].data[0].aankopen}`
        })
        this.$refs.klantField.setModal(KlantModal);
        this.$refs.leverancierField.setModal(LeverancierModal);
    },
    methods: {
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
            if(index == -1) this.aankoop.tempArtikels.push(item)
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
            this.closeArtikelBox()
        },
        deleteArtikelFromList(item){
            ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit artikel wilt verwijderen?", null, (isConfirmed) => {
                if (isConfirmed) {
                    UtilsFactory.deleteItemFromList(this.aankoop.tempArtikels, item.id)
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
            if(this.$refs.levAdresField.isEmpty()) {
                this.$refs.levAdresField.setError(true); 
                isValidated = false;
            }
            if(this.aankoop.tempArtikels.length === 0) {
                this.hasError = true; 
                isValidated = false;
            }

            if(isValidated){
                this.aankoop.klant_id = this.$refs.klantField.getItem().id
                this.aankoop.leverancier_id = this.$refs.leverancierField.getItem().id
                this.aankoop.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
                this.aankoop.leveradres = JSON.stringify(this.$refs.levAdresField.getAdres())
                this.aankoop.artikels = this.aankoop.tempArtikels
                this.aankoop.subtotaal = this.subtotaal;
                this.aankoop.totaal = this.totaal;
                AankopenController.create(this, this.aankoop, this.socket)
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