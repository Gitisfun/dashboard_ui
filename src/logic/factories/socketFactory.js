import io from "socket.io-client";

class Socket {

  static getConnection() {
    return io("https://comagex-api.herokuapp.com/");
  }

  static CLICKED = "clicked"
  static AANKOPEN = "aankopen"
  static VERKOPEN = "verkopen"
  static CREDITNOTAS = "creditnotas"
  static ARTIKELS = "artikels"
  static LEVERANCIERS = "leveranciers"
  static KLANTEN = "klanten"
  static SUNDROPS = "sundrops"
  static ANDERE = "andere"
  static INSTELLINGEN = "instellingen"
  
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
