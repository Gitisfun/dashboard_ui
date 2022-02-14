<template>
  <div class="modal-card box" style="width: auto; padding: 25px">
    <Subtitle text="Opgepast!" />
    <hr>
    <div id="confirmation-content-box">
      <p>{{ message }}</p>
    </div>
    <div class="levels">
      <div class="level-left">
        <div class="level-item"></div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <GenericBtn text="Ja, verwijder" btnStyle="danger" @clicked="confirm" />
        </div>
        <div class="level-item">
          <GenericBtn text="Nee, annuleer" btnStyle="basic" @clicked="cancel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Subtitle from "../components/textfields/Subtitle.vue";
import GenericBtn from "../components/buttons/GenericBtn.vue"

export default {
  name: "ConfirmationModal",
  components: {
    Subtitle,
    GenericBtn
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

<style>
#confirmation-content-box{
  padding-top: 15px;
  padding-bottom: 25px;
}
</style>
