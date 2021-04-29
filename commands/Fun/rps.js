const {MessageEmbed} = require("discord.js");
var rps = ["🗻", "✂️", "📰"];

module.exports = {
  name: "rps",
  description: "Play Rock Paper Scissors with react.",
  category: "Fun",
  usage: "`rps [Click 1 emoticon]`",
  aliases: [""],
  run: async (client, message, args) => { 
  let amount = 10;
  var choice = args[0]; 

  const embed = new MessageEmbed()
    .setAuthor('RPS Games', client.user.displayAvatarURL())
    .setDescription(`Chose your emote`).setColor(client.config.color)
  const msg = await message.channel.send(embed);
  msg.react("🗻"), msg.react("✂️"), msg.react("📰");

  const filter = (reaction, user) => {
    return (
      ["🗻", "✂️", "📰"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };
    
      msg.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(async collected => {
      const reaction = collected.first();
      const users = reaction.emoji.name
      const botChoice = rps[Math.floor(Math.random() * rps.length)];
      
    msg.reactions.removeAll()
      //ROCK
      if (users === "🗻" && botChoice === "🗻") {
        const rockTie = new MessageEmbed()
          .setTitle("it's Tie")
          .setDescription(`🗻 vs 🗻`).setColor(client.config.color)
        msg.edit(rockTie);
      } else if (reaction.emoji.name === "🗻" && botChoice === "✂️") {
        const rockWin = new MessageEmbed()
          .setTitle("You win")
          .setDescription(`🗻 vs ✂️`).setColor(client.config.color)
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "🗻" && botChoice === "📰") {
        const rockLose = new MessageEmbed()
          .setTitle("You lose")
          .setDescription(`🗻 vs 📰`).setColor(client.config.color)
        msg.edit(rockLose);

        //PAPER
      } else if (reaction.emoji.name === "📰" && botChoice === "🗻") {
        const rockWin = new MessageEmbed()
          .setTitle("You Lose")
          .setDescription(`📰 vs 🗻`).setColor(client.config.color)
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "📰" && botChoice === "✂️") {
        const rockWin = new MessageEmbed()
          .setTitle("You Win")
          .setDescription(`📰 vs ✂️`).setColor(client.config.color)
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "📰" && botChoice === "📰") {
        const rockWin = new MessageEmbed()
          .setTitle("it's Tie")
          .setDescription(`📰 vs 📰`).setColor(client.config.color)
        msg.edit(rockWin);

        //SCISSORS
      } else if (reaction.emoji.name === "✂️" && botChoice === "🗻") {
        const rockWin = new MessageEmbed()
          .setTitle("You Lose")
          .setDescription(`✂️ vs 🗻`).setColor(client.config.color)
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "✂️" && botChoice === "✂️") {
        const rockWin = new MessageEmbed()
          .setTitle("it's Tie")
          .setDescription(`✂️ vs ✂️`).setColor(client.config.color)
        msg.edit(rockWin);
      } else if (reaction.emoji.name === "✂️" && botChoice === "📰") {
        const rockWin = new MessageEmbed()
          .setTitle("You Win")
          .setDescription(`✂️ vs 📰`).setColor(client.config.color)
        msg.edit(rockWin);
      }
    }).catch(collected => {
        msg.reactions.removeAll()
        const noreact = new MessageEmbed()
        .setAuthor('Game Over', client.user.displayAvatarURL())
        .setDescription(`You don't react to any emoticons`).setColor(client.config.color)
		    msg.edit(noreact)
	  });
}};