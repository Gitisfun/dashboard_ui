class UtilsFactory {
  
  static copyObject(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  static max(list){
    console.log("util factory");
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