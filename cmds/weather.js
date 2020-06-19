const Discord = module.require("discord.js")
const weather = require("weather-js")

module.exports.run = async (bot, message, args) => {

   
        let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.weather [location]`")
    .setTimestamp();
   weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(xdemb)
       if(result.length === 0) {
            message.channel.send(xdemb)
            return;
        }

        //Variables
        var current = result[0].current //Variable for the current part of the JSON Output
        var location = result[0].location //This is a variable for the location part of the JSON Output

        //Sends weather log in embed
        let embed = new Discord.RichEmbed()
           .setDescription(`**${current.skytext}**`) //How the sky looks like
           .setAuthor(`Cuaca dari ${current.observationpoint}`) //Shows the current location of the weater
           .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
           .setColor(0x00AE86) //Sets the color of the embed
           .addField("Zona waktu", `UTC${location.timezone}`, true) //Shows the timezone
           .addField("Jenis derajat", location.degreetype, true) //Shows the degrees in Celcius
           .addField("Suhu", `${current.temperature}`, true)
           .addField("Terasa seperti", `${current.feelslike} Derajat`, true)
           .addField("Angin", current.winddisplay, true)
           .addField("Kelembaban", ` ${current.humidity}%`, true)
           .addField("Hari", `${current.day}`, true)
           .addField("Tanggal", `${current.date}`, true)
           
           //Display when it's called
           message.channel.sendEmbed(embed)

    });
}

module.exports.help = {
    name: "weather",
    description: "show weather city",
    category: "Information",
    usage: "`weather <city name>`"
}