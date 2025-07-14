import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendMail = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: '"Proyecto PW" <${process.env.SMTP_FROM}>',
    to,
    subject,
    html,
  })
  console.log("Correo enviado:", info.messageId)
}