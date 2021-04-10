const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "hack",
  description: "Hack users account [Not Real]",
  category: "Fun",
  usage: "`hack <@user>`",
  aliases: [""],
  run: async (client, message, args) => { 

const emails = [
  "sadlife1010@gmail.com",
  "dumbass@gmail.com",
  "thehotline0928@gmail.com",
  "error@gmail.com"
]

const passwords = [
  "uselsesss",
  "password124",
  "ilovemygrandma",
  "small",
  "olord",
  "dedykontol"
]

const lastdms = [
  "ff",
  "OMG GIRL REALLY",
  "ok",
  "Life is sooooo boring"
]

const user = message.mentions.users.first() || client.users.cache.get(args[0])
  const mention = new MessageEmbed().setColor(client.config.color)
   .setAuthor('Invalid Argument', message.author.displayAvatarURL())
   .setDescription(`${message.author}, You have to mention the people you want to hack!`)
  if(!user) return message.channel.send(mention)

  let email = emails[Math.floor(Math.random() * (emails.length))]
  let password = passwords[Math.floor(Math.random() * (passwords.length))]
  let lastdm = lastdms[Math.floor(Math.random() * (lastdms.length))]

  message.channel.send(`Totally real hack being prepared for ${user.tag}!`).then(async (m) => {
    await client.wait(3000)
    m.edit(`Finding discord login details`)
    await client.wait(3000);
    m.edit(`Bypassing 2FA (so easy)`)
    await client.wait(6000);
    m.edit(`Found details:\nEmail: \`${user.username}${email}\`\nPassword: \`${password}\``)
    await client.wait(4000);
    m.edit(`Last DM: ${lastdm}`)
    await client.wait(3000);
    m.edit(`INSERTING virus to there devices and wifi!`)
    await client.wait(6000)
    m.edit(`Freezing screen and selling all information to the government!`)
    await client.wait(4000)
    m.edit(`Getting location!`)
    await client.wait(7000)
    m.edit(`Hiring hitman...`)
    await client.wait(8000)
    m.edit(`Person killed!`)
    await client.wait(4000)
    m.edit(`Edited medical files and pronounced as deceased!`)
    await client.wait(5000)
    m.edit(`**Totally real hack complete! That person is now unknown....**`)
  })
  }
}