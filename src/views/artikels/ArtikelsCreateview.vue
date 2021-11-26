<template>
  <div class="content-body">
    <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <CreateHeader title="Nieuw artikel" @save="handleSubmit(onSubmit)" />
          <div class="columns">
            <div class="column">
              <ValidatedTextInput v-model="artikel.artikelcode" name="Artikelcode" rules="required" />
              <ValidatedTextInput v-model="artikel.naam" name="Naam" rules="required" />
              <TextInput v-model="artikel.omschrijving" name="Omschrijving" />
              <ValidatedTextInput v-model="artikel.ean" name="EAN" rules="required" />
              <TextInput v-model="artikel.memo" name="Memo" />
              <ValidatedSearch ref="validatedSearchField" @choose="changeLeverancier" :value="artikel.leverancier" name="Leverancier" />
            </div>
            <div class="column">
              <ValidatedTextInput v-model="artikel.prijs" name="Prijs" rules="required" />
              <TextInput v-model="artikel.valuta" name="Valuta" />
              <ValidatedTextInput v-model="artikel.netto" name="Netto" rules="positive" />
              <ValidatedTextInput v-model="artikel.kosten" name="Kosten" rules="positive" />
              <ValidatedTextInput v-model="artikel.marge" name="Marge" rules="positive" />
              <ValidatedTextInput v-model="artikel.verkoopeenheid" name="Verkoopeenheid" rules="positive" />
            </div>
          </div>
        </ValidationObserver>
        <br>
         <br>
        <div class="box">
            <div class="columns">
                <div class="column">
                    <span style="font-size: 16px; font-weight: 300; margin-right: 50px; vertical-align:middle">Is in stock?</span>
                </div>
                <div class="column">
                    <b-checkbox type="is-success" style="argin: auto;" v-model="artikel.inStock" :true-value="1" :false-value="0"></b-checkbox>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateHeader from "../../components/general/CreateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import TextInput from "../../components/inputfields/TextInput.vue";
import ArtikelsController from "../../api/calls/artikels"
import socketMixin from "../../mixins/socketMixin"
import ValidatedSearch from '../../components/inputfields/ValidatedSearch.vue';
import LeverancierModal from '../../modals/LeverancierModal.vue';

export default {
  name: "ArtikelsCreateview",
  mixins: [socketMixin],
  components: {
    CreateHeader,
    ValidationObserver,
    ValidatedTextInput,
    TextInput,
    ValidatedSearch,
  },
  data: () => ({
    artikel: {
      artikelcode: null,
      naam: null,
      prijs: null,
      omschrijving: null,
      leverancier_id: null,
      leverancier: null,
      verkoopeenheid: null,
      ean: null,
      memo: null,
      valuta: null,
      netto: null,
      kosten: null,
      marge: null,
      inStock: 1
    },
    btws: [],
    betalingstermijnen: [],
    isLoaded: false,
  }),
  computed: {
    isInstock() {
      if(this.artikel.inStock == 1){
        return "background: linear-gradient(45deg, #e66465, #9198e5); color: white "
      }
      else {
        return "background: linear-gradient(45deg, red, orange); color: white "
      }
    },
  },
  mounted(){
    this.$refs.validatedSearchField.setModal(LeverancierModal);
  },
  methods: {
    onSubmit() {
      console.log(this.artikel);
      if(this.artikel == null){
        ArtikelsController.create(this, this.artikel, this.socket)
      }
    },
    changeLeverancier(item){
      console.log(item);
      this.artikel.leverancier_id = item.id
      this.artikel.leverancier = item.naam
      this.$refs.validatedSearchField.setValue(item.naam);
    }
  },
};
</script>

<style>
.myinputtt{
   height:33%;
   display: flex;
   justify-content: center;
   align-items:center;
}

</style>