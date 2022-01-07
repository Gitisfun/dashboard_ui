<template>
    <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <div v-show="isRead">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <Subtitle text="Mijn gegevens" />
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <GenericBtn text="Aanpassen" btnStyle="warning" @clicked="edit"  />
              </div>
            </div>
          </div>
          <hr>
          <div style="margin-top: 5px" class="columns">
            <div class="column">
              <div class="columns">
                <div class="column">
                  <InfoField text="Naam:" />
                  <InfoField text="Bank:" />
                  <InfoField text="BTW nummer:" />
                  <InfoField text="Telefoon:" />
                </div>
                <div class="column">
                  <InfoFieldValue :text="bedrijf.naam" />
                  <InfoFieldValue :text="bedrijf.bank" />
                  <InfoFieldValue :text="bedrijf.btw_nr" />
                  <InfoFieldValue :text="bedrijf.telefoon" />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="columns">
                <div class="column">
                  <InfoField text="Extra naam:" />
                  <InfoField text="Extra bank:" />
                  <InfoField text="E-mail:" />
                </div>
                <div class="column">
                  <InfoFieldValue :text="bedrijf.extra_naam" />
                  <InfoFieldValue :text="bedrijf.extra_bank" />
                  <InfoFieldValue :text="bedrijf.email" />
              </div>
              </div>
            </div>
          </div>
          <div>
            <Subtitle text="Adres" />
            <br>
            <AddressBoxRead v-if="adres.straat" :address="adres" />
            <div class="box" style="font-size: 14px" v-else>Nog geen adres toegevoegd</div>
          </div>
        </div>
        <div v-show="!isRead">
          <ValidationObserver v-slot="{ handleSubmit }">
            <div class="level">
            <div class="level-left">
              <div class="level-item">
                <Subtitle text="Mijn gegevens" />
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <GenericBtn text="Opslaan" btnStyle="success" @clicked="handleSubmit(save)"  />
              </div>
              <div class="level-item">
                <GenericBtn text="Annuleren" @clicked="cancel"  />
              </div>
            </div>
            </div>
            <hr>
            <div class="columns">
              <div class="column">
                <ValidatedTextInput v-model="bedrijf.naam" name="Naam" rules="required" />
                <ValidatedTextInput v-model="bedrijf.bank" name="Bank" rules="required" />
                <ValidatedTextInput v-model="bedrijf.btw_nr" name="BTW nummer" rules="required" />
                <ValidatedTextInput v-model="bedrijf.telefoon" name="Telefoon" rules="required" />
              </div>
              <div class="column">
                <TextInput v-model="bedrijf.extra_naam" name="Extra naam" />
                <TextInput v-model="bedrijf.extra_bank" name="Extra bank" />
                <ValidatedTextInput v-model="bedrijf.email" name="E-mail" rules="required" />
              </div>
            </div>
            <div>
              <br>
              <Subtitle text="Adres" />
              <ValidatedTextInput v-model="adres.straat" name="Straat" rules="required" />
              <ValidatedTextInput v-model="adres.huisnummer" name="Huisnummer" rules="required" />
              <TextInput v-model="adres.bus" name="Bus" />
              <ValidatedTextInput v-model="adres.postcode" name="Postcode" rules="required" />
              <ValidatedTextInput v-model="adres.gemeente" name="Gemeente" rules="required" />
              <ValidatedTextInput v-model="adres.land" name="Land" rules="required" />
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
</template>


<script>
import Subtitle from "../textfields/Subtitle.vue";
import InfoField from '../textfields/InfoField.vue';
import InfoFieldValue from '../textfields/InfoFieldValue.vue';
import ValidatedTextInput from '../inputfields/ValidatedTextInput.vue';
import TextInput from "../inputfields/TextInput.vue";
import GenericBtn from "../buttons/GenericBtn.vue"
import { ValidationObserver } from "vee-validate";
import AddressBoxRead from '../common/AddressBoxRead.vue';
import BedrijvenController from '../../api/calls/bedrijven';
import socketMixin from '../../mixins/socketMixin';

export default {
    name: "MijnGegevens",
    mixins: [socketMixin],
    components: {
      Subtitle,
      GenericBtn,
      AddressBoxRead,
      InfoField,
      InfoFieldValue,
      ValidatedTextInput,
      TextInput,
      ValidationObserver,
    },
    data(){
      return {
        isRead: true,
        bedrijf: {
          naam: null,
          bank: null, 
          btw_nr: null,
          telefoon: null,
          extra_naam: null,
          extra_bank: null,
          email: null,
          adres: null
        },
        adres: {
            straat: null,
            huisnummer: null,
            bus: null,
            postcode: null,
            gemeente: null,
            land: null
          }
      }
    },
    mounted(){
      this.load()
    },
    methods: {
      load(){
        BedrijvenController.get(this.$store.getters.getUser.bedrijf_id, this, (res) => {
          this.bedrijf = res.data[0]

          if(this.bedrijf.adres){
            const temp = JSON.parse(this.bedrijf.adres)

            this.adres.straat = temp.straat;
            this.adres.huisnummer = temp.huisnummer;
            this.adres.bus = temp.bus;
            this.adres.postcode = temp.postcode;
            this.adres.gemeente = temp.gemeente;
            this.adres.land = temp.land;
          }
        })
      },
      edit(){
        this.isRead = false;
      },
      save(){
        this.bedrijf.adres = JSON.stringify(this.adres)
        BedrijvenController.update(this, this.bedrijf, this.socketMixin)
        setTimeout(() => {
          this.cancel()
          this.load()
        }, (750));
      },
      cancel(){
        this.isRead = true;
      }
    },
}
</script>


<style scoped>
.instellingen-adres{
  font-weight: 400;
  font-size: 14px;
}
</style>