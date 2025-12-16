class ApiError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }

    static NotFoundError(message = 'Not found') {
        return new ApiError(message, 404)
    }

    static BadRequestError(message = 'Bad request') {
        return new ApiError(message, 400)
    }
}

module.exports = ApiError