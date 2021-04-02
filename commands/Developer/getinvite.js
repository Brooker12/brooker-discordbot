module.exports = {
  name: "getinvite",
  description: "get server invite link",
  category: "Developer",
  ownerOnly: true,
  usage: "getinvite <Server ID>",
  aliases: ["ginvite"],
  run: async (client, message, args) => {  

let guild = client.guilds.cache.get(args[0]);
if(!args[0]) return message.reply('Cannot find that ID.')
if (!guild) return message.reply("The bot isn't in the guild with this ID.");

let invitechannels = guild.channels.cache.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')

invitechannels.random().createInvite().then(invite=> message.channel.send('Found Invite:\ndiscord.gg/' + invite.code))
    
  }
}