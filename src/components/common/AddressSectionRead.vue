<template>
  <!-- <div class="columns">
    <div class="column is-3">
      <SmallTitle :text="title" />
    </div>
    <div class="column">
      <br>
      <div v-if="list.length !== 0">
        <AddressBoxRead :address="adres" v-for="adres in list" :key="adres.id" />
      </div>
      <NoAddress v-else />
    </div>
    <br />
  </div> -->
  <div>
    <SmallTitle :text="title" />
    <br>
    <div v-if="list.length !== 0">
      <AddressBoxRead :address="adres" v-for="adres in list" :key="adres.id" />
    </div>
    <NoAddress v-else />
  </div>
</template>

<script>
import SmallTitle from "../../components/textfields/SmallTitle.vue";
import AddressBoxRead from "../../components/common/AddressBoxRead.vue";
import NoAddress from "../../components/common/NoAddress.vue";

export default {
  name: "AddressSectionRead",
  components: {
    SmallTitle,
    AddressBoxRead,
    NoAddress,
  },
  props: {
    title: {
      type: String,
      default: "Adressen",
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    setAdressenList(list) {
      this.list = list;
    },
  },
};
</script>

<style></style>
