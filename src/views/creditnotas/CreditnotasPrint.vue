<template>
  <div class="factuur-content">
    <div class="columns">
      <div class="column is-5">
        <!--
        <div>
          <p class="factuur-title">{{ bedrijf.naam }}</p>
          <p class="factuur-title">{{ bedrijf.extra_naam }}</p>
        </div>
        -->
        <div v-show="bedrijf.id">
          <img
            style="height: 90px"
            v-if="bedrijf.id === 2"
            src="../../assets/comagex.png"
            alt="logocompany"
          />
          <img
            style="height: 90px"
            v-if="bedrijf.id === 4"
            src="../../assets/comagex.png"
            alt="logocompany"
          />
          <img
            style="height: 100px"
            v-if="bedrijf.id === 5"
            src="../../assets/invest.png"
            alt="logocompany"
          />
          <img
            style="height: 90px"
            v-if="bedrijf.id === 6"
            src="../../assets/gim.png"
            alt="logocompany"
          />
        </div>
      </div>
      <div class="column is-4">
        <p class="factuur-subtitle">Order confirmation</p>
        <div class="columns">
          <div class="column">
            <p class="factuur-title-details">Order nr:</p>
            <p class="factuur-title-details">Supplier:</p>
          </div>
          <div class="column">
            <p class="factuur-title-details">{{ creditnota.order_nr }}</p>
            <p class="factuur-title-details">{{ creditnota.klant_naam }}</p>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <p class="factuur-date">{{ creditnota.datum | dateFormatter }}</p>
      </div>
    </div>
    <div style="margin-top: -20px; margin-bottom: 10px">
      <p class="factuur-title">{{ bedrijf.naam }}</p>
      <p class="factuur-title">{{ bedrijf.extra_naam }}</p>
    </div>
    <div class="columns">
      <div class="column">
        <div class="factuur-adres">
          <p class="factuur-text">
            Adres en maatschappelijke zetel - Adresse et siège social
          </p>
          <p class="factuur-text">
            {{ adres.straat }}, {{ adres.huisnummer }} {{ adres.bus }}
          </p>
          <p class="factuur-text">
            {{ adres.postcode }} {{ adres.gemeente }} {{ adres.land }}
          </p>
        </div>
        <div class="columns">
          <div class="column">
            <p class="factuur-text">Tel.</p>
            <p class="factuur-text">V.A.T.</p>
            <p class="factuur-text">Bank</p>
            <p class="factuur-text">Extra bank</p>
            <p class="factuur-text">Delivery terms</p>
            <p class="factuur-text">Payment terms</p>
          </div>
          <div class="column">
            <p class="factuur-text">: {{ bedrijf.telefoon }}</p>
            <p class="factuur-text">: {{ bedrijf.btw_nr }}</p>
            <p class="factuur-text">: {{ bedrijf.bank }}</p>
            <p class="factuur-text">: {{ bedrijf.extra_bank }}</p>
            <p class="factuur-text">: ...</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column">
            <p class="factuur-text">Customer</p>
          </div>
          <div class="column">
            <p class="factuur-text">{{ creditnota.klant_naam }}</p>
            <p class="factuur-text">
              {{ factuuradres.straat }}, {{ factuuradres.huisnummer }}
              {{ factuuradres.bus }}
            </p>
            <p class="factuur-text">
              {{ factuuradres.postcode }} {{ factuuradres.gemeente }}
              {{ factuuradres.land }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p class="factuur-extra-info">{{ creditnota.opmerking_order }}</p>
    <table class="content-table-style">
      <tr class="content-table-text-centered">
        <th>Order nr</th>
        <th>Your references</th>
        <th>N° Customer</th>
        <th>Order date</th>
        <th>Payment date date</th>
        <th>V.A.T. Nr Customer</th>
      </tr>
      <tr class="content-table-text-centered">
        <td>{{ creditnota.order_nr }}</td>
        <td>{{ creditnota.ref_nr }}</td>
        <td>{{ klant.klant_nr }}</td>
        <td>{{ creditnota.datum | dateFormatter }}</td>
        <td>{{ creditnota.betalingsdatum | dateFormatter }}</td>
        <td>{{ klant.btw_nr }}</td>
      </tr>
    </table>

    <table class="content-table-style">
      <tr class="content-table-text-centered">
        <th>Item</th>
        <th>Ref. Customer</th>
        <th>Desription</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Discount</th>
        <th>Extra Discount</th>
        <th>Total</th>
      </tr>
      <tr
        class="content-table-text-centered"
        v-for="item in creditnota.artikels"
        :key="item.id"
      >
        <td>{{ item.artikelcode }}</td>
        <td>{{ klant.klant_nr }}</td>
        <td style="text-align: left">{{ item.naam }}</td>
        <td>{{ item.hoeveelheid }}</td>
        <td>{{ item.prijs }}</td>
        <td>{{ item.korting_een | emptyKortingFormatter }}</td>
        <td>{{ item.korting_twee | emptyKortingFormatter }}</td>
        <td style="text-align: right">{{ item.totaal }} EUR</td>
      </tr>
    </table>

    <p class="factuur-extra-info">{{ creditnota.eindtekst }}</p>
    <table class="total-table-style">
      <tr>
        <th>Total Net</th>
        <td></td>
        <td style="text-align: right">{{ creditnota.subtotaal }} EUR</td>
      </tr>
      <tr>
        <th>Total V.A.T.</th>
        <td style="text-align: right">{{ creditnota.btw_naam }}</td>
        <td style="text-align: right">{{ calculateBtw }} EUR</td>
      </tr>
      <tr>
        <th></th>
        <th>Total</th>
        <th style="text-align: right">{{ creditnota.totaal }} EUR</th>
      </tr>
    </table>
  </div>
</template>

<script>
import CreditnotasController from "../../api/calls/creditnotas";
import UtilsFactory from "../../logic/utils/utilsFactory";

export default {
  name: "CreditnotasPrint",
  data() {
    return {
      bedrijf: {
        id: null,
        naam: null,
        bank: null,
        btw_nr: null,
        telefoon: null,
        extra_naam: null,
        extra_bank: null,
        email: null,
        adres: null,
      },
      adres: {
        straat: null,
        huisnummer: null,
        bus: null,
        postcode: null,
        gemeente: null,
        land: null,
      },
      factuuradres: {
        straat: null,
        huisnummer: null,
        bus: null,
        postcode: null,
        gemeente: null,
        land: null,
      },
      klant: {
        klant_nr: null,
      },
      creditnota: {
        order_nr: null,
        datum: null,
        klant_id: null,
        klant_naam: null,
        ref_nr: null,
        btw_id: null,
        btw_naam: null,
        btw_prijs: null,
        betalingsdatum: null,
        valuta: null,
        opmerking_order: null,
        eindtekst: null,
        factuuradres: null,
        subtotaal: null,
        totaal: null,
        isBetaald: null,
        isActive: null,
        updated_time: null,
        updated_by: null,
        bedrijfs_id: null,
        opmerking: null,
        tempArtikels: [],
        artikels: [],
      },
    };
  },
  mounted() {
    CreditnotasController.getPrintPreData(
      this,
      this.$route.params.id,
      this.$route.params.obj.klant_id,
      (res) => {
        this.bedrijf = res[0].data[0];
        this.creditnota = res[1].data;
        this.adres = JSON.parse(this.bedrijf.adres);
        this.factuuradres = JSON.parse(this.creditnota.factuuradres);
        this.klant = res[2].data[0];
      }
    );
  },
  computed: {
    calculateBtw() {
      if (this.creditnota.btw_prijs) {
        return `${UtilsFactory.roundNumber(
          parseFloat(this.creditnota.btw_prijs) *
            parseFloat(this.creditnota.subtotaal)
        )}`;
      }
      return "...";
    },
  },
};
</script>

<style>
.factuur-content {
  padding: 5px;
}

.content-table-style {
  width: 100%;
}

.factuur-title {
  font-size: 12px;
  font-weight: 700;
}

.factuur-subtitle {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}

.factuur-title-details {
  font-size: 12px;
  font-weight: 700;
}

.factuur-date {
  font-size: 10px;
  text-align: right;
}

.factuur-adres {
  margin-bottom: 15px;
}

.factuur-text {
  font-size: 10px;
}

.factuur-extra-info {
  font-size: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content-table-style {
  margin-bottom: 15px;
}

.content-table-style td,
.content-table-style th {
  border: 0.5px solid grey;
  padding: 5px;
  font-size: 10px;
}

.content-table-text-centered {
  text-align: center;
}

.total-table-style {
  float: right;
}

.total-table-style td,
.total-table-style th {
  border: 0.5px solid grey;
  padding: 5px;
  font-size: 10px;
}
</style>
