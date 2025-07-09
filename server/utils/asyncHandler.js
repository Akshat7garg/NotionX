const asyncHandler = (responseHandler) => {
    return (req, res, next) => {
        // handle async errors
        Promise.resolve(responseHandler(req, res, next))
            .catch((error) => next(error));
    }
};

export { asyncHandler };