<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Adres toevoegen" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
      <ValidatedTextInput v-model="adres.straat" name="Straat" rules="required" />
      <ValidatedTextInput v-model="adres.huisnummer" name="Huisnummer" rules="required" />
      <TextInput v-model="adres.bus" name="Bus" />
      <ValidatedTextInput v-model="adres.postcode" name="Postcode" rules="required" />
      <ValidatedTextInput v-model="adres.gemeente" name="Gemeente" rules="required" />
      <ValidatedTextInput v-model="adres.land" name="Land" rules="required" />
      <br />
      <br />
      <SaveBottomBar @save="handleSubmit(onSubmit)" @cancel="close" />
    </ValidationObserver>
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../components/inputfields/ValidatedTextInput.vue";
import TextInput from "../components/inputfields/TextInput.vue";
import SaveBottomBar from "../components/general/SaveBottomBar.vue";

export default {
  name: "AddressModal",
  components: {
    Subtitle,
    ValidationObserver,
    ValidatedTextInput,
    TextInput,
    SaveBottomBar,
  },
  data: () => ({
    adres: {
      straat: null,
      huisnummer: null,
      bus: null,
      postcode: null,
      gemeente: null,
      land: null,
    },
  }),
  methods: {
    onSubmit() {
      this.$emit("confirmation", this.adres)
      this.$parent.close();
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>
