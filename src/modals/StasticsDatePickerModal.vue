<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Kies een periode" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
        <ValidatedTextInput type="date" v-model="date.start_date" name="Startdatum" rules="required" />
        <ValidatedTextInput type="date" v-model="date.end_date" name="Einddatum" rules="required" />
        <br />
        <span v-show="errorMessageDate" class="error-message-address">De startdatum moet voor de einddatum zijn.</span>
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
import DateHelper from '../logic/utils/dateHelper';


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
    errorMessageDate: false
  }),
  methods: {
    onSubmit() {
      if(DateHelper.isBefore(this.date.start_date, this.date.end_date)){
        this.errorMessageDate = false
        this.$emit("confirmation", this.date);
        this.$parent.close();
      }
      else{
        this.errorMessageDate = true
      }
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>

<style scoped>
.error-message-address {
  color: red;
  font-size: 12px;
}
</style>