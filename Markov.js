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

        for (let i = 0; i < textArr.length - 2; i++) {
            const key = `${textArr[i]} ${textArr[i + 1]}`;
            const value = textArr[i + 2];

            if (this.chain[key]) {
                this.chain[key].push(value);
            } else {
                this.chain[key] = [value];
            }
        }
        return this.chain;
    }
}