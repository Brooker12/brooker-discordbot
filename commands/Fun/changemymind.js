const { MessageAttachment } = require('discord.js')
const Canvacord = require('canvacord')

module.exports = {
    name: "changemymind",
    usage: "`changemymind <text>`",
    description: "Image changemymind with text",
    category: "Fun",
    aliases: ["cmm"],
    run: async (client, message, args) => {
      
        let text = args.join(' ')
        if(!text) return message.channel.send('No text is provided.')
      
        message.channel.send("Loading...").then(m => m.delete({timeout: 3000}))

        let img = await Canvacord.Canvas.changemymind(text);
        let attachment = new MessageAttachment(img, 'changemymind.png');
        message.channel.send(attachment)
    }
}