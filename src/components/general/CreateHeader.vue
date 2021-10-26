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
          <b-button size="is-small" type="is-success" @click="save">
            Opslaan
          </b-button>
        </div>
        <div class="level-item">
          <b-button size="is-small" type="is-dark" @click="back">
            Annuleren
          </b-button>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import Subtitle from "../textfields/Subtitle.vue";

export default {
  name: "CreateHeader",
  components: {
    Subtitle,
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
      this.$router.go(-1);
    },
  },
};
</script>