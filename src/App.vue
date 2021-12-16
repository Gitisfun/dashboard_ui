<template>
  <div>
    <div v-if="isLogin">
      <router-view />
    </div>
    <div v-else>
      <div class="sidebar">
        <MenuSidebar />
      </div>
      <div class="home_content">
        <TitleBar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MenuSidebar from "./components/general/MenuSidebar";
import TitleBar from "./components/general/TitleBar";

export default {
  name: "App",
  components: {
    MenuSidebar,
    TitleBar,
  },
  computed: {
    isLogin() {
      return this.$route.name == "Login";
    },
  },
  data: () => ({
    test: false,
  }),
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #f5cd79;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
    (
        "white": (
            $white,
            $black,
        ),
        "black": (
            $black,
            $white,
        ),
        "light": (
            $light,
            $light-invert,
        ),
        "dark": (
            $dark,
            $dark-invert,
        ),
        "primary": (
            $primary,
            $primary-invert,
            $primary-light,
            $primary-dark,
        ),
        "link": (
            $link,
            $link-invert,
            $link-light,
            $link-dark,
        ),
        "info": (
            $info,
            $info-invert,
            $info-light,
            $info-dark,
        ),
        "success": (
            $success,
            $success-invert,
            $success-light,
            $success-dark,
        ),
        "warning": (
            $warning,
            $warning-invert,
            $warning-light,
            $warning-dark,
        ),
        "danger": (
            $danger,
            $danger-invert,
            $danger-light,
            $danger-dark,
        ),
    ),
    $custom-colors
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

<style>
:root{
  
  /*
    --mytextcolor: white;
  --mysidebarcolor: black;
  --mytooltipcolortext: orange;
  --mytooltipcolor: red;
  --myhovercolor: white;
  --myhovercolortext: black;
  */

  --mytextcolor: black;
  --mysidebarcolor: white;
  --mytooltipcolortext: white;
  --mytooltipcolor: black;
  --myhovercolor: black;
  --myhovercolortext: white;

}
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  position: relative;
  width: 100%;
  height: 100vh;
}
::selection {
  color: var(--mytextcolor);
  background: var(--mysidebarcolor);
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 78px;

  background: var(--mysidebarcolor);
  padding: 6px 14px;
  /*z-index: 99;*/
  transition: all 0.5s ease;
}
.sidebar.active {
  width: 240px;
}
.sidebar .logo_content .logo {
  color: var(--mytextcolor);
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
}
.sidebar.active .logo_content .logo {
  opacity: 1;
  pointer-events: none;
}
.logo_content .logo i {
  font-size: 28px;
  margin-right: 5px;
}
.logo_content .logo .logo_name {
  font-size: 20px;
  font-weight: 400;
}
.sidebar #btn {
  position: absolute;
  color: var(--mytextcolor);
  top: 6px;
  left: 50%;
  font-size: 22px;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  transform: translateX(-50%);
}
.sidebar.active #btn {
  left: 90%;
}
.sidebar ul {
  margin-top: 20px;
}
.sidebar ul li {
  position: relative;
  height: 50px;
  width: 100%;
  margin: 0 5px;
  list-style: none;
  line-height: 50px;
  margin: 5px 0;
}
.sidebar ul li .tooltip {
  position: absolute;
  left: 125px;
  top: 0;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  height: 35px;
  width: 120px;
  color: var(--mytooltipcolortext);
  background: var(--mytooltipcolor);
  line-height: 35px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: 0s;
  opacity: 0;
  pointer-events: none;
  display: block;
}
.sidebar.active ul li .tooltip {
  display: none;
}
.sidebar ul li:hover .tooltip {
  transition: all 0.5s ease;
  opacity: 1;
  top: 50%;
}
.sidebar ul li input {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 12px;
  outline: none;
  border: none;
  background: var(--mysidebarcolor);
  padding-left: 50px;
  font-size: 18px;
  color: var(--mytextcolor);
}
.sidebar ul li .bx-search {
  position: absolute;
  /* z-index: 99; */
  color: var(--mytextcolor);
  font-size: 22px;
  transition: all 0.5 ease;
}
.sidebar ul li .bx-search:hover {
  /*
  background: var(--myhovercolor);
  color: var(--myhovercolortext);
  */
  color: black;
}
.sidebar ul li a {
  color: var(--mytextcolor);
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 12px;
  white-space: nowrap;
  transition: all 0.4s ease;
}
.sidebar ul li a:hover {
  background: linear-gradient(45deg,#dff9fb, #81ecec, #c7ecee, #c7ecee);
  color: black;
  background-size: 400% 400%;
	animation: gradient 5s ease infinite;
  animation-direction: normal;
}
.sidebar ul li i {
  font-size: 18px;
  font-weight: 400;
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
  line-height: 50px;
  text-align: center;
}
.sidebar .links_name {
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}
.sidebar.active .links_name {
  transition: 0s;
  opacity: 1;
  pointer-events: auto;
}
.sidebar .profile_content {
  position: absolute;
  color: var(--mytextcolor);
  bottom: 0;
  left: 0;
  width: 100%;
}
.sidebar .profile_content .profile {
  position: relative;
  padding: 10px 6px;
  height: 60px;
  background: none;
  transition: all 0.4s ease;
}
.sidebar.active .profile_content .profile {
  background: #1d1b31;
}
.profile_content .profile .profile_details {
  display: flex;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  transition: all 0.4s ease;
}
.sidebar.active ~ .profile .profile_details {
  opacity: 1;
  pointer-events: auto;
}
.profile .profile_details img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 12px;
}
.profile .profile_details .name_job {
  margin-left: 10px;
}
.profile .profile_details .name {
  font-size: 15px;
  font-weight: 400;
}
.profile .profile_details .job {
  font-size: 12px;
}
.profile #log_out {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 50px;
  line-height: 50px;
  font-size: 20px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.4s ease;
  background: var(--mysidebarcolor);
}
.sidebar.active .profile #log_out {
  left: 88%;
}
.sidebar.active .profile #log_out {
  background: none;
}

/* .sidebar.active ~ .home_content {
  z-index: 100;
} */
.home_content .text {
  font-size: 25px;
  font-weight: 500;
  color: var(--mysidebarcolor);
  margin: 12px;
}

.sidebar.active ~ .home_content {
  width: calc(100% - 240px);
  left: 240px;
}

.home_content {
  position: absolute;
  height: 100vh;
  width: calc(100% - 78px);
  left: 78px;
  transition: all 0.5s ease;
  background: linear-gradient(45deg,#dff9fb, #81ecec, #c7ecee, #81ecec);
  background: #81ecec; 
  background: linear-gradient(45deg,#dff9fb, #81ecec, #c7ecee);
  background: linear-gradient(45deg,#dff9fb, #81ecec, #c7ecee, #81ecec);
  background: #ecf0f1;
  background: #1abc9c;
  background: #f1c40f;
  background: #ffbe76;
  background: #ea8685;
  background: #f7d794;
  background: #3498db;
  background: #130f40;
  background: lightcyan;
  background: lightblue;
  background: #c7ecee;
}

.content-body {
  min-height: 100%;
  padding-top: 10px;
  padding-left: 35px;
  padding-right: 35px;
  padding-bottom: 35px;
  background: linear-gradient(45deg,#dff9fb, #81ecec, #c7ecee, #81ecec);
  background: #81ecec; 
  background: linear-gradient(45deg,#dff9fb, #81ecec, #c7ecee);
  background: linear-gradient(45deg,#dff9fb, #81ecec, #c7ecee, #81ecec);
  background: #ecf0f1;
  background: #1abc9c;
  background: #f1c40f;
  background: #ffbe76;
  background: #ea8685;
  background: #f7d794;
  background: #3498db;
  background: #130f40;
  background: lightcyan;
  background: lightblue;
  background: #c7ecee;
}



@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}


</style>