const TrieNode = require("./TrieNode").TrieNode;
/**
 * Trie data structure
 * https://www.youtube.com/watch?v=CX777rfuZtM
 */
class Trie {
    constructor() {
        this.rootNode = new TrieNode('');
    }
    insert(word) {
        const wordLength = word.length;
        var node = this.rootNode;
        for (let index = 0; index < wordLength; index++) {
            const letter = word[index];
            //check if the letter is part of the node's children
            if (node.children[letter]) {
                node = node.children[letter];
            }
            else {
                // new leter , insert i
                var newNode = new TrieNode(letter);
                node.children[letter] = newNode;
                node = newNode;
            }
        }
        node.isWordComplete = true;
    }
    find(word) {
        const wordLength = word.length;
        var node = this.rootNode;
        for (let index = 0; index < wordLength; index++) {
            const letter = word[index];
            if (node.children[letter]) {
                node = node.children[letter];
            }
            else {
                return false;
            }
        }
        return true;
    }
}

const trie = new Trie();
trie.insert('foo');
trie.insert('foot')
trie.insert('football');

console.log(trie.find('footb'));