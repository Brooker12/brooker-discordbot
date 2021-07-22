const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
  name: "wiki",
  description: "Shows information about query from wikipedia",
  category: "General",
  usage: "`wiki <query>`",
  aliases: ["wikipedia"],
  cooldown: 2000,
  run: async (client, message, args) => { 
    
    
        let xdemb = new MessageEmbed().setColor(client.config.color) 
         .setAuthor("Missing Arguments!", message.author.displayAvatarURL())
         .setDescription(`Usage: ${module.exports.usage}`)
        if(!args[0]) return message.channel.send(xdemb) 
    
        const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`)
                           .then(res => res.json().catch(() => {}));
        
    
        let error = new MessageEmbed().setColor(client.config.color) 
         .setAuthor("Error Detect!", message.author.displayAvatarURL())
         .setDescription(`Error Page Not Found.`)
        if (!body) return message.channel.send(error)
        if (body.title && body.title === "Not found.") return message.channel.send(error)
      
        const embed = new MessageEmbed() .setColor(client.config.color)
            .setAuthor(`${body.title}`, 'https://images-ext-2.discordapp.net/external/ePG3u6WIV8mO0XbO5F_iml1O-XlHMXRlLG_TRdvSmvw/https/upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/320px-Wikipedia-logo-v2.svg.png')
            .addField("More Info: ",`**[Click Here!](${body.content_urls.desktop.page})**`, true)
            .setDescription(`** ${body.extract}**`)
        
         if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
        message.channel.send(embed);

    }
}