<template>
  <div>
    <div class="adressearch-box">
        <div class="adressearch-col-one">    
            <span class="adressearch-label">{{ text }}</span>
        </div>
        <div class="adressearch-col-two">
            <AddressBoxRead v-if="adres.straat" :address="adres" />
            <span style="margin-left: 20px" v-else>...</span>
        </div>
        <div @click="openModal" class="adressearch-col-three">
            <i class='bx bx-search-alt bx-border adressearch-icon'></i>
        </div>
    </div>
    <span v-if="hasError" class="searchinputfielderror">Dit veld is verplicht</span>    
  </div>
</template>

<script>
import AddressBoxRead from "../../components/common/AddressBoxRead.vue"
import AddressChooseModal from '../../modals/AddressChooseModal.vue'
import ModalFactory from "../../logic/factories/modalFactory";

export default {
    name: "AdresSearch",
    props: {
        text: {
            type: String
        }
    },
    components: {
      AddressBoxRead
    },
    data(){
        return {
            adressen: [],
            hasError: false,
            fulladres: {
                id: 1,
                straat: "Brusselsesteenweg",
                huisnummer: "179",
                bus: null,
                postcode: "1860",
                gemeente: "Grimbergen",
                land: "Belgie"
            },
            adres: {
                id: null,
                straat: null,
                huisnummer: null,
                bus: null,
                postcode: null,
                gemeente: null,
                land: null
            }
        }
    },
    methods: {
        setError(value){
            this.hasError = value
        },
        openModal(){
            if(this.adressen.length != 0){
                console.log("Open modal...");
                ModalFactory.showModalWithParamas(this, AddressChooseModal, "Adres kiezen", this.adressen, (newAdres) => {
                    this.adres.id = newAdres.id;
                    this.adres.straat = newAdres.straat;
                    this.adres.huisnummer = newAdres.huisnummer;
                    this.adres.bus = newAdres.bus;
                    this.adres.postcode = newAdres.postcode;
                    this.adres.gemeente = newAdres.gemeente;
                    this.adres.land = newAdres.land;
                });
            }
            else {
                // TODO: selecteer eerst een klant
                console.log("Selecteer eerst een klant...");
            }
        },
        setAdressen(item){
            this.adressen = item;
        }
    },
}
</script>

<style>
.adressearch-box{
    margin-top: 5px;
    margin-bottom: 10px;
    display: flex; /* or inline-flex */
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;

}
.adressearch-col-one{
    width: 35%;
}

.adressearch-col-two{
    width: 55%;
}

.adressearch-col-three{
    margin-left: 5px;
    width: 10%;
}
.adressearch-label {

  color: black;
  font-weight: 500;
  font-size: 14px;
  
}
.adressearch-icon {
  position: absolute;
  right: 0; 
}

.adressearch-icon:hover {
  background: #81ecec;
  animation: glow linear 2s infinite; 
  cursor: pointer;
}
@keyframes glow { 
    0% { background-color:#81ecec; }
    50% { background-color:#c7ecee; }
    100% { background-color:#81ecec; } 
}
</style>