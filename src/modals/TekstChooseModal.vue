<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Tekst kiezen" />
    <hr />
    <div style="margin-bottom: 35px">
        <b-table
            narrowed
            hoverable
            striped
            :selected.sync="selected"
            :data="list"
            :loading="loading"
        >
            <b-table-column width="70%" field="tekst" label="Tekst" v-slot="props" sortable>
            {{ props.row.tekst }}
            </b-table-column>

            <b-table-column width="30%" field="type" label="Type" v-slot="props" sortable>
            {{ props.row.type }}
            </b-table-column>
        </b-table>
    </div>
    <p v-show="errorMessage" style="color: red">Kies een tekst</p>
    <SaveBottomBar @save="onSubmit" @cancel="close" />
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";
import SaveBottomBar from "../components/general/SaveBottomBar.vue";
import TekstController from "../api/calls/tekst"

export default {
  name: "TekstChooseModal",
  components: {
    Subtitle,
    SaveBottomBar,
  },
  data: () => ({
    selected: null,
    list: [],
    loading: false,    
    errorMessage: false
  }),
  created(){
    TekstController.all(this, this.params, (res) => {
        this.list = res.data;
    });
  },
  methods: {
    onSubmit() {
      if(this.selected){
          this.errorMessage = false
          this.$emit("confirmation", this.selected)
          this.$parent.close();
      }
      else{
          this.errorMessage = true
      }
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>
