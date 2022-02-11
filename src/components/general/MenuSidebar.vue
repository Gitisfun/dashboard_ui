<template>
  <div>
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <div class="logo_content">
      <div class="logo">
        <i class="bx bxl-c-plus-plus"></i>
        <div class="logo_name">Comagex</div>
      </div>
      <i class="bx bx-menu-alt-right" id="btn" @click="clicked"></i>
    </div>
    <ul class="nav_list">
      <MenuRouterLink @itemClicked="itemClicked" v-for="item in menuItems" :title="item.name" :icon="item.icon" :link="item.link" :key="item.id" />

      <div class="logout-out-box">
      <li  @click="logout">
        <router-link active-class="router-link-active" to="login">
           <i :class="`bx bx-log-out`"></i> <span class="links_name">Uitloggen</span>
        </router-link>
      </li>
      </div>
    </ul>
  </div>
</template>

<script>
import MenuRouterLink from "./MenuRouterLink";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MenuSidebar",
  components: {
    MenuRouterLink,
  },
  data() {
    return {
      visibility: undefined,
      menuItems: [],
    };
  },
  computed: mapGetters(["allMenuItems", "currentMenuItem"]),
  created() {
    this.menuItems = this.allMenuItems;
  },
  mounted() {
    this.visibility = localStorage.getItem("menubarvisibility");
    let sidebar = document.querySelector(".sidebar");
    if (this.visibility != "true") {
      sidebar.classList.add("active");
      localStorage.setItem("menubarvisibility", null);
    } else {
      sidebar.classList.remove("active");
      localStorage.setItem("menubarvisibility", "true");
    }
    let btn = document.querySelector("#btn");
    if (this.visibility != "true") {
      btn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      btn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  },
  methods: {
    ...mapActions(["switchMenuItem"]),
    clicked() {
      let btn = document.querySelector("#btn");
      let sidebar = document.querySelector(".sidebar");
      if (this.visibility == "true") {
        sidebar.classList.add("active");
        localStorage.setItem("menubarvisibility", null);
        this.visibility = null;
      } else {
        sidebar.classList.remove("active");
        localStorage.setItem("menubarvisibility", "true");
        this.visibility = "true";
      }
      if (btn.classList.contains("bx-menu")) {
        btn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        btn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    },
    itemClicked() {
      if (this.$route.meta.group != this.currentActiveGroup) {
        for (let i = 0; i < this.menuItems.length; i++) {
          if (this.$route.meta.group == this.menuItems[i].group) {
            this.lastActiveGroup = this.currentActiveGroup;
            this.currentActiveGroup = this.menuItems[i].group;
            this.menuItems[this.findById(this.lastActiveGroup)].isActive = false;
            this.menuItems[i].isActive = true;
          }
          if (this.$route.name == this.menuItems[i].name) {
            this.switchMenuItem(this.menuItems[i]);
          }
        }
      }
    },
    findById(group) {
      for (let i = 0; i < this.menuItems.length; i++) {
        if (this.menuItems[i].group == group) {
          return i;
        }
      }
      return 0;
    },
    logout(){
      
    }
  },
};
</script>

<style>
#btn {
  cursor: pointer;
}

.logout-out-box {
  position: fixed;
  bottom: 0;
  width: 210px;
  margin-bottom: 5px;
}
</style>