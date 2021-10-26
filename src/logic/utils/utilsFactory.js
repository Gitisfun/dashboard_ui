function copyObject(obj){
  return JSON.parse(JSON.stringify(obj));
}

function deleteItemFromList(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
    }
  }
}

export default {
  copyObject, deleteItemFromList
}