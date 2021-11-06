<template>
    <div class="columns">
      <div class="column is-8">
        <b-input @input.native="loadTable" expanded placeholder="Zoeken..." v-model="searchField" size="is-normal"></b-input>
      </div>
      <div class="column is-2">
        <b-select expanded @change.native="loadTable" v-model="limitRate" size="is-normal">
          <option v-for="option in perPageList" :value="option.value" :key="option.id">
            {{ option.text }}
          </option>
        </b-select>
      </div>
      <div class="column is-2">
          <b-button icon-left="plus" style="float: right" type="is-success" @click="navigate">Nieuwe leverancier</b-button>
      </div>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    props: {
        search: {
            type: String
        },
        limit: {
            type: Number
        },
        navigateRouteName: {
            type: String
        }
    },
    created(){
        this.searchField = this.search;
        this.limitRate = this.limit 
    },
    data(){
        return {
            searchField: "",
            limitRate: 10,
            perPageList: [
                {
                id: 1,
                text: "10 per pagina",
                value: 10,
                },
                {
                id: 2,
                text: "15 per pagina",
                value: 15,
                },
                {
                id: 3,
                text: "25 per pagina",
                value: 25,
                },
                {
                id: 4,
                text: "50 per pagina",
                value: 50,
                },
            ],
        }
    },
    methods: {
        loadTable(){
            console.log(this.searchField);
            console.log(this.limitRate);
            this.$emit("searchTable", { search: this.searchField, limit: this.limitRate })
        },
        navigate(){
            this.$router.push({
                name: this.navigateRouteName,
            });
        }
    }

}
</script>

<style>

</style>