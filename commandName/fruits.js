module.exports = {
	name: 'fruits',
	execute(message, args) {
        if (message.content === '!fruits') {
            message.react('🍎');
            message.react('🍊');
            message.react('🍇');
        };
    
},
};