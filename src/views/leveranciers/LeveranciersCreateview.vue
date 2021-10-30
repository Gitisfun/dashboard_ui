<template>
  <div class="content-body">
    <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <CreateHeader title="Nieuwe leverancier" @save="handleSubmit(onSubmit)" />
          <div class="columns">
            <div class="column">
              <ValidatedTextInput v-model="leverancier.leveranciers_nr" name="Leveranciersnummer" rules="required" />
              <ValidatedTextInput v-model="leverancier.naam" name="Naam" rules="required" />
              <TextInput v-model="leverancier.extra_naam" name="Extra naam" />
              <TextInput v-model="leverancier.type" name="Type" />
              <TextInput v-model="leverancier.btw_nr" name="Btw nummer" />
              <SelectInput v-model="leverancier.btw_id" name="Btw categorie">
                <option v-for="option in btws" :value="option.id" :key="option.id">
                  {{ option.naam }}
                </option>
              </SelectInput>
            </div>
            <div class="column">
              <TextInput v-model="leverancier.handelregister_nr" name="Handelsregisternummer" />
              <TextInput v-model="leverancier.onderneming_type" name="Ondernemingstype" />
              <TextInput v-model="leverancier.telefoon" name="Telefoon" />
              <TextInput v-model="leverancier.email" name="Email" />
              <TextInput v-model="leverancier.taal" name="Taal" />
              <SelectInput v-model="leverancier.betalingstermijn_id" name="Betalingstermijn">
                <option v-for="option in betalingstermijnen" :value="option.id" :key="option.id">
                  {{ option.naam }}
                </option>
              </SelectInput>
            </div>
          </div>
          <div style="margin-top: 35px;">
            <SmallHeaderAdder title="Adressen" @add="addAddress" />
            <div v-if="leverancier.adressen.length !== 0">
              <AddressBox :address="adres" v-for="adres in leverancier.adressen" :key="adres.id" @editItem="editItem" @deleteItem="deleteItem" />
            </div>
            <NoAddress v-else />
            <span v-show="errorMessageAddress" style="color: red; font-size: 12px">Het toevoegen van een adres is verplicht!</span>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import CreateHeader from "../../components/general/CreateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import TextInput from "../../components/inputfields/TextInput.vue";
import SelectInput from "../../components/inputfields/SelectInput.vue";
import SmallHeaderAdder from "../../components/general/SmallHeaderAdder.vue";
import AddressBox from "../../components/common/AddressBox.vue";
import NoAddress from "../../components/common/NoAddress.vue";
import AddressModal from "../../modals/AddressModal.vue";
import ModalFactory from "../../logic/factories/modalFactory";
import UtilsFactory from "../../logic/utils/utilsFactory";
import AddresUpdateModal from "../../modals/AddresUpdateModal.vue";
import ConfirmationModal from "../../modals/ConfirmationModal.vue";
import LeveranciersController from "../../api/calls/leveranciers"

export default {
  name: "LeveranciersCreateview",
  components: {
    CreateHeader,
    ValidationObserver,
    ValidatedTextInput,
    TextInput,
    SelectInput,
    SmallHeaderAdder,
    AddressBox,
    NoAddress,
  },
  data: () => ({
    leverancier: {
      leveranciers_nr: null,
      naam: null,
      extra_naam: null,
      type: null,
      btw_nr: null,
      btw_id: null,
      handelregister_nr: null,
      onderneming_type: null,
      telefoon: null,
      email: null,
      taal: null,
      betalingstermijn_id: null,
      adressen: [],
    },
    errorMessageAddress: false,
    btws: [],
    betalingstermijnen: [],
    counter: 0,
    isLoaded: false
  }),
  mounted(){
    LeveranciersController.getPreData(this, (res) => { this.btws = res[0].data; this.betalingstermijnen = res[1].data, this.isLoaded = true; })
  },
  methods: {
    onSubmit() {
      if (this.leverancier.adressen.length !== 0) {
        this.errorMessageAddress = false;
        console.log(this.leverancier);
        LeveranciersController.create(this, this.leverancier)
      } else {
        console.log("Address is empty");
        this.errorMessageAddress = true;
      }
    },
    addAddress() {
      this.errorMessageAddress = false;
      ModalFactory.showModal(this, AddressModal, (adres) => { 
        adres.id = this.counter; 
        this.counter++; 
        this.leverancier.adressen.push(adres)
        });
      
    },
    editItem(adres) {
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
    deleteItem(adres) {
      console.log(adres.id);
      ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit adres wilt verwijderen?", null, (isConfirmed) => {
        if (isConfirmed) {
          UtilsFactory.deleteItemFromList(this.leverancier.adressen, adres.id);
        }
      });
    },
  },
};
</script>