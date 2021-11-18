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
          <GenericBtn text="Aanpassen" btnStyle="warning" size="small" @clicked="editItem"  />
        </div>
      </div>
      <div class="column">
        <div class="is-vertical-center" style="height: 100%">          
          <GenericBtn text="Verwijderen" btnStyle="danger" size="small" @clicked="deleteItem"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericBtn from "../buttons/GenericBtn.vue"

export default {
  name: "AddressBox",
  components: {
    GenericBtn
  },
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