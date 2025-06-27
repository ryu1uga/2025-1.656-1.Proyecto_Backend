import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import { PrismaClient } from "../generated/prisma"

dotenv.config()
const TOKEN = process.env.TOKEN

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

        if (!user.email || !user.password) {
            resp.status(400).json({
                success: false,
                data: "Email and password are required"
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

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    state: 1,
                    token: TOKEN
                }
            })

            resp.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    token: TOKEN
                }
            })
        }
        catch (e) {
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

    return router
}

export default UsersController