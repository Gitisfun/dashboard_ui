<template>
  <div class="content-body">
    <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <UpdateHeader title="Leverancier bewerken" @save="handleSubmit(onSubmit)" @deleteItem="deleteItem" />
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
          <AddressSection title="Adressen" ref="levupdateaddressbox" style="margin-top: 35px" />
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateHeader from "../../components/general/UpdateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import TextInput from "../../components/inputfields/TextInput.vue";
import SelectInput from "../../components/inputfields/SelectInput.vue";
import LeveranciersController from "../../api/calls/leveranciers";
import AddressSection from "../../components/common/AddressSection.vue";
import ModalFactory from "../../logic/factories/modalFactory";
import ConfirmationModal from "../../modals/ConfirmationModal.vue"
import socketMixin from "../../mixins/socketMixin"

export default {
  name: "LeverancierUpdateview",
  mixins: [socketMixin],
  components: {
    UpdateHeader,
    ValidationObserver,
    ValidatedTextInput,
    TextInput,
    SelectInput,
    AddressSection,
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
  }),
  mounted() {
    this.id = this.$route.params.id;
    LeveranciersController.getPreDataAndLeverancier(this, this.id, (res) => {
      this.btws = res[0].data;
      this.betalingstermijnen = res[1].data;
      this.leverancier = res[2].data[0];
      if(this.leverancier.adressen != null && JSON.parse(this.leverancier.adressen.length) !== 0){
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
