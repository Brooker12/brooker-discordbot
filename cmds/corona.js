const discord = require("discord.js");
const { get } = require("request-promise-native");
const moment = require('moment')
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

 let date = new Date();

let day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
let days = day[date.getDay()]

let month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
let months = month[date.getMonth()]

var a = (`${moment().utcOffset('+0000').format("HH : mm")}`) 

module.exports = {
  name: "corona",
  category: "info",
  description: "Get the stats of corona",
  usage: "corona all or corona <country>",
  aliases: ["covid", "covid19"],
  run: async (client, message, args) => {
    if (!args.length) {
      return message.channel.send("Country not found or doesn\'t have any cases");
    }
  
    if (args[0] === "all") {
      let corona = await track.all(); //it will give global cases
  
      
      let embed = new discord.RichEmbed()
      .setTitle("Global Cases")
      .setDescription('This bot is using covid19 api .live api but the number of cases may differ by small unit')
      .setColor("#ff2050")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setFooter(`Last Update - ${days}, ${months} ${date.getDate()}, ${date.getFullYear()} | ${a} +0000`)


      return message.channel.send(embed);
    } else {
      let corona = await track.countries(args.join(" ")); //change it to countries

      let embed = new discord.RichEmbed()
      .setTitle(`${corona.country}`)
      .setColor("#ff2050")
      .setDescription('This bot is using covid19 api .live api but the number of cases may differ by small unit')
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setFooter(`Last Update - ${days}, ${months} ${date.getDate()}, ${date.getFullYear()} | ${a} +0000`)

      return message.channel.send(embed);
    }
  }
};

module.exports.help = {
    name: "corona",
    description: "show cases of corona country",
    category: "Information",
    usage: "`corona <country>`"
}