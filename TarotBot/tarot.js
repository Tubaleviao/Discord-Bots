var Discord = require("discord.js");
var logger = require("winston");
var auth = require("./auth.json");
var sleep = require('system-sleep');
const fs = require('fs');
const majorDir = fs.readdirSync('MajorArcana');
const fullDir = fs.readdirSync('FullDeck');
const dataDir = fs.readdirSync('data');

//Logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize : true
});
logger.level = "debug";
//Robot time
var bot = new Discord.Client();
//var client = new Discord.Client();
var counter = 0;
var isReady = true;

bot.on("ready",() => {
  logger.info("Connected");
});

bot.on("message",msg => {	
	if(msg.author == bot.user){
		//react to all message here
	}
	
	else{
		if(msg.content.includes("Give me a fortune") || msg.content.includes("give me a fortune") || msg.content.includes(" give me a fortune") || msg.content.includes(" give me a fortune")){
			var fileIndex = randint(dataDir.length-1);
			var fileName = "data/"+dataDir[fileIndex];
			const jsonString = fs.readFileSync(fileName, 'utf8');
			var card = JSON.parse(jsonString);  
			var imgFile = card.img_file;
			var imgloc = './FullDeck/'+imgFile;
			msg.channel.send({files: [imgloc]});
			sleep(1000);
			msg.channel.send(card.meaning);
			/*
      		if(card.name[0] == "The World"){
				sleep(2*1000);
        		msg.channel.send("This card represents Assured success and destiny, it also hints at travel and voyage, this is a very good card that insinuates that you will do great things and that your dreams will come true.");
			}
			*/
			//msg.guild.channels.find('name','nsfw').send("I found something", {files: [imgloc]}); 
          
    	}
  	}
});

function randint(bound) {
	return Math.round(Math.random()*bound);
}

bot.login(auth.token)
