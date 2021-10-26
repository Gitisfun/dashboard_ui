<template>
  <div class="content-body">
    <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <CreateHeader title="Nieuwe leverancier" @save="handleSubmit(onSubmit)" />
          <div class="columns">
            <div class="column">
              <ValidatedTextInput v-model="leverancier.lev_nr" name="Leveranciersnummer" rules="required" />
              <ValidatedTextInput v-model="leverancier.naam" name="Naam" rules="required" />
              <TextInput v-model="leverancier.extra_naam" name="Extra naam" />
              <TextInput v-model="leverancier.type" name="Type" />
              <TextInput v-model="leverancier.btw_nr" name="Btw nummer" />
              <SelectInput v-model="leverancier.btw_cat" name="Btw categorie">
                <option v-for="option in btws" :value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </SelectInput>
            </div>
            <div class="column">
              <TextInput v-model="leverancier.handels_nr" name="Handelsregisternummer" />
              <TextInput v-model="leverancier.ondernemings_nr" name="Ondernemingstype" />
              <TextInput v-model="leverancier.telefoon" name="Telefoon" />
              <TextInput v-model="leverancier.email" name="Email" />
              <TextInput v-model="leverancier.taal" name="Taal" />
              <SelectInput v-model="leverancier.betalingstermijn" name="Betalingstermijn">
                <option v-for="option in betalingstermijnen" :value="option.id" :key="option.id">
                  {{ option.name }}
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
import { showModal, showModalWithParamas } from "../../logic/factories/modalFactory";
import utils from "../../logic/utils/utilsFactory.js";
import AddresUpdateModal from "../../modals/AddresUpdateModal.vue";
import ConfirmationModal from "../../modals/ConfirmationModal.vue";

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
      lev_nr: "",
      naam: "",
      extra_naam: "",
      type: "",
      btw_nr: "",
      btw_cat: "",
      handels_nr: "",
      ondernemings_nr: "",
      telefoon: "",
      email: "",
      taal: "",
      betalingstermijn: "",
      adressen: [],
      counter: 1,
    },
    errorMessageAddress: false,
    btws: [
      {
        id: 1,
        name: "9%",
      },
      {
        id: 2,
        name: "12%",
      },
      {
        id: 3,
        name: "21%",
      },
    ],
    betalingstermijnen: [
      {
        id: 1,
        name: "30 dagen",
      },
      {
        id: 2,
        name: "60 dagen",
      },
      {
        id: 3,
        name: "90 dagen",
      },
      {
        id: 4,
        name: "120 dagen",
      },
    ],
    counter: 1,
  }),
  methods: {
    onSubmit() {
      // TODO: add check for address not empty
      if (this.leverancier.adressen.length !== 0) {
        console.log(this.leverancier);
        this.errorMessageAddress = false;
      } else {
        this.errorMessageAddress = true;
        console.log("Address is empty");
      }
    },
    addAddress() {
      this.errorMessageAddress = false;
      // TODO: test code
      let temp = true;
      if (temp) {
        this.leverancier.adressen.push({
          id: this.counter,
          straat: "Brusselsesteenweg",
          huisnummer: "45",
          bus: "",
          postcode: "1860",
          gemeente: "Brussel",
          land: "Belgie",
        });
        this.counter++;
        console.log(this.leverancier.adressen);
      }
      // End of test code
      else {
        showModal(this, AddressModal, (adres) => this.leverancier.adressen.push(adres));
      }
    },
    editItem(adres) {
      console.log("Edit");
      console.log(adres);
      showModalWithParamas(this, AddresUpdateModal, "Adres aanpassen", adres, (newAdres) => {
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
      showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit adres wilt verwijderen?", null, (isConfirmed) => {
        if (isConfirmed) {
          utils.deleteItemFromList(this.leverancier.adressen, adres.id);
        }
      });
    },
  },
};
</script>