module.exports = {
	name: 'user-info',
	description: 'Kick a user from the server.',
    execute(message, args) {
        message.channel.send('Ваш никнейм: ' + message.author.username + '\nВаш ID: ' + message.author.id);}
}