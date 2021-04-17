const Discord = require("discord.js");

module.exports = {
  name: "dice",
  description: "Roll the dice and get a number",
  category: "Fun",
  usage: "`dice`",
  aliases: ["randomnumber"],
  run: async (client, message, args) => {   

const filterOne = m => m.content === 'firstFilter' 

//This is a filter and the 'm' is 'message' I believe. This is a filter and doesn't have to be m.content, but I will put it in this because its a little easier to understand

message.channel.send('This is the first awaitMessage, so type firstFilter').then(() => {
  message.channel.awaitFilter(filterOne, {max: 1, time: 5000, errors: ['time']}) //Max of 1 messages, time in milliseconds and error if time runs out
  .then(collected => {
    //If the user's message passes through the filter
    const filterTwo = m => m.content === 'secondFilter' //Since the user passed the first filter, this is filter 2

    message.channel.send('Passed through filter one, this is filter two').then(() => {
  message.channel.awaitMessages(filterTwo, {max: 1, time: 5000, errors: ['time']})

  .then(collected => {
   //User passes through second filter too
   message.channel.send('Congratulations, you passed through both filters')
   })
   .catch(collected => {
   //User passed through first filter but not the second
   message.channel.send('You did not pass filter 2')
   })
})

   })
})
}};