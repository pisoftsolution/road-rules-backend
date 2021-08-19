const jwt = require("jsonwebtoken");
const secret = "my-first-authorization";

exports.verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({msg:"Please Provide Token"})
    } else {
        jwt.verify(token.split(" ")[1],secret, (err, value) =>{
            if (err){
                res.status(500).json({msg: "Failed To Authenticate"});
            }
            else {
                next();
            }
        })
    }
}