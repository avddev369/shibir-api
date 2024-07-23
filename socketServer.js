const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let connectedUsers = {}; // Maps clientId to user information
let userIdPool = []; // Pool of unused user IDs
let nextUserId = 1; // Counter for generating new user IDs

wss.on('connection', (ws, req) => {
    // Generate or retrieve a unique client identifier
    let clientId = req.headers['key'] || crypto.randomBytes(16).toString('hex');

    if (connectedUsers[clientId]) {
        // Existing user reconnecting
        const existingUser = connectedUsers[clientId];
        existingUser.ws = ws;
        ws.send(JSON.stringify({ type:"init",userId: existingUser.userId }));
    } else {
        // New user, assign a new ID
        let userId;
        if (userIdPool.length > 0) {
            // Reuse an ID from the pool if available
            userId = userIdPool.pop();
        } else {
            // Create a new ID
            userId = nextUserId++;
        }
        connectedUsers[clientId] = { userId, ws };
        ws.send(JSON.stringify({  type:"init",userId }));
        updateConnectedUsers();
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(data);
        if (data.type === 'colorUpdate' || data.type === 'imageData') {
            // Broadcast message to all connected users
            Object.values(connectedUsers).forEach(user => {
                user.ws.send(JSON.stringify(data));
            });
        }
    });

    ws.on('close', () => {
        const clientId = Object.keys(connectedUsers).find(id => connectedUsers[id].ws === ws);
        if (clientId) {
            // Remove user from connectedUsers map and return their ID to the pool
            const user = connectedUsers[clientId];
            delete connectedUsers[clientId];
            userIdPool.push(user.userId);
            updateConnectedUsers();
        }
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
