/* eslint-disable no-undef */
import { mkdirSync, existsSync } from 'fs';
import entry from './build/index.js'

mkdirSync('logs', { recursive: true });

if (existsSync('./build')) {
	entry();
} else {
	console.log('no such directory');
}
