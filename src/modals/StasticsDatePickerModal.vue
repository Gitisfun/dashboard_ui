<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Kies een periode" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
        <ValidatedTextInput type="date" v-model="date.start_date" name="Startdatum" rules="required" />
        <ValidatedTextInput type="date" v-model="date.end_date" name="Einddatum" rules="required" />
        <br />
        <br />
        <SaveBottomBar @save="handleSubmit(onSubmit)" @cancel="close" />
    </ValidationObserver>
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../components/inputfields/ValidatedTextInput.vue"
import SaveBottomBar from "../components/general/SaveBottomBar.vue";


export default {
  name: "StatisticsDatePickerModal",
  components: {
    Subtitle,
    ValidationObserver,
    ValidatedTextInput,
    SaveBottomBar,
  },
  data: () => ({
    title: "",
    date: {
      start_date: null,
      end_date: null,
    },
  }),
  methods: {
    onSubmit() {
      this.$emit("confirmation", this.date);
      this.$parent.close();
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>
