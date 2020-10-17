const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
module.exports = {
    name: 'lyrics',
    alias: ["ly","كلمات","الكلمات"],
    usage: '',
    description: 'You Can See lyrics Music',
    category: 'music',
    async execute(msg, args, client, Discord, command) {
      const queue = client.queue.get(msg.guild.id);
    if (!queue) return msg.channel.send("There is nothing playing 🙂").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title} 🤔`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Lyrics",`${queue.songs[0].title}`)
      .setDescription(lyrics)
      .setColor("#8900FF")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return msg.channel.send(lyricsEmbed).catch(console.error);
    }
}