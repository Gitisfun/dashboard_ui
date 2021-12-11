<template>
  <div class="content-body">
    <div v-show="isReadVisible" class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ReadHeader title="Klant details" @edit="edit" />
        <br />
        <div class="columns">
          <div class="column">
            <InfoField text="Klantnummer:" />
            <InfoField text="Naam:" />
            <InfoField text="Extra naam:" />
            <InfoField text="Type:" />
            <InfoField text="Btw nummer:" />
            <InfoField text="Btw categorie:" />
          </div>
          <div class="column">
            <InfoFieldValue :text="klant.klant_nr" />
            <InfoFieldValue :text="klant.naam" />
            <InfoFieldValue :text="klant.extra_naam" />
            <InfoFieldValue :text="klant.type" />
            <InfoFieldValue :text="klant.btw_nr" />
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
            <InfoFieldValue :text="klant.handelregister_nr" />
            <InfoFieldValue :text="klant.onderneming_type" />
            <InfoFieldValue :text="klant.telefoon" />
            <InfoFieldValue :text="klant.email" />
            <InfoFieldValue :text="klant.taal" />
            <InfoFieldValue :text="betalingstermijn" />
          </div>
        </div>
        <AddressSectionRead title="Facturatie adressen" ref="facreadaddressbox" />
        <br />
        <br />
        <AddressSectionRead title="Leveringsadressen" ref="leverreadaddressbox" />
      </div>
    </div>
    <div v-show="!isReadVisible" class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <UpdateHeader title="Klant bewerken" @save="handleSubmit(onSubmit)" @cancel="cancelEdit" @deleteItem="deleteItem" />
          <div class="columns">
            <div class="column">
              <ValidatedTextInput v-model="klant.klant_nr" name="Klantnummer" rules="required" />
              <ValidatedTextInput v-model="klant.naam" name="Naam" rules="required" />
              <TextInput v-model="klant.extra_naam" name="Extra naam" />
              <TextInput v-model="klant.type" name="Type" />
              <TextInput v-model="klant.btw_nr" name="Btw nummer" />
              <SelectInput v-model="klant.btw_id" name="Btw categorie">
                <option v-for="option in btws" :value="option.id" :key="option.id">
                  {{ option.naam }}
                </option>
              </SelectInput>
            </div>
            <div class="column">
              <TextInput v-model="klant.handelregister_nr" name="Handelsregisternummer" />
              <TextInput v-model="klant.onderneming_type" name="Ondernemingstype" />
              <TextInput v-model="klant.telefoon" name="Telefoon" />
              <TextInput v-model="klant.email" name="E-mail" />
              <TextInput v-model="klant.taal" name="Taal" />
              <SelectInput v-model="klant.betalingstermijn_id" name="Betalingstermijn">
                <option v-for="option in betalingstermijnen" :value="option.id" :key="option.id">
                  {{ option.naam }}
                </option>
              </SelectInput>
            </div>
          </div>
          <AddressSection title="Facturatie adressen" ref="facupdateaddressbox" style="margin-top: 35px" />
          <AddressSection title="Leveringsadressen" ref="leverupdateaddressbox" style="margin-top: 35px" />
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
import KlantenController from "../../api/calls/klanten";
import AddressSection from "../../components/common/AddressSection.vue";
import AddressSectionRead from "../../components/common/AddressSectionRead.vue";
import ModalFactory from "../../logic/factories/modalFactory";
import ConfirmationModal from "../../modals/ConfirmationModal.vue";
import socketMixin from "../../mixins/socketMixin";
import InfoField from "../../components/textfields/InfoField.vue";
import InfoFieldValue from "../../components/textfields/InfoFieldValue.vue";
import UtilsFactory from "../../logic/utils/utilsFactory";

export default {
  name: "KlantenUpdateview",
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
    copyKlant: null,
    copyFacAdressen: [],
    facAdressen: [],
    copyLevAdressen: [],
    levAdressen: [],
    klant: {
      klant_nr: null,
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
      facturatie_adressen: [],
      leverings_adressen: [],
    },
    btws: [],
    betalingstermijnen: [],
    isLoaded: false,
    isReadVisible: true,
  }),
  computed: {
    btw() {
      return UtilsFactory.searchName(this.btws, this.klant.btw_id);
    },
    betalingstermijn() {
      return UtilsFactory.searchName(this.betalingstermijnen, this.klant.betalingstermijn_id);
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    KlantenController.getPreDataAndKlant(this, this.id, (res) => {
      this.btws = res[0].data;
      this.betalingstermijnen = res[1].data;
      this.klant = res[2].data[0];
      this.copyKlant = UtilsFactory.copyObject(this.klant);
      if (this.klant.facturatie_adressen != null && JSON.parse(this.klant.facturatie_adressen.length) !== 0) {
        this.facAdressen = JSON.parse(res[2].data[0].facturatie_adressen);
        this.copyFacAdressen = UtilsFactory.copyObject(this.facAdressen);
        this.$refs.facreadaddressbox.setAdressenList(this.facAdressen);
        this.$refs.facupdateaddressbox.setAdressenList(this.facAdressen);
      }
      if (this.klant.leverings_adressen != null && JSON.parse(this.klant.leverings_adressen.length) !== 0) {
        this.levAdressen = JSON.parse(res[2].data[0].leverings_adressen);
        this.copyLevAdressen = UtilsFactory.copyObject(this.levAdressen);
        this.$refs.leverreadaddressbox.setAdressenList(this.levAdressen);
        this.$refs.leverupdateaddressbox.setAdressenList(this.levAdressen);
      }
      this.isLoaded = true;
    });
  },
  methods: {
    onSubmit() {
      if (this.$refs.facupdateaddressbox.getAdressenList() != null 
        && this.$refs.facupdateaddressbox.getAdressenList().length !== 0 
        && this.$refs.leverupdateaddressbox.getAdressenList() != null
        && this.$refs.leverupdateaddressbox.getAdressenList().length !== 0 ) {
        this.klant.facturatie_adressen = this.$refs.facupdateaddressbox.getAdressenList();
        this.klant.leverings_adressen = this.$refs.leverupdateaddressbox.getAdressenList();
        KlantenController.update(this, this.klant, this.socket);
      }
    },
    edit() {
      this.isReadVisible = false;
    },
    cancelEdit() {
      this.isReadVisible = true;
      this.klant = UtilsFactory.copyObject(this.copyKlant);
      this.facAdressen = UtilsFactory.copyObject(this.copyFacAdressen);
      this.$refs.facreadaddressbox.setAdressenList(this.facAdressen);
      this.$refs.facupdateaddressbox.setAdressenList(this.facAdressen);
      this.levAdressen = UtilsFactory.copyObject(this.copyLevAdressen);
      this.$refs.leverreadaddressbox.setAdressenList(this.levAdressen);
      this.$refs.leverupdateaddressbox.setAdressenList(this.levAdressen);
    },
    deleteItem() {
      ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit adres wilt verwijderen?", null, (isConfirmed) => {
        if (isConfirmed) {
          KlantenController.deleteById(this, this.klant, this.socket);
        }
      });
    },
  },
};
</script>
