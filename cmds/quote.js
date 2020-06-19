const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let talk = [
    "**Jangan sampai kita lupa menghargai yang selalu ada,hingga akhirnya dia pergi karena kecewa dan kita terlambat menyadarinya.**",
    "**Jangan egois, yang hidup di bumi bukan kamu saja**",
    "**Bersemangatlah hari ini , jangan pedulikan kegagalan hari kemarin. Masih banyak kesempatan yang menunggumu di depan sana**",
    "**Gagal itu urusan nanti yang terpenting kita berani untuk mencoba dan mencoba**",
    "**Sadarlah bahwa Tuhan mengujimu karena Dia percaya dirimu lebih kuat dari yang kau duga. Bangkit. Hidup takan menunggu.**",
    "**Ketika kamu sudah lelah akan kehidupan maka carilah pendamping yg bsa memberimu semangat dan pelukan hangat**",
    "**Tinggalkan pikiran yang membuatmu lemah, dan peganglah pikiran yang memberi kekuatan bagimu**",
    "**Jika Anda tidak bisa membuat sesuatu menjadi baik, paling tidak buatlah hal itu terlihat baik**",
    "**Hidup seperti tai, walau busuk dan berada di bawah, namun tak ada orang yg berani menginjaknya**",
    "**Masalah yang kamu hadapi bukan untuk menjatuhkanmu, tetapi agar kamu bisa berpikir lebih dewasa dari hari ini, kemarin dan sebelumnya**",
    "**Janganlah kamu mengucapkan perkataan yang kamu sendiri tidak menyukainya jika mendengar orang lain mengucapkannya kepadamu**",
    "**Saya memilih orang yang malas untuk mengerjakan sebuah pekerjaan berat. Karena orang yang malas akan mencari cara yang mudah untuk mengerjakannya**",
    "**Jangan membandingkan diri sendiri dengan siapapun di dunia ini. Jika Anda melakukannya, Anda sedang menghina diri sendiri.**",
    "**Tindakan adalah kunci dasar untuk semua kesuksesan**",
    "**Hidup Ini Sederhana, Jangan Dibikin Rumit**'"
  ];
  let random = Math.floor(Math.random() * talk.length);
  message.reply(talk[random]);
};

module.exports.help = {
    name: "quote",
    description: "random quote",
    category: "Fun",
    usage: "a.quote"
}