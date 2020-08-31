class TrieNode {
    constructor(value) {
        this.children = {};
        this.isWordComplete = false;
        this.letter = value || '';
    }
}
module.exports = {
    TrieNode
}
