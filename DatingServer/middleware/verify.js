import { verify } from "jsonwebtoken"

const verifyToken = (req, res, next) => {

    const token = req.header('auth-token')
    if (!token) return res.status(401).json('Access Denied')

    try {
        const verified = verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch (err) {
        res.status(400).json('Invalid Token')
    }
}
export default verifyToken