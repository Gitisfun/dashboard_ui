<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Betalingstermijn toevoegen" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
      <ValidatedTextInput v-model="betalingstermijn.naam" name="Naam" rules="required" />
      <ValidatedTextInput v-model="betalingstermijn.termijn" name="Termijn" rules="required" />
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
import SaveBottomBar from "../components/general/SaveBottomBar.vue";

export default {
  name: "BtwModal",
  components: {
    Subtitle,
    ValidationObserver,
    ValidatedTextInput,
    SaveBottomBar,
  },
  data: () => ({
    betalingstermijn: {
      naam: null,
      termijn: null,
    },
  }),
  methods: {
    onSubmit() {
      this.$emit("confirmation", this.betalingstermijn)
      this.$parent.close();
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>
