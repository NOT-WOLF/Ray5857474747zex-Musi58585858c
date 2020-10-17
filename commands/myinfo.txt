const Discord = require('discord.js');
const moment = require("moment");
const status1 = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};
const status12 = {
    online: "<:online5:729686079237783644>",
    idle: "<:idle5:729686255763324958>",
    dnd: "<:dnd5:729685623023206410>",
    offline: "<:offline5:729686477625360414>"
};

module.exports = {
  name: "myinfo",
  alias: ["mi", "userinfo"],
  usage: "<song name>",
  description: "Play some music.",
  category: "music",
  async execute(msg, args, client, Discord, command) {
            var permissions = [];
    var acknowledgements = 'None';
          let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || msg.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || msg.member;
    if(msg.member.hasPermission("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }
    
    if(msg.member.hasPermission("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }
    
    if(msg.member.hasPermission("ADMINISTRATOR")){
        permissions.push("Administrator");
    }

    if(msg.member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }
    
    if(msg.member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }
    
    if(msg.member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(msg.member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(msg.member.hasPermission("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(msg.member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(msg.member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Key Permissions Found");
    }

    if(member.user.id == msg.guild.ownerID){
        acknowledgements = 'Server Owner';
    }
    const userFlags = member.flags ? member.flags.toArray() : [];
        member.presence.activities.forEach((activity) => {

            if (activity.type === 'CUSTOM_STATUS') {

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${status12[member.user.presence.status]} ${member.user.tag}`)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setFooter(msg.guild.name, msg.guild.iconURL({ dynamic: true }))
                    .setColor("RANDOM")
                    .setTimestamp()
                    .addField("Status",`${status1[member.user.presence.status]}`)
                    .addField("Custom Status", `${activity.emoji || "No Emoji"} | ${activity.state || "No Status"}`)
                    .addField('Joined at: ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
                    .addField("Created at: ",`${moment(msg.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
                    .addField("Acknowledgement: ", `${acknowledgements}`, true)
                    .addField("Permissions: ", `${permissions.join(', ')}`)
                    .addField(`Roles [${member.roles.cache.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== msg.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
                    .setTimestamp()
                msg.channel.send(embed)
            }
            })
  }
}