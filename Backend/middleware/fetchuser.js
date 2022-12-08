var jwt = require('jsonwebtoken');

const jwt_secret = 'GauravIsAGoodB$oy'

const fetchuser = (req, res, next) => {
    //get the user from jwt and add id to req objects
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ Error: 'Please Authenticate Using a Valid token' });
    }


    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ Error: 'Please Authenticate Using a Valid token' });

    }

}

module.exports = fetchuser;