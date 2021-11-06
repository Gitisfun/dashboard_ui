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
          <AddressSection title="Addressen" :adressen="leverancier.adressen" ref="levaddressbox" style="margin-top: 35px" />
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
import LeveranciersController from "../../api/calls/leveranciers"
import AddressSection from "../../components/common/AddressSection.vue"

export default {
  name: "LeveranciersCreateview",
  components: {
    CreateHeader,
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
    isLoaded: false
  }),
  mounted(){
    LeveranciersController.getPreData(this, (res) => { this.btws = res[0].data; this.betalingstermijnen = res[1].data, this.isLoaded = true; })
  },
  methods: {
    onSubmit() {
      if (this.$refs.levaddressbox.getAddressenList() != null) {
        this.leverancier.adressen = this.$refs.levaddressbox.getAddressenList()
        LeveranciersController.create(this, this.leverancier)
      }
    },
  },
};
</script>