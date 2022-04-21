const student = require('./student');
const teacher = require('./teacher');
const test = require('./test');
const branch = require('./branch');

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Api Started"});
    });

    app.use('/', student);
    app.use('/', teacher);
    app.use('/', test);
    app.use('/', branch);
};

