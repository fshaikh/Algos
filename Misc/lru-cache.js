function Node(key,value,prev,next){
    this.value = value;
    this.key = key;
    this.prev = prev;
    this.next = next;
}

class DoubleLinkedList{
    constructor(){
        this.head = new Node('Head','Head');
        this.tail = new Node('Tail','Tail');
    }

    createNode(value,prev,next){
        return new Node(value,prev,next);
    }

    addNodeToHead(node){
        if(this.head.next == null || this.head.next == this.tail){
            this.head.next = node;
            node.prev = this.head;
            this.tail.prev = node;
            node.next = this.tail;
        }else{
            node.next = this.head.next;
            node.prev = this.head;
            this.head.next.prev = node;
            this.head.next = node;
        }
    }

    moveNodeToHead(node){
        // head node
        if(node.prev === this.head){
            return node;
        }
        // tail node
        if(node.next === this.tail){
            this.tail.prev = node.prev;
            node.prev.next = this.tail;
            this.addNodeToHead(node);
            return node;
        }
        // internal node
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.addNodeToHead(node);
        return node;
    }

    removeTailNode(){
        const tailNode = this.tail.prev;
        const tailKey = tailNode.key;
        this.tail.prev = tailNode.prev;
        tailNode.prev.next = this.tail;
        return tailKey;
    }

    print(){
        let temp = this.head;
        const nodes = [];
        while(temp !== this.tail){
            nodes.push(temp)
            temp = temp.next;
        }
        return nodes;
    }
}

class LruCache {
    constructor(capacity){
        this.capacity = capacity;
        this.map = new Map(); // key = key, value = pointer to node in DLL
        this.list = new DoubleLinkedList(); // value = value
    }

    put(key,value){
        let node = this.map.get(key);
        // if key already exists, update the value in map
        if(node){
            // update the value in node
            node.value = value;
            // move to head of list
            this.list.moveNodeToHead(node);
        }else{
            // if key does not exist
            // create a node   
            const newNode = this.createNode(key,value);
            //   if not enough capacity
            if(this.size() >= this.capacity){
                //  remove tail node
                const tailKey = this.list.removeTailNode();
                //  remove key associated with node from map
                this.map.delete(tailKey);
            }
            //   move to head of list  
            this.list.addNodeToHead(newNode);
            //   add key to map  
            this.map.set(key,newNode);
        }
    }

    get(key){
        // if key does not exist in map, return null
        let node = this.map.get(key);
        if(node == null){
            return -1;
        }
        // if key exists:
        //    get the value associated with the key
        const value = node.value;
        //    move to head of list
        this.list.moveNodeToHead(node);
        return value;
    }

    size(){
        return this.map.size;
    }

    createNode(key,value){
        return this.list.createNode(key,value);
    }
}

const cache = new LruCache(1);
cache.put(2, 1);
console.log(cache.get(2));
cache.put(3, 2);
console.log(cache.get(2));
console.log(cache.get(3));
console.log(cache.list.print().map(node => node.key));