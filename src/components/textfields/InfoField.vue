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
  color: black;
  font-weight: 500;
  font-size: 14px;
}
</style>
