<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <SmallTitle :text="title" />
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <b-button size="is-small" type="is-success" @click="add">
          Toevoegen
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import SmallTitle from "../textfields/SmallTitle.vue";

export default {
  name: "SmallHeaderAdder",
  components: {
    SmallTitle,
  },
  props: {
    title: {
      type: String,
    },
  },
  methods: {
    add() {
      this.$emit("add");
    },
  },
};
</script>