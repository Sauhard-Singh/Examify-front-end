const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        let message = err[0].msg;
        return res.status(422).json(message);
    }
    next();
};