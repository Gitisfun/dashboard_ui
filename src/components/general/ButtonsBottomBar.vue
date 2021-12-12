<template>
  <div class="level">
    <div class="level-left">
      <div v-if="isUpdate" class="level-item">
        <GenericBtn text="Verwijderen" btnStyle="danger" @clicked="deleteItem"  />
      </div>
    </div>
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
  name: "ButtonsBottomBar",
  components: {
    GenericBtn
  },
  data(){
    return {
      isUpdate: false
    }
  },
  methods: {
    setIsUpdate(value){
      this.isUpdate = value
    },
    save() {
      this.$emit("save");
    },
    cancel() {
      this.$emit("cancel");
    },
    deleteItem(){
      this.$emit("deleteItem");
    }
  },
};
</script>