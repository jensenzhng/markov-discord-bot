const Markov = require('./Markov.js');
const markov = new Markov();


(async() => {
    await markov.generateChain('Frustrated by his failure to properly plan for the massive traffic jam along I-95, local driver Ken Boswell was reportedly kicking himself Tuesday for eating the entire hitchhiker he had picked up before getting stuck in last night’s snowstorm.');

    console.log(markov.generateSentence());
})();