<template>
  <div class="content-body">
    Statistieken
    <div><b-button @click="clickMe">Socket activate</b-button></div>
  </div>
</template>

<script>
// import io from "socket.io-client";
import Socket from "../logic/factories/socketFactory"
import socketMixin from "../mixins/socketMixin"

export default {
  name: "Statistieken",
  mixins: [socketMixin],
  mounted() {
    Socket.listen(this.socket, Socket.CLICKED, () => {
      console.log("data");
    })
  },
  methods: {
    clickMe() {
      this.socket.emit("clicked");
    },
  },
};
</script>

<style></style>
