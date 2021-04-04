module.exports.run = (client, message) => {
  
  if(message.author.bot) return;
  
  let construct = {
    content: message.content, 
    member: message.member, 
    author: message.author,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null,
    time: Date.now()
    }; 
  client.snipes.set(message.channel.id, construct);
};