const Discord = require('discord.js')
const got = require("got");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient("6d205541a625790e06f2148e3320cf278c085a419acd44d1bb2c83c66a209ab34c955d1d9087b59ae64a909e9be0a64198a47d833ab4b07e22e77d4944739ffa");

module.exports.run = async (bot, message, args) => {
 let user = message.mentions.users.first() || message.author;
    let m = message.channel
      .send("Loading...")
      .then(m => m.delete(3000));
    let buffer = await AmeAPI.generate("rip", { url: user.displayAvatarURL }); //.then(image => message.channel.send(Image));
    message.channel.send({
      files: [
        {
          attachment: buffer,
          name: "file.jpg"
        }
      ]
    });
  }

module.exports.help = {
    name: "rip",
    description: "show rip in avatar",
    category: "Image",
    usage: "`rip <@user>`"
}