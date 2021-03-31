const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { randomRange, verify } = require("../../util.js");

module.exports = {
  name: 'duel',
  description: "You duel with a person you want!",
  category: "Fun",
  usage: "`duel <@user>`",
  aliases: ["1vs1", "1v1"],
  run: async (client, message, args) => { 
   this.fighting = new Set();

  let opponent = message.mentions.users.first();
  
  const mention = new Discord.MessageEmbed().setColor(client.config.color)
   .setAuthor('Invalid Argument', message.author.displayAvatarURL())
   .setDescription(`${message.author}, You have to mention the people you want to play with!`)
  if (!opponent) return message.channel.send(mention);
  const bots = new Discord.MessageEmbed().setColor(client.config.color)
   .setAuthor('Invalid Argument', message.author.displayAvatarURL())
   .setDescription(`${message.author}, You cannot play with bots!`)
  if (opponent.bot) return message.channel.send(bots);
  const self = new Discord.MessageEmbed().setColor(client.config.color)
   .setAuthor('Invalid Argument', message.author.displayAvatarURL())
   .setDescription(`${message.author}, You cannot duel yourself!`)
  if (opponent.id === message.author.id) return message.channel.send(self);
  const ch = new Discord.MessageEmbed().setColor(client.config.color)
   .setAuthor('Invalid Argument', message.author.displayAvatarURL())
   .setDescription(`${message.author}, Only one duel can occur per channel.`)
  if (this.fighting.has(message.channel.id)) return message.channel.send(ch);
    
  this.fighting.add(message.channel.id);
    
  try {
    
    if (!opponent.bot) {
      const Request = new Discord.MessageEmbed().setColor(client.config.color)
      .setAuthor('Start', client.user.displayAvatarURL())
      .setDescription(`${opponent}'s, a duel request came. Do you accept duels? \n(\`yes\` atau \`no\` Please answer as.)`)
      await message.channel.send(Request);
      const verification = await verify(message.channel, opponent);
      if (!verification) {this.fighting.delete(message.channel.id);
      return message.channel.send(`Duels are not accepted...`);}
    }
    
    let userHP = 500;
    let oppoHP = 500;
    let userTurn = false;
    let guard = false;
    const reset = (changeGuard = true) => {
      userTurn = !userTurn;
    if (changeGuard && guard) guard = false;
    };
    const dealDamage = damage => {
      if (userTurn) oppoHP -= damage;
      else userHP -= damage;
    };
    const forfeit = () => {
      if (userTurn) userHP = 0;
      else oppoHP = 0;
    };
    while (userHP > 0 && oppoHP > 0) {
      
      // eslint-disable-line no-unmodified-loop-condition
      const user = userTurn ? message.author : opponent;
      let choice;
      if (!opponent.bot || (opponent.bot && userTurn)) {
       const turnon = new Discord.MessageEmbed().setColor(client.config.color)
        .setAuthor(`${user.username}'s Turn`, user.displayAvatarURL())
        .setDescription(stripIndents`${user},What do you want to do?\`attach\`, \`defend\`, \`super\`, atau\`quit\`?\n**${message.author.username}**: ${userHP} :heartpulse:\n**${opponent.username}**: ${oppoHP} :heartpulse:`)
        await message.channel.send(turnon);
        const filter = res =>
          res.author.id === user.id &&
          ["attach", "defend", "super", "quit"].includes(
            res.content.toLowerCase()
          );
        const turn = await message.channel.awaitMessages(filter, {max: 1,time: 30000});
        if (!turn.size) {
           const timer = new Discord.MessageEmbed().setColor(client.config.color)
           .setDescription(`Sorry ${user.username}, but time's up!`)
          await message.channel.send(timer);
          reset();
          continue;
        }
        choice = turn.first().content.toLowerCase();
      } else {
        const choices = ["attach", "defend", "super"];
        choice = choices[Math.floor(Math.random() * choices.length)];
      }
      if (choice === "attach") {
        const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
        const attach = new Discord.MessageEmbed().setColor(client.config.color)
         .setDescription(`${user}, **${damage}** hit damage!`)
        await message.channel.send(attach);
        dealDamage(damage);
        reset();
      } else if (choice === "defend") {
        const defend = new Discord.MessageEmbed().setColor(client.config.color)
         .setDescription(`${user}, defend yourself with super shields!`)
        await message.channel.send(defend);
        guard = true;
        reset(false);
      } else if (choice === "super") {
        const miss = Math.floor(Math.random() * 4);
        if (!miss) {
          const damage = randomRange(100, guard ? 150 : 300);
          const superr = new Discord.MessageEmbed().setColor(client.config.color)  
           .setDescription(`${user}, You have gathered sufficient ultrasonic energy from distant galaxies and **${damage}** you hit`)
          await message.channel.send(superr);
          dealDamage(damage);
        } else {
          const fsuper = new Discord.MessageEmbed().setColor(client.config.color)
          .setDescription(`${user}, You can't use the ultimate power because you can't gather enough ultra sonic energy from distant galaxies!`)
          await message.channel.send(fsuper);
        }
        reset();
      } else if (choice === "quit") {
        const quit = new Discord.MessageEmbed().setColor(client.config.color)

         .setDescription(`${user}, Escape! Noob!`)
        await message.channel.send(quit);
        forfeit();
        break;
      } else {
       const wrong = new Discord.MessageEmbed().setColor(client.config.color)
        .setAuthor('Invalid Argument', user.displayAvatarURL())
        .setDescription(`${user}, I don't understand what you want to do.`)
        await message.channel.send(wrong);
      }
      
    }
    this.fighting.delete(message.channel.id);
    const winner = userHP > oppoHP ? message.author : opponent;
    const done = new Discord.MessageEmbed().setColor(client.config.color)
    .setAuthor('Game Over', client.user.displayAvatarURL())
    .setDescription(`The game is over! Congratulations, **${winner}** won! \n**${message.author.username}**: ${userHP} :heartpulse: \n**${opponent.username}**: ${oppoHP} :heartpulse:`)
    return message.channel.send(done);
    
  } catch (err) {
    this.fighting.delete(message.channel.id);
    throw err;
  }
    
}}