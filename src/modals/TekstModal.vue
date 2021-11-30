<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Tekst toevoegen" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
      <ValidatedTextInput v-model="tekst.tekst" name="Tekst" rules="required" />
      <ValidatedTextInput v-model="tekst.type" name="Type" rules="required" />
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
  name: "TekstModal",
  components: {
    Subtitle,
    ValidationObserver,
    ValidatedTextInput,
    SaveBottomBar,
  },
  data: () => ({
    tekst: {
      tekst: null,
      type: null,
    },
  }),
  methods: {
    onSubmit() {
      this.$emit("confirmation", this.tekst)
      this.$parent.close();
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>
