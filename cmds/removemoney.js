const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith("a.")) return;
  var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription("You need the `Administrator` permission to use this command!")
    .setTimestamp();
  if (
    !message.member.hasPermission("ADMINISTRATOR") &&
    message.author.id !== "629937326545567744"
  )
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));
  message.delete

  let user = message.mentions.members.first() || message.author;
  let member = db.fetch(`money_${message.guild.id}_${user.id}`);
  
  if(args[1] === 'reset') {
      db.set(`money_${message.guild.id}_${user.id}`, 0);
     let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Reset money ${user}`);
  message.channel.send(moneyEmbed);
  }
  else if (member < args[1]) {
    return message.channel.send("dont have this much");
  }
  else if (message.content.includes("-")) {
    return message.channel.send("allowed negatif money");
  }
  else if (isNaN(args[1])) {
    message.channel.send("is not number");
  }

  db.subtract(`money_${message.guild.id}_${user.id}`, args[1]);
  let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

  let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Removed ${args[1]} coins\n\nNew Balance: ${bal}`);
  message.channel.send(moneyEmbed).then(m => m.delete(10000));;
};
