<template>
  <div>
    <p class="infofieldvalue" v-if="text">{{ text }}</p>
    <p class="infofieldvalue" v-else>...</p>
  </div>
</template>

<script>
export default {
  name: "InfoField",
  props: {
    text: {
      type: String,
    },
  },
};
</script>

<style scoped>
.infofieldvalue {
  margin-bottom: 20px;
  /* color: #0c2461; */
  font-style: italic;
  font-size: 14px;
}
</style>
