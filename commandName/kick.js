module.exports = {
	name: 'kick',
	description: 'Kick a user from the server.',
    execute(message, args) {
        const taggedUser = message.mentions.users.first();

        message.channel.send('Вы пнули пользователя под ником: ' + taggedUser.username);
    }
};