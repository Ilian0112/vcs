const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const prefix = "v.";
const queue = new Map();
var client = new Discord.Client();
const bot_user = new Discord.Client({ autoReconnect: true });
var bot = new Discord.Client();
var servers = {};

bot.on('ready', () => {
    bot.user.setStatus('Online'); // En ligne : 'Online' | Inactif : 'idle' | Ne pas déranger : 'dnd' | Invisible 'invisible'
    bot.user.setActivity(prefix + "help | " + bot.guilds.size + " serveurs | " + bot.users.size + " utilisateurs", {
        'type': 'STREAMING',
        'url': "https://twitch.tv/ZENFIX_"
    },
        console.log("\nBot connecté !"));
        console.log("\nInfos :\nNombre de serveurs : " + bot.guilds.size + "\nNombre d'utilisateurs : " + bot.users.size);
    var allservers = bot.guilds.array(); for (var i in allservers) {
        console.log("\nServeur numéro " + i + " :" + "\n- Nom du serveur : " + allservers[i].name + "\n- ID du serveur : " + allservers[i].id + "\n- Propriétaire du serveur : " + allservers[i].owner.displayName + " (" + allservers[i].owner.id + ")\n")
    }
})

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;
    var args = message.content.substring(prefix.length).split (" ");
    if (!message.content.startsWith(prefix)) return;
    switch (args[0].toLowerCase()) {

case "help":
    message.delete()
    var help_embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .addField(prefix + "help", "Affiche la liste des commandes disponibles.")
        .addField(prefix + "rules", "Affiche les règles du VCS.")
        .addField(prefix + "<MESSAGE>", "Permet d'envoyer un message dans le VCS.")
        .addField(prefix + "invite", "Donne une invitation pour m'ajouter sur un serveur.")
        .addField(prefix + "serverlist", "Affiche la liste des serveurs où je suis.")
        .addField(prefix + "report", "Permet de signaler une personne ou un bug au créateur.")
        .addField(prefix + "install", "Permet de créer un salon #vcs. (Demande la permission de créer des salons !)")
    message.channel.send(help_embed)
break;

case "serverlist":
    message.delete()
    var serverlist_embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .addField("Serveurs :", bot.guilds.map(g => "``" + g.name + "``").join("\n"), true)
        .addBlankField(true)
        .addField("Membres :", bot.guilds.map(g => "``" + g.memberCount + "``").join("\n"), true)
    message.channel.send(serverlist_embed)
    console.log(message.author.tag + " (" + message.author.id + ") a demandé la liste des serveurs ! (" + message.guild.name + ")")
break;

case "rules":
    message.delete()
    var vcsrules_embed = new Discord.RichEmbed()
        .setTitle("Règles du VCS :")
        .addField("Règle n°1 :", "Restez respectueux et polies avec tout le monde !")
        .addField("Règle n°2 :", "Toute forme de discrimination est interdite.")
        .addField("Règle n°3 :", "Les sujets/contenus pédophiles, pornographiques, religieux ou de propagande sont également interdits.")
        .addField("Règle n°4 :", "Tout spam abusif (y compris le spam de mentions), troll, provocation ou pub feront l'objet de sanctions.")
        .addField("Règle n°5 :", "La diffusion d'informations privées, personnelles ou non est interdite.")
        .addField("Règle n°6 :", "Les émojis animés et personnalisés sont interdits pour le bien du bot.")
        .addField("Note :", "Chaque message envoyé avec le VCS sont enregistrés !")
        .addField("Commandes :", prefix + " <MESSAGE> : Envoyer un message dans le VCS.")
        .addField("Message aux propriétaires de serveurs :", "Nous vous invitons à sanctionner les gens qui ne respectent pas les règles du VCS !")
        .addField("Message aux utilisateurs du bot :", "Nous vous invitons à nous signaler les personnes qui ne respectent pas les règles du VCS grâce à la commande " + prefix + "report <RAISON>.\nMerci !")
        .setColor("#FFFFFF")
    message.channel.send(vcsrules_embed)
    console.log(message.author.tag + " (" + message.author.id + ") a demandé les règles du VCS !")
break;
            
case "vcs":
    let xoargs = message.content.split(" ").slice(1);
    let suffix = xoargs.join(' ')
    var xo02 = message.guild.channels.find('name','vcs');
    var vcspasdesalonvcs_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .addField("Erreur !", "Il y a une erreur dans votre requête !")
        .addField("Raison :", "• Il n'y a pas de salon #vcs dans votre serveur ! Merci de contacter le propriétaire de votre serveur (" + message.guild.owner + ") ou un adminisitrateur du serveur pour qu'il éxécute la commande '" + prefix + "install' !")
    if(!xo02) return message.channel.send(vcspasdesalonvcs_embed)
    var vcspasdanssalonvcs_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .addField("Erreur !", "Il y a une erreur dans votre requête !")
        .addField("Raison :", "• Cette commande doit être faite dans le salon #vcs de votre serveur !")
    if(message.channel.name !== 'vcs') return message.channel.send(vcspasdanssalonvcs_embed)
    if(!suffix) return message.channel.send(vcspasdemessage_embed)
    var vcspasdemessage_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .addField("Erreur !", "Il y a une erreur avec votre requête !")
        .addField("Raison :", "• Vous n'avez pas donné de message à envoyer grâce au VCS !")
    if(message.author.id === "274240989944610827") {
        const vcsproprietaire_embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setAuthor("VCS", "https://cdn.discordapp.com/attachments/338443503635791874/448569680676913173/Couronne.PNG")
            .addField("Message de " + message.author.username + " :", suffix)
            .setFooter("Envoyé par " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ").")
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
        message.delete()
        bot.channels.findAll('name', 'vcs').map(channel => channel.send(vcsproprietaire_embed));
        console.log("VCS : Message de " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ") : " + suffix)
    }else if(message.author.id === "XXX") {
        var vcsbanned_embed = new Discord.RichEmbed()
            .setColor("#FFFFFF")
            .addField("Erreur !", "Il y a une erreur avec votre requête !")
            .addField("Raison :", "• Vous avez été banni du VCS pour non-respect du règlement (" + prefix + "vcsrules)")
        message.channel.send(vcsbanned_embed)
        console.log(message.author.tag + " (" + message.author.id + ") a tenté d'écrire un message dans le VCS depuis le serveur" + message.guild.name + " (" + message.guild.id  + ").")
    }else if(message.guild.id === "XXX") {
       var guildban_embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .addField("Erreur !", "Désolé il y a une erreur avec votre requête !")
            .addField("Raison :", "• Le VCS a été désactivé de manière temporaire par un adminsitrateur du VCS sur votre serveur suite à des plaintes. (" + prefix + "rules)")
        message.delete()
        message.channel.send(guildban_embed)
        console.log(message.author.tag + " (" + message.author.id + ") a tenté d'écrire un message dans le VCS depuis le serveur banni " + message.guild.name + " (" + message.guild.id + ").")
    //}else if(message.author.id === "193092758267887616") {
        //var vcscoeur_embed = new Discord.RichEmbed()
            //.setColor("#ff4ccc")
            //.setAuthor("VCS", "https://vignette.wikia.nocookie.net/desencyclopedie/images/0/05/Coeur.png/revision/latest?cb=20110108004655")
            //.addField("Message de " + message.author.username + " :", suffix)
            //.setFooter("Envoyé par " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ").")
            //.setThumbnail(message.author.avatarURL)
            //.setTimestamp()
            //message.delete()
        //bot.channels.findAll('name', 'vcs').map(channel => channel.send(vcscoeur_embed));
        //console.log("VCS : Message de " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ") : " + suffix)
    }else if(message.guild.id === "379019337945579520") {
        var vcszenfixserveur_embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setAuthor("VCS", "https://cdn.discordapp.com/attachments/338443503635791874/448594106252525578/ZENFIX.png")
            .addField("Message de " + message.author.username + " :", suffix)
            .setFooter("Envoyé par " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ").")
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            message.delete()
        bot.channels.findAll('name', 'vcs').map(channel => channel.send(vcszenfixserveur_embed));
        console.log("VCS : Message de " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ") : " + suffix)
    }else{
        const vcs_embed = new Discord.RichEmbed()
            .setColor("#FFFFFF")
            .setAuthor("VCS", message.guild.iconURL)
            .addField("Message de " + message.author.username + " :", suffix)
            .setFooter("Envoyé par " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ").")
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
        message.delete()
        bot.channels.findAll('name', 'vcs').map(channel => channel.send(vcs_embed));
        console.log("VCS : Message de " + message.author.tag + " (" + message.author.id + ") depuis le serveur " + message.guild.name + " (" + message.guild.id + ") : " + suffix)
    }
break;

case "setgame":
    let foargs = message.content.split(" ").slice(1);
    let setgamesuffix = foargs.join(' ')
    if(message.author.id === "274240989944610827") {
        message.delete()
        var statuschange_embed = new Discord.RichEmbed()
            .addField("Status changé !", "Mon status a été changé en ``Joue à " + setgamesuffix + "`` !")
            .setColor("#FFFFFF")
        message.channel.send(statuschange_embed)
        bot.user.setActivity(setgamesuffix)
        console.log("Status changé en " + setgamesuffix + " par " + message.author.tag + " (" + message.author.id + ").")
    }else{
        message.delete()
        var statuspaschange_embed = new Discord.RichEmbed()
            .setTitle("Erreur !")
            .addField("Raison :", "• Seul le proprétaire du bot peut éxécuter cette commande !")
            .setColor("#FF0000")
        message.channel.send(statuspaschange_embed)
        console.log(message.author.tag + " (" + message.author.id + ") a voulu changé mon status en " + setgamesuffix + " !")
    }
break;

case "refreshgame":
    if(message.author.id === "274240989944610827") {
        message.delete()
        var statusactualise_embed = new Discord.RichEmbed()
            .addField("Status actualisé !", "Mon status a été actualisé !")
            .setColor("#FFFFFF")
        message.channel.send(statusactualise_embed)
        bot.user.setActivity(prefix + "help | " + bot.guilds.size + " serveurs | " + bot.users.size + " utilisateurs", {
            'type': 'STREAMING',
            'url': "https://twitch.tv/ZENFIX_"
        })
        console.log("Status actualisé par " + message.author.tag + " (" + message.author.id + ").")
    }else{
        message.delete()
        var statuspasactualise_embed = new Discord.RichEmbed()
            .setTitle("Erreur !")
            .addField("Raison :", "• Seul le proprétaire du bot peut éxécuter cette commande !")
            .setColor("#FF0000")
        message.channel.send(statuspasactualise_embed)
        console.log(message.author.tag + " (" + message.author.id + ") a voulu actualisé mon status !")
    }
break;

case "install":
    var errorpermission_embed = new Discord.RichEmbed ()
        .setColor("#FF0000")
        .addField("Désolé !", "Il y a une erreur avec votre requête !")
        .addField("Raison :", "• Il vous manque une permission.")
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(errorpermission_embed);
    message.guild.createChannel('vcs')
    var installvcs_embed = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .addField("Le VCS est prêt !", "Le salon ``#vcs`` a été créé !")
    message.channel.send(installvcs_embed)
    console.log(message.author.tag + " (" + message.author.id + ") a créé le salon #vcs du ZENBOT sur le serveur " + message.guild.name + " !")
break;

case "report":
    let zoargs = message.content.split(" ").slice(1);
    let report = zoargs.join(' ')
    if (!report) return message.channel.send("Merci d'écrire l'objet de votre REPORT.")
    var report_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .addField(message.author.username + " – REPORT", "```" + report + "```")
        .setThumbnail(message.author.avatarURL)
        .setFooter(message.author.tag + " (" + message.author.id + ") via le serveur " + message.guild.name + ".")
        .setTimestamp();
    message.delete()
    var reporteffectue_embed = new Discord.RichEmbed()
        .setColor("0CFF00")
        .addField("Merci !", "Votre message a été envoyé à mon créateur !")
    message.channel.send(reporteffectue_embed)
    message.client.users.get("274240989944610827").send(report_embed)
    console.log(message.author.tag + " (" + message.author.id + ") via le serveur " + message.guild.name + " a fait un rapport.\n ( " + report + " )")
break;

case "invite": 
    var invite_embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .addField("Invitation", "[<:VCS:449952466566381569> Clique-ici pour m'inviter sur un serveur !](https://discordapp.com/oauth2/authorize?client_id=422436671540428810&scope=bot&permissions=3484752)\n[<:ZENFIX:389102428844457994> Clique-ici pour rejoindre le serveur support.](https://discord.gg/DWDNEEq)")
    message.delete()
    message.channel.send(invite_embed)
    console.log(message.author.tag + " (" + message.author.id + ") a demandé l'invitation du bot.")
break;

        default:
            message.delete()
            var errorcommand_embed = new Discord.RichEmbed ()
                .setColor("#FF0000")
                .addField("Désolé !", "Il y a une erreur avec votre requête !")
                .addField("Raison :", "• Commande inconnue ! Vous pouvez faire " + prefix + "help pour obtenir la liste des commandes disponible !")
            message.channel.send(errorcommand_embed)
    }
});

bot.login(process.env.TOKEN);

bot.on("error", err => {
    console.log(err);

})
