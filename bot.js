const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 
const fs = require("fs");
const path = require("path")
const url = require('url');
const moment = require('moment');
const session  = require('express-session')
const passport = require('passport')
const Strategy = require('./lib/strategy.js')
const axios = require('axios')
const db = require('quick.db')
const Discord = require("discord.js")
//const { DiscordTogether } = require('discord-together');
const config = require('./config.json')
const dbl = require('top.gg-core'); 
const client = new Discord.Client({ disableMentions: 'everyone' });
const webhook = new dbl.Webhook(process.env.dblWebhook)
const api = new dbl.Client(process.env.dblToken)

var http = require("http")
var wib = (`${moment().utcOffset('+0700').format("MMM DD YYYY")}`)   
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());
app.use(express.static("views"));
app.use(express.static("views/Public")); 
   
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")

//client.discordTogether = new DiscordTogether(client);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.afk = new Map();
client.snipes = new Map();

try{
  ["command", "events"].forEach(handler => {
    require(`./utils/${handler}`)(client);
  });
} catch (e){
  console.error(e);
}

//--------------------------------------- C A L L B A C K ---------------------------------------------------------

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify', 'guilds'];
var prompt = 'consent'

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://brooker.cf/callback',
    scope: scopes,
    prompt: prompt
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect('/login');
}

function fullUrl(req, res) {
  req.protocol + '://' + req.get('host') + req.originalUrl
}

function checkPerms(req, res, next) {
  if(client.guilds.cache.get(req.params.id) || client.guilds.cache.get(req.params.id).me.hasPermission('MANAGE_GUILD') ||
     client.guilds.cache.get(req.params.id).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return next()
  res.status(404)
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function async(req, res) {
res.status(200).render("pages/index", {user: req.user})
console.log('Ping!')
});

app.get("/arc-sw.js", (req, res) => {
  res.status(200).sendFile(`${__dirname}/arc-sw.js`)
})

//--------------------------------------- A U T H E N T I C A T E ---------------------------------------------------------
app.get('/login', function(req, res, next) {
  
  if (req.session.backURL) {

    req.session.backURL = req.session.backURL;

  } else if (req.headers.referer) {

    const parsed = req.headers.referer;

    if (parsed.hostname === app.locals.domain) {
      req.session.backURL = parsed.path;
    }

  } else { req.session.backURL = '/'; } 
  
  next();
},passport.authenticate('discord'));

app.get('/callback', passport.authenticate('discord', {failureRedirect: '/' }), function (req, res) {

    if (req.session.backURL) {

    if (req.session.backURL === `${config.protocol}${config.domain}`) {

      res.redirect(`${config.protocol}${config.domain}/`)

    } else {
      res.redirect(req.session.backURL);
      req.session.backURL = null;
    }

  } else { res.redirect('/'); }
  
const avatar =  client.users.cache.get(req.user.id).displayAvatarURL()
const login = new Discord.MessageEmbed().setColor('#2f3136')
.setDescription(`**${req.user.username+"#"+req.user.discriminator}** has logged in website`)
.setFooter(`ID: ${req.user.id}`)

const webhookClient = new Discord.WebhookClient(config.WebhookID, config.WebhookToken);
 webhookClient.send({
    username: 'Brooker Logs',
    avatarURL: client.user.displayAvatarURL(),
    embeds: [login],
  });
})// auth success
app.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});
app.get('/info', checkAuth, function(req, res) {

res.json(req.user);
}); 

//--------------------------------------- S H O R T, URL ---------------------------------------------------------

app.get("/commands", async(request, response) => { 
response.render("pages/commands", {bot: client, user: request.user})
})
app.get("/about", (request, response) => { 
response.render("pages/about", {bot:client, user: request.user})
})
app.get("/contact", checkAuth, (request, response) => {
response.render("pages/contact", {user: request.user})
})
app.get("/welcome", (request, response) => { 
response.render("pages/welcome")
})
app.get("/privacy-policy", (request, response) => { 
response.render("pages/privacy-policy")
})

app.get("/status", (request, response) => { 
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let mins = Math.floor(totalSeconds / 60);
let secs = Math.floor(totalSeconds % 60);
let uptime = `${days} days ${hours} hours ${mins} mins ${secs} secs`
response.render("pages/status", {bot:client, user: request.user, uptime: uptime})
})

app.get("/admin", checkAuth, (req, res) => {
  
//   let admins = ["629937326545567744"]
//   let authorID = req.user.id
  
//   let login = db.get(`login`)
  
//   if(authorID.includes(admins)) {  
//     res.render("admin", {bot: client, user: req.user, db:login})
//   } else {
//     res.status(405).render('error', {
//      status: '404 Not Allowed', 
//      desc: 'Dude, this place not allowed for you'
//     })
//   }
  
  res.render("admin", {bot: client, user: req.user})
  
})

//------------------------------------ P A R T N E R ---------------------------------------------------------
app.get("/partner/:id", (request, response) => {

let data = db.get(`partner`).find(x => x.id === request.params.id)
let datax = db.get(`comments.${request.params.id}`)

if(!data) return response.status(404)

response.render("partner/partner-show",  {user: request.user, bot: client, data: data, datax: datax, moment: moment,
                                          guild: client.guilds.cache.get(request.params.id)})
})
app.get("/partner", (request, response) => {
  
response.render("partner/partner",  {bot:client, user: request.user, db: db})
})
app.get("/partner/:id/invite", (request, response) => {
response.statusCode = 302;
let invite = db.get(`partner`).find(a => a.id === request.params.id)
response.setHeader("Location", 'https://discord.gg/'+invite.link);
response.end()
})
app.post("/comments/:id", urlencodedParser, (request, response) => {  
  let data = {
    author: request.user.id,
    id: request.params.id,
    date: Date.now(),
    subject: request.body.subject
  }
  
  db.push(`comments.${request.params.id}`, data)
  
  response.redirect('/partner/'+request.params.id)
})
app.post("/delete-commment/:id/:date", urlencodedParser, (req, res) => {
  
  let comment = db.get(`comments.${req.params.id}`)
  let commentData = comment.find(x => x.date === req.params.date)   
  let value = comment.indexOf(commentData)
  delete comment[value]

  var filter = comment.filter(x => {
    return x != null && x != ''
  })
  
  db.set(`comments.${req.params.id}`, filter)
  
  res.redirect('/partner/'+req.params.id)
})
//--------------------------------------- M A N A G E ---------------------------------------------------
app.get("/manage", checkAuth, (request, response) => {
  let permissions = Discord.Permissions
  
  response.render("dashboard/manage",  {bot:client, user: request.user, req: request, res: response, permissions:permissions})
})
app.get("/manage/:id", checkAuth, checkPerms, (request, response) => {
  
  response.render("dashboard/manage-show", {user: request.user, db: db,  guild: client.guilds.cache.get(request.params.id)})
})

//------------------------------------------- C O N F I G U R A T I O N -----------------------------------------

//Custom-Commands
app.get('/manage/:id/custom-commands', checkAuth, checkPerms, (req, res) => {
  
 res.render('dashboard/custom-commands',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id), already: false})
})
app.post('/manage/:id/custom-commands', checkAuth, urlencodedParser, (req, res) => {
  
  let database = db.fetch(`cmd_${req.params.id}`)
  let already = false
  
  if(database && database.find(x => x.name === req.body.cmdName.toLowerCase())) {
    already = true
  } else {
    let data = { name: req.body.cmdName.toLowerCase(), responce:  req.body.cmdRespon }
    db.push(`cmd_${req.params.id}`, data) 
  }
  
  res.render('dashboard/custom-commands',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id), already: already})
})

//Welcome
app.get('/manage/:id/welcome', checkAuth, checkPerms, (req, res) => {
  
 res.render('dashboard/welcome',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/welcome', checkAuth, urlencodedParser, (req, res) => {  
  
  db.set(`welcome_${req.params.id}.toggle`, req.body.toggle)
  db.set(`welcome_${req.params.id}.channel`, req.body.channel)
  db.set(`welcome_${req.params.id}.msg`,req.body.message)
  
  res.redirect(`/manage/${req.params.id}/welcome`)
})

//Leave
app.get('/manage/:id/leave', checkAuth, checkPerms, (req, res) => {
  
 res.render('dashboard/leave',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/leave', checkAuth, urlencodedParser, (req, res) => {  
  
  db.set(`leave_${req.params.id}.toggle`, req.body.toggle)
  db.set(`leave_${req.params.id}.channel`, req.body.channel)
  db.set(`leave_${req.params.id}.msg`,req.body.message)
  
  res.redirect(`/manage/${req.params.id}/leave`)
})

//Leveling
app.get('/manage/:id/leveling', checkAuth, checkPerms, (req, res) => {
  
 res.render('dashboard/leveling',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/leveling', checkAuth, urlencodedParser, (req, res) => {  
  
  let toggle = req.body.toggle
  if(toggle !== 'ON') toggle = false
  else toggle = true
  
  db.set(`level_${req.params.id}.toggle`, toggle)
  db.set(`level_${req.params.id}.channel`, req.body.channel)
  
  res.redirect(`/manage/${req.params.id}/leveling`)
})

//Rewards
app.get('/manage/:id/rewards', checkAuth, checkPerms, (req, res) => {
  
 res.render('dashboard/rewards',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id), already: false})
})
app.post('/manage/:id/rewards', checkAuth, urlencodedParser, (req, res) => {  
  
  let database = db.get(`rolerewards_${req.params.id}.reward`)
  let already = false
  
  if(database && database.find(x => x.level === req.body.level) || database && database.find(x => x.roles === req.body.roles)) { 
    already = true 
  } else {
    let data = { level: req.body.level, roles: req.body.roles };
    db.push(`rolerewards_${req.params.id}.reward`, data);
  }
  
   res.render('dashboard/rewards', {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id), already: already})
}) 
//--------------------------------------- P O S T ---------------------------------------------------------
app.post('/webhook', webhook.advanced(), (req, res) => {
  console.log(req.vote) 
  let vote = req.vote.user
  let user = client.users.cache.get(vote)
  
   const embed = new Discord.MessageEmbed().setColor('#2f3136')
    .setDescription(`**${user.tag}** has vote brooker today`)
    .setFooter(`ID: ${user.id}`)
  const webhookClient = new Discord.WebhookClient(config.WebhookID, config.WebhookToken);
   webhookClient.send({
     username: 'Brooker Voting',
     avatarURL: client.user.displayAvatarURL(),
     embeds: [embed],
   });
}) 
app.post('/contact',checkAuth, urlencodedParser, async(req, res) => {
  res.render("pages/contact-succes", {data: req.body, user: req.user, bot:client})
  const avatar =  client.users.cache.get(req.user.id).displayAvatarURL()
  
  const embed = new Discord.MessageEmbed().setColor('#2f3136')
  .setAuthor(`${req.user.username+"#"+req.user.discriminator} [${req.user.id}] Contact`, avatar)
  .addField(`Sugestion:`, `${req.body.subject}`)
  .setFooter(`From: Website`)
const webhookClient = new Discord.WebhookClient(config.WebhookID, config.WebhookToken);
 webhookClient.send({
    username: 'Brooker Logs',
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
})
//--------------------------------------- C H A R S T O R Y ---------------------------------------------------------
// app.get('/character-story', (req, res) => {
// res.render("character-story", {client:client, user: req.user})
// })
// app.post('/character-story', (req, res) => {

// function makeid(length) {
//    var result           = '';
//    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//    var charactersLength = characters.length;
//    for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//    }
//    return result;
// }
  
//   let id = makeid(5)
  
//   db.push(`cs`, {id: id, story: req.body.story})
//   res.redirect(`/story/${id}`)
//   console.log(req.body.story)
// })
// app.get('/story/:id', function(req, res){
//   let data = db.get(`cs`);
  
//   let check = data.find(x => x.id === req.params.id);
  
//   if (!check) return res.redirect("/")
  
//   let story = check.story;
  
//   res.render("file.ejs", {story: story, client:client, user: req.user})
// })
//--------------------------------------- L I N G K E D ---------------------------------------------------------

app.get("/invite", (request, response) => {
response.status(302).sendFile(`${__dirname}/views/invite.html`)
})
app.get("/vote", (request, response) => {
response.statusCode = 302;
response.setHeader("Location", "https://top.gg/bot/667743057227153408/vote");
response.end()
})

//--------------------------------------- S T A T U S ---------------------------------------------------------

app.use(function (req, res, next) {
  res.status(404).render('error', {
    status: '404 Not Found', 
    desc: 'Sorry about that, but the page you looking for is not available'
  })
})
app.use(function(err, req, res, next){
  console.error(`500 Server Error on ${req.url}\n`+err.stack)
  res.status(500).render('error', {
    status: '505 Server Error', 
    desc: 'Sorry, something went error, try again later or report this problem'
  })
});

//--------------------------------------- E N D ---------------------------------------------------------

setInterval(function() {
  axios.get('https://brooker.glitch.me/').then(console.log("Pong at " + moment(Date.now()).utcOffset('+0800').format("MMM DD YYYY LT"))).catch(() => {});
}, 600 * 1000); //1 minute
var listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
client.login(process.env.TOKEN) 