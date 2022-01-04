const Markov = require('./Markov.js');
const markov = new Markov();
// const Discord = require('discord.js');
// const client = new Discord.Client();

// client.on('ready', () => {
//     console.log(`logged in as ${client.user.tag}`);
// })



(async() => {
    await markov.loadChainFromFile();
    // await markov.generateChain('Hey, its me');
    // await markov.generateChain('bruh moment this doesnt work');

    console.log(markov.generateSentence());
})();