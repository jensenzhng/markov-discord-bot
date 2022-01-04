module.exports = class Markov {
    constructor() {
        this.string = '';
        this.chain = {};
    }

    setString(string) { 
        this.string = string;
        return this.string
    }

    getString() {
        return this.string;
    }

    async generateChain() {
        const textArr = this.string.split(' ');

        for (let i = 0; i < textArr.length - 1; i++) {
            //using two words as key
            const key = `${textArr[i].replace(/[\W_]/, "").toLowerCase()}`;
            const value = textArr[i + 1].replace(/[\W_]/, "").toLowerCase();

            // if the key already exists, add the value to already-existing key, else push the key and value to the chain
            if (this.chain[key]) {
                this.chain[key].push(value);
            } else {
                this.chain[key] = [value];
            }
        }
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
        console.log(this.chain);

        for (let i = 0; i < this.getRandomInt(8, 18); i++) {
            // console.log(i, startingWord);
            sentence += startingWord + ' ';
            let nextWord = this.chain[startingWord][Math.floor(Math.random() * this.chain[startingWord].length)];
            // sentence += ` ${nextWord}`;
            startingWord = nextWord;
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