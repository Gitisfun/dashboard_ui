<template>
  <div>
    <SmallTitle text="Adressen" />
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
