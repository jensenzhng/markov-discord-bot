require('dotenv').config()
const Markov = require('./Markov.js');
const markov = new Markov();
const {Collection, Client} = require('discord.js');
const client = new Client();

client.on('ready', async() => {
    console.log(`logged in as ${client.user.tag}`);
    await markov.loadChainFromFile();
    // let x = await fetchMore(client.channels.cache.get('887043793147265134'), 1000);
    // x.filter((msg) => {if(!msg.author.bot){markov.generateChain(msg.content);}});
})

client.on('message', async msg => {
    if (msg.author.bot) return;

    if (msg.content === '!generate') {
        let content = await markov.generateSentence();
        msg.channel.send(content);
        return;
    }

    if (msg.content) {
        markov.generateChain(msg.content);
    }

    let rand = await markov.getRandomInt(4,7);
    if (rand == 5) {
        let content;
        rand = await markov.getRandomInt(4,4);
        if (rand == 4 && msg.content.split.length > 1) {
            let split = msg.content.split(' ')
            content = await markov.generateSentence(split[Math.floor(Math.random() * split.length - 1)]);
        } else { content = await markov.generateSentence(); }

        msg.channel.send(content);
    }
})

async function fetchMore(channel, limit = 1000) {
    if (!channel) {
      throw new Error(`Expected channel, got ${typeof channel}.`);
    }
    if (limit <= 100) {
      return channel.messages.fetch({ limit });
    }
  
    let collection = new Collection();
    let lastId = null;
    let options = {};
    let remaining = limit;
  
    while (remaining > 0) {
      options.limit = remaining > 100 ? 100 : remaining;
      remaining = remaining > 100 ? remaining - 100 : 0;
  
      if (lastId) {
        options.before = lastId;
      }
  
      let messages = await channel.messages.fetch(options);
  
      if (!messages.last()) {
        break;
      }
  
      collection = collection.concat(messages);
      lastId = messages.last().id;
    }
  
    return collection;
}

client.login(process.env.TOKEN).catch(err => {console.log(err);})