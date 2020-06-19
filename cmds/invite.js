const Discord = require("discord.js");


exports.run = (client, message, args) => {
   const emed = new Discord.RichEmbed()
   .setFooter(client.user.username, client.user.avatarURL)
   .setTitle("Brooker Links")
   .setDescription(`Invite Brooker: [Click Here](https://discordapp.com/oauth2/authorize?client_id=667743057227153408&scope=bot&permissions=1517419646)
Join Support: [Click Here](https://discord.gg/Yvwn2rD)

[VOTE BOT](https://top.gg/bot/667743057227153408/vote)`)
   .setTimestamp()
    message.channel.send(emed) 
}