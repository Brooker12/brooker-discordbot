const { MessageEmbed } = require("discord.js");
const ms = require('ms')
const db = require("quick.db")
module.exports = {
  name: "help",
  description: "Showing help page",
  usage: "`help / help <cmd>`",
  category: "Information",
  aliases: ['h'],
  cooldown: 2000,
  run: async (client, message, args) => {
    if (args[0]) {
      let prop =  client.commands.filter(a => a.category !== 'Developer')
      const command = await prop.get(args[0].toLowerCase()) || prop.get(client.aliases.get(args[0].toLowerCase()))
      
      let embedss = new MessageEmbed().setColor(client.config.color) 
       .setAuthor('Missing Arguments', client.user.displayAvatarURL()) 
       .setDescription(`That command doesn't exits`)
      if(!command) return message.channel.send(embedss)
      
      let prefix = db.get(`prefix_${message.guild.id}`)
      if (prefix === null) prefix = "a.";
      
      let alias = command.aliases.join("`, `") || "None"
      let dessc = command.description.replace("{prefix}", `${prefix}`)
      
      let usage = command.usage.replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`)
                               .replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`)
                               .replace("{prefix}", `${prefix}`)
      let detail = command.detail ? command.detail.replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`)
                               .replace("{prefix}", `${prefix}`) : ''
      let cooldown = command.cooldown
      
      let embed = new MessageEmbed().setColor(client.config.color)
        .setAuthor(command.name.toUpperCase(), client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`
**Description:** ${dessc || "No Description"}
**Category:** ${command.category  || "None"}
**Cooldown:** ${cooldown ? ms(cooldown,{long: true}) : 'None' }
**Aliases:** \`${alias || "None"}\`
**Permissions:** \`${command.authorPermission ? command.authorPermission.join("`, `") : "None"}\`
**Usage:** ${usage || "None"}
${detail ? '\n'+detail : ''}`)        
        .setFooter('<> - required, | - either/or, [] - optional')
        

      return message.channel.send(embed);
    } else {
      
      let prefix = db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = 'a.';
     
      const commands = await client.commands;

      let emx = new MessageEmbed().setColor(client.config.color)
        .setAuthor("Brooker Help", client.user.displayAvatarURL())
.setDescription(`**Command List**
[Click Here](https://my.brooker.cf/commands)

**Direct List**
\`${client.config.prefix}commands\`

**If you find a bug or error please contact our team**
\`${client.config.prefix}contact <issue>\`

**Helpful links**
[Invite](https://my.brooker.cf/invite), [Vote](https://my.brooker.cf/vote), [Dashboard](https://my.brooker.cf/home)`)
.setFooter(`Type: ${prefix}help <command> to get information`)

message.channel.send(emx)
    }
  }
};