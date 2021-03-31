const Discord = require("discord.js")
const canvacord = require('canvacord')

module.exports = {
  name: "trigger",
  description: "Display user avatar trigger",
  category: "Fun",
  usage: "`trigger`",
  aliases: [""],
  run: async (client, message, args) => {       
    
        let msg = message.channel.send("Loading...")
        let user = message.mentions.users.first() || message.author;

        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trigger(avatar)
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
        message.channel.send(attachment);
        (await msg).delete()
}}