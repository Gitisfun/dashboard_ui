<template>
  <li @click="itemClicked">
    <router-link :to="link">
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