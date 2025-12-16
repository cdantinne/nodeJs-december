class ApiError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }

}

class NotFoundError extends ApiError {
    constructor(message) {
        super("404", message)
    }
}

class ValidationError extends ApiError {
    constructor(message) {
        super("400", message)
    }
}

module.exports={
    ApiError,
    NotFoundError,
    ValidationError
}