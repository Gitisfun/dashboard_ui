<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Adres kiezen" />
    <hr />
    <AddressChooseBox v-for="item in adressen" :key="item.id" :address="item" @chooseAddress="choose" />
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";
import AddressChooseBox from '../components/common/AddressChooseBox.vue';

export default {
  name: "AddressChooseModal",
  components: {
    Subtitle,
    AddressChooseBox,
  },
  data: () => ({
    adressen: []
  }),
  created(){
    this.adressen = this.$attrs.obj;
    console.log(this.$attrs.obj);
  },
  methods: {
    choose(adres) {
      this.$emit("confirmation", adres)
      this.$parent.close();
    },
  },
};
</script>
