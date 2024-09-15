const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("**",decoded);
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};



