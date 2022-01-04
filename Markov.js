const fs = require('fs');

module.exports = class Markov {
    constructor() {
        this.chain = this.loadChain();
    }

    async loadChain() {
        let chain = JSON.parse(fs.readFileSync('./chain.json', 'utf8'));
        return chain;
    }

    async generateChain(string) {
        console.log(this.chain)
        const textArr = string.split(' ');

        for (let i = 0; i < textArr.length - 1; i++) {
            //.replace(/[\W_]/, "").toLowerCase()
            //using two words as key
            const key = `${textArr[i]}`;
            const value = textArr[i + 1];

            // if the key already exists, add the value to already-existing key, else push the key and value to the chain
            if (this.chain[key]) {
                this.chain[key].push(value);
            } else {
                this.chain[key] = [value];
            }
        }
        fs.writeFileSync('./chain.json', JSON.stringify(this.chain));
        return this.chain;
    }

    getChain() {
        return this.chain;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateSentence() {
        const keys = Object.keys(this.chain);
        let startingWord = keys[Math.floor(Math.random() * keys.length)];
        let sentence = ``;

        for (let i = 0; i < this.getRandomInt(8, 18); i++) {
            sentence += startingWord + ' ';
            // console.log(i, startingWord);

            if (this.chain[startingWord]) {
                let nextWord = this.chain[startingWord][Math.floor(Math.random() * this.chain[startingWord].length)];
                startingWord = nextWord;
            } else {
                break;
            }
        }

        return sentence;
    }

    generateSentence1() {
        const keys = Object.keys(this.chain);
        let sentence = '';

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const values = this.chain[key];

            const rand = Math.floor(Math.random() * values.length);
            sentence += values[rand] + ' ';
        }
        return sentence;
    }
}