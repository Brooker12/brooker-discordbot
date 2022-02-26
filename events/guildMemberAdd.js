const db = require("quick.db")
const Discord = require("discord.js")
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

module.exports.run = async (client, member) => {
  
     let data = await canva.welcome(member, { 
      link: "https://media.discordapp.net/attachments/794505995879579648/798933215100272750/20210113_231513.jpg?width=1025&height=370", 
      blur: false,
      block: false 
     })
 
    const attachment = new Discord.MessageAttachment(
      data,
      "welcome-image.png"
    );
  
  let chx = db.get(`welcome_${member.guild.id}.toggle`);
  let chr = db.get(`welcome_${member.guild.id}.channel`);
  let welmsg = db.get(`welcome_${member.guild.id}.msg`)
  if (welmsg === null || welmsg === undefined) welmsg = `📥 {usertag} **Has joined the server**`
  let replaces = welmsg.replace("{users}", member.user) 
                 .replace("{username}", member.user.username) 
                 .replace("{usertag}", member.user.tag) 
                 .replace("{server}", member.guild.name) 
                 .replace("{count}", member.guild.memberCount) 
  let roles = db.get(`welcome_${member.guild.id}.roles`)
  if(chx === null) return;
  if(chr === null || chr === undefined) return;
  if(member.guild.channels.cache.get(chr) === null || member.guild.channels.cache.get(chr) === undefined) return;
  
  if(roles) member.user.roles.add(roles)
  
  if (chx && chr) {
    var embed1 = new Discord.MessageEmbed().setColor('#2f3136') 
      .attachFiles([attachment]).setImage('attachment://welcome-image.png')
      .setDescription(replaces)
    member.guild.channels.cache.get(chr).send(embed1);
    }
}