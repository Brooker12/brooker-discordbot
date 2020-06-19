const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith("a.")) return;

  let embed = new Discord.RichEmbed()
    .setTitle("●▬▬● Booker Store ●▬▬●")
    .setDescription(
      "di bawah ini adalah semua barang dari Booker Store yang dapat dipesan: `a.buy [menu]`\n\n **VIP Ranks**\n\nBronze: 3500 Coins \n\n**Lifestyle Items**\n\n Nikes: 600 \nCar: 800 \nMansion: 1200 \n\n**Transaction**\n\nfor buy use: `a.buy [items]`"
    )
    .setColor("#FFFFFF")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/702717931322343524/703565976792465428/gMvqCXDKUjCJgAAAABJRU5ErkJggg.png"
    );
  message.channel.send(embed);
};


module.exports.help = {
    name: "Store",
    description: "Show item store",
    category: "Economy",
    usage: "`a.store`"
}