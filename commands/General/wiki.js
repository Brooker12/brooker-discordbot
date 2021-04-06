const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
  name: "wiki",
  description: "Shows information about query from wikipedia",
  category: "General",
  usage: "`wiki <query>`",
  aliases: ["wikipedia"],
  cooldown: 2000,
  run: async (client, message, args) => { 
    
        if(!args[0])  return message.channel.send({embed: {
                      color: client.config.color,
                      title: "Input the query to search"
                  }}) 
    
        const body = await fetch(
            `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
          ).then(res => res.json().catch(() => {}));
        
        if (!body) return message.channel.send({embed: {
                      color: client.config.color,
                      title: "❌ Error Page Not Found."
                  }})
          if (body.title && body.title === "Not found.") return message.channel.send({embed: {
                      color: client.config.color,
                      title: "❌ Error Page Not Found."
                  }});
      
        const embed = new Discord.MessageEmbed() .setColor(client.config.color)
            .setAuthor(`${body.title}`, 'https://media.discordapp.net/attachments/801988747205935144/829023896140382318/Z.png')
            .addField("More Info: ",`**[Click Here!](${body.content_urls.desktop.page})**`, true)
            .setDescription(`** ${body.extract}**`)
        
         if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
        message.channel.send(embed);

    }
}