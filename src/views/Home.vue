<template>
  <div class="content-body">
    <b-button @click="clickMe">Click me</b-button>
  </div>
</template>

<script>
import ApiCall from "../api/ApiCalls.js"
export default {
  name: "Home",
  methods: {
    clickMe(){
      ApiCall.getAll(this)
    }
  }
};
</script>