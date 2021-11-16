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
          <b-button size="is-small" type="is-warning" @click="edit">
            Aanpassen
          </b-button>
        </div>
        <div class="level-item">
          <b-button size="is-small" type="is-dark" @click="back">
            Terug
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
  name: "ReadHeader",
  components: {
    Subtitle,
  },
  props: {
    title: {
      type: String,
    },
  },
  methods: {
    edit() {
      this.$emit("edit");
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
