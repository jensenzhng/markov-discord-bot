const Markov = require('./Markov.js');
const markov = new Markov();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
})

client.login('ODU2OTk3MzI2MDUxNjA2NTU4.YNJK9A.EBdORGnICSoaW_4e3MgPQtPtIkI').catch(err => {console.log(err);})

// (async() => {
//     await markov.loadChainFromFile();

//     console.log(markov.generateSentence());
// })();