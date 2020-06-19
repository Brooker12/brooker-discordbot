const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  
  let pages = [`**●▬▬● BOOKER COMMAND ●▬▬●**


***👮‍♂️ Moderator Command 👮‍♂️***
• **a.kick:** Mengeluarkan pengguna dari server.
• **a.ban:** Blokir pengguna dari server.
• **a.unban:** Membuka blokir pengguna
• **a.addrole:** Menambahkan role pada pengguna
• **a.removerole:** Menghapus role pada pengguna
• **a.createch:** Membuat Channel Baru
• **a.deletech** Menghapus Channel
• **a.clear** Menghapus beberapa pesan
• **a.mute** Membisukan Pengguna
• **a.unmute** Membatalkan bisu pada pengguna
• **a.warn** Memberi peringatan pada pengguna
• **a.nickname** Menganti nama pengguna
• **a.embed** Mengirimkan pesan dengan embed
• **a.lockdown** Mengunci channel
• **a.setjoin** Pesan member Masuk server
• **a.setleave** Pesan member keluar server
• **a.setverify** Membuat sistem verified server

***🚩 Infomation Command 🚩***
• **a.botinfo** Informasi tentang BOT
• **a.userinfok** informasi tentang pengguna
• **a.serverinfo** Informasi tentang server
• **a.stats** Informasi Status BOT
• **a.ping** Informasi PING anda
• **a.weather** Informasi tentang cuaca
• **a.contact** Kontak dengan developer bot
• **a.setafk** Membuat pengguna dapat AFK
• **a.instagram** Menampilkan instagram
• **a.setjoin** Pesan member Masuk
• **a.setleave** Pesan member Keluar
• **a.member** Melihat jumlah member pada server
• **a.time** Melihat waktu sekarang (Indonesia)`,
`***🕹️ Fun Command 🕹️***
• **a.avatar** Mendapatkan avatar pengguna
• **a.meme** Meme yang di random
• **a.love** Presentase Cinta
• **a.say** Meneruskan pesan anda.
• **a.pepe** Memberikan gambar pepe.
• **a.8ball** Menjawab pertanyaan anda.
• **a.quote** Mengirimkan quote random
• **a.flip** Membuat tulisan terbalik
• **a.howgay** Mengukur presentase Ga
• **a.penis** Mengukur penis
• **a.rps** Batu gunting kertas
• **a.dice** Membuat angkat secara acak
• **a.duel** Bertarung dengan seseorang

    
***💸 Economy Command 💸***
• **a.work** Menjadi pekerja
• **a.beg** Menjadi pengemis
• **a.rob** Merampok pengguna
• **a.deposit** Menyimpan uang
• **a.balance** Melihat isi uang
• **a.withdraw** Mengambil uang
• **a.pay** Memberikan uang
• **a.roulette** Permainan kasino dan judi
• **a.slots** Permainan mesin judi
• **a.buy** Membeli Barang
• **a.sell** Menjual barang
• **a.store** Toko Barang
• **a.cafe** Warung Ngopi
• **a.daily** Hadiah harian
• **a.weekly** Hadiah mingguan
• **a.profile** Profile pengguna`, 
`***📷 Image/action Command 📷***
• **a.wasted** Menampilkann avatar terbunuh
• **a.wanted** Menampilkan avatar tertangkap
• **a.rip** Menampilkan avatar mati
• **a.distort** Memutarbalikkana avatar
• **a.scary** Menampilkann avatar takut
• **a.trigger** Menampilkann avatar marah
• **a.jail** Menampilkann avatar dipenjara
• **a.fire** Menampilkann avatar berapi
• **a.sniper** Menampilkann avatar disniper
• **a.slap** Menampar pengguna lain
• **a.punch** Memukul pengguna lain
• **a.kill** Membunuh pengguna lain
• **a.wave** Melampai ke pengguna
• **a.hug** Memeluk pengguna lain

🎵 Music Command 🎵
• **a.play** Memutar lagu
• **a.skip** Melompati lagu
• **a.np** Lagu yang sedang diputar
• **a.queue** Antian lagu
• **a.clean** Menghapus antrian
• **a.pause** Menjeda lagu
• **a.resume** Melanjutkan lagu
• **a.stop** Menghentikan lagu
• **a.volume** Mengatur suara lagu
• **a.durasi** Melihat durasi lagu`];
let page = 1; 

    const embed = new Discord.RichEmbed() // Define a new embed
    .setColor(`#4b6adf`) // Set the color
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])

     message.channel.send(embed).then(msg => {

    msg.react('⬅').then( r => {
        msg.react('➡')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});

        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
          r.remove(r.users.filter(u => u === message.author).first());
        })

        forwards.on('collect', r => {
            if (page === pages.length) return;
            page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
          
        r.remove(r.users.filter(u => u === message.author).first());
        })
    })
})
}

module.exports.help = {
    name: "command",
    description: "show all command",
    category: "",
    usage: "a.command"
}