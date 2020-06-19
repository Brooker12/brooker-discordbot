const math = require("mathjs");
const Discord = require("discord.js");
var fs = require("fs"); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  if (!args[0])
    return message.channel
      .send({
        embed: {
          title: "Matematika",
          description:
            "Masukkan Matematika, saya tidak sabar untuk menyelesaikannya! :um: \n Untuk matematika, gunakan karakter ini: \n \n `+` untuk menambahkan \n `-` untuk mengurangi \n `*` untuk melipatgandakan \n `/` untuk membagi \n \n example: `a.calc 1+1`",
          color: 0xff0000
        }
      })
      .then(msg => {
        if (conf[message.delete] == "true") {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      });

  let resp;
  try {
    resp = math.eval(args.join(" "));
  } catch (e) {
    return message.channel
      .send({
        embed: {
          title: "Erro",
          description: "Um ... Saya rasa saya tidak bisa melakukan itu ...",
          color: 0xff0000
        }
      })
      .then(msg => {
        if (conf[message.guild.id].delete == "true") {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      });
  }

  const embed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle("Hasil:")
    .addField("Soal", `\`\`\`js\n${args.join(" ")}\`\`\``)
    .addField("Jawab", `\`\`\`js\n${resp}\`\`\``);

  message.channel.send(embed);
};
module.exports.help = {
    name: "calc",
    description: "calculator",
    category: "Information",
    usage: "`calc <number> <args> <number>`"
}