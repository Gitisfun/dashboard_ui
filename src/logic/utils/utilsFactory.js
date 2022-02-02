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

  static searchValueById(list, id){
    for(let i = 0; i < list.length; i++){
      if(list[i].id === id){
        return list[i].prijs
      }
    }
    return null  }

  static searchIndexById(list, obj){
    for(let i = 0; i < list.length; i++){
      if(list[i].id === obj.id){
        return i
      }
    }
    return -1
  }
  
  static sum(list, field){
    let sum = 0
    for(let i = 0; i < list.length; i++){
      sum += parseFloat(list[i][field])
    }
    return sum
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

  static roundNumber(number){
    return Math.round(number * 100) / 100
  }

  static substractPercentage(number, percentage){
    return number - (number * percentage)
  }

  static addPercentage(number, percentage){
    return parseFloat(number) + (parseFloat(number) * parseFloat(percentage))
  }

  static date(timestamp){
    return moment(timestamp).format("DD-MM-YYYY");
  }

  static time(timestamp){
    return moment(timestamp).format("HH:mm"); 
  }

  static getAllKeys(obj) {
    return Object.keys(obj);
  }
  
  static getAllValues(obj) {
    return Object.values(obj);
  }

  static replaceNullByZero(value) {
    if (value) return value
    return "0";
  }

}

export default UtilsFactory