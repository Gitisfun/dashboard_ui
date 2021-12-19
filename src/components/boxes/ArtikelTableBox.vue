<template>
  <div>
    <SmallTitle text="Artikels" style="margin-bottom: 25px" />
    <b-table narrowed striped :data="artikels">
        <b-table-column width="10%" field="artikel_nr" label="Artikelcode" v-slot="props" sortable>
            {{ props.row.artikelcode }}
        </b-table-column>
        <b-table-column width="15%" field="naam" label="Naam" v-slot="props" sortable>
            {{ props.row.naam }}
        </b-table-column>
        <b-table-column width="20%" field="memo" label="Memo" v-slot="props" sortable>
            {{ props.row.memo }}
        </b-table-column>
        <b-table-column width="10%" centered field="prijs" label="Prijs" v-slot="props" sortable>
            {{ props.row.prijs | currencyFormatter }}
        </b-table-column>
        <b-table-column width="8%" centered field="hoeveelheid" label="Aantal" v-slot="props" sortable>
            {{ props.row.hoeveelheid }}
        </b-table-column>
        <b-table-column width="12%" centered field="korting_een" label="Korting I" v-slot="props" sortable>
            {{ props.row.korting_een | kortingFormatter }}
        </b-table-column>
        <b-table-column width="12%" centered field="korting_twee" label="Korting I" v-slot="props" sortable>
            {{ props.row.korting_twee | kortingFormatter }}
        </b-table-column>
        <b-table-column width="13%" centered field="totaal" label="Totaal" v-slot="props" sortable>
            {{ props.row.totaal | currencyFormatter }}
        </b-table-column>
        <template #empty>
            <div class="custom-table-empty">Nog geen artikels toegevoegd...</div>
        </template>
    </b-table>
  </div>
</template>

<script>
import SmallTitle from "../textfields/SmallTitle.vue"

export default {
    name: "ArtikelTableBox",
    components: {
        SmallTitle
    },
    props: {
        artikels: {
            type: Array
        }
    }
}
</script>

<style>

</style>