const Discord = require("discord.js");
const db = require("quick.db");
var rps = ["🗻", "✂️", "📰"];

exports.run = async (bot, message, args, color, prefix) => {
  let amount = 10;
  var choice = args[0];

  const embed = new Discord.RichEmbed()
    .setTitle("RPS GAMES!!")
    .setDescription(`Chose your emote`);
  const msg = await message.channel.send(embed);
  msg.react("🗻"), msg.react("✂️"), msg.react("📰");

  const filter = (reaction, user) => {
    return (
      ["🗻", "✂️", "📰"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  msg
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then(async collected => {
      const reaction = collected.first();
      const botChoice = rps[Math.floor(Math.random() * rps.length)];
      
    msg.clearReactions();
      //ROCK
      if (reaction.emoji.name === "🗻" && botChoice === "🗻") {
        const rockTie = new Discord.RichEmbed()
          .setTitle("it's Tie")
          .setDescription(`🗻 vs 🗻`);
        msg.edit(rockTie);
      } else if (reaction.emoji.name === "🗻" && botChoice === "✂️") {
        const rockWin = new Discord.RichEmbed()
          .setTitle("You win")
          .setDescription(`🗻 vs ✂️`);
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "🗻" && botChoice === "📰") {
        const rockLose = new Discord.RichEmbed()
          .setTitle("You lose")
          .setDescription(`🗻 vs 📰`);
        msg.edit(rockLose);

        //PAPER
      } else if (reaction.emoji.name === "📰" && botChoice === "🗻") {
        const rockWin = new Discord.RichEmbed()
          .setTitle("You Lose")
          .setDescription(`📰 vs 🗻`);
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "📰" && botChoice === "✂️") {
        const rockWin = new Discord.RichEmbed()
          .setTitle("You Win")
          .setDescription(`📰 vs ✂️`);
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "📰" && botChoice === "📰") {
        const rockWin = new Discord.RichEmbed()
          .setTitle("it's Tie")
          .setDescription(`📰 vs 📰`);
        msg.edit(rockWin);

        //SCISSORS
      } else if (reaction.emoji.name === "✂️" && botChoice === "🗻") {
        const rockWin = new Discord.RichEmbed()
          .setTitle("You Lose")
          .setDescription(`✂️ vs 🗻`);
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "✂️" && botChoice === "✂️") {
        const rockWin = new Discord.RichEmbed()
          .setTitle("it's Tie")
          .setDescription(`✂️ vs ✂️`);
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "✂️" && botChoice === "📰") {
        const rockWin = new Discord.RichEmbed()
          .setTitle("You Win")
          .setDescription(`✂️ vs 📰`);
        msg.edit(rockWin);
      }
    });
};

exports.help = {
  name: "rps",
  category: "Fun",
  description: "Play Rock Paper Scissors with react.",
  usage: "`a.rps`"
};
