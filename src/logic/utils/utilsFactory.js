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

}

export default UtilsFactory