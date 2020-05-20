module.exports = {
	name: 'sr',
	execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === 'Срочники');
const member = message.mentions.members.first();
member.roles.add(role);
},
};