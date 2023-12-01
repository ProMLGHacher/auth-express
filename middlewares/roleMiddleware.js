import jwt from 'jsonwebtoken'

export const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") next()
    
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).send({message: "Пользователь не авторизован"})
            }
            const {role: userRole} = jwt.verify(token, "SECRET_KEY")
            let hasRole = false
            roles.forEach(role => {
                if (role == userRole) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }
    }
}