function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Erreur interne du serveur'

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    })
}

module.exports = errorHandler