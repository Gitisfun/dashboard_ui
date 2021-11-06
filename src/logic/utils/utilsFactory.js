class UtilsFactory {
  
  static copyObject(obj){
    return JSON.parse(JSON.stringify(obj));
  }
  
  static deleteItemFromList(list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list.splice(i, 1);
      }
    }
  }

  static convertBoolToInt(value){
    if(value){
      return 1
    }
    return 0
  }

  static convertIntToBool(value){
    if(value == 1){
      return true
    }
    return false
  }

}

export default UtilsFactory