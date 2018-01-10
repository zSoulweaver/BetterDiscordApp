const { ipcMain } = require('electron');

class BDIpcEvent {
    
    constructor(event, args) {
        this.bindings();
        this.ipcEvent = event;
        this.args = args;
        this.__eid = args.__eid;
        delete this.args.__eid;
    }

    bindings() {
        this.send = this.send.bind(this);
        this.reply = this.reply.bind(this);
    }

    send(message) {
        console.log(this.__eid);
        this.ipcEvent.sender.send(this.__eid, message);
    }

    reply(message) {
        this.send(message);
    }

}

class BDIpc {

    static on(channel, cb) {
        ipcMain.on(channel, (event, args) => cb(new BDIpcEvent(event, args)));
    }
}

module.exports = { BDIpc };