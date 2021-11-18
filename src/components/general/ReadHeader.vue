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
          <GenericBtn text="Aanpassen" btnStyle="warning" @clicked="edit"  />
        </div>
        <div class="level-item">
          <GenericBtn text="Terug" @clicked="back"  />
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
  name: "ReadHeader",
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
    edit() {
      this.$emit("edit");
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
