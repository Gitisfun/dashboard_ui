<template>
  <div class="content-body">
    <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <CreateHeader title="Nieuwe klant" @save="handleSubmit(onSubmit)" />
          <div class="columns">
            <div class="column">
              <ValidatedTextInput v-model="klant.klant_nr" name="Klantnummer" rules="required" />
              <ValidatedTextInput v-model="klant.naam" name="Naam" rules="required" />
              <TextInput v-model="klant.extra_naam" name="Extra naam" />
              <TextInput v-model="klant.type" name="Type" />
              <ValidatedTextInput v-model="klant.btw_nr" name="Btw nummer" rules="required" />
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
              <TextInput v-model="klant.email" name="Email" />
              <TextInput v-model="klant.taal" name="Taal" />
              <SelectInput v-model="klant.betalingstermijn_id" name="Betalingstermijn">
                <option v-for="option in betalingstermijnen" :value="option.id" :key="option.id">
                  {{ option.naam }}
                </option>
              </SelectInput>
            </div>
          </div>
          <br />
          <AddressSection title="Facturatie adressen" ref="facaddressbox" style="margin-top: 35px" />
          <br />
          <AddressSection title="Leveringsadressen" ref="levaddressbox" style="margin-top: 35px" />
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
import KlantenController from "../../api/calls/klanten";
import AddressSection from "../../components/common/AddressSection.vue";
import socketMixin from "../../mixins/socketMixin"

export default {
  name: "KlantenCreateview",
  mixins: [socketMixin],
  components: {
    CreateHeader,
    ValidationObserver,
    ValidatedTextInput,
    TextInput,
    SelectInput,
    AddressSection,
  },
  data: () => ({
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
      leverings_adressen: []
    },
    btws: [],
    betalingstermijnen: [],
    isLoaded: false,
  }),
  mounted() {
    KlantenController.getPreData(this, (res) => { this.btws = res[0].data; this.betalingstermijnen = res[1].data; this.isLoaded = true; });
  },
  methods: {
    onSubmit() {
      if (this.$refs.facaddressbox.getAdressenList() != null && this.$refs.levaddressbox.getAdressenList() != null) {
        this.klant.leverings_adressen = this.$refs.levaddressbox.getAdressenList();
        this.klant.facturatie_adressen = this.$refs.facaddressbox.getAdressenList();
        KlantenController.create(this, this.klant, this.socket);
      }
    },
  },
};
</script>
