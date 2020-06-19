const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
  name: "instagram",
  aliases: ["insta"],
  category: "info",
  description: "Find out some nice instagram statistics",
  usage: "<name>",
  run: async (client, message, args) => {
    const name = args.join(" ");
    var kont = new RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Missing Arguments!")
      .setDescription("Usage: `a.instagram [username]`")
      .setTimestamp();
    if (!name) {
      return message.channel.send(kont).then(m => m.delete(5000));
      message.delete();
    }

    const url = `https://instagram.com/${name}/?__a=1`;

    let res;

    try {
      res = await fetch(url).then(url => url.json());
    } catch (e) {
      return message.channel
        .send(
          "Saya tidak dapat menemukan pengguna, silahkan koreksi nama pengguna"
        )
        .then(m => m.delete(5000));
    }

    const account = res.graphql.user;

    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle(account.full_name)
      .setURL(`https://instagram.com/${name}`)
      .setThumbnail(account.profile_pic_url_hd)
      .addField(
        "Profile information",
        stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${
              account.biography.length == 0 ? "none" : account.biography
            }
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`
      )
      .setFooter(message.author.username, message.author.avatarURL)
      .setTimestamp();
    message.channel.send(embed);

    message.delete();
  }
};

module.exports.help = {
    name: "instagram",
    description: "show user instagram",
    category: "Information",
    usage: "`instagram <username>`"
}