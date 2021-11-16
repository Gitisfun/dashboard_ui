<template>
  <p class="infofield">{{ text }}</p>
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
.infofield {
  margin-bottom: 20px;
  color: #0c2461;

  font-size: 14px;
}
</style>
