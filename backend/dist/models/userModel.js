"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.addUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const addUser = async (email, hashedPassword) => {
    try {
        const [result] = await db_1.default.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.addUser = addUser;
const findUserByEmail = async (email) => {
    const [rows] = await db_1.default.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows.length ? rows[0] : null;
};
exports.findUserByEmail = findUserByEmail;
