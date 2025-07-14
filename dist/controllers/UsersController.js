"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../generated/prisma");
const mailer_1 = require("../utils/mailer");
dotenv_1.default.config();
const TOKEN = process.env.TOKEN;
/*const transporter = nodemailer.createTransport({
    service: "gmail", // u otro servicio
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})*/
const UsersController = () => {
    const router = express_1.default.Router();
    function AuthenticateToken(req, resp, next) {
        const token = req.headers["authorization"];
        if (!token) {
            resp.status(403).json({
                success: false,
                message: "Authorization header missing"
            });
            return;
        }
        const [prefix, value] = token.split(" ");
        if (prefix != "Bearer" || value != TOKEN) {
            resp.status(403).json({
                success: false,
                message: "Invalid token"
            });
            return;
        }
        next();
    }
    router.post("/register", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const user = req.body;
        if (!user.email || !user.password || !user.name) {
            resp.status(400).json({
                success: false,
                data: "Email, password and name are required"
            });
            return;
        }
        try {
            const existingUser = yield prisma.user.findUnique({
                where: {
                    email: user.email
                }
            });
            if (existingUser) {
                resp.status(409).json({
                    success: false,
                    data: "User already exists"
                });
                return;
            }
            yield prisma.user.create({
                data: {
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    token: TOKEN
                }
            });
            resp.status(201).json({
                success: true,
                data: {
                    msg: "User created without any error",
                    token: TOKEN
                }
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error registering user",
                    error: e
                }
            });
        }
    }));
    router.post("/login", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { email, password } = req.body;
        if (!email || !password) {
            resp.status(400).json({
                success: false,
                data: "Email and password are required"
            });
            return;
        }
        try {
            const user = yield prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                resp.status(401).json({
                    success: false,
                    data: "Email not registered"
                });
                return;
            }
            if (password != user.password) {
                resp.status(401).json({
                    success: false,
                    data: "Invalid password"
                });
                return;
            }
            const updatedUser = yield prisma.user.update({
                where: { id: user.id },
                data: {
                    state: 1,
                    token: TOKEN
                }
            });
            resp.status(200).json({
                success: true,
                data: {
                    id: updatedUser.id,
                    username: updatedUser.name,
                    email: updatedUser.email,
                    token: updatedUser.token,
                    usertype: updatedUser.usertype,
                    state: updatedUser.state
                }
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error while logging in",
                    error: e
                }
            });
        }
    }));
    router.post("/logout", AuthenticateToken, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const id = req.body.id;
        try {
            if (!id || isNaN(Number(id))) {
                resp.status(400).json({
                    success: false,
                    data: "Should send a valid id"
                });
                return;
            }
            yield prisma.user.update({
                where: { id: id },
                data: {
                    state: 0,
                    token: null
                }
            });
            resp.status(200).json({
                success: true,
                data: "Logged out successfully"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unespected error while logging out",
                    error: e
                }
            });
        }
    }));
    // Configura el transpor
    // POST /users/send-verification-code
    router.post("/send-verification-code", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { email } = req.body;
        if (!email) {
            resp.status(400).json({
                success: false,
                data: "Email is required"
            });
            return;
        }
        try {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user) {
                resp.status(404).json({
                    success: false,
                    data: "User not found"
                });
                return;
            }
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            yield prisma.user.update({
                where: { email },
                data: { verificationCode: code }
            });
            yield mailer_1.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Tu código de verificación",
                html: `<p>Tu código de verificación es: ${code}</p>`
                //text: `Tu código de verificación es: ${code}`
            });
            resp.status(200).json({
                success: true,
                data: "Verification code sent to email"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error sending verification code",
                    error: e
                }
            });
        }
    }));
    // POST /users/verify-code
    router.post("/verify-code", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { email, code } = req.body;
        if (!email || !code) {
            resp.status(400).json({
                success: false,
                data: "Email and code are required"
            });
            return;
        }
        try {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user) {
                resp.status(404).json({
                    success: false,
                    data: "User not found"
                });
                return;
            }
            if (user.verificationCode === code) {
                // Podrías opcionalmente limpiar el código:
                yield prisma.user.update({
                    where: { email },
                    data: { verificationCode: null }
                });
                resp.status(200).json({
                    success: true,
                    data: "Verification successful"
                });
            }
            else {
                resp.status(400).json({
                    success: false,
                    data: "Invalid verification code"
                });
            }
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error verifying code",
                    error: e
                }
            });
        }
    }));
    return router;
};
exports.default = UsersController;
