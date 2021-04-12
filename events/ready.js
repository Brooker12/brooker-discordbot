const discord = require('discord.js')
const config = require('../config.json')
const { Slash } = require("discord-slash-commands");

module.exports.run = async client => {
  
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
	console.log(`Service in ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  
  const slash = new Slash({ client: client })  
  
   slash.create({
        guildOnly: false,
        data: {
            name: "activities",
            description: "Voice channel activities",
            options: [{
                    name: "channel",
                    description: "Select the voice channel you want.",
                    required: true,
                    type: 7,
                },
                {
                    name: "type",
                    description: "Type of activity.",
                    required: true,
                    type: 3,
                    choices: [{
                            name: "YouTube Together",
                            value: "yt"
                        },
                        {
                            name: "Betrayal.io",
                            value: "bio"
                        },
                        {
                            name: "Poker Night",
                            value: "pn"
                        },
                        {
                            name: "Fishington.io",
                            value: "fio"
                        }
                    ]
                }
            ]
        }
    })
  
  const webhookClient = new discord.WebhookClient(config.WebhookID, config.WebhookToken);
  const embed = new discord.MessageEmbed().setColor(config.color)
  .setDescription(`**${client.user.tag}** is now online again`)
    
  webhookClient.send({
    username: 'Brooker Status',
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
  
};