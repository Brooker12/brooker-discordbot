module.exports = {
  name: "reload",
  description: "reloading",
  category: "Developer",
  ownerOnly: true,
  usage: "reload <command name> || reload (Restaring)",
  aliases: ["rst","rst","rl"],
  run: async (client, message, args) => {  

   if(args[0]){
     let commands = client.commands.get(`${args[0]}`) || client.commands.get(client.aliases.get(`${args[0]}`))
     
     if(!commands) return message.channel.send('I can\'t find dhat shit command name, try again.')
     
     let category = commands.category
     let name = commands.name
     
    try {
     delete require.cache[require.resolve(`../../commands/${category}/${name}.js`)] 
     client.commands.delete(name)
      
     const pull = require(`../../commands/${category}/${name}.js`)
     client.commands.set(name, pull)
     message.channel.send(`Succesfully reload **${name}** command`)
    } catch(e) {
        message.channel.send(`Could not reload: **${name}**\n\n*${e}*`)
    } 
   } else {
     message.channel.send('Restaring..')
     process.exit()
   }
  }
}  