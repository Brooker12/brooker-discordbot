const discord = require('discord.js')

module.exports = {
  name: 'afk',
  description: "set user afk",
  category: "General",
  usage: "`afk <reason>`",
  aliases: [""],
  cooldown: 2000,
  run: async (client, message, args) => { 

    let reason = args.join(' ') ? args.join(' ') : 'I am currently AFK.';
    let afklist = client.afk.get(message.member.id);

    if (!afklist) {
        let construct = {
            id: message.member.id,
            reason: reason,
            time: Date.now()
        };  

        client.afk.set(message.author.id, construct);
        const aefka = new discord.MessageEmbed().setColor(client.config.color)
        .setDescription(`${message.member.nickname || message.author.username} has set AFK for reason: ${reason}`)
        message.channel.send(aefka)
    }
 
}}; 