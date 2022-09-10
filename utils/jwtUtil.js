var jwt = require('jsonwebtoken');

exports.generateToken = user => {
    const userObj = {
        id: user.id,
        email: user.email
    };

    return jwt.sign(user, 'secret key');
}

exports.verifyToken = (req, res, next) => {
    var token = req.headers.authorization;
    jwt.verify(token, 'secret key', (err, decode) => {
        if (err) {
            return res.send({
                status: "error",
                statusCode: 400,
                msg: err.message
            });
        }
        req.userId = decode.id;
        req.email = decode.email;
    });
    next();
}