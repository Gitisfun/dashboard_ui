<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Opgepast!" />
    <p>{{ message }}</p>
    <b-button @click="confirm">Ja</b-button>
    <b-button @click="cancel">Nee</b-button>
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";

export default {
  name: "ConfirmationModal",
  components: {
    Subtitle,
  },
  data: () => ({
    message: "",
  }),
  created() {
    this.message = this.$attrs.title;
  },
  methods: {
    confirm() {
      this.$emit("confirmation", true);
      this.$parent.close();
    },
    cancel() {
      this.$parent.close();
    },
  },
};
</script>

<style></style>
