module.exports = {
	name: "ej",
	execute(message, args) {
        if (message.content === '!ej') {
            message.react('👍');
    };
    },
};
