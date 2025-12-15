export function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || "500"
    let messageError = err.message ||""
    res.json({"status": "error", "statusCode": statusCode, "message" : messageError})
}