<template>
  <div class="message-top-row">
      <div class="message-top-row-column-left">
          <i style="color: green" class='bx bxs-circle' ></i>
      </div>
      <div class="message-top-row-column-middle">
          <p>Bob Mundo</p>
          <p style="font-size: 14px; color: grey; margin-top: 5px">Dit is de body van het bericht...</p>
      </div>
      <div class="message-top-row-column-right">
          <p>16:45</p>
      </div>
  </div>
</template>

<script>
export default {
    name: "Message"
}
</script>

<style>
.message-top-row {
  display: flex;
  border-radius: 3px;
  border: 1px solid white;
  padding: 20px;
  background: white;
  color: black;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}

.message-top-row:hover {
  border: 1px solid lightgrey;
  background: lightgrey;
  color: black;
}

.message-top-row:active {
  border: 1px solid #dff9fb;
  background: #dff9fb;
  color: black;
}

.message-top-row-column-left{
  flex: 10%;
}
.message-top-row-column-middle{
  flex: 70%;
}

.message-top-row-column-right{
  flex: 20%;
  text-align: end;
}
</style>