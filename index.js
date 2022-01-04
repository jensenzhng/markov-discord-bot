const Markov = require('./Markov.js');
let markov = new Markov();
markov.setString('I am a cat');
console.log(markov.getString());