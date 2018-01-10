const { app, BrowserWindow } = require('electron');
const { BetterDiscord } = require('../dist/main');
const path = require('path');
const url = require('url');

const config = require('./config.json');

let bw;

const bd = new BetterDiscord(config);

app.on('ready', () => {
    bw = new BrowserWindow({ width: 1920, height: 1080 });
    bw.webContents.openDevTools();
    bw.loadURL(url.format({
        pathname: path.join(__dirname, 'frontend', 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    bw.on('closed', () => app.quit());
});