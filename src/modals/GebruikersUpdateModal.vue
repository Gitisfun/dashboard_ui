<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Gebruiker aanpassen" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
      <ValidatedTextInput v-model="gebruiker.voornaam" name="Voornaam" rules="required" />
      <ValidatedTextInput v-model="gebruiker.achternaam" name="Achternaam" rules="required" />
      <ValidatedSelectInput v-model="gebruiker.rol" name="Rol" rules="required">
          <option :value="1">Admin</option>
          <option :value="2">Werknemer</option>
      </ValidatedSelectInput>
      <br />
      <br />
      <SaveBottomBar @save="handleSubmit(onSubmit)" @cancel="close" />
    </ValidationObserver>
     <Subtitle text="Wachtwoord aanpassen" />
    <hr />
    <ValidationObserver v-slot="{ handleSubmit }">
      <!--
      <ValidatedTextInput v-model="gebruiker.gebruikersnaam" name="Gebruikersnaam" rules="required" />
      -->
      <InfoLine info="Gebruikersnaam" :value="gebruiker.gebruikersnaam" />
      <ValidatedTextInput type="password" v-model="gebruiker.wachtwoord" name="Wachtwoord" rules="required" vid="password"/>
      <ValidatedTextInput type="password" v-model="gebruiker.wachtwoord_check" name="Bevestig wachtwoord" rules="required|confirmed:password" data-vv-as="password"/>
      <br />
      <br />
      <SaveBottomBar @save="handleSubmit(onSubmitPassword)" @cancel="close" />
    </ValidationObserver>
    <hr>
    <div v-show="!canDelete">
      <b-field>
        <b-switch v-model="canDelete">Verwijder gebruiker</b-switch>
      </b-field>
    </div>
    <div v-show="canDelete">
      <div class="level">
        <div class="level-left">
          Ben je zeker dat je deze gebruiker wilt verwijderen?
        </div>
        <div class="level-right">
          <div class="level-item">
            <GenericBtn text="Verwijder gebruiker" btnStyle="danger" @clicked="deleteUser"  />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../components/inputfields/ValidatedTextInput.vue";
import ValidatedSelectInput from '../components/inputfields/ValidatedSelectInput.vue';
import SaveBottomBar from "../components/general/SaveBottomBar.vue";
import UtilsFactory from '../logic/utils/utilsFactory';
import GenericBtn from '../components/buttons/GenericBtn.vue';
import InfoLine from '../components/textfields/InfoLine.vue';

export default {
  name: "GebruikersUpdateModal",
  
  components: {
    Subtitle,
    ValidationObserver,
    ValidatedTextInput,
    SaveBottomBar,
    ValidatedSelectInput,
    GenericBtn,
    InfoLine,
  },
  data: () => ({
    gebruiker: {
      gebruikersnaam: null,
      voornaam: null,
      achernaam: null,
      rol: 2,
    },
    canDelete: false
  }),
  created(){
    this.gebruiker = UtilsFactory.copyObject(this.$attrs.obj);
  },
  methods: {
    onSubmit() {
      this.gebruiker.choice = 1
      this.$emit("confirmation", this.gebruiker)
      this.close();
    },
    onSubmitPassword(){
      this.gebruiker.choice = 2
      this.$emit("confirmation", this.gebruiker)
      this.close();
    },
    deleteUser(){
      this.gebruiker.choice = 3
      this.$emit("confirmation", this.gebruiker)    
      this.close()
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>

<style>

</style>