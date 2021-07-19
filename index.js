const fs = require('fs');

if (fs.existsSync('./build')) {
	require('./build').default();
} else {
	console.log('no such directory');
}
