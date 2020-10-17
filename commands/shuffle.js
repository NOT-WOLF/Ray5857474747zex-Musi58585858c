module.exports = {
    name: 'shuffle',
    alias: ["shu","خلط","اخلط"],
    usage: '',
    description: 'Shuffle the queue.',
    category: 'music',
    execute(msg, args, client, Discord, command) {
        const queue = client.queue.get(msg.guild.id);
        client.funcs.shuffle(queue.songs);
        msg.channel.send(client.messages.shuffled);
    }
};