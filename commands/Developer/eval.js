const moment = require("moment");
const db = require('quick.db')
const discord = require('discord.js')
const topgg = require('top.gg-core');
const dbl = new topgg.Client(process.env.dblToken)

module.exports = {
  name: "eval",
  description: "evaled",
  category: "Developer",
  ownerOnly: true,
  usage: "eval <code>",
  aliases: ["ev"],
  run: async (client, message, args) => {  
    
    if(!args[0]) return message.channel.send(`\`ERROR\` \`\`\`js\nYou cant start eval without some args\n\`\`\``);
    
    const clean = text => {
    if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
    return text;}

    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled,  {depth: 0});
 
      message.channel.send(clean(evaled), {code:"js"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
    }
}}