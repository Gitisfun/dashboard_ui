<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
      <div class="level">
          <div class="level-left">
            <Subtitle text="Betalingstermijn aanpassen" />
          </div>
          <div class="level-right">
            <GenericBtn text="Verwijderen" btnStyle="danger" @clicked="deleteItem"  />
          </div>
      </div>
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
import GenericBtn from "../components/buttons/GenericBtn.vue";
import UtilsFactory from '../logic/utils/utilsFactory';

export default {
  name: "UpdateBetalingstermijnModal",
  components: {
    Subtitle,
    GenericBtn,
    ValidationObserver,
    ValidatedTextInput,
    SaveBottomBar,
  },
  data: () => ({
    betalingstermijn: null
  }),
  created(){
      this.betalingstermijn = UtilsFactory.copyObject(this.$attrs.obj);
  },
  methods: {
    onSubmit() {
      const obj = {
          operation: 1,
          data: this.betalingstermijn
      }
      this.$emit("confirmation", obj)
      this.$parent.close();
    },
    deleteItem(){
      const obj = {
          operation: 2,
          data: this.betalingstermijn
      }
      this.$emit("confirmation", obj)
      this.$parent.close();
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>
