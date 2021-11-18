<template>
  <div class="content-body">
    <div v-show="isReadVisible" class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ReadHeader title="Leverancier details" @edit="edit" />
        <br />
        <div class="columns">
          <div class="column">
            <InfoField text="Leveranciersnummer:" />
            <InfoField text="Naam:" />
            <InfoField text="Extra naam:" />
            <InfoField text="Type:" />
            <InfoField text="Btw nummer:" />
            <InfoField text="Btw categorie:" />
          </div>
          <div class="column">
            <InfoFieldValue :text="leverancier.leveranciers_nr" />
            <InfoFieldValue :text="leverancier.naam" />
            <InfoFieldValue :text="leverancier.extra_naam" />
            <InfoFieldValue :text="leverancier.type" />
            <InfoFieldValue :text="leverancier.btw_nr" />
            <InfoFieldValue :text="btw" />
          </div>
          <div class="column">
            <InfoField text="Handelsregisternummer:" />
            <InfoField text="Ondernemingstype:" />
            <InfoField text="Telefoon:" />
            <InfoField text="E-mail:" />
            <InfoField text="Taal:" />
            <InfoField text="Betalingstermijn:" />
          </div>
          <div class="column">
            <InfoFieldValue :text="leverancier.handelregister_nr" />
            <InfoFieldValue :text="leverancier.onderneming_type" />
            <InfoFieldValue :text="leverancier.telefoon" />
            <InfoFieldValue :text="leverancier.email" />
            <InfoFieldValue :text="leverancier.taal" />
            <InfoFieldValue :text="betalingstermijn" />
          </div>
        </div>
        <AddressSectionRead ref="levreadaddressbox" />
      </div>
    </div>
    <div v-show="!isReadVisible" class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <UpdateHeader title="Leverancier bewerken" @save="handleSubmit(onSubmit)" @cancel="cancelEdit" @deleteItem="deleteItem" />
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
              <TextInput v-model="leverancier.email" name="E-mail" />
              <TextInput v-model="leverancier.taal" name="Taal" />
              <SelectInput v-model="leverancier.betalingstermijn_id" name="Betalingstermijn">
                <option v-for="option in betalingstermijnen" :value="option.id" :key="option.id">
                  {{ option.naam }}
                </option>
              </SelectInput>
            </div>
          </div>
          <AddressSection title="Adressen" ref="levupdateaddressbox" style="margin-top: 35px" />
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import ReadHeader from "../../components/general/ReadHeader.vue";
import UpdateHeader from "../../components/general/UpdateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import TextInput from "../../components/inputfields/TextInput.vue";
import SelectInput from "../../components/inputfields/SelectInput.vue";
import LeveranciersController from "../../api/calls/leveranciers";
import AddressSection from "../../components/common/AddressSection.vue";
import AddressSectionRead from "../../components/common/AddressSectionRead.vue";
import ModalFactory from "../../logic/factories/modalFactory";
import ConfirmationModal from "../../modals/ConfirmationModal.vue";
import socketMixin from "../../mixins/socketMixin";
import InfoField from "../../components/textfields/InfoField.vue";
import InfoFieldValue from "../../components/textfields/InfoFieldValue.vue";

export default {
  name: "LeverancierUpdateview",
  mixins: [socketMixin],
  components: {
    ReadHeader,
    UpdateHeader,
    ValidationObserver,
    ValidatedTextInput,
    TextInput,
    SelectInput,
    AddressSection,
    InfoField,
    InfoFieldValue,
    AddressSectionRead,
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
    btws: [],
    betalingstermijnen: [],
    isLoaded: false,
    isReadVisible: true,
  }),
  computed: {
    btw: function() {
      if (this.btws.length == 0) {
        return "";
      }
      for (let i = 0; i < this.btws.length; i++) {
        if (this.btws[i].id == this.leverancier.btw_id) {
          return this.btws[i].naam;
        }
      }
      return "";
    },
    betalingstermijn: function() {
      if (this.betalingstermijnen.length == 0) {
        return "";
      }
      for (let i = 0; i < this.betalingstermijnen.length; i++) {
        if (this.betalingstermijnen[i].id == this.leverancier.betalingstermijn_id) {
          return this.betalingstermijnen[i].naam;
        }
      }
      return "";
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    LeveranciersController.getPreDataAndLeverancier(this, this.id, (res) => {
      this.btws = res[0].data;
      this.betalingstermijnen = res[1].data;
      this.leverancier = res[2].data[0];
      if (this.leverancier.adressen != null && JSON.parse(this.leverancier.adressen.length) !== 0) {
        this.$refs.levreadaddressbox.setAdressenList(JSON.parse(res[2].data[0].adressen));
        this.$refs.levupdateaddressbox.setAdressenList(JSON.parse(res[2].data[0].adressen));
      }
      this.isLoaded = true;
    });
  },
  methods: {
    onSubmit() {
      if (this.$refs.levupdateaddressbox.getAdressenList() != null && this.$refs.levupdateaddressbox.getAdressenList().length !== 0) {
        this.leverancier.adressen = this.$refs.levupdateaddressbox.getAdressenList();
        LeveranciersController.update(this, this.leverancier, this.socket);
      }
    },
    edit() {
      this.isReadVisible = false;
    },
    cancelEdit() {
      this.isReadVisible = true;
    },
    deleteItem() {
      ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit adres wilt verwijderen?", null, (isConfirmed) => {
        if (isConfirmed) {
          LeveranciersController.deleteById(this, this.leverancier, this.socket);
        }
      });
    },
  },
};
</script>
