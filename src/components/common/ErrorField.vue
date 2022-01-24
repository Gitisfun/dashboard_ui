<template>
  <div v-show="showError" class="box error-field-box">Vul alle velden correct in</div>
</template>

<script>
export default {
    name: "ErrorField",
    props: {
        showError: {
           type: Boolean, 
           default: false
        }
    }
}
</script>

<style>
.error-field-box{
    background: red; 
    color: white
}
</style>