/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');

fs.mkdirSync('logs', { recursive: true });

if (fs.existsSync('./build')) {
	require('./build').default();
} else {
	console.log('no such directory');
}
