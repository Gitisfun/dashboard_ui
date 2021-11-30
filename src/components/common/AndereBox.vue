<template>
  <div class="box">
      <p style="font-weight: 600; font-size: 26px; margin-bottom: 10px">{{ title }}</p>
      <p style="font-size: 16px; margin-bottom: 25px">{{ description }}</p>
      <GenericBtn text="Selecteer" btnStyle="default" @clicked="select"  />
  </div>
</template>

<script>
import GenericBtn from '../buttons/GenericBtn.vue'

export default {
  name: "AndereBox",
  components: { 
    GenericBtn 
  },
  props: {
    id: {
    type: Number
    },
    title: {
    type: String,
    },
    description: {
    type: String
    }
  },
  data() { 
    return{
        icon: "bx-align-left"
    }
  },
  methods: {
      select(){
        this.$emit("selectCategory", this.id)
      }
  }
}
</script>

<style>
.iconbox_top .iconbox_icon {
    font-size: 150px;
    line-height: 150px;
    min-width: 10px;
    min-height: 150px;
    top: -50px;
    left: 45%;
}
</style>