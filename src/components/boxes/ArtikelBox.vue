<template>
  <div>
    <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <SmallHeaderAdder title="Artikels" @add="showAddArtikelBox" />
        <div>
            <AddArtikelBox ref="addArtikelBox" v-show="isArtikelBoxShown" @addArtikelToList="addArtikelToList" @closeArtikelBox="closeArtikelBox" @deleteArtikelFromList="deleteArtikelFromList" />
        </div>
        <b-table striped :key="tableKey" @dblclick="updateArtikel" :data="artikels">
            <b-table-column width="10%" field="artikel_nr" label="Artikelcode" v-slot="props" sortable>
                {{ props.row.artikelcode }}
            </b-table-column>
            <b-table-column width="17%" field="naam" label="Naam" v-slot="props" sortable>
                {{ props.row.naam }}
            </b-table-column>
            <b-table-column width="22%" field="memo" label="Memo" v-slot="props" sortable>
                {{ props.row.memo }}
            </b-table-column>
            <b-table-column width="10%" centered field="prijs" label="Prijs" v-slot="props" sortable>
                {{ props.row.prijs | currencyFormatter }}
            </b-table-column>
            <b-table-column width="8%" centered field="hoeveelheid" label="Aantal" v-slot="props" sortable>
                {{ props.row.hoeveelheid }}
            </b-table-column>
            <b-table-column width="10%" centered field="korting_een" label="Korting I" v-slot="props" sortable>
                {{ props.row.korting_een | kortingFormatter }}
            </b-table-column>
            <b-table-column width="10%" centered field="korting_twee" label="Korting II" v-slot="props" sortable>
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
</template>

<script>
import SmallHeaderAdder from "../general/SmallHeaderAdder.vue"
import AddArtikelBox from "./AddArtikelBox.vue"
import TotalBox from "../boxes/TotalBox.vue"
import UtilsFactory from '../../logic/utils/utilsFactory';
import ViewStates from '../../logic/constants/viewStates';
import ModalFactory from '../../logic/factories/modalFactory';
import ConfirmationModal from '../../modals/ConfirmationModal.vue';

export default {
    name: "ArtikelBox",
    components: {
        SmallHeaderAdder,
        AddArtikelBox,
        TotalBox
    },
    props: {
        btw: {
            type: [String],
        },
    },
    computed: {
        subtotaal(){
            if(this.artikels.length != 0) return UtilsFactory.sum(this.artikels, "totaal");   
            return 0 
        },
        totaal(){
            if(this.btw === "...") return 0
            if(this.subtotaal === 0) return 0
            return UtilsFactory.addPercentage(this.subtotaal, this.btw)
        }
    },
    data: () =>({
        isArtikelBoxShown: false,
        tableKey: 0,
        hasError: false,
        artikels: []
    }),
    methods: {
        addArtikelToList(item){
            this.hasError = false
            const index = UtilsFactory.searchIndexById(this.artikels, item)
            if(index == -1) this.artikels.push(item)
            else {
                this.artikels[index].id = item.id
                this.artikels[index].artikelcode = item.artikelcode
                this.artikels[index].naam = item.naam
                this.artikels[index].memo = item.memo
                this.artikels[index].prijs = item.prijs
                this.artikels[index].hoeveelheid = item.hoeveelheid
                this.artikels[index].korting_een = item.korting_een
                this.artikels[index].korting_twee = item.korting_twee
                this.artikels[index].totaal = item.totaal
                this.tableKey++

            }
            this.closeArtikelBox()
        },
        deleteArtikelFromList(item){
            ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit artikel wilt verwijderen?", null, (isConfirmed) => {
                if (isConfirmed) {
                    UtilsFactory.deleteItemFromList(this.artikels, item.id)
                    this.closeArtikelBox()
                    this.$refs.addArtikelBox.clear()
                }
            });
        },
        updateArtikel(row){
            this.$refs.addArtikelBox.setType(ViewStates.UPDATE);
            this.$refs.addArtikelBox.setArtikel(row);
            this.isArtikelBoxShown = true;
        },
        showAddArtikelBox(){
            this.$refs.addArtikelBox.setType(ViewStates.ADD);
            this.isArtikelBoxShown = true;
        },
        closeArtikelBox(){
            this.isArtikelBoxShown = false;
        },
        setArtikels(list){
            this.artikels = list
        },
        getArtikels(){
            return this.artikels
        },
        getSubtotaal(){
            return this.subtotaal
        },
        getTotaal(){
            return this.totaal
        },
        setError(value){
            this.hasError = value
        },
        isEmpty(){
            if(this.artikels.length === 0) return true
            return false
        },
        setId(list){
            this.$refs.addArtikelBox.setId(list)
        }
    }
}
</script>

<style>
.artikeltableerror{
    color: red;
    font-size: 12px;
}
</style>