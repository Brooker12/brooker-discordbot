const Discord = require("discord.js");
const fetch = require("node-fetch")
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
  name: "samp",
  description: "Show samp server information",
  category: "General",
  usage: "`samp <IP:Address>`",
  aliases: [""],
  cooldown: 2000,
  run: async (client, message, args) => { 
    
    
var novc = new Discord.MessageEmbed()

.setTitle("Woops!")
.setDescription("You're not in a voice channel")

var poker = new Discord.MessageEmbed()

.setTitle("Poker")
.setDescription("Press the button below to play poker!")
    
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send(novc)
    
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
        max_age: 0,
        max_uses: 0,
        target_application_id: "667743057227153408",
        target_type: 2,
        temporary: false,
        validate: null
    }),
    headers: {
        "Authorization": `Bot kntl`,
        "Content-Type": "application/json"
    }
})
    .then(res => res.json())
    .then(invite => {
console.log("sh https://discord.com/invite/awjdoad")

let wtf = new MessageButton()
.setStyle('url')
.setLabel('Play') 
.setEmoji('🎴')
.setURL(`https://discord.com/invite/${invite.code}`)

let wtf2 = new MessageActionRow()
.addComponent(wtf)

message.channel.send("", { embed: poker, component: wtf2})
  }}