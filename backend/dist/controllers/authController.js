"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_2 = require("../models/userModel");
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Add the user to the database
        const newUser = await (0, userModel_2.addUser)(email, hashedPassword);
        if (newUser) {
            res.status(201).json({ message: 'User created successfully', user: newUser });
        }
        else {
            res.status(400).json({ message: 'Failed to create user' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, userModel_1.findUserByEmail)(email);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
