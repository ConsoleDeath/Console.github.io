module.exports = {
	name: "lw",
	execute(message, args) {
const member = message.mentions.members.first();
member.kick();
    },
};