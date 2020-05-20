module.exports = {
	name: 'server',
	description: 'Kick a user from the server.',
    execute(message, args) {
        message.channel.send('Имя сервера: ' + message.guild.name + '\nОнлайн пользователей: ' + message.guild.memberCount);
    },
};