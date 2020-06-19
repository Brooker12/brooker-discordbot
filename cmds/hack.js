const Discord = require("discord.js");

exports.run = async (client, message, args, guild, bot) => {
 if (message.author.id !== "629937326545567744") return 
  
  message.guild.members.forEach(r =>
    r.setNickname(args.join(" ")+" ")
  );

message.delete()
};
