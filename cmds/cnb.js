exports.run = async (client, message, args) => {
    const newName = message.content.split(' ');

     if(!message.author.id === "629937326545567744") return message.channel.send("I not my owner!").then(m => m.delete(5000));
     if(!args[0]) return message.channel.send("What my new name?")    
  
    try{
        client.user.setUsername(newName[1])
            .then(user => message.channel.send(`My new username is **${user.username}**`))
            .catch(console.error);
    }
    catch(error){
        message.channel.send("I could not set my new username :sob:");
    }
}