const yes = ["yes"];
const no = ["no"];

class Util {
  
  static delay(delayInms) {
   return new Promise(resolve  => {
     setTimeout(() => {
      resolve(2);
     }, delayInms);
   });
  }
  
  static randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static async verify(channel, user, time = 30000) {
    const filter = res => {
      const value = res.content.toLowerCase();
      return (
        res.author.id === user.id && (yes.includes(value) || no.includes(value))
      );
    };
    const verify = await channel.awaitMessages(filter, {
      max: 1,
      time
    });
    if (!verify.size) return 0;
    const choice = verify.first().content.toLowerCase();
    if (yes.includes(choice)) return true;
    if (no.includes(choice)) return false;
    return false;
  }
}

module.exports = Util;