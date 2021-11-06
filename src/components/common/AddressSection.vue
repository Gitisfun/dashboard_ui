<template>
    <div>
        <SmallHeaderAdder :title="title" @add="addItem" />
        <div v-if="list.length !== 0">
          <AddressBox :address="adres" v-for="adres in list" :key="adres.id" @editItem="editItem" @deleteItem="deleteItem" />
        </div>
        <NoAddress v-else />
        <span v-show="errorMessageAddress" class="error-message-address">Het toevoegen van een adres is verplicht!</span>
    </div>
</template>

<script>
import SmallHeaderAdder from "../../components/general/SmallHeaderAdder.vue";
import AddressBox from "../../components/common/AddressBox.vue";
import NoAddress from "../../components/common/NoAddress.vue";
import ModalFactory from "../../logic/factories/modalFactory";
import AddressModal from "../../modals/AddressModal.vue";
import AddresUpdateModal from "../../modals/AddresUpdateModal.vue";
import ConfirmationModal from "../../modals/ConfirmationModal.vue";
import UtilsFactory from "../../logic/utils/utilsFactory";

export default {
    name: "AddressSection",
    components: {
        SmallHeaderAdder,
        AddressBox,
        NoAddress
    },
    props: {
        adressen: {
            type: Array
        },
        title: {
            type: String,
        },
    },
    data(){
        return {
            errorMessageAddress: false,
            counter: 0,
            list:[]
        }
    },
    mounted(){
        this.list = this.adressen
    },
    methods: {
        addItem(){
            this.errorMessageAddress = false;
            ModalFactory.showModal(this, AddressModal, (adres) => { 
                adres.id = this.counter; 
                this.counter++; 
                this.list.push(adres)
            });
        },
        editItem(adres){
            ModalFactory.showModalWithParamas(this, AddresUpdateModal, "Adres aanpassen", adres, (newAdres) => {
                adres.id = newAdres.id;
                adres.straat = newAdres.straat;
                adres.huisnummer = newAdres.huisnummer;
                adres.bus = newAdres.bus;
                adres.postcode = newAdres.postcode;
                adres.gemeente = newAdres.gemeente;
                adres.land = newAdres.land;
            });
        },
        deleteItem(adres){
            ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit adres wilt verwijderen?", null, (isConfirmed) => {
                if (isConfirmed) {
                UtilsFactory.deleteItemFromList(this.list, adres.id);
                }
            });
        },
        getAddressenList(){
            if(this.list.length === 0){
                this.errorMessageAddress = true;
                return null
            }
            return this.list
        }
    }
}
</script>

<style scoped>
.error-message-address {
    color: red; 
    font-size: 12px
}
</style>