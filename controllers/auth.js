import { sql } from "../db.js"
import bcrypt from 'bcryptjs'
import { generateAccessToken } from "../utils/generateToken.js"

export const auth = async (req, res) => {
    const { username, password } = req.body
    const user = await sql`select * from Users where name = ${username}`
    if (!user[0]) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` })
    }
    const validPassword = bcrypt.compareSync(password, user[0].password)
    if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
    }
    const token = generateAccessToken(user[0].id, user[0].role)
    return res.json({ 
        token: token,
        user: user[0]
     })
}