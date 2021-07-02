const { MessageButton, MessageActionRow } = require('discord-buttons');
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
      
      let prefix = client.config.prefix
      
      let alias = command.aliases.join("`, `") || "None"
      let dessc = command.description.replace("{prefix}", `${prefix}`)
      
      let usage = command.usage.replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`)
      let detail = command.detail ? command.detail.replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`)
                                                  .replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`) : ''
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
**[Click Here](https://brooker.cf/commands)**

**Direct List**
\`${client.config.prefix}commands\`

**If you find bug or error please contact our team\nhttps://brooker.cf/contact**

**Usefully links**
**[Invite](https://brooker.cf/invite), [Vote](https://brooker.cf/vote), [Dashboard](https://brooker.cf/home)**`)
.setFooter(`Type: ${prefix}help <command> to get information`)
      
      let btn1 = new MessageButton()
      .setLabel("Vote")
      .setStyle("url")
      .setURL("https://discord-buttons.js.org")
      
      let btn2 = new MessageButton()
      .setLabel('Dashboard')
      .setID('help-dashboard')
      .setStyle('url')
      .setURL('https://brooker.cf/')
      
      let button = new MessageActionRow()
      .addComponent(btn1)
      
      let button2 = new MessageActionRow()
      .addComponent(btn2)

      message.channel.send('', {embed: emx, components: button})
 
    }
  }
};