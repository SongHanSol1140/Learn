"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const ws = new ws_1.default('wss://home.nanonix.lol/VoiceOrder');
ws.on('open', function open() {
    console.log('Connected to server');
});
ws.on('close', function close() {
    console.log('Disconnected from server');
});
