/**
 * Given a single Linked list, delete nth element from the end of the list
 * @param {*} head 
 * @param {*} n 
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const temp = new ListNode();
    temp.next = head;
    
    let first = temp, second = temp;
    for(let i=0;i<=n;i++){
        second = second.next;
    }
    while(second !== null){
        first = first.next;
        second = second.next;
    }
    first.next = first.next.next;
    return temp.next;
};

// Key Learnings:
// 1. Add a "dummy" node, which points to the list head. For handling some corner cases such as a list with only one node,
//    or removing the head of the list

// 2. n=> keep two pointers "n" nodes apart. Initially both "first" and "second" point to dummy node.
//  Move second pointer till it is "n" nodes apart from "first" node.
//    

// 3. Now move both "first" and "second" by one , till second is not null. At this time, "first"
//  will be pointing to one node before the one to be deleted  