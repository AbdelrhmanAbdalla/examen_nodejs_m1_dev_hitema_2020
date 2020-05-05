const WebSocket = require('ws')
const webSocketServer = new WebSocket.Server({ port: 3003 });
const allMessages = [];

webSocketServer.on('connection', webSocket => {
    webSocket.onmessage = messageEvent => {
        const message = messageEvent.data;
        allMessages.push(message);
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(allMessages));
            }
        });
    };
    webSocket.send(JSON.stringify(allMessages));
});

module.exports = webSocketServer;
