const Slash = require('da-slash');
module.exports = new Slash.GlobalCommand({
  name: 'invite',
  description: 'Brooker invite URL',
  permissions: ["SEND_MESSAGES"],
  execute(interaction) {
    
    interaction.sendEphemeral('https://brooker.cf/');
  }
})