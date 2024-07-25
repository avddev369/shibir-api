const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let connectedUsers = {}; // Maps clientId to user information

let nextUserId = 1; // Counter for generating new user IDs

wss.on('connection', (ws, req) => {


    let clientId = req.headers['key'];
    let userId = req.headers['userid'];

    console.log(connectedUsers);
    if (connectedUsers[clientId]) {

        const existingUser = connectedUsers[clientId];
        existingUser.ws = ws;

    } else {

        connectedUsers[clientId] = { userId, ws };
        updateConnectedUsers();
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(data);
        if (data.type === 'colorUpdate' || data.type === 'imageData'|| data.type === 'flash') {
            // Broadcast message to all connected users
            Object.values(connectedUsers).forEach(user => {
                user.ws.send(JSON.stringify(data));
            });
        }
    });

    ws.on('close', () => {
        const clientId = Object.keys(connectedUsers).find(id => connectedUsers[id].ws === ws);
        updateConnectedUsers();
    });
});

const updateConnectedUsers = () => {
    const users = Object.values(connectedUsers).map(user => user.userId);
    Object.values(connectedUsers).forEach(user => {
        user.ws.send(JSON.stringify({ connectedUsers: users }));
    });
};

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});