<template>
  <div class="content-body">
    <div class="columns">
      <div class="column">
        <Widget title="Aankopen" total="100" colorOne="white" colorTwo="white"/>
      </div>
      <div class="column">
        <Widget title="Verkopen" total="100" colorOne="white" colorTwo="white"/>
      </div>
      <div class="column">
        <Widget title="Creditnotas" total="100" colorOne="white" colorTwo="white"/>
      </div>
      <div class="column">
        <Widget title="Totaal" total="100" colorOne="white" colorTwo="white"/>
      </div>
    </div>
  </div>
</template>

<script>
import Widget from '../components/charts/Widget.vue';
//import socketMixin from "../mixins/socketMixin"

export default {
  name: "Statistieken",
  components: {
    Widget,
  },

  //mixins: [socketMixin],

};
</script>

<style></style>
