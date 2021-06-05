
module.exports.run = async (button) => {
  
  if (button.id === 'samp-refresh') {
     await button.reply.send('My message');
  }
  
}