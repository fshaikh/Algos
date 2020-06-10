const Node = require('./LinkedList').Node;
const LinkedList = require('./LinkedList').LinkedList;

function add(l1, l2) {
  let sumList = new Node(), 
    temp = sumList,
    carry = 0;
  while (l1 != null || l2 != null) {
    let sum =
      (l1 != null ? l1.value : 0) + (l2 != null ? l2.value : 0) + carry;
    carry = sum > 9 ? 1: 0;
    let nodeVal = sum % 10;
    temp.next = new Node(nodeVal);
    temp = temp.next;
    if(l1 != null){
        l1 = l1.next;
    }
    if(l2 != null){
        l2 = l2.next;
    }
  }
  if(carry > 0){
      temp.next = new Node(carry);
  }
  return sumList.next;
}

const l1 = new LinkedList();
l1.add(9);
l1.add(9);
l1.add(9);
l1.add(9);

const l2 = new LinkedList();
l2.add(9);
l2.add(9);
l2.add(9);
l2.add(9);

l2.add(9);
l2.add(9);


let sumList = add(l1.head,l2.head);
while(sumList != null){
    console.log(sumList.value);
    sumList = sumList.next;
}
