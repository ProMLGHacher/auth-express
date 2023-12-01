import jwt from 'jsonwebtoken'

export const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, "SECRET_KEY", {expiresIn: "48h"} )
}