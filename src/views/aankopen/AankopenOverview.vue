<template>
  <div style="padding-right: 25px; padding-left: 25px;">
    <div style="padding-right: 35px; padding-left: 35px; padding-top: 25px" class="box">
      <p style="font-size: 20px">Aankopen</p>
      <hr />
      <div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aankopen",
  data: () => ({
    fname: "",
    lname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    country: "",
  }),
  methods: {
    onSubmit() {
      alert("Form submitted!");
    },
  },
};
</script>

<style></style>
