import moment from "moment";
import store from "../../store";

class UtilsFactory {
  
  static isTokenExpired(){
    const formula = store.getters.getUser.exp * 1000
    const expireDate = moment(formula)

    if(moment().isBefore(expireDate)){
      return false
    }
    return true
  }

  static copyObject(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  static searchName(list, id){
    if (list.length == 0) {
      return "";
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        return list[i].naam;
      }
    }
    return "";
  }

  static max(list){
    let highest = 0;
    for(let i = 0; i < list.length; i++){
      if(list[i].id > highest){
        highest = list[i].id
      }
    }
    return highest;
  }
  
  static deleteItemFromList(list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list.splice(i, 1);
      }
    }
  }
}

export default UtilsFactory