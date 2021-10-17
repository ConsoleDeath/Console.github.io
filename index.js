const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
});

const config = {
  voice: "873175412501528626",
  parent: "865590951765082112"
}
//Вместо инстансов GuildMember, используются инстансы VoiceState, что равносильно member.voice
client.on("voiceStateUpdate", (oldState, newState) => {
  if(!oldState.guild.channels.cache.has(config.voice) || !oldState.guild.channels.cache.has(config.voice)) throw Error("Не указано либо айди канала, либо айди категории")
  if(newState.channelID === config.voice) {
    newState.guild.channels.create("🔒Private room", {
      type: "VOICE",
      parent: config.parent,
      permissionOverwrites: [
        {
           id: newState.guild.id, //Права для роли @everyone
           allow: ["VIEW_CHANNEL"]
        },
        {
          id: newState.member.id, //Права для создателя канала
          allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS"]
        }
      ]
    }).then(ch => newState.setChannel(ch))
  }
  //удаление канала, если в нем больше не осталось человек
  if(oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === config.parent && oldState.channelID !== config.voice) oldState.channel.delete();
})

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
