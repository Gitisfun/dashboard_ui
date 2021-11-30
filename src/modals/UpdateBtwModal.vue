<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
      <div class="level">
          <div class="level-left">
            <Subtitle text="BTW aanpassen" />
          </div>
          <div class="level-right">
              <GenericBtn text="Verwijderen" btnStyle="danger" @clicked="deleteItem"  />
          </div>
      </div>
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
      <ValidatedTextInput v-model="btw.naam" name="Naam" rules="required" />
      <ValidatedTextInput v-model="btw.prijs" name="Prijs" rules="required" />
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
  name: "UpdateBtwModal",
  components: {
    Subtitle,
    GenericBtn,
    ValidationObserver,
    ValidatedTextInput,
    SaveBottomBar,
  },
  data: () => ({
    btw: null
  }),
  created(){
      this.btw = UtilsFactory.copyObject(this.$attrs.obj);
  },
  methods: {
    onSubmit() {
      const obj = {
          operation: 1,
          data: this.btw
      }
      this.$emit("confirmation", obj)
      this.$parent.close();
    },
    deleteItem(){
      const obj = {
          operation: 2,
          data: this.btw
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
