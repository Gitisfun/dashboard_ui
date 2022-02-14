<template>
  <div class="content-body">
    <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
            <ValidationObserver v-slot="{ handleSubmit }">
                <CreateHeader title="Nieuwe bestelling" @save="handleSubmit(onSubmit)" />
                <div v-show="showError" class="box" style="background: red; color: white">Vul alle velden correct in</div>
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
        <div>
            <ArtikelBox ref="artikelbox" :btw="btw" />
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
import AankopenController from "../../api/calls/aankopen"
import ValidatedSelectInput from "../../components/inputfields/ValidatedSelectInput.vue"
import UtilsFactory from '../../logic/utils/utilsFactory';
import OpmerkingBox from "../../components/boxes/OpmerkingBox.vue";
import ArtikelBox from '../../components/boxes/ArtikelBox.vue';
import DateHelper from '../../logic/utils/dateHelper';

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
        OpmerkingBox,
        ArtikelBox,
    },
    computed: {
        btw() {
            const value = UtilsFactory.searchValueById(this.btws, this.aankoop.btw_id)
            if(value) return value
            return "..."
        },
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
        btws: [],
        selectedKlant: null,
        showError: false,
    }),
    mounted(){
        AankopenController.getPreData(this, (res) => {
            this.btws = res[0].data
            this.aankoop.bestellings_nr = `${DateHelper.getCurrentYear()}-${res[1].data[0].aankopen}`
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
        onSubmit(){
            let isValidated = true;

            if(this.$refs.facAdresField.isEmpty()){
                this.$refs.facAdresField.setError(true); 
                isValidated = false;
                this.showError = true
            }
            if(this.$refs.levAdresField.isEmpty()) {
                this.$refs.levAdresField.setError(true); 
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
                this.aankoop.klant_id = this.$refs.klantField.getItem().id
                this.aankoop.leverancier_id = this.$refs.leverancierField.getItem().id
                this.aankoop.factuuradres = JSON.stringify(this.$refs.facAdresField.getAdres())
                this.aankoop.leveradres = JSON.stringify(this.$refs.levAdresField.getAdres())
                this.aankoop.artikels = this.$refs.artikelbox.getArtikels()
                this.aankoop.subtotaal = this.$refs.artikelbox.getSubtotaal();
                this.aankoop.totaal = this.$refs.artikelbox.getTotaal();
                AankopenController.create(this, this.aankoop, this.socket)
            }
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
</style>