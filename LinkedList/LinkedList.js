class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
    }

    add(value){
        let node = new Node(value);
        if(this.head == null){
            this.head = node;
            return this;
        }
        let temp = this.head;
        this.head = node;
        node.next = temp;
        return this;
    }

    print(){
        let temp = this.head;
        while(temp.next != null){
            console.log(temp.value);
            temp = temp.next;
        }
    }

    addWithLoop(array){
        array.forEach(element => {
            this.add(element);
        });
        let temp = this.head;
        while(temp.next != null){
            temp = temp.next;
        }
        temp.next = this.head;
        return this;
    }

    hasLoop(){
        if(this.head == null || this.head.next == null){
            return false;
        }
        let slow = this.head,
            fast = slow.next.next;
        while(slow.next != null && fast != null){
            if(slow === fast){
                return true;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return false;
    }
}

module.exports = {
    LinkedList,
    Node
}