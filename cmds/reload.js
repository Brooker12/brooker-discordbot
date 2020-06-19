module.exports = {
    config: {
        name: "restart",
        description: "restarts the bot",
        usage: "wrestart",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["rs"]
    },
    run: async (client, message, args) => {
    message.delete()
    if(message.author.id != "629937326545567744") return message.delete()
      
    try {
    const a = await message.channel.send('Reload...').then(m => m.delete(5000))
    a.edit('Donee')
    process.exit(1) 
    } catch(e) {
        message.channel.send(`ERROR: \`${e.message}\``)
    }

    }
}