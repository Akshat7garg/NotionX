class ApiResponse {
    constructor(statusCode, data, message = 'Success, OK') {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // true if success
    }
}

export { ApiResponse };