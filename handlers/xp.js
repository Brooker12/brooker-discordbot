const db = require("quick.db");
const discord = require("discord.js");

class Util {
  static getLevel(xp, extra = false) {
    let level = 0;

    //WHILE LOOP
    while (xp >= Util.getLevelxp(level)) {
      xp -= Util.getLevelxp(level);
      level++;
    }
    if (extra) return [level, xp];
    else return level;
  }

  static getLevelxp(level) {
    return 5 * Math.pow(level, 2) + 50 * level + 100;
  }

  static getInfo(exp) {
    let [level, remxp] = Util.getLevel(exp, true);
    let levelxp = Util.getLevelxp(level);

    return { level, remxp, levelxp };
  }

  static addexp(message) {
    let toadd = Math.floor(Math.random() * 3 + 3);
    let oldxp = db.get(`xp_${message.guild.id}_${message.author.id}`);
    let oldlvl = Util.getLevel(oldxp);
    let newxp = oldxp + toadd;
    let newlvl = Util.getLevel(newxp);

    let toggle = db.fetch(`level_${message.guild.id}.toggle`);
    if (toggle === null) toggle = "off";
    let lvlch = db.fetch(`level_${message.guild.id}.channel`);
    let ch3 = message.guild.channels.cache.get(lvlch);
    if (ch3 === undefined) ch3 = message.channel;

    db.add(`xp_${message.guild.id}_${message.author.id}`, toadd);
    if (newlvl > oldlvl) {
      if (toggle === "on") {
        const on = new discord.MessageEmbed()
          .setColor("#2f3136")
          .setAuthor("LEVEL UP!", message.author.displayAvatarURL())
          .setDescription(
            `Congratulations ${message.author} has reached a new level **${newlvl}**`
          );
        ch3.send(on);
      }
    }
  }
}

module.exports = Util;
