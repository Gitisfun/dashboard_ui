<template>
  <div class="box">
    <div class="columns">
      <div class="column is-9">
        <p>{{ address.straat }} {{ address.huisnummer }} {{ address.bus }}</p>
        <p>{{ address.postcode }} {{ address.gemeente }}</p>
        <p>{{ address.land }}</p>
      </div>
      <div class="column">
        <div class="is-vertical-center" style="height: 100%">
          <b-button icon-left="pencil" @click="editItem" size="is-small" type="is-warning">Aanpassen</b-button>
        </div>
      </div>
      <div class="column">
        <div class="is-vertical-center" style="height: 100%">
          <b-button icon-left="trash-can" @click="deleteItem" size="is-small" type="is-danger">Verwijderen</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressBox",
  props: {
    address: {
      type: Object,
    },
  },
  methods: {
    editItem() {
      this.$emit("editItem", this.address)
    },
    deleteItem() {
      this.$emit("deleteItem", this.address)
    }
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