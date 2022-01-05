const fs = require('fs');

module.exports = class Markov {
    constructor() {
        this.chain = {}
    }

    async loadChainFromFile() {
        return new Promise(async (resolve, reject) => {
            await fs.readFile('./chain.json', 'utf8', (err, data) => {
                if (err) reject(err);

                this.chain = JSON.parse(data);
                resolve(data)
            })
        })
    }

    async setChainInFile() {
        return new Promise(async (resolve, reject) => {
            await fs.writeFile('./chain.json', JSON.stringify(this.chain), (err) => {
                if (err) reject(err);
                resolve(this.chain);
            })
        })
    }

    async generateChain(string) {
        const textArr = string.split(' ');

        for (let i = 0; i < textArr.length - 1; i++) {
            //.replace(/[\W_]/, "").toLowerCase()
            const key = `${textArr[i]}`;
            const value = textArr[i + 1];

            // if the key already exists, add the value to already-existing key, else push the key and value to the chain
            if (this.chain[key]) {
                this.chain[key].push(value);
            } else {
                this.chain[key] = [value];
            }
        }

        //push data to json file
        await this.setChainInFile();
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

    generateSentence(word) {
        const keys = Object.keys(this.chain);
        let sentence = '', startingWord;

        if (word) {
            startingWord = word;
        } else {
            startingWord = keys[Math.floor(Math.random() * keys.length)]; //random starting word
        }

        for (let i = 0; i < this.getRandomInt(8, 28); i++) {
            sentence += startingWord + ' ';

            if (this.chain[startingWord]) { // if the starting word exists in the chain
                let nextWord = this.chain[startingWord][Math.floor(Math.random() * this.chain[startingWord].length)]; //random next word from the starting word
                startingWord = nextWord;
                if (nextWord.endsWith('.') || nextWord.endsWith('?') || nextWord.endsWith('!')) { //if the next word ends with a punctuation mark, break the loop bc it's probably the end of a sentence
                    break;
                }
            } else { // break the loop if the starting word doesn't exist in the chain to prevent errors
                break;
            }
        }

        if (sentence.split(' ').length < 4) { // if the sentence is less than 4 words, generate a new sentence bc ones less than 4 words are boring 
            return this.generateSentence();
        }

        return sentence;
    }
}