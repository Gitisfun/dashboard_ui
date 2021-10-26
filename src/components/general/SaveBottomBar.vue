<template>
  <div class="level">
    <div class="level-left"></div>
    <div class="level-right">
      <div class="level-item">
        <b-button size="is-small" type="is-success" @click="save">
          Opslaan
        </b-button>
      </div>
      <div class="level-item">
        <b-button size="is-small" type="is-dark" @click="cancel">
          Annuleren
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveBottomBar",
  methods: {
    save() {
      this.$emit("save");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style></style>
