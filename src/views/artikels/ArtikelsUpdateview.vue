<template>
  <div class="content-body">
    <div v-show="isReadVisible" class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ReadHeader title="Artikel details" @edit="edit" />
        <br />
        <div class="columns">
          <div class="column">
            <InfoField text="Artikelcode:" />
            <InfoField text="Naam:" />
            <InfoField text="Omschrijving:" />
            <InfoField text="EAN:" />
            <InfoField text="Memo:" />
            <InfoField text="Leverancier:" />
          </div>
          <div class="column">
            <InfoFieldValue :text="artikel.artikelcode" />
            <InfoFieldValue :text="artikel.naam" />
            <InfoFieldValue :text="artikel.omschrijving" />
            <InfoFieldValue :text="artikel.ean" />
            <InfoFieldValue :text="artikel.memo" />
            <InfoFieldValue :text="artikel.leverancier_naam" />
          </div>
          <div class="column">
            <InfoField text="Prijs:" />
            <InfoField text="Valuta:" />
            <InfoField text="Netto:" />
            <InfoField text="Kosten:" />
            <InfoField text="Marge:" />
            <InfoField text="Verkoopeenheid:" />
          </div>
          <div class="column">
            <InfoFieldValue :text="artikel.prijs" />
            <InfoFieldValue :text="artikel.valuta" />
            <InfoFieldValue :text="artikel.netto" />
            <InfoFieldValue :text="artikel.kosten" />
            <InfoFieldValue :text="artikel.marge" />
            <InfoFieldValue :text="artikel.verkoopeenheid" />
          </div>
        </div>
        <div class="box">
            <div class="columns">
                <div class="column">
                    <span style="font-size: 16px; font-weight: 300; margin-right: 50px; vertical-align:middle">Is in stock?</span>
                </div>
                <div class="column">
                    <b-checkbox disabled type="is-success" style="argin: auto;" v-model="artikel.inStock" :true-value="1" :false-value="0"></b-checkbox>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div v-show="!isReadVisible" class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <ValidationObserver v-slot="{ handleSubmit }">
          <UpdateHeader title="Artikel aanpassen" @save="handleSubmit(onSubmit)" @cancel="cancelEdit" @deleteItem="deleteItem" />
          <div class="columns">
            <div class="column">
              <ValidatedTextInput v-model="artikel.artikelcode" name="Artikelcode" rules="required" />
              <ValidatedTextInput v-model="artikel.naam" name="Naam" rules="required" />
              <TextInput v-model="artikel.omschrijving" name="Omschrijving" />
              <ValidatedTextInput v-model="artikel.ean" name="EAN" rules="required" />
              <TextInput v-model="artikel.memo" name="Memo" />
              <ValidatedSearch ref="validatedSearchField" @choose="changeLeverancier" :value="artikel.leverancier_naam" name="Leverancier" />
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
import ReadHeader from "../../components/general/ReadHeader.vue";
import UpdateHeader from "../../components/general/UpdateHeader.vue";
import { ValidationObserver } from "vee-validate";
import ValidatedTextInput from "../../components/inputfields/ValidatedTextInput.vue";
import TextInput from "../../components/inputfields/TextInput.vue";
import ArtikelsController from "../../api/calls/artikels"
import ValidatedSearch from '../../components/inputfields/ValidatedSearch.vue';
import LeverancierModal from '../../modals/LeverancierModal.vue';
import socketMixin from "../../mixins/socketMixin"
import ModalFactory from "../../logic/factories/modalFactory";
import ConfirmationModal from "../../modals/ConfirmationModal.vue";
import InfoField from "../../components/textfields/InfoField.vue";
import InfoFieldValue from "../../components/textfields/InfoFieldValue.vue";
import UtilsFactory from '../../logic/utils/utilsFactory';

export default {
  name: "ArtikelsUpdateview",
  mixins: [socketMixin],
  components: {
    ReadHeader,
    UpdateHeader,
    ValidationObserver,
    ValidatedTextInput,
    TextInput,
    ValidatedSearch,
    InfoField,
    InfoFieldValue,
  },
  data: () => ({
    copyArtikel: null,
    artikel: {
      artikelcode: null,
      naam: null,
      prijs: null,
      omschrijving: "",
      leverancier_id: null,
      leverancier_naam: null,
      verkoopeenheid: null,
      ean: null,
      memo: null,
      valuta: null,
      netto: null,
      kosten: null,
      marge: null,
      inStock: 1
    },
    isReadVisible: true,
    btws: [],
    betalingstermijnen: [],
    isLoaded: false,
  }),
  mounted(){
    this.$refs.validatedSearchField.setModal(LeverancierModal);
    ArtikelsController.getPreData(this, this.$route.params.id, (res) => {
      this.artikel = res[0].data[0]
      this.copyArtikel = UtilsFactory.copyObject(this.artikel)
      this.$refs.validatedSearchField.setValue(this.artikel.leverancier_naam);
    })
  },
  methods: {
    onSubmit() {
      console.log(this.artikel);
      if(this.artikel.leverancier_id == null) {
        this.$refs.validatedSearchField.setError(true);
      }
      else {
        ArtikelsController.update(this, this.artikel, this.socket)
      }
    },
    changeLeverancier(item){
      console.log(item);
      this.artikel.leverancier_id = item.id
      this.artikel.leverancier_naam = item.naam
      this.$refs.validatedSearchField.setValue(item.naam);
      console.log(this.artikel);
    },
    edit(){
      this.isReadVisible = false;
    },
    cancelEdit(){
      this.isReadVisible = true
      this.artikel = UtilsFactory.copyObject(this.copyArtikel)
    },
    deleteItem(){
      ModalFactory.showModalWithParamas(this, ConfirmationModal, "Bent u zeker dat u dit artikel wilt verwijderen?", null, (isConfirmed) => {
        if (isConfirmed) {
          ArtikelsController.deleteById(this, this.artikel, this.socket);
        }
      });
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