<template>
  <div class="level" style="background: white; padding: 15px">
    <div class="level-left">
      <div class="level-item" style="color: #000000"><i :class="`bx ${currentMenuItem.icon} bx-md`"></i>
      <!-- <b-icon :icon="currentMenuItem.icon" size="is-medium" type="is-dark"> </b-icon> -->
      </div>
      <div id="titlebar-title" style="color: #000000; font-weight: 700" class="level-item">{{ currentMenuItem.name }}</div>
    </div>
    <div class="level-right">
      <div class="level-item">
          <GenericBtn :text="getFormattedUser()" @clicked="logout"  />
        <!--
        <b-dropdown :triggers="['hover']" aria-role="list">
          <template #trigger>
            <b-button label="Account" type="is-primary" icon-right="menu-down" />
          </template>
          <b-dropdown-item @click="logout" aria-role="listitem">Uitloggen</b-dropdown-item>
        </b-dropdown>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from '../../logic/factories/navigation';
import GenericBtn from '../buttons/GenericBtn.vue';

export default {
  components: { GenericBtn },
  name: "TitleBar",
  computed: mapGetters(["allMenuItems", "currentMenuItem"]),
  created() {
    this.updateTitleBar()
  },
  methods: {
    ...mapActions(["switchMenuItem"]),
    logout() {
      if(this.$route.name !== "Instellingen"){
        Navigation.navigate(this, "Instellingen", null)
        this.updateTitleBar()
      }
    },
    getFormattedUser(){
      if(this.$store.getters.getUser){
        return `${this.$store.getters.getUser.voornaam} ${this.$store.getters.getUser.achternaam}`
      }
      return "..."
    },
    updateTitleBar(){
      this.menuItems = this.allMenuItems;
      for (let i = 0; i < this.menuItems.length; i++) {
        if (this.$route.name == this.menuItems[i].name) {
          this.switchMenuItem(this.menuItems[i]);
        }
      }
    }
  },
};
</script>

<style>
#titlebar-title{
  font-size: 19px;
}
</style>
