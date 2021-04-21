const Discord = require("discord.js");
const db = require("quick.db");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

module.exports = {
  name: "leave",
  description: `Send a leave message when there new members`,
  category: "Configuration",
  usage: `\`leave [on || off | msg || <#channel> ]\``,
  detail: `**Information**
\`\`\`
- Set Channel
{prefix}leave <#channel>

- Toggle leave
{prefix}leave <on || off>

- Set Message
{prefix}leave msg <message>

- Show Preview
{prefix}leave preview

- Message Settings
=> {users} = @user
=> {usertag} = user#1234
=> {username} = user

=> {server} = server name
=> {count} = server member count

Ex: leave {usertag} to {server} you are {count} member.
\`\`\``,
  authorPermission: ["MANAGE_GUILD"],
  aliases: ["setleave"],
  run: async (client, message, args) => { 

    let channel = message.mentions.channels.first(); 
    
  let welmsg = db.get(`leave_${message.guild.id}.msg`)
  if (welmsg === null || welmsg === undefined) welmsg = `📥 {users} **Has left the server**`
  let replaces = welmsg.replace("{users}", message.author) 
                 .replace("{username}", message.author.username) 
                 .replace("{usertag}", message.author.tag) 
                 .replace("{server}", message.guild.name) 
                 .replace("{count}", message.guild.memberCount) 

    let leave = await db.fetch(`leave_${message.guild.id}.toggle`)
    if (leave === null) leave = "off"
    
if(!args[0] && !channel) {  
    
    let welmsg = await db.fetch(`leave_${message.guild.id}.msg`)
    if (welmsg === null || welmsg === undefined) welmsg = "[ Default by bot ]"
    
    let welch = await db.fetch(`leave_${message.guild.id}.channel`)
    let ch = client.channels.cache.get(welch)
    if (ch === null) ch = "Not set"
    if (ch === undefined) ch = "Invalid ID"

let embed = new Discord.MessageEmbed()
.setColor(client.config.color)
.setAuthor('leave Settings', client.user.displayAvatarURL())
.addField(`Leave toggle is`,`[${leave.toUpperCase()}]`)
.addField(`Leave set in`, `${ch || "[ Not set. ]"}`)
.addField(`Leave Message:`, `${welmsg || "[ Default by bot ]"}`)
.setFooter(`Read more ${client.config.prefix}help ${module.exports.name}`)
message.channel.send(embed) 
  
    //Message
    } else if (args[0] === "message" || args[0] === "msg") {
       let messag = args.slice(1).join(" ")
       if (!messag) {
        db.set(`leave_${message.guild.id}.msg`, null)
       let embed = new Discord.MessageEmbed().setColor(client.config.color) 
        .setAuthor('leave Message', client.user.displayAvatarURL())
        .setDescription(`leave message has been set default`)
  
       message.channel.send(embed)
         
       } else { 
         
       db.set(`leave_${message.guild.id}.msg`, messag)
       let embed = new Discord.MessageEmbed().setColor(client.config.color) 
      .setAuthor('leave Message', client.user.displayAvatarURL())
      .setDescription(`leave message has been set \n\`\`\`${messag}\`\`\``)
  
       message.channel.send(embed)
      }

    } else if(args[0] === "preview") {
      
      let wrong = new Discord.MessageEmbed().setColor(client.config.color) 
        .setAuthor('Leave Settings', client.user.displayAvatarURL())
        .setDescription(`Leave must be [ON] first `)
      if(!leave) return message.channel.send(wrong)  
    
      message.channel.send('Loading...').then(m => m.delete({timeout: 5000}))
      
     let data = await canva.welcome(message.member, { 
      link: "https://media.discordapp.net/attachments/794505995879579648/798941967169355786/20210113_232339.jpg?width=1025&height=370", 
      blur: false,
      block: false 
     })
     const attachment = new Discord.MessageAttachment(data, "leave-image.png");
    
      var preview = new Discord.MessageEmbed().setColor(client.config.color) 
      .setDescription(replaces)
      .attachFiles([attachment]).setImage('attachment://leave-image.png')
      message.channel.send(preview)
      
    //Toggle On
    } else if (args[0] === "on") {
      db.set(`leave_${message.guild.id}.toggle`, true) 
      let embed = new Discord.MessageEmbed().setColor(client.config.color) 
      .setAuthor('leave Toggle', client.user.displayAvatarURL())
      .setDescription(`leave channel has been [ON]`)
      
      message.channel.send(embed)
      
    //Toggle Off
    } else if (args[0] === "off") {
       db.set(`leave_${message.guild.id}.toggle`, false) 
      let embed = new Discord.MessageEmbed().setColor(client.config.color) 
      .setAuthor('leave Toggle', client.user.displayAvatarURL())
      .setDescription(`leave channel has been [OFF]`)
      
      message.channel.send(embed)
      
    //Channel
    } else {
      if(!leave) {
        let wrong = new Discord.MessageEmbed().setColor(client.config.color) 
        .setAuthor('Leave Settings', client.user.displayAvatarURL())
        .setDescription(`Leave must be [ON] first `)
  
        message.channel.send(wrong)        
      } else if(!channel) {
        let wrong = new Discord.MessageEmbed().setColor(client.config.color) 
        .setAuthor('leave Settings', client.user.displayAvatarURL())
        .setDescription(`Invalid Argument!`)
  
        message.channel.send(wrong)
      } else if(channel.permissionsFor(client.user).has("SEND_MESSAGES", "VIEW_CHANNEL")) {
          db.set(`leave_${message.guild.id}.channel`, channel.id) 
          
          let embed = new Discord.MessageEmbed().setColor(client.config.color) 
          .setAuthor('leave Channel', client.user.displayAvatarURL()) 
          .setDescription(`leave channel has been set in **${channel.name}**`)
          
          message.channel.send(embed)
      } else {
          var missingPermissionsEmbed = new Discord.MessageEmbed()
          .setColor(client.config.color)
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setTitle("Insufficient Permissions!")
          .setDescription(`I need the \`SEND_MESSAGES, VIEW_CHANNEL\` permission in ${channel} channel!`)
          
          message.channel.send(missingPermissionsEmbed)
      }
   } 
}};