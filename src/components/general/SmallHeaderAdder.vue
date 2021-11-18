<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <SmallTitle :text="title" />
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <GenericBtn text="Toevoegen" btnStyle="success" @clicked="add"  />
      </div>
    </div>
  </div>
</template>

<script>
import SmallTitle from "../textfields/SmallTitle.vue";
import GenericBtn from "../buttons/GenericBtn.vue"

export default {
  name: "SmallHeaderAdder",
  components: {
    SmallTitle,
    GenericBtn
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