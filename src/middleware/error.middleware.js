const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${status} - ${message}`);
    if (err.stack) console.error(err.stack);

    res.status(status).json({
        success: false,
        status,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default errorMiddleware;
