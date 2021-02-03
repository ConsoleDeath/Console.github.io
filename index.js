const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
});

const commandFiles = fs.readdirSync('./commandName').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commandName/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.channel.send(`There was an error while reloading a command`);
    }
});

client.on('message', message => {
    const args = message.content.slice('!').split(/ +/);
    if (args[0] === '!p') {
        if (message.channel.type !== 'text') return;

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('пожалуйста, сначала присоединяйтесь к голосовому каналу!');
        }

        voiceChannel.join().then(connection => {
            const stream = ytdl(args[1], { filter: 'audioonly' });
            const dispatcher = connection.play(stream);

            dispatcher.on('end', () => voiceChannel.leave());
        });
    }
});

client.login('process.env.BOT_TOKEN');
