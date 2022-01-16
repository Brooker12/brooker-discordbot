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
    
    const Text = args.slice(0).join(" ");
    
    if(!Text) return message.channel.send("Input text first!");
    
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');
    
    const background = await Canvas.loadImage('https://media.discordapp.net/attachments/801988747205935144/932095901634265168/unknown.png');
    
    context.drawImage(background, 0,0, canvas.width, canvas.height);
    
//     const applyText = (canvas, text) => {
      
//       const context = canvas.getContent('2d');
      
//       let fontSize = '14px';
      
//       do {
//         context.font = `${fontSize -= 10}px sans-serif`;
//       } while (context.measureText(text).width > canvas.width - 300);
      
//       return context.font;
//     }
     
    context.font = '14px arial';
    
    const Chatlog = 'Noordin_Othman says: Mau cukur model apa mas?\nDedi_Nugroho says: Gatau mas, hehe.\nNoordin_Othman says: Oke mas, tunggu ya.';
    
    context.fillStyle = '#c4a5de';
    context.fillText(Text, canvas.width / 50.0, canvas.height / 10.0);
    context.fillStyle = '#ffffff';
    context.fillText(Chatlog, 10, 90);
    

    const attachment = new MessageAttachment(canvas.toBuffer(), 'ssrp.png');
    
    message.channel.send({files: [attachment]});
  }
}