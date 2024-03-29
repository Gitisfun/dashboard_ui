<template>
  <div style="margin-bottom: 35px; background: #dff9fb" class="box">
    <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
            <SmallTitle text="Artikel toevoegen" style="margin-bottom: 25px" />
            <div class="columns">
                <div class="column">
                    <ValidatedSearch ref="validatedSearchArtikelField" @choose="chooseArtikel" :value="artikel.artikelcode" name="Artikel nr" />
                    <TextInput v-model="artikel.memo" name="Memo" />
                </div>
                <div class="column">
                    <ValidatedTextInput v-model="artikel.naam" name="Naam" rules="required" />
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <ValidatedTextInput v-model="artikel.prijs" name="Prijs" rules="required|positive" />
                    <ValidatedTextInput v-model="artikel.korting_een" name="Korting I" rules="percentage" />
                </div>
                <div class="column">
                    <ValidatedTextInput v-model="artikel.hoeveelheid" name="Hoeveelheid" rules="required|numeric" />
                    <ValidatedTextInput v-model="artikel.korting_twee" name="Korting II" rules="percentage" />
                </div>
            </div>
            <br>    
            <div class="box" style="border: 2px solid lightgrey; background: white; font-weight: 600; color: black; margin-bottom: 35px">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <p>Totaal</p>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <p>{{ calculateTotaal | currencyFormatter }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ButtonsBottomBar ref="buttonBottomBar" @save="handleSubmit(onSubmit)" @cancel="close" @deleteItem="deleteItem" />
        </ValidationObserver>
    </div>
  </div>
</template>

<script>
import SmallTitle from "../../components/textfields/SmallTitle.vue"
import { ValidationObserver } from "vee-validate";
import ValidatedSearch from "../../components/inputfields/ValidatedSearch.vue"
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue"
import TextInput from "../../components/inputfields/TextInput.vue"
import ArtikelsModal from "../../modals/ArtikelsModal.vue"
import ButtonsBottomBar from "../../components/general/ButtonsBottomBar.vue"
import UtilsFactory from '../../logic/utils/utilsFactory';
import ViewStates from "../../logic/constants/viewStates"

export default {
    name: "AddArtikelBox",
    components: {
        SmallTitle,
        ValidationObserver,
        ValidatedSearch,
        ValidatedTextInput,
        TextInput,
        ButtonsBottomBar
    },
    data(){
        return {
            id: 1,
            type: null,
            artikel: {
                id: null,
                artikelcode: null,
                naam: null,
                memo: null,
                prijs: null,
                hoeveelheid: null,
                korting_een: null,
                korting_twee: null,
                totaal: 0,
            }
        }
    },
    computed: {
        calculateTotaal() {
            if(!this.artikel.prijs || !this.artikel.hoeveelheid) return 0
            let totaal = this.artikel.prijs * this.artikel.hoeveelheid
            if(this.artikel.korting_een) totaal = UtilsFactory.substractPercentage(totaal, this.artikel.korting_een)
            if(this.artikel.korting_twee) totaal = UtilsFactory.substractPercentage(totaal, this.artikel.korting_twee)
            return UtilsFactory.roundNumber(totaal)
        }
    },
    mounted(){
        this.$refs.validatedSearchArtikelField.setModal(ArtikelsModal);
    },
    methods: {
        chooseArtikel(item){
            this.artikel.prijs = item.prijs
            this.artikel.naam = item.naam
            this.artikel.memo = item.memo
            this.artikel.artikelcode = item.artikelcode
            this.$refs.validatedSearchArtikelField.setValue(item.artikelcode);
        },
        onSubmit(){
            this.artikel.totaal = this.calculateTotaal
            if(this.type === ViewStates.ADD) {
                this.artikel.id = this.id
                this.id++
            }
            this.$emit("addArtikelToList", UtilsFactory.copyObject(this.artikel))
            this.clear()
        },
        setId(list){
            if(list.length != 0){
                this.id = UtilsFactory.max(list) + 1
            }
        },
        setArtikel(item){
           this.artikel = UtilsFactory.copyObject(item)
           this.$refs.validatedSearchArtikelField.setValue(item.artikelcode);
        },
        setType(value){
            if(value === ViewStates.ADD) this.$refs.buttonBottomBar.setIsUpdate(false)
            else this.$refs.buttonBottomBar.setIsUpdate(true)
            this.type = value
        },
        deleteItem(){
            this.$emit("deleteArtikelFromList", UtilsFactory.copyObject(this.artikel))
        },
        close(){
            this.clear()
            this.$emit("closeArtikelBox")
        },
        clear(){
            this.artikel.id = null
            this.artikelcode = null,
            this.artikel.naam = null
            this.artikel.memo = null
            this.artikel.prijs = null
            this.artikel.hoeveelheid = null
            this.artikel.korting_een = null
            this.artikel.korting_twee = null
            this.artikel.totaal = 0
            this.$refs.validatedSearchArtikelField.setValue(null);
        },
    }

}
</script>

<style>

</style>