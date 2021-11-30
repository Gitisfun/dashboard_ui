import io from "socket.io-client";

class Socket {

  static getConnection() {
    return io("http://localhost:5000/"); // TODO: Replace with env variable
  }

  static CLICKED = "clicked"
  static ARTIKELS = "artikels"
  static LEVERANCIERS = "leveranciers"
  static KLANTEN = "klanten"
  static ANDERE = "andere"
  
  static listen(socket, from, refresh) {
    socket.on(from, (data) => {
      if (data) {
        refresh();
      }
    });
  }

  static notify(socket, to) {
    socket.emit(to);
  }

}

export default Socket;
