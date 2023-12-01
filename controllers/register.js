import { sql } from "../db.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    const {username, password} = req.body;

    const candidate = await sql`select * from Users where name = ${username} limit 1`[0]
    if (candidate) {
        res.status(400).send("Пользователь уже сущетсвует")
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await sql`select * from Roles where role = 'USER'`
    await sql`insert into Users(name, role, password) values(${username}, ${userRole[0].role}, ${hashPassword})`
    return res.send({message: "Пользователь успешно зарегистрирован"})
}