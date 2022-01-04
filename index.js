const Markov = require('./Markov.js');
const markov = new Markov();


(async() => {
    markov.setString('No. The very first “alpha” version of the bot was sort of open source, however it wasn’t on any kind of GitLab or GitHub repository, it was just a single file on a Hastebin paste somewhere. That file has long since been deleted, and since then the bot has been closed source. Ideally I’d like to keep it that way, too. However if you’re a Python developer and you’d like to contribute to the bot in some way, do let me know on the support server.');

    markov.generateChain();
    console.log(markov.generateSentence());
})();