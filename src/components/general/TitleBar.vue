<template>
  <div class="level" style="background: white; padding: 15px">
    <div class="level-left">
      <div class="level-item" style="color: darkblue"><i :class="`bx ${currentMenuItem.icon} bx-md`"></i>
      <!-- <b-icon :icon="currentMenuItem.icon" size="is-medium" type="is-dark"> </b-icon> -->
      </div>
      <div id="titlebar-title" style="color: darkblue; font-weight: 700" class="level-item">{{ currentMenuItem.name }}</div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <b-dropdown :triggers="['hover']" aria-role="list">
          <template #trigger>
            <b-button label="Account" type="is-info" icon-right="menu-down" />
          </template>
          <b-dropdown-item aria-role="listitem">Uitloggen</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TitleBar",
  computed: mapGetters(["allMenuItems", "currentMenuItem"]),
  created() {
    this.menuItems = this.allMenuItems;
    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.$route.name == this.menuItems[i].name) {
        this.switchMenuItem(this.menuItems[i]);
      }
    }
  },
  methods: {
    ...mapActions(["switchMenuItem"]),
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.go();
    },
  },
};
</script>

<style>
#titlebar-title{
  font-size: 19px;
}
</style>
