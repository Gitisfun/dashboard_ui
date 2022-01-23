<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Nieuwe gebruiker" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
      <ValidatedTextInput v-model="gebruiker.voornaam" name="Voornaam" rules="required" />
      <ValidatedTextInput v-model="gebruiker.achternaam" name="Achternaam" rules="required" />
      <ValidatedSelectInput v-model="gebruiker.rol" name="Rol" rules="required">
          <option :value="1">Admin</option>
          <option :value="2">Werknemer</option>
      </ValidatedSelectInput>
      <div style="margin-bottom: 15px;"></div>
      <ValidatedTextInput v-model="gebruiker.gebruikersnaam" name="Gebruikersnaam" rules="required" />
      <span style="color: red; font-size: 12px" v-show="hasError">Gebruikersnaam is al gekozen, kies een andere naam</span>
      <ValidatedTextInput type="password" v-model="gebruiker.wachtwoord" name="Wachtwoord" rules="required" vid="password"/>
      <ValidatedTextInput type="password" v-model="gebruiker.wachtwoord_check" name="Bevestig wachtwoord" rules="required|confirmed:password" data-vv-as="password"/>
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
import ValidatedSelectInput from '../components/inputfields/ValidatedSelectInput.vue';
import SaveBottomBar from "../components/general/SaveBottomBar.vue";
import GebruikerController from '../api/calls/gebruikers';

export default {
  name: "GebruikersUpdateModal",
  components: {
    Subtitle,
    ValidationObserver,
    ValidatedTextInput,
    SaveBottomBar,
    ValidatedSelectInput,
  },
  data: () => ({
    gebruiker: {
      gebruikersnaam: null,
      voornaam: null,
      achernaam: null,
      rol: 2,
    },
    hasError: false
  }),
  methods: {
    onSubmit() {
      GebruikerController.check(this, this.gebruiker, (res) => {
        this.hasError = !res.data.status
        if(res.data.status){
          this.$emit("confirmation", this.gebruiker)
          this.$parent.close();
        }
      }, (err) => {
        console.log(err);
      })
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>

<style>

</style>