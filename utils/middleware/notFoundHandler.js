const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
    const { statusCode, payload } = boom.notFound();

    res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;