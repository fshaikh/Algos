
/**
 * DisjointSet is a data structure which has the following operations:
 *     Find - Determines membership of an element in a set
 *     Union - Creates a union of 2 sets of which the passed in elements are part of. Must be idempotent
 *     IsConnected - Determines if the 2 elements are part of the same set
 *     Extract - Returns all the disjoint sets
 * 
 *  DisjointSet is useful in various scenarios :
 *          - finding cycle in an undirected graph
 *          - Kruskal algorithm for minimum cost spanning tree
 *          - etc
 * 
 *  The basic idea is that you have a set of elements which are all distinct. However, this set
 * can be partitioned into disjoint(non-overlapped) subset where each subset has related elements.
 * 
 * General workflow for using the data structure is:
 *   - Provide all the distinct elements (DisjointSet internally will create separate set for each element 
 *     i.e. all the elements are not related)
 *   - Call union(element1, element2) (DisjointSet will merge the 2 sets to which element1 and element2 belong)
 *   - Keep calling union to establish the relationships
 *   - Call find(element) to determine membership 
 *     Call isConnected(element1,element2) to determine if 2 elements belong to the same set
 *   
 *  Algorithms:
 *     There are a few ways of implementing DisjointSet. The most efficient is 
 *     "Union By Rank and Path Compression".
 *     Union By Rank - When performing a union between 2 sets, one needs to decide which element 
 *                     will become the representative of the new set. For eg: consider 2 sets:
 *                     S1 = {1,2,3}  S2 = {4,5}, and union is called as union(2,4) and new set will be S3 = {1,2,3,4,5}
 *                     Suppose 1 is the representative element (aka parent) of S1
 *                     and 4 is the representative element of S2. Now we need to decide which will be the 
 *                     representative element of the new set S3 (1 or 4).
 *                     In "Union by Rank", the representative element with a higher rank will be selected. For eg:
 *                     Rank of 1 = 3 and Rank of 4 = 2, since Rank of 1(3) > Rank of 4(2) , 1 will be the representative
 *                     element.
 *                     Question now arises as to what determines the value of rank. One appraoch is to consider
 *                     how many elements a set contains. So S1 contains 3 and S2 contains 2, so the rank of 1 = 3 and 4 = 2
 *                     The idea is to always attach smaller depth tree under the root of the deeper tree
 * 
 *     Path Compression - 
 *                  TBD 
 *     Idempotent Union - 
 *                  Done
 * 
 * Complexity:
 *    Time :
 *    Space: 
 */

class SetElement {
    constructor(value, parent, rank) {
        this.value = value;
        this.parent = parent;
        this.rank = rank;
    }
}

class RankInfo {
    constructor(parent, normalizedRank) {
        this.parentElement = parent;
        this.normalizedRank = normalizedRank;
    }
}

class DisjointSet {
    //#region Public Constructors
    constructor(elements) {
        this.initialize();
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const setElement = new SetElement(element, this._parent, this._seedRank);
            this._sets[element] = setElement;
            this.disjointSets.set(setElement, [setElement]);
        }
        // elements.forEach(element => {
        //     this._sets
        //     this._sets.push(new SetElement(element, this._parent, this._seedRank));
        // });
    }
    //#endregion Public Constructors

    //#region Public Functions
    /**
     * If both elements belong to the same set, do nothing.
     * If both elements belong to different set:
     *   - Create a union of the 2 sets i.e S1 U S2 (all elements of S1 and S2 now belong to a new set)
     *   - Mark an element as a representative 
     * @param {*} element1 
     * @param {*} element2 
     */
    union(element1, element2) {
        const setElement1 = this._getSetElement(element1);
        const setElement2 = this._getSetElement(element2);

        // First check if both elements are present in the universal set
        if (setElement1 == null || setElement2 == null) {
            throw new Error('Cannot perform union as one of the elements is invalid')
        }

        // If both elements have the same parent ( same set)
        const rootParent1 = this._getRootParent(setElement1);
        const rootParent2 = this._getRootParent(setElement2);

        if (rootParent1.value === rootParent2.value) {
            // return
            return false;
        }

        // 4. If both elements have different parent (different set), do the union
        const representativeElement = this._getRepresentativeElement(setElement1, setElement2);
        const other = rootParent1.value !== representativeElement.value ? rootParent1 : rootParent2;
        // Change the parent of the other set
        other.parent = representativeElement.value;
        // Change the rank of the representative element
        representativeElement.rank = this._getNewRank(representativeElement, other.rank)

        // For faster extract, add to disjointSet
        this._addToDisjointSet(representativeElement, other);
        return true;
    }

    /**
     * Returns the set in which the given element has membership of
     * @param {*} element - Element to find membership for 
     */
    find(element) {

    }

    /**
     * Checks if the passed in elements are connected i.e they belong to the same set.
     * This can be used in scenarios where user needs to find connectivity between 2 elements
     * @param {*} element1 
     * @param {*} element2 
     */
    isConnected(element1, element2) {
        const setElement1 = this._getSetElement(element1);
        const setElement2 = this._getSetElement(element2);

        // If both elements have the same parent ( same set)
        const rootParent1 = this._getRootParent(setElement1);
        const rootParent2 = this._getRootParent(setElement2);

        return rootParent1.value === rootParent2.value;
    }

    /**
     * Extracts disjoint sets
     * @param {Boolean} simple -  
     */
    extract(simple = true) {
        return Array.from(this.disjointSets.values())
            .map(value => {
                return simple ?
                    this._extractSimpleValues(value) :
                    this._extractCompleteSet(value);
            });
    }

    //#endregion Public Functions

    //#region Private Functions
    /**
     * Initializes the state 
     */
    initialize() {
        this._sets = [];
        this._seedRank = -1;
        this._parent = -1;
        // key => representative element
        // value => array of set elements
        this.disjointSets = new Map();
    }
    /**
     * Returns the parent of the element (or the set the element belongs to)
     * @param {*} element 
     */
    _getParent(setElement) {
        return setElement.parent === this._parent ? setElement.value : setElement.parent;
    }

    /**
     * Determines if the 2 elements have the same parent (belong to the same set)
     * @param {*} element1 
     * @param {*} element2 
     */
    _hasSameParent(setElement1, setElement2) {
        return this._getParent(setElement1) === this._getParent(setElement2);

    }

    /**
     * Gets the root parent for a set element. It backtracks till it finds a set element whose
     * parent is -1. A set element with parent value -1 is the root parent or representative element
     * of the set
     * @param {*} setElement - Set element whose root parent is to be found
     */
    _getRootParent(setElement) {
        let temp = setElement;
        while (temp.parent !== this._parent) {
            temp = this._getSetElement(temp.parent);
        }
        return temp;
    }

    /**
     * Returns the rank of an element. If the element is the representative element of the set,
     * returns the rank of the same element, else returns the rank of the root parent element.
     * @param {*Element} setElement 
     */
    _getRankInfo(setElement) {
        const temp = this._getRootParent(setElement);
        return new RankInfo(temp, temp.rank * this._seedRank);
    }

    _getSetElement(element) {
        return this._sets[element];
    }

    /**
     * Returns the representative element for the new set
     * @param {*} element1 
     * @param {*} element 
     */
    _getRepresentativeElement(setElement1, setElement2) {
        const rankInfo1 = this._getRankInfo(setElement1);
        const rankInfo2 = this._getRankInfo(setElement2);
        return rankInfo1.normalizedRank >= rankInfo2.normalizedRank ?
            rankInfo1.parentElement : rankInfo2.parentElement;
    }

    /**
     * Returns the new rank for a set element
     * @param {*} setElement - Element whose rank is to be changed 
     * @param {*} delta - Value to increase the rank by
     */
    _getNewRank(setElement, delta) {
        return setElement.rank + delta;
    }

    _addToDisjointSet(representativeElement, other) {
        const values = [];
        const currentValues = this.disjointSets.get(representativeElement);
        values.push(...currentValues);
        values.push(...this.disjointSets.get(other));

        this.disjointSets.set(representativeElement, values);
        this.disjointSets.delete(other);
    }

    _extractSimpleValues(value) {
        return [...value.map(v => v.value)];
    }

    _extractCompleteSet(value) {
        return [...value];
    }
    //#endregion Private Functions
}

module.exports = {
    DisjointSet
}