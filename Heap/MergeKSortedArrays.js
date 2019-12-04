const LinkedList = require('../LinkedList/LinkedList').LinkedList;
const mergeKLists = (lists) => {
    let mergedArray = [];
    
    lists.forEach((list) => {
        mergedArray.push(..._getListItems(list));
    });
    mergedArray.sort((a,b) => b - a);
    const mergedLinkedList = new LinkedList();
    mergedArray.forEach(item => {
        mergedLinkedList.add(item);
    })

    return mergedLinkedList;
};

function _getListItems(list){
    if(list == null || list.length === 0){
        return [];
    }
    let temp = list.head;
    let array = [];
    while(temp != null){
        array.push(temp.value);
        temp = temp.next;
    }
    return array;
}

mergeKLists(
    [
        new LinkedList()
  .add(5)
  .add(4)
  .add(1),
  new LinkedList()
  .add(4)
  .add(3)
  .add(1),
  new LinkedList()
  .add(6)
  .add(2)
    ]
).print();
// mergeKLists(
//     [
//         new LinkedList()
//   .add(1)
  
//     ]
// ).print();