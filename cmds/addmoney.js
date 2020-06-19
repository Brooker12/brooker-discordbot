const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
  if (!message.content.startsWith("a.")) return;
  let ownerID = "629937326545567744";
  if (message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

   let embed3 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 | You can't withdraw negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  
  if (isNaN(args[1])) return message.channel.send('Is not number');
  
     
  db.add(`money_${message.guild.id}_${user.id}`, args[1]);
  let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

  let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(
      `<:Check:618736570337591296> Added ${
        args[1]
      } coins\n\nNew Balance: ${bal}`
    );
  message.channel.send(moneyEmbed);
};
