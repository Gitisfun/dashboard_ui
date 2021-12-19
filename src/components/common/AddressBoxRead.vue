<template>
  <div class="box">
    <p>{{ address.straat }} {{ address.huisnummer }} {{ address.bus }}</p>
    <p>{{ address.postcode }} {{ address.gemeente }}</p>
    <p>{{ address.land }}</p>
  </div>
</template>

<script>
export default {
  name: "AddressBoxRead",
  props: {
    address: {
      type: Object,
    },
  },
};
</script>

<style scoped>
p {
  font-size: 14px;
}
</style>
