// const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord-buttons');
// const { MessageEmbed } = require("discord.js");
// const ms = require('ms')
// const db = require("quick.db")
// module.exports = {
//   name: "help",
//   description: "Showing help page",
//   usage: "`help / help <cmd>`",
//   category: "Information",
//   aliases: ['h'],
//   cooldown: 2000,
//   run: async (client, message, args) => {
    
//     if (args[0]) {
//       let prop =  client.commands.filter(a => a.category !== 'Developer')
//       const command = await prop.get(args[0].toLowerCase()) || prop.get(client.aliases.get(args[0].toLowerCase()))
      
//       let embedss = new MessageEmbed().setColor(client.config.color) 
//        .setAuthor('Missing Arguments', client.user.displayAvatarURL()) 
//        .setDescription(`That command doesn't exits`)
//       if(!command) return message.channel.send(embedss)
      
//       let prefix = client.config.prefix
      
//       let alias = command.aliases.join("`, `") || "None"
//       let dessc = command.description.replace("{prefix}", `${prefix}`)
      
//       let usage = command.usage.replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`)
//       let detail = command.detail ? command.detail.replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`)
//                                                   .replace("{prefix}", `${prefix}`).replace("{prefix}", `${prefix}`) : ''
//       let cooldown = command.cooldown
      
//       let embed = new MessageEmbed().setColor(client.config.color)
//         .setAuthor(command.name.toUpperCase(), client.user.displayAvatarURL())
//         .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
//         .setDescription(`
// **Description:** ${dessc || "No Description"}
// **Category:** ${command.category  || "None"}
// **Cooldown:** ${cooldown ? ms(cooldown,{long: true}) : 'None' }
// **Aliases:** \`${alias || "None"}\`
// **Permissions:** \`${command.authorPermission ? command.authorPermission.join("`, `") : "None"}\`
// **Usage:** ${usage || "None"}
// ${detail ? '\n'+detail : ''}`)        
//         .setFooter('<> - required, | - either/or, [] - optional')
        

//       return message.channel.send(embed);
//     } else {
      
//       let prefix = db.get(`prefix_${message.guild.id}`);
//       if (prefix === null) prefix = 'a.';
     
//       const commands = await client.commands;

//       let emx = new MessageEmbed().setColor(client.config.color)
//       .setAuthor("Brooker Help", client.user.displayAvatarURL())
//       .setDescription(`if you want to see all commands
// [Click Here](https://brooker.cf/commands) or type \`${client.config.prefix}commands\`

// If you find bug/error please contact our team
// https://brooker.cf/contact

// Usefully links
// [Invite](https://brooker.cf/invite), [Vote](https://brooker.cf/vote), [Dashboard](https://brooker.cf/home)`)
//       .setFooter(`Type: ${prefix}help <command> to get information`)
      
//       let btn2 = new MessageButton()
//       .setLabel('Command List')
//       .setStyle('grey')
//       .setID('command-list')
      
//       let button2 = new MessageActionRow()
//       .addComponent(btn2)

//       let msg = message.channel.send('', {embed: emx, component:  button2 })
      
//       client.on('clickButton', async (button) => {
//         if(button.id === 'command-list') {
//         button.reply.defer();
//         client.commands.get('commands').run(client, message, args)
//         button.message.delete() 
//         }
//       })
//     }
//   }
// };