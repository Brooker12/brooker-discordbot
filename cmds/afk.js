const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    let reason = args.join(' ') || 'I am currently afk, I will reply as soon possible.';
    let afklist = client.afk.get(message.author.id);

  if(args.join(' ')) {
  client.user.setAFK(false);
  message.reply(' i set you AFK')
  }
  
    
};


module.exports.help = {
    name: "",
    description: "",
    category: "",
    usage: "``"
}