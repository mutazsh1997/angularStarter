const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "THIS_IS_THE_SECRET_KEY");
        req.UserData = { email: decodedToken.email, name: decodedToken.name, userId: decodedToken.userId }
        next();
    } catch (e) {
        res.status(401).json({
            message: "You are not authenticated",
           
        })
        console.log(e);
    }
} 