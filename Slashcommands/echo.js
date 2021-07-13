const Slash = require('da-slash');
module.exports = new Slash.GlobalCommand({
  name: 'echo',
  description: 'sends a message',
  permissions: ["SEND_MESSAGES"],
  options: [{
    "name": "content",
    "description": "message the bot will send",
    "required": true,
    "type": 3 // Type 3 is string
  }],
  execute(interaction) {
    // access discord.Client() through interaction.client
    const client = interaction.client;
    // access the data related to the slash command emitted
    const request = interaction.request;
    // access the arguments passed
    const content = request.data.options.find(arg => arg.name === "content").value;
    // sends message containing the argument
    interaction.sendMessage(content);
  }
})