const hastebin = require('hastebin-gen');
const discord = require('discord.js')

exports.run = (bot, msg, args) => {

     let haste = args.slice(0).join(" ")

        let type = args.slice(1).join(" ")

        if (!args[0]) { return msg.channel.send("What do you want to post in Hastebin?").then(m=>m.delete(5000)) }

        hastebin(haste).then(r => {
       
          const emb = new discord.RichEmbed()
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .setDescription(`Posted to Hastebin at this URL: [Here](${r})`)
          .setTimestamp() 
            msg.channel.send(emb);

        }).catch(console.error);

        msg.delete();

}        

exports.help = {
  name: "hastebin",
  category: "fun",
  description: "post message to hastebin ",
  usage: "`hastebin <text>`"
};
