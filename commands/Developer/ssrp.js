const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
  name: "ssrp",
  description: "Screenshot Roleplay",
  category: "Developer",
  ownerOnly: true,
  usage: "ssrp [text]",
  aliases: [""],
  run: async (client, message, args) => {  
    
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');
    
    const background = await Canvas.loadImage('');
    
    context.drawImage(background, 0,0, canvas.width, canvas.height);
    
    context.strokeStyle = '#0099ff';
    
    context.strokeRect(0,0, canvas.width, canvas.height);
    
    context.font = "14px sans-serif";
    
    context.fillStyle = '#fffff';
    context.fillText('Noordin_Othman says: Im the guy who want to be a Police.', canvas.width, canvas.height);
    
    
    const applyText = (canvas, text) => {
      
      const context = canvas.getContent('2d');
      
      let fontSize = '14px';
      
      do {
        context.font = `${fontSize -= 10}px sans-serif`;
      } while (context)
      
    }
    
    const attachment = new MessageAttachment(canvas.toBuffer(), 'ssrp.png');
    
    message.channel.send({files: [attachment]});
  }
}