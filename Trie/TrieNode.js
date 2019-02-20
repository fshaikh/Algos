class TrieNode {
    constructor(value) {
        this.letter = '';
        this.children = {};
        this.isWordComplete = false;
        this.letter = value;
    }
}
exports.default = TrieNode;
