<template>
  <p class="custom-subtitlestyle">{{ text }}</p>
</template>

<script>
export default {
  name: "Subtitle",
  props: {
    text: String,
  },
};
</script>

<style>
.custom-subtitlestyle {
  font-size: 20px;
  font-weight: 700; 
  color: black
}
</style>
