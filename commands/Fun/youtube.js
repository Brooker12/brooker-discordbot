const Discord = require("discord.js")
const canvacord = require('canvacord')

module.exports = {
  name: "youtube",
  description: "Display youtube command with message",
  category: "Fun",
  usage: "`youtube <text> | [@user] <text>`",
  aliases: [""],
  run: async (client, message, args) => {       

        let user = message.mentions.users.first() || message.author;
        let text;
        let username;
    
        if(user === message.author) {
          if(!args[0]) return message.channel.send('No text is provided.')
          text = args.slice(0).join(" ")
          username = message.member ? message.member.displayName : message.author.username
        } else {
          if(!args[1]) return message.channel.send('No text is provided.')
          text = args.slice(1).join(" ")
          username = message.mentions.members.first() ? message.mentions.members.first().displayName : message.mentions.users.first().username
        }
    
        let msg = message.channel.send("Loading...")
    
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.youtube({
                                username: username,
                                content: text,
                                avatar: avatar,
                                dark: false
                              })
        let attachment = new Discord.MessageAttachment(image, "youtube.gif");
        message.channel.send(attachment);
        (await msg).delete()
}}