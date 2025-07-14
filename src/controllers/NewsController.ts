import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const NewsController = () => {
    const router = express.Router()

    // GET / -> todas las noticias o filtradas por estado
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const state = req.query.state

        try {
            let news
            if (state === undefined) {
                news = await prisma.news.findMany({
                    include: { attachment: true }
                })
            } else if (typeof state === "string" && !isNaN(Number(state))) {
                news = await prisma.news.findMany({
                    where: { state: Number(state) },
                    include: { attachment: true }
                })
            } else {
                resp.status(400).json({
                    success: false,
                    data: "Should send a valid state"
                })
                return
            }

            resp.status(200).json({
                success: true,
                data: news
            })
        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching news",
                    error: e
                }
            })
        }
    })

    // GET /:id -> noticia por id
    router.get("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = Number(req.params.id)

        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }

        try {
            const news = await prisma.news.findUnique({
                where: { id },
                include: { attachment: true }
            })

            if (!news) {
                resp.status(404).json({
                    success: false,
                    data: "News not found"
                })
                return
            }

            resp.status(200).json({
                success: true,
                data: news
            })
        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching news",
                    error: e
                }
            })
        }
    })

    // POST / -> crear noticia
    router.post("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient();
        const { title, text, attachment } = req.body;

        if (!title || !text) {
            resp.status(400).json({
                success: false,
                data: "Missing required fields: title and text",
            });
            return;
        }

        try {
            const newNews = await prisma.news.create({
                data: {
                    title,
                    text,
                    state: 1,
                },
            });

            if (attachment && attachment.url) {
                await prisma.newsAttachment.create({
                    data: {
                        url: attachment.url,
                        newsId: newNews.id,
                    },
                });
            }

            // Devolver la noticia creada con su attachment
            const createdNews = await prisma.news.findUnique({
                where: { id: newNews.id },
                include: { attachment: true },
            });

            resp.status(201).json({
                success: true,
                data: createdNews,
            });
        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while creating news",
                    error: e,
                },
            });
        }
    })

    // PUT /:id -> actualizar noticia
    router.put("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = Number(req.params.id)
        const { title, text, state, attachment } = req.body

        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }

        try {
            await prisma.news.update({
                where: { id },
                data: {
                    title,
                    text,
                    state
                }
            })

            if (attachment) {
                await prisma.newsAttachment.deleteMany({ where: { newsId: id } })
                if (attachment.url) {
                    await prisma.newsAttachment.create({
                        data: {
                            url: attachment.url,
                            newsId: id
                        }
                    })
                }
            }

            resp.status(200).json({
                success: true,
                data: "News updated successfully"
            })
        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while updating news",
                    error: e
                }
            })
        }
    })

    // DELETE /:id -> eliminar noticia
    router.delete("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = Number(req.params.id)

        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }

        try {
            const existingNews = await prisma.news.findUnique({ where: { id } })

            if (!existingNews) {
                resp.status(404).json({
                    success: false,
                    data: "News not found"
                })
                return
            }

            await prisma.news.delete({ where: { id } })

            resp.status(200).json({
                success: true,
                data: "News deleted successfully"
            })
        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while deleting news",
                    error: e
                }
            })
        }
    })

    return router
}

export default NewsController
