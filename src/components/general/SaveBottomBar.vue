<template>
  <div class="level">
    <div class="level-left"></div>
    <div class="level-right">
      <div class="level-item">
        <GenericBtn text="Opslaan" btnStyle="success" @clicked="save"  />
      </div>
      <div class="level-item">
        <GenericBtn text="Annuleren" @clicked="cancel"  />
      </div>
    </div>
  </div>
</template>

<script>
import GenericBtn from "../buttons/GenericBtn.vue"

export default {
  name: "SaveBottomBar",
  components: {
    GenericBtn
  },
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