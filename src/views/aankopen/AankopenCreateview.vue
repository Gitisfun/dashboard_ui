<template>
  <div class="content-body">
    <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
            <ValidationObserver v-slot="{ handleSubmit }">
                <CreateHeader title="Nieuwe bestelling" @save="handleSubmit(onSubmit)" />
                <div class="columns">
                    <div class="column">
                        <ValidatedTextInput type="date" v-model="aankoop.datum" name="Datum" rules="required" />
                        <ValidatedSearch ref="validatedSearchKlantField" @choose="changeKlant" :value="aankoop.klant_naam" name="Klant" />
                        <ValidatedTextInput v-model="aankoop.leverings_nr" name="Referentie nr." rules="required" />
                        <ValidatedTextInput type="date" v-model="aankoop.vervaldag" name="Vervaldag" rules="required" />
                        <ValidatedTextInput type="date" v-model="aankoop.leverdatum" name="Leveringsdatum" rules="required" />
                    </div>
                    <div class="column">
                        <ValidatedTextInput v-model="aankoop.valuta" name="Valuta" rules="required" />
                        <ValidatedSearch ref="validatedSearchLeverancierField" @choose="changeLeverancier" :value="aankoop.leverancier_naam" name="Leverancier" />
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
                        <AdresSearch ref="validatedSearchAdresFacturatie" text="Facturatie adres" />
                    </div>
                    <div class="column">
                        <AdresSearch ref="validatedSearchAdresLeverings" text="Leveringsadres" />
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
            <b-table striped :key="tableKey" @dblclick="updateArtikel" :data="aankoop.artikels" :columns="columns">
                <!--
                <b-table-column width="12%" field="artikel_nr" label="Artikelcode" v-slot="props" sortable>
                    {{ props.row.artikelcode }}
                </b-table-column>
                <b-table-column width="12%" field="naam" label="Naam" v-slot="props" sortable>
                    {{ props.row.naam }}
                </b-table-column>
                <b-table-column width="15%" field="memo" label="Memo" v-slot="props" sortable>
                    {{ props.row.memo }}
                </b-table-column>
                <b-table-column width="10%" field="prijs" label="Prijs" v-slot="props" sortable>
                    {{ props.row.prijs }}
                </b-table-column>
                <b-table-column width="8%" field="hoeveelheid" label="Aantal" v-slot="props" sortable>
                    {{ props.row.hoeveelheid }}
                </b-table-column>
                <b-table-column width="12%" field="korting_een" label="Korting I" v-slot="props" sortable>
                    {{ props.row.korting_een }}
                </b-table-column>
                <b-table-column width="12%" field="korting_twee" label="Korting I" v-slot="props" sortable>
                    {{ props.row.korting_twee }}
                </b-table-column>
                <b-table-column width="12%" field="totaal" label="Totaal" v-slot="props" sortable>
                    {{ props.row.totaal }}
                </b-table-column>
                -->
                <template #empty>
                    <div class="custom-table-empty">Nog geen artikels toegevoegd...</div>
                </template>
            </b-table>
        </div>
        <div>
            <TotalBox :subtotaal="subtotaal" :btw="btw" :totaal="totaal" />
        </div>
    </div>
    <div>
        <OpmerkingBox />
    </div>
  </div>
</template>

<script>
// TODO: Opmerking toevoegen

import CreateHeader from "../../components/general/CreateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
//import ArtikelsController from "../../api/calls/artikels"
import KlantenController from "../../api/calls/klanten"
import socketMixin from "../../mixins/socketMixin"
import ValidatedSearch from '../../components/inputfields/ValidatedSearch.vue';
import KlantModal from "../../modals/KlantModal.vue"
import LeverancierModal from '../../modals/LeverancierModal.vue';
import MultilineTextInput from "../../components/inputfields/MultilineTextInput.vue"
import AdresSearch from "../../components/inputfields/AdresSearch.vue"
import SmallHeaderAdder from "../../components/general/SmallHeaderAdder.vue"
//import SmallTitle from "../../components/textfields/SmallTitle.vue"
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
        ValidatedSearch,
        AdresSearch,
        MultilineTextInput,
        SmallHeaderAdder,
        //SmallTitle,
        AddArtikelBox,
        OpmerkingBox,
        TotalBox
    },
    computed: {
        subtotaal(){
            if(this.aankoop.artikels.length != 0){
                return UtilsFactory.sum(this.aankoop.artikels, "totaal");   
            }
            return 0
        },
        btw() {
            const value = UtilsFactory.searchValueById(this.btws, this.aankoop.btw_id)
            console.log(value);
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
            factuur_nr: null,
            datum: null,
            klant_id: null,
            klant_naam: null,
            leverings_nr: null,
            bestel_nr: null,
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
            artikels: []
        },
        tableKey: 0,
        btws: [],
        selectedKlant: null,
        isArtikelBoxShown: false,
        columns: [
            {
                field: 'artikelcode',
                label: 'Artikel nr',
            },
            {
                field: 'naam',
                label: 'Artikel',
            },
            {
                field: 'memo',
                label: 'Memo',
            },
            {
                field: 'prijs',
                label: 'Prijs',
            },
            {
                field: 'hoeveelheid',
                label: 'Aantal',
            },
            {
                field: 'korting_een',
                label: 'Korting 1',
            },
            {
                field: 'korting_twee',
                label: 'Korting 2',
            },
            {
                field: 'totaal',
                label: 'Totaal',
            }
        ]    
    }),
    mounted(){
        AankopenController.getPreData(this, (res) => {
            this.btws = res[0].data
        })
        this.$refs.validatedSearchKlantField.setModal(KlantModal);
        this.$refs.validatedSearchLeverancierField.setModal(LeverancierModal);
    },
    methods: {
        changeKlant(item){
            this.aankoop.klant_id = item.id
            this.aankoop.klant_naam = item.naam
            this.$refs.validatedSearchKlantField.setValue(item.naam);
            KlantenController.getKlant(this, item.id, (res) => { 
                this.selectedKlant = res.data[0]
                this.$refs.validatedSearchAdresFacturatie.setAdressen(JSON.parse(this.selectedKlant.facturatie_adressen));
                this.$refs.validatedSearchAdresLeverings.setAdressen(JSON.parse(this.selectedKlant.leverings_adressen));
             })
        },
        changeLeverancier(item){
            this.aankoop.leverancier_id = item.id
            this.aankoop.leverancier_naam = item.naam
            this.$refs.validatedSearchLeverancierField.setValue(item.naam);
        },
        addArtikelToList(item){
            const index = UtilsFactory.searchIndexById(this.aankoop.artikels, item)
            if(index == -1) this.aankoop.artikels.push(item)
            else {
                console.log("Found");
                
                //this.aankoop.artikels[index] = item
                console.log(this.aankoop.artikels[index]);
                this.aankoop.artikels[index].id = item.id
                this.aankoop.artikels[index].artikelcode = item.artikelcode
                this.aankoop.artikels[index].naam = item.naam
                this.aankoop.artikels[index].memo = item.memo
                this.aankoop.artikels[index].prijs = item.prijs
                this.aankoop.artikels[index].hoeveelheid = item.hoeveelheid
                this.aankoop.artikels[index].korting_een = item.korting_een
                this.aankoop.artikels[index].korting_twee = item.korting_twee
                this.aankoop.artikels[index].totaal = item.totaal
                
               //this.aankoop.artikels[index] = item
               this.tableKey++
               //this.$forceUpdate();

            } 
            this.closeArtikelBox()
        },
        deleteArtikelFromList(item){
            ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit artikel wilt verwijderen?", null, (isConfirmed) => {
                if (isConfirmed) {
                    //UtilsFactory.deleteItemFromList(this.list, adres.id);
                    UtilsFactory.deleteItemFromList(this.aankoop.artikels, item.id)
                    this.closeArtikelBox()
                    this.$refs.addArtikelBox.clear()

                }
            });
        },
        onSubmit(){},
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