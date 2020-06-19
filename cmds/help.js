const Discord = require("discord.js");

const fs = require("fs");

module.exports.run = async (bot, message, args, member) => {
  if (args[0]) {
    let cmd = args.shift().toLowerCase();
    let cf = require(`./${cmd}.js`);

    const embed = new Discord.RichEmbed()
      .setColor("#4b6adf")
      .setThumbnail(bot.user.displayAvatarURL)
      .setDescription(`The bot prefix is: a.`)
      .addField("**Command**", `${cf.help.name || "No Name"}`)
      .addField("**Description**", `${cf.help.description || "No Description"}`)
      .addField("**Category**", `${cf.help.category || "No Category"}`)
      .addField("**Usage**", `${cf.help.usage || "No Usage"}`);
    message.channel.send(embed);
  } else {
    const help = new Discord.RichEmbed()
      .setTitle("●▬▬● BROOKER COMMAND ●▬▬●")
      .setThumbnail(bot.user.displayAvatarURL)
      .setColor("#4b6adf")
      .setDescription(
        `
**If you need something or find a bug contact the bot developer with the command::** \`a.report\`

***• Moderator***
\`kick\`, \`ban\`, \`unban\`, \`addrole\`, \`removerole\`, \`topic\`, \`createch\`, \`deletech\`, \`clear\`, \`mute\`, \`unmute\`, \`warn\`, \`clearwarn\`, \`nickname\`, \`embed\`, \`lockdown\`  
    
***• Guilds***
\`setwelcome\`, \`setgoodbye\`, \`setverify\`, \`autorole\`, \`autonick\`, \`checkwarn\`, \`banlist\` \`mutelist\`

***• Information***
\`botinfo\`, \`userinfo\`, \`serverinfo\`, \`stats\`, \`ping\`, \`weather\`,  \`instagram\`, \`setafk\`, \`member\`, \`time\`, \`corona\`

***• Fun***
\`avatar\`, \`love\`, \`ascii\`, \`meme\`, \`say\`, \`pepe\`, \`8ball\`, \`quote\`, \`flip\`, \`howgay\`, \`penis\`, \`rps\`,  \`dice\`, \`duel\`, \`calc\`,\`hastebin\`
    
***• Economy***
\`work\`, \`beg\`, \`rob\`, \`deposit\`, \`balance\`, \`withdraw\`, \`pay\`, \`roulette\`, \`slots\`, \`buy\`, \`sell\`, \`store\`, \`cafe\`, \`daily\`, \`profile\`, \`weekly\`

***• Image & action***
\`wasted\`, \`wanted\`, \`rip\`, \`distort\`, \`scary\`, \`trigger\`, \`jail\`, \`fire\`, \`sniper\`, \`slap\`, \`punch\`, \`kill\`, \`wave\`, \`hug\`

***• Music*** [BUG]
\`play\`, \`skip\`, \`np\`, \`queue\`, \`pause\`, \`resume\`, \`stop\`
    
**●▬▬● BROOKER LINK ●▬▬●**
***[SUPPORT](https://discord.gg/Yvwn2rD)*** | ***[INVITE](https://discord.com/oauth2/authorize?client_id=667743057227153408&scope=bot&permissions=1551297783)*** | ***[VOTE](https://top.gg/bot/667743057227153408/vote)***`
      )
      .setFooter(
        `Type: help <command> to get information | example: a.help ban`
      )
      .setTimestamp();
    message.channel.send(help);
  }
};
module.exports.help = {
  name: "help",
  description: "show all commands",
  category: "Information",
  usage: ""
};
