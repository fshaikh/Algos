class Node {
    constructor(value){
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class CacheValue {
    constructor(key,value){
        this.key = key;
        this.value = value;
    }
}

class LRUCache{
    constructor(capacity){
        this.capacity = capacity;
        this.count = 0;
        this.map = new Map();
        this.head = null;
        this.tail = null;
    }

    get(key){
        const node =  this.map.get(key);
        // since the node has been recently accessed, we need to put to the head
        if(this.head.next != null){
            this._adjustForRecentAccess(node);
        }
        
        return node != null ? node.value.value : -1;
    }

    put(key,value){
        // add the new node to the head of the dll
        const newNode = this._getNode(key, value);
        // add the new node to the map for faster lookup
        this.map.set(key,newNode);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }else{
            this._adjustForRecentAccess(newNode);
        }
        
        // check if current count has exceeded capacity
        if(this.count < this.capacity){
                
        }else{
            // need to evict the least recently used key i.e tail

            // remove from the map
            this.map.delete(this.tail.value.key);
            // adjust the tail
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.count++;
    }

    _getNode(key,value){
        const node = new Node();
        node.value = new CacheValue(key,value);
        return node;
    }

    _adjustForRecentAccess(newNode){
        // reset the newly added node to the head as it has been recently accessed
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
    }
}

const cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // returns 1
// cache.put(3, 3);    // evicts key 2
console.log(cache.head);
//cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4