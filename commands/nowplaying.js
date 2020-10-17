module.exports = {
  name: "nowplaying",
  alias: ["np", "playing","الان","ناو"],
  usage: "",
  description: "See the currently playing song position and length",
  category: "music",
  async execute(msg, args, client, Discord, command) {
    const queue = client.queue.get(msg.guild.id);
    if (!queue) return msg.channel.send(client.messages.noServerQueue);
    let songTime = (queue.songs[0].info.lengthSeconds * 1000).toFixed(0);
    let completed = (
      queue.connection.dispatcher.streamTime + queue.time
    ).toFixed(0);
    let barlength = 30;
    let completedpercent = ((completed / songTime) * barlength).toFixed(0);
    let array = [];
    for (let i = 0; i < completedpercent - 1; i++) {
      array.push("");
    }
    array.push("🔘");
    for (let i = 0; i < barlength - completedpercent - 1; i++) {
      array.push("▬");
    }
    const embed = new Discord.MessageEmbed()
    /*  .setAuthor(`Playing | ${queue.volume}% 🔉`, "")
      .setTitle("<:RAYZEXYT:760213903480324157>  | Playback In Progress")
      .setDescription(
        `**[${
          queue.songs[0].title
        }](${queue.songs[0].url})**\nPosted By **${queue.songs[0].info.author.name}**`
      )
      .addField(
        "**Player Information**", `Queue Length: **${client.funcs.msToTime(songTime, "hh:mm:ss")}**\nTrack Time Length: **${client.funcs.msToTime(songTime, "hh:mm:ss")}**`, true
      )
      .addField(
       "**Requested By**", `${queue.songs[0].author.tag}`, true)*/
    .setTitle("<:RAYZEXYT:760221371002257428>  | Playing On YouTube")

    .setDescription(`**__Now playing__** : **[${ queue.songs[0].title }](${queue.songs[0].url})**`)

  .addField ("Song Time",`**${client.funcs.msToTime(  queue.songs[0].info.lengthSeconds * 1000,  "hh:mm:ss" )}**`)

 .addField("The Currently Volume ",` ${queue.volume}% `, "https://g.top4top.io/p_17137jeg30.gif")

  .addField ("Posted By",` **${queue.songs[0].info.author.name}**`)

  .setFooter(`Requested By ${queue.songs[0].author.tag}`)

//  message.cha"Voice",n${client.voiceChannel.name}`)er(`//Have Fun In Listening Songs!`)

    //.setThumbnail(queue.songs[0].info.thumbnail.thumbnails[4].url)

   // .setColor(client.config.embedColor)
    .addField(`**Length:** [\`${client.funcs.msToTime(songTime, "hh:mm:ss")}\`]`, `\`\`\`▶ ${array.join("")} ${client.funcs.msToTime(
          completed,
          "hh:mm:ss"
        )}\`\`\``
      )
      .setThumbnail(queue.songs[0].info.thumbnail.thumbnails[4].url)
      .setColor(client.config.embedColor);
    if (queue.nigthCore)
      embed.setDescription(
        `[${queue.songs[0].title}](${queue.songs[0].url}) Posted By **${queue.songs[0].info.author.name}**`
      );
    return msg.channel.send(embed);
  },
};