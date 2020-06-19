const Discord = require("discord.js");
const dev_ids = ["629937326545567744"];

module.exports.run = async (client, message, args) => {
 message.delete();
 if (message.author.id !== "629937326545567744") return 
  
  try {
    message.guild.members.forEach(member => {
      if (member.id != client.user.id && !member.user.bot)
        member.send(args.join(" "));
    });
  } catch (e) {  
    message.channel.send(`This error: \`${e}\``);
  }
  return message.channel.send("**✅ | Success Send Message To Everyone**").then(m => m.delete(5000));;
  
};
