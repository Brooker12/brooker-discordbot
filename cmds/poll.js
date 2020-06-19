const Discord = require("discord.js");
var fs = require("fs"); //FileSystem


exports.run = (client, message, args) => {
  if (!args[0]) {
    var o = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Missing Arguments!")
      .setDescription("Usage: `a.poll [time] [text]`")
      .setTimestamp();
    return message.channel.send(o);
  }

  let time1 = args[0];
  let question = args.slice(1).join(" ");

  if (!isNaN(time1)) {
    time1 = time1 * 1000;
  } else {
    question = time1 + " " + question;
    time1 = 3600 * 1000;
  }

  message.channel
    .send({
      embed: {
        title: "Petition:",
        description: question + "",
        color: 0xff0000,
        footer: {
          text:
            "petisi diakhiri dalam " +
            args[0] +
            " detik \nBy: " +
            message.author.username,
          icon_url: message.author.avatarURL
        }
      }
    })
    .then(async function(msg) {
      await msg.react("👍");
      await msg.react("👎");

      var reactions = await msg.awaitReactions(
        reaction =>
          reaction.emoji.name === "👍" || reaction.emoji.name === "👎",
        {
          time: time1
        }
      );

      var yes = "Suara terbanyak dipilih: 👍";
      var no = "Suara terbanyak dipilih: 👎";
      var tie = "Suara Sama!";
      var end;

      if (msg.reactions.get("👍").count - 1 > msg.reactions.get("👎").count - 1
      ) {
        end = yes;
      } else if (
        msg.reactions.get("👍").count - 1 <
        msg.reactions.get("👎").count - 1
      ) {
        end = no;
      } else if (
        msg.reactions.get("👍").count - 1 ==
        msg.reactions.get("👎").count - 1
      ) {
        end = tie;
      }

      msg.channel.send({
        embed: {
          title: question,
          description: `**hasil pemungutan suara!** \n\n👍: ${msg.reactions.get(
            "👍"
          ).count - 1}\n***----------***\n👎: ${msg.reactions.get("👎").count -
            1}`,
          color: 0xff0000,
          footer: {
            text: end
          }
        }
      });
    });
};

module.exports.help = {
    name: "poll",
    description: "poll asking",
    category: "Moderator",
    usage: "`poll <time> <text>`"
}