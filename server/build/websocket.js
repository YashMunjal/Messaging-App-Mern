"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const utilities_1 = require("./utilities");
function webSocketServer() {
    const wss = new ws_1.default.Server({
        port: 1338
    });
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(payload) {
            const message = utilities_1.processMessage(payload);
            if (!message) {
                return;
            }
            console.log(message, 'is the message');
            ws.send(JSON.stringify(message));
        });
    });
}
exports.default = webSocketServer;
