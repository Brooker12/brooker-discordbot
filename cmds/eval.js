const Discord = require("discord.js")
const Client = new Discord.Client

module.exports.run = async (bot, message, args) => {

  if(message.author.id !== "629937326545567744") return;    
  
  let func = args.join(" ");
  if (!func) return message.channel.send("Please specify code to evaluate!");
  let evl = "FATAL_ERROR";
  function refresh() {
    require("child_process").execSync("refresh", { encoding: "utf-8" });
    console.log("Project refreshed");
  }
  
  try {
    evl = eval(func);
  } catch (e) {
    evl = e;
  }

  let evalEmbed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .addField("Input", "```js\n" + func + "\n```")
    .addField("Output", "```\n" + evl + "\n```")
  message.channel.send(evalEmbed);
  message.delete()
}
    module.exports.help = {
        name: "eval"
      }