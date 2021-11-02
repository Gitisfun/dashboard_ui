<template>
  <li @click="itemClicked">
    <router-link active-class="testactive" :to="link">
      <i :class="`bx ${icon}`"></i> <span class="links_name">{{ title }}</span>
    </router-link>
    <span class="tooltip">{{ title }}</span>
  </li>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    icon: String,
    title: String,
    link: String
  },
  methods:{
    itemClicked(){
      this.$emit("itemClicked")
    }
  }
};
</script>

<style scoped>

.testactive {
   background: linear-gradient(#f7d794, #f5cd79);
   cursor: pointer;
   color: black;
 }

</style>