/**
Given a string consisting of adjacent duplicate characters, rearrange string so that adjacent duplicate characters are
k-distance apart.
Example:
Input: str = ccaaaab , k = 2
Output: str = acacaba

ALGO:
1. Count frequency of each character. For eg: a = 4, c = 2, b = 1
2. Create a max-heap of the above
3. Create a cooling-off queue of size k
4. do while max-heap is not empty
5.    Remove the top from the heap
6.    Decrement the count, add to modified string, add to queue
7.    If queue size > K
8.       add queue item to max-heap. Do not add if item's count is 0
 */