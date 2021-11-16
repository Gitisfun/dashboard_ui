<template>
  <div class="content-body">
    <div class="box">
      <div class="level">
        <div class="level-right">
          <div class="level-item">Test</div>
        </div>
        <div class="level-left">
          <div class="level-item">
            <CustomButton text="Verwijderen" @click="clickMe" />
          </div>
        </div>
      </div>
    </div>
    <b-button @click="clickMe">Click me</b-button>
  </div>
</template>

<script>
import CustomButton from "../components/buttons/CustomBtn.vue";

export default {
  name: "Home",
  components: {
    CustomButton,
  },
  methods: {
    clickMe() {},
  },
};
</script>
