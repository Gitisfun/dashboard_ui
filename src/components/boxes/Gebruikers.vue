<template>
   <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <div class="level">
        <div class="level-left">
            <div class="level-item">
            <Subtitle text="Gebruikers" />
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <GenericBtn text="Toevoegen" btnStyle="success" @clicked="addUser"  />
            </div>
        </div>
        </div>        
        <hr>
        <div v-for="item in gebruikers" :key="item.id">
          <div class="level">
            <div class="level-right">
              <div class="level-item">
                <div class="gebruikers-box">{{ item.voornaam }} {{ item.achternaam }}</div>
              </div>
            </div>
            <div class="level-left">
              <div class="level-item">
                <b-button type="is-text">Aanpassen</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Subtitle from "../textfields/Subtitle.vue";
import GenericBtn from "../buttons/GenericBtn.vue"
/*
import InfoField from '../components/textfields/InfoField.vue';
import InfoFieldValue from '../components/textfields/InfoFieldValue.vue';
import ValidatedTextInput from '../components/inputfields/ValidatedTextInput.vue';
import TextInput from "../components/inputfields/TextInput.vue";
import { ValidationObserver } from "vee-validate";
*/

export default {
    name: "Gebruikers",
    components: {
      Subtitle,
      GenericBtn,
      /*
      InfoField,
      InfoFieldValue,
      ValidatedTextInput,
      TextInput,
      ValidationObserver,
      */
    },
    data(){
      return {
        isRead: true,
        gebruikers: [
          {
            id: 1,
            voornaam: "Suzanne",
            achternaam: "Cooper",
          },
          {
            id: 2,
            voornaam: "Pauline",
            achternaam: "De Smedt",
          },
          {
            id: 3,
            voornaam: "Charlotte",
            achternaam: "Van De Laan",
          },
        ]
      }
    },
    methods: {
      addUser(){
        
      },
    }
}
</script>

<style scoped>
.gebruikers-box{
  color: black;
  border-radius: 5px;
  border: 0.25px solid white;
  padding: 5px;
  margin-bottom: 10px;
}
.gebruikers-box-edit{
  color: black;
  text-decoration: underline;
  border-radius: 5px;
  border: 0.25px solid white;
  padding: 5px;
  margin-bottom: 10px;
}
</style>