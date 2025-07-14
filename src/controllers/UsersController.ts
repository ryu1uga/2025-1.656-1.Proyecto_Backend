import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import { PrismaClient } from "../generated/prisma"
import nodemailer from "nodemailer"
import { transporter } from "../utils/mailer"

dotenv.config()
const TOKEN = process.env.TOKEN
/*const transporter = nodemailer.createTransport({
    service: "gmail", // u otro servicio
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})*/
const UsersController = () => {
    const router = express.Router()

    function AuthenticateToken(req : Request, resp : Response, next : NextFunction) {
        const token = req.headers["authorization"]

        if (!token) {
            resp.status(403).json({
                success: false,
                message: "Authorization header missing"
            })
            return
        }

        const [prefix, value] = token.split(" ")

        if (prefix != "Bearer" || value != TOKEN) {
            resp.status(403).json({
                success: false,
                message: "Invalid token"
            })
            return
        }

        next()
    }

    router.post("/register", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const user = req.body

        if (!user.email || !user.password || !user.name) {
            resp.status(400).json({
                success: false,
                data: "Email, password and name are required"
            })
            return 
        }

        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email : user.email
                }
            })

            if (existingUser) {
                resp.status(409).json({
                    success: false,
                    data: "User already exists"
                })
                return
            }

            await prisma.user.create({
                data: {
                    email : user.email,
                    password : user.password,
                    name: user.name,
                    token: TOKEN
                }
            })

            resp.status(201).json({
                success: true,
                data: {
                    msg: "User created without any error",
                    token: TOKEN
                }
            })
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error registering user",
                    error: e
                }
            })
        }
    })

    router.post("/login", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { email, password } = req.body

        if (!email || !password) {
            resp.status(400).json({
                success: false,
                data: "Email and password are required"
            })
            return
        }

        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                resp.status(401).json({
                    success: false,
                    data: "Email not registered"
                })
                return
            }

            if (password != user.password) {
                resp.status(401).json({
                    success: false,
                    data: "Invalid password"
                })
                return
            }

            const updatedUser = await prisma.user.update({
                where: { id: user.id },
                data: {
                    state: 1,
                    token: TOKEN
                }
            })

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
            })

        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error while logging in",
                    error: e
                }
            })
        }
    })

    router.post("/logout", AuthenticateToken, async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = req.body.id
        try {
            if (!id || isNaN(Number(id)))
            {
                resp.status(400).json({
                    success: false,
                    data: "Should send a valid id"
                })
                return
            }
            
            await prisma.user.update({
                where: { id: id },
                data: {
                    state: 0,
                    token: null
                }
            })

            resp.status(200).json({
                success: true,
                data: "Logged out successfully"
            })
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unespected error while logging out",
                    error: e
                }
            })
        }
    })

    router.put("/reset-password", async (req: Request, res: Response) => {
        const prisma = new PrismaClient()
        const { email, newPassword } = req.body

        if (!email || !newPassword) {
            res.status(400).json({
                success: false,
                message: "Email and new password are required"
            })
            return
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                })
                return
            }

            await prisma.user.update({
                where: { email },
                data: { password: newPassword }
            })

            res.status(200).json({
                success: true,
                message: "Password updated successfully"
            })
        } catch (error) {
            console.error("Error updating password:", error)
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        } finally {
            await prisma.$disconnect()
        }
    })

    router.put("/update", async (req: Request, res: Response) => {
        const prisma = new PrismaClient()
        const { email, firstName } = req.body

        if (!email || !firstName) {
            res.status(400).json({
                success: false,
                data: "Email and first name are required"
            })
            return
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user) {
                res.status(404).json({
                    success: false,
                    data: "User not found"
                })
                return
            }

            await prisma.user.update({
                where: { email },
                data: {
                    name: firstName
                }
            })

            res.status(200).json({
                success: true,
                data: {
                    msg: "User updated successfully"
                }
            })
        } catch (error) {
            console.error("Error updating user:", error)
            res.status(500).json({
                success: false,
                data: {
                    msg: "Internal server error",
                    error
                }
            })
        } finally {
            await prisma.$disconnect()
        }
    })


    router.post("/send-verification-code", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { email } = req.body

        if (!email) {
            resp.status(400).json({
                success: false,
                data: "Email is required"
            })
            return
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user) {
                resp.status(404).json({
                    success: false,
                    data: "User not found"
                })
                return
            }

            const code = Math.floor(100000 + Math.random() * 900000).toString()

            await prisma.user.update({
                where: { email },
                data: { verificationCode: code }
            })

            await transporter.sendMail({
                from: `"Proyecto PW" <20211953@aloe.ulima.edu.pe>`,
                to: email,
                subject: "Tu código de verificación",
                html: `<p>Tu código de verificación es: <b>${code}</b></p>`
            })

            resp.status(200).json({
                success: true,
                data: "Verification code sent to email"
            })

        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error sending verification code",
                    error: e
                }
            })
        }
    })

    router.post("/verify-code", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { email, code } = req.body

        if (!email || !code) {
            resp.status(400).json({
                success: false,
                data: "Email and code are required"
            })
            return
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user) {
                resp.status(404).json({
                    success: false,
                    data: "User not found"
                })
                return
            }

            if (user.verificationCode === code) {
                await prisma.user.update({
                    where: { email },
                    data: { verificationCode: null }
                })

                resp.status(200).json({
                    success: true,
                    data: "Verification successful"
                })
            } else {
                resp.status(400).json({
                    success: false,
                    data: "Invalid verification code"
                })
            }
        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Error verifying code",
                    error: e
                }
            })
        }
    })

    return router
}

export default UsersController