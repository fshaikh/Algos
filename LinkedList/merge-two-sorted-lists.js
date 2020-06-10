/**
 Merge two sorted linked lists and return it as a new sorted list.
The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
 */

 /**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let sortedListHead = new ListNode();
    let temp = sortedListHead;
    while(l1 !== null && l2 !== null){
        if(l1.val <= l2.val){
            temp.next = l1;
            l1 = l1.next
        }else{
            temp.next = l2;
            l2 = l2.next;
        } 
        temp = temp.next;
    }
    temp.next = l1 == null ? l2 : l1;
   
    return sortedListHead.next;
};