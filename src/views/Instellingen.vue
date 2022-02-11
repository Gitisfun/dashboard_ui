<template>
  <div class="content-body">
    <div class="columns">
      <div class="column">
          <AndereBox :id="1" title="Mijn gegevens" description="De gegevens van mijn bedrijf" @selectCategory="selectCategory" />
      </div>
      <div class="column">
          <AndereBox :id="2" title="Gebruikers" description="Een lijst van mijn personeel" @selectCategory="selectCategory" />
      </div>
      <div class="column">
          <AndereBox :id="3" title="Extra instellingen" description="Enkele extra instellingen" @selectCategory="selectCategory" />
      </div>
    </div>
    <div>
      <MijnGegevens v-show="id == 1" />
      <Gebruikers v-show="id == 2" />
      <ExtraBox v-show="id==3" />
    </div>
  </div>
</template>

<script>
import AndereBox from "../components/common/AndereBox.vue"
import Gebruikers from "../components/boxes/Gebruikers.vue"
import MijnGegevens from '../components/boxes/MijnGegevens.vue'
import ExtraBox from '../components/boxes/ExtraBox.vue'

export default {
    name: "Instellingen",
    components: {
      AndereBox,
      Gebruikers,
      MijnGegevens,
      ExtraBox
    },
    data(){
      return {
        id: null,
      }
    },
    methods: {
      selectCategory(id){
        this.id = id
      }
    }
}
</script>

<style>

</style>
