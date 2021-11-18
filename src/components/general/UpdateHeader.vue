<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <Subtitle :text="title" />
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <GenericBtn text="Opslaan" btnStyle="success" @clicked="save" />
        </div>
        <div class="level-item">
          <GenericBtn text="Annuleren" @clicked="back" />
        </div>
        <div class="level-item">
          <GenericBtn text="Verwijderen" btnStyle="danger" @clicked="deleteItem" />
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import Subtitle from "../textfields/Subtitle.vue";
import GenericBtn from "../buttons/GenericBtn.vue"

export default {
  name: "UpdateHeader",
  components: {
    Subtitle,
    GenericBtn
  },
  props: {
    title: {
      type: String,
    },
  },
  methods: {
    save() {
      this.$emit("save");
    },
    back() {
      this.$emit("cancel")
    },
    deleteItem() {
      this.$emit("deleteItem");
    },
  },
};
</script>
