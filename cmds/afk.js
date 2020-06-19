const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  
message.channel.send('xdemb').then(m => m.delete(5000));

};


module.exports.help = {
    name: "",
    description: "",
    category: "",
    usage: "``"
}