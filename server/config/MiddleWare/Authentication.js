const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET

const authMiddleware = (req, res, next) =>{
    const token = req.cookies.token 

    if(!token) return res.status(401).json({message : "Unauthorized User"})

    try{
        const decoded = jwt.verify(token,jwtSecret)
        req.userId = decoded.userId;
        next();
    }catch(e){
        res.status(401).json({message: "unauth"})
    }
}

module.exports = authMiddleware