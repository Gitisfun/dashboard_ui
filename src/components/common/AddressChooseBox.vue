<template>
  <div class="box">
    <div class="columns">
      <div class="column is-9">
        <p>{{ address.straat }} {{ address.huisnummer }} {{ address.bus }}</p>
        <p>{{ address.postcode }} {{ address.gemeente }}</p>
        <p>{{ address.land }}</p>
      </div>
      <div class="column">
        <div class="is-vertical-center" style="float: right; margin-right: 25px; height: 100%">
          <GenericBtn text="Kies" btnStyle="success" size="normal" @clicked="choose"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericBtn from "../buttons/GenericBtn.vue"

export default {
  name: "AddressChooseBox",
  components: {
    GenericBtn
  },
  props: {
    address: {
      type: Object,
    },
  },
  methods: {
    choose() {
      this.$emit("chooseAddress", this.address)
    },
  }
};
</script>

<style scoped>
p {
  font-size: 14px;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>