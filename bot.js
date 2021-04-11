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
const fetch = require('node-fetch');
const db = require('quick.db')
const Discord = require("discord.js")
const client = new Discord.Client({ disableMentions: 'everyone' });
const config = require('./config.json')
const dbl = require('top.gg-core');
const webhook = new dbl.Webhook(process.env.dblWebhook)
const api = new dbl.Client(process.env.dblToken)

var http = require("http")
var wib = (`${moment().utcOffset('+0700').format("MMM DD YYYY")}`)   
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());
app.use(express.static("views"));
app.use(express.static("public")); 
   
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.afk = new Map();
client.snipes = new Map();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//--------------------------------------- C A L L B A C K ---------------------------------------------------------

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify', 'guilds.join', 'guilds'];
var prompt = 'consent'

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://brooker.glitch.me/callback',
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
    res.redirect("/login");
}

function fullUrl(req, res) {
  req.protocol + '://' + req.get('host') + req.originalUrl
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
res.status(200).render("index", {client:client, user: req.user})
console.log('Ping!')
});

//--------------------------------------- A U T H E N T I C A T E ---------------------------------------------------------
app.get('/login', passport.authenticate('discord', { scope: scopes, prompt: prompt }), function(req, res) {});
app.get('/callback', passport.authenticate('discord', {failureRedirect: '/' }), function (req, respon) {
respon.render("/", {data: req.body, user: req.user, client:client})
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
app.get('/logout', checkAuth, function(req, res) {
req.logout();
res.redirect('/');
});
app.get('/info', checkAuth, function(req, res) {
res.json(req.user);
}); 

//--------------------------------------- S H O R T, URL ---------------------------------------------------------

app.get("/commands", async(request, response) => { 
response.render("commands", {client: client, user: request.user})
})
app.get("/about", (request, response) => { 
response.render("about", {client:client, user: request.user})
})
app.get("/welcome", (request, response) => { 
response.render("welcome", {client:client, user: request.user})
})
app.get("/contact", (request, response) => {
response.render("contact",  {client:client, user: request.user})
})
app.get("/partner", (request, response) => {
response.render("partner/partner",  {client:client, user: request.user, db: db})
})
app.get("/partner/:id", (request, response) => {
response.render("partner/partner-show",  {client:client, user: request.user, db: db,  guild: client.guilds.cache.get(request.params.id)})
})
app.get("/partner/:id/invite", (request, response) => {
response.statusCode = 302;
let invite = db.get(`partner`).find(a => a.id === request.params.id)
response.setHeader("Location", 'https://discord.gg/'+invite.link);
response.end()
})

//--------------------------------------- M A N A G E ---------------------------------------------------
app.get("/manage", (request, response) => {
response.render("dashboard/manage",  {client:client, user: request.user, req: request, res: response})
})
app.get("/manage/:guild", checkAuth , (request, response) => {
if(!client.guilds.cache.get(request.params.guild) || 
   !client.guilds.cache.get(request.params.guild).me.hasPermission('MANAGE_GUILD') ||
   !client.guilds.cache.get(request.params.guild).members.cache.get(request.user.id).hasPermission("MANAGE_GUILD")) return response
   .status(404).sendFile(`${__dirname}/views/404.html`);
response.render("dashboard/manage-show", {client:client, user: request.user, db: db,  guild: client.guilds.cache.get(request.params.guild)})
})

//------------------------------------------- C O N F I G U R A T I O N -----------------------------------------

//Custom-Commands
app.get('/manage/:id/custom-commands',checkAuth, (req, res) => {
if(!client.guilds.cache.get(req.params.id) || 
   !client.guilds.cache.get(req.params.id).me.hasPermission('MANAGE_GUILD') ||
   !client.guilds.cache.get(req.params.id).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res
   .status(404).sendFile(`${__dirname}/views/404.html`);
  
 res.render('dashboard/custom-commands',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/custom-commands',checkAuth, urlencodedParser, (req, res) => {
      let data = {
        name: req.body.cmdName.toLowerCase(),
        responce:  req.body.cmdRespon
      }
      db.push(`cmd_${req.params.id}`, data)
  res.redirect(`/manage/${req.params.id}/custom-commands`)
})

//Welcome
app.get('/manage/:id/welcome',checkAuth, (req, res) => {
if(!client.guilds.cache.get(req.params.id) || 
   !client.guilds.cache.get(req.params.id).me.hasPermission('MANAGE_GUILD') ||
   !client.guilds.cache.get(req.params.id).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res
   .status(404).sendFile(`${__dirname}/views/404.html`);
  
 res.render('dashboard/welcome',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/welcome',checkAuth, urlencodedParser, (req, res) => {  
  
  db.set(`welcome_${req.params.id}.toggle`, req.body.toggle)
  db.set(`welcome_${req.params.id}.channel`, req.body.channel)
  db.set(`welcome_${req.params.id}.msg`,req.body.message)
  
  res.redirect(`/manage/${req.params.id}/welcome`)
})

//Leave
app.get('/manage/:id/leave',checkAuth, (req, res) => {
if(!client.guilds.cache.get(req.params.id) || 
   !client.guilds.cache.get(req.params.id).me.hasPermission('MANAGE_GUILD') ||
   !client.guilds.cache.get(req.params.id).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res
   .status(404).sendFile(`${__dirname}/views/404.html`);
  
 res.render('dashboard/leave',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/leave',checkAuth, urlencodedParser, (req, res) => {  
  
  db.set(`leave_${req.params.id}.toggle`, req.body.toggle)
  db.set(`leave_${req.params.id}.channel`, req.body.channel)
  db.set(`leave_${req.params.id}.msg`,req.body.message)
  
  res.redirect(`/manage/${req.params.id}/leave`)
})

//Leveling
app.get('/manage/:id/leveling',checkAuth, (req, res) => {
if(!client.guilds.cache.get(req.params.id) || 
   !client.guilds.cache.get(req.params.id).me.hasPermission('MANAGE_GUILD') ||
   !client.guilds.cache.get(req.params.id).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res
   .status(404).sendFile(`${__dirname}/views/404.html`);
  
 res.render('dashboard/leveling',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/leveling',checkAuth, urlencodedParser, (req, res) => {  
  
  db.set(`level_${req.params.id}.toggle`, req.body.toggle)
  db.set(`level_${req.params.id}.channel`, req.body.channel)
  
  res.redirect(`/manage/${req.params.id}/leveling`)
})

//Rewards
app.get('/manage/:id/rewards',checkAuth, (req, res) => {
if(!client.guilds.cache.get(req.params.id) || 
   !client.guilds.cache.get(req.params.id).me.hasPermission('MANAGE_GUILD') ||
   !client.guilds.cache.get(req.params.id).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res
   .status(404).sendFile(`${__dirname}/views/404.html`);
  
 res.render('dashboard/rewards',  {client:client, user: req.user, db: db,  guild: client.guilds.cache.get(req.params.id)})
})
app.post('/manage/:id/rewards',checkAuth, urlencodedParser, (req, res) => {  
  
  let database = db.fetch(`rolerewards_${req.params.id}.reward`).find(x => x.level === req.body.level)
  let already = false
  
  if(database) {
    already = true
  } else {
    
  }
  
      let data = {
        level: req.body.level,
        roles:  req.body.roles
      }
      db.push(`rolerewards_${req.params.id}.reward`, data)
  
  res.redirect(`/manage/${req.params.id}/rewards`)
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
  res.render("contact-succes", {data: req.body, user: req.user, client:client})
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
  res.status(404).sendFile(`${__dirname}/views/404.html`)
})
app.use(function (err, res) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//--------------------------------------- E N D ---------------------------------------------------------

setInterval(() => {
http.get('http://brooker.glitch.me/');
}, 300000);
var listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
client.login(process.env.TOKEN)  