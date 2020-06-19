const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { randomRange, verify } = require("../util.js");

exports.run = async (client, message, args) => {
  this.fighting = new Set();

  let opponent = message.mentions.users.first();
  if (!opponent)
    return message.reply("Anda harus menandai orang yang ingin Anda mainkan!");

  if (opponent.bot) return message.reply("Anda tidak bisa bermain dengan bot!");
  if (opponent.id === message.author.id)
    return message.reply("Kamu tidak bisa berduel dengan dirimu sendiri!");
  if (this.fighting.has(message.channel.id))
    return message.reply("Hanya satu duel dapat terjadi per saluran.");
  this.fighting.add(message.channel.id);
  try {
    if (!opponent.bot) {
      await message.channel.send(
        `${opponent}, permintaan duel datang. Apakah Anda menerima duel? \n (\`yes\` atau \`no\` Harap jawab sebagai.)`
      );
      const verification = await verify(message.channel, opponent);
      if (!verification) {
        this.fighting.delete(message.channel.id);
        return message.channel.send(`Duel tidak diterima ...`);
      }
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
        await message.channel.send(stripIndents`
						${user},apa yang ingin kamu lakukan? \`attach\`, \`defend\`, \`super\`, atau\`quit\`?
						**${message.author.username}**: ${userHP} :heartpulse:
						**${opponent.username}**: ${oppoHP} :heartpulse:
					`);
        const filter = res =>
          res.author.id === user.id &&
          ["attach", "defend", "super", "quit"].includes(
            res.content.toLowerCase()
          );
        const turn = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000
        });
        if (!turn.size) {
          await message.reply(`Maaf, tapi waktu sudah habis!`);
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
        await message.channel.send(`${user}, **${damage}** hit damage!`);
        dealDamage(damage);
        reset();
      } else if (choice === "defend") {
        await message.channel.send(
          `${user}, membela diri dengan perisai super!`
        );
        guard = true;
        reset(false);
      } else if (choice === "super") {
        const miss = Math.floor(Math.random() * 4);
        if (!miss) {
          const damage = randomRange(100, guard ? 150 : 300);
          await message.channel.send(
            `${user}, Anda telah mengumpulkan energi ultrasonik yang cukup dari galaksi jauh dan **${damage}** kamu memukul!`
          );
          dealDamage(damage);
        } else {
          await message.channel.send(
            `${user}, Anda tidak dapat menggunakan kekuatan tertinggi karena Anda tidak bisa mengumpulkan cukup energi ultra sonic dari galaksi jauh!`
          );
        }
        reset();
      } else if (choice === "quit") {
        await message.channel.send(`${user}, Melarikan diri! Noob! `);
        forfeit();
        break;
      } else {
        await message.reply("Saya tidak mengerti apa yang ingin Anda lakukan.");
      }
    }
    this.fighting.delete(message.channel.id);
    const winner = userHP > oppoHP ? message.author : opponent;
    return message.channel.send(
      `Game sudah berakhir! Selamat, **${winner}** won! \n**${message.author.username}**: ${userHP} :heartpulse: \n**${opponent.username}**: ${oppoHP} :heartpulse:`
    );
  } catch (err) {
    this.fighting.delete(message.channel.id);
    throw err;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["1vs1", "1v1", "savaş"],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: "duel",
  description: "You duel with a person you want!",
  category: "Fun",
  usage: "duel <@user>"
};
