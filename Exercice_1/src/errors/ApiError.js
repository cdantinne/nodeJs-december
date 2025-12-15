class ApiError extends Error {
    constructor(statusCode, message) {
        super(message)
        statusCode = statusCode(),
        message = message,
        statut = (statusCode)=> {
            let allNumbers = statusCode.split("")
        switch (allNumbers[0]) {
            case 1 || "1" :
                return ""
                break;
            case 3 || "3":
                return ""

                break;
            case 4 || "4":
                return "Fail"

                break;
            case 5 || "5":
                return "Error"
                
                break;
            default:
                return "Unknow error"

                break;
        }
    }
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