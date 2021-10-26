<template>
  <div class="content-body">
    <b-button @click="navToLeveranciersCreateview">Create</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    navToLeveranciersCreateview() {
      this.$router.push({
        name: "LeveranciersCreateview",
      });
    },
  },
};
</script>

<style></style>
