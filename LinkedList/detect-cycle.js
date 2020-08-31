/**
 Given a singly linked list, determine if it has a cycle. If it has cycle , return the node where cycle starts, else return null

 ALGO:
 1. Find if cycle exists. Returns null, if no cycle else returns a node
 2. Find start node of the cycle.

 1 is based on slow-fast pointer technique. 
 Initialise 2 pointers (slow, fast). Both point to head
slow moves 1 step and fast moves 2 steps
If there is a cycle, slow and fast will meet at a node
return node, else return null
NOTE: Important is how to write while condition

2 :
Initialise a pointer pointing to head.
while head != node
   move head one step
   move node one step
   when they meet , that node is thet start of a cycle. return that node
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    const node = getCycleNode();
    return node == null ? null: getCycleStartNode(node)
    
    function getCycleNode(){
        let slow = head, fast = head;
        while(slow && fast && fast.next){
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast){
                return slow;
            }
        }
        return null;
    }
    
    function getCycleStartNode(node){
        let temp = head;
        while(temp !== node){
            temp = temp.next;
            node = node.next;
        }
        return node;
    }
};

const request = {
    params: 1
}

function get(request){
    const {params,payload} = request;
    const evaluate = payload == null || payload.evaluate === null || payload.evaluate === true;
    console.log(evaluate);
}

get(request);