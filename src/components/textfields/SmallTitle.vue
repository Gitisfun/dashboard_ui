<template>
  <p class="custom-small-titlestyle">{{ text }}</p>
</template>

<script>
export default {
  name: "SmallTitle",
  props: {
    text: String,
  },
};
</script>

<style>
.custom-small-titlestyle {
  font-size: 18px;
  font-weight: 700;
  color: black;
}
</style>
