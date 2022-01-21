<template>
  <div>
    <div class="columns">
      <div class="column">
        <p>{{ bedrijf.naam }}</p>
        <p>{{ bedrijf.extra_naam }}</p>
      </div>
      <div class="column">
        <p>Order confirmation</p>
        <div class="columns">
          <div class="column">
            <p>Order nr:</p>
            <p>Supplier:</p>
          </div>
          <div class="column">
            <p>{{ aankoop.bestellings_nr }}</p>
            <p>{{ aankoop.leverancier_naam }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <p>{{ aankoop.datum | dateFormatter }}</p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p>Adres en maatschappelijke zetel - Adresse et siège social</p>
        <p>{{ adres.straat }}, {{ adres.huisnummer }} {{ adres.bus }}</p>
        <p>{{ adres.postcode }} {{ adres.gemeente }} {{ adres.land }}</p>
        <div class="columns">
          <div class="column">
            <p>Tel.</p>
            <p>V.A.T.</p>
            <p>Bank</p>
            <p>Extra bank</p>
            <p>Delivery terms</p>
            <p>Payment terms</p>
          </div>
          <div class="column">
            <p>: {{ bedrijf.telefoon }}</p>
            <p>: {{ bedrijf.btw_nr }}</p>
            <p>: {{ bedrijf.bank }}</p>
            <p>: {{ bedrijf.extra_bank }}</p>
            <p>: {{ aankoop.incoterm }}</p>
            <p>: ...</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column">
            <p>Customer</p>
          </div>
          <div class="column">
            <p>{{ aankoop.klant_naam }} </p>
            <p>{{ factuuradres.straat }}, {{ factuuradres.huisnummer }} {{ factuuradres.bus }}</p>
            <p>{{ factuuradres.postcode }} {{ factuuradres.gemeente }} {{ factuuradres.land }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p>Delivery address</p>
          </div>
          <div class="column">
            <p>{{ aankoop.klant_naam }}</p>
            <p>{{ leveradres.straat }}, {{ leveradres.huisnummer }} {{ leveradres.bus }}</p>
            <p>{{ leveradres.postcode }} {{ leveradres.gemeente }} {{ leveradres.land }}</p>
          </div>
        </div>
      </div>
    </div>
    <p>{{ aankoop.begintekst }}</p>
    <table width="100%">
      <tr>
        <th>Order nr</th>
        <th>Your references</th>
        <th>N° Customer</th>
        <th>Order date</th>
        <th>Delivery date</th>
        <th>Due date</th>
        <th>V.A.T. Nr Customer</th>
      </tr>
      <tr>
        <td>{{ aankoop.bestellings_nr }}</td>
        <td>{{ aankoop.ref_nr  }}</td>
        <td>{{ klant.klant_nr }}</td>
        <td>{{ aankoop.datum | dateFormatter }}</td>
        <td>{{ aankoop.leverdatum | dateFormatter }}</td>
        <td>{{ aankoop.vervaldag | dateFormatter }}</td>
        <td>{{ klant.btw_nr }}</td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <th>Item</th>
        <th>Ref. Customer</th>
        <th>Desription</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Discount</th>
        <th>Extra Discount</th>
        <th>Total</th>
      </tr>
      <tr v-for="item in aankoop.artikels" :key="item.id">
        <td>{{ item.artikelcode }}</td>
        <td>{{ klant.klant_nr }}</td>
        <td>{{ item.naam }}</td>
        <td>{{ item.hoeveelheid }}</td>
        <td>{{ item.prijs }}</td>
        <td>{{ item.korting_een }}</td>
        <td>{{ item.korting_twee }}</td>
        <td>{{ item.totaal }}</td>
      </tr>
    </table>
    <p>{{ aankoop.eindtekst }}</p>
    <table width="100%">
      <tr>
        <th>Total Net</th>
        <td></td>
        <td>{{ aankoop.subtotaal }} EUR</td>
      </tr>
      <tr>
        <th>Total V.A.T.</th>
        <td>{{ aankoop.btw_naam }}</td>
        <td>{{ calculateBtw }} EUR</td>
      </tr>
      <tr>
        <th></th>
        <th>Total</th>
        <th>{{ aankoop.totaal }} EUR</th>
      </tr>
    </table>
  </div>
</template>

<script>
import AankopenController from '../../api/calls/aankopen';
import UtilsFactory from '../../logic/utils/utilsFactory';

export default {
    name: "AankopenPrint",
    data(){
      return {
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
        },
        factuuradres: {
          straat: null,
          huisnummer: null,
          bus: null,
          postcode: null,
          gemeente: null,
          land: null
        },
        leveradres: {
          straat: null,
          huisnummer: null,
          bus: null,
          postcode: null,
          gemeente: null,
          land: null
        },
        klant: {
          klant_nr: null
        },
        aankoop: {
          bestellings_nr: null,
          datum: null,
          klant_id: null,
          klant_naam: null,
          ref_nr: null,
          btw_id: null,
          btw_naam: null,
          btw_prijs: null,
          vervaldag: null,
          leverdatum: null,
          leverancier_id: null,
          leverancier_naam: null,
          incoterm: null,
          valuta: null,
          begintekst: null,
          eindtekst: null,
          factuuradres: null,
          leveradres: null,
          subtotaal: null,
          totaal: null,
          isGeleverd: null,
          isBetaald: null,
          isActive: null,
          updated_time: null,
          updated_by: null,
          bedrijfs_id: null,
          opmerking: null,
          tempArtikels: [],
          artikels: []
        },
      }
    },
    mounted(){
      console.log(this.$route.params.obj);
      AankopenController.getPrintPreData(this, this.$route.params.id, this.$route.params.obj.klant_id, (res) => {  
        this.bedrijf = res[0].data[0]
        this.aankoop = res[1].data
        this.adres = JSON.parse(this.bedrijf.adres)
        this.factuuradres = JSON.parse(this.aankoop.factuuradres)
        this.leveradres = JSON.parse(this.aankoop.leveradres)
        this.klant = res[2].data[0]
      })
    },
    computed: {
      calculateBtw(){
        if(this.aankoop.btw_prijs){
          return `${UtilsFactory.roundNumber(parseFloat(this.aankoop.btw_prijs) * parseFloat(this.aankoop.subtotaal))}`
        }
        return "..."
      }
    }
}
</script>

<style>

</style>