
const checkAuthMiddleware = (req, res, next) => {
    if (!req.user || !req.user.id) {
        res.status(401).json({
            status: 'error',
            message: 'Unauthorized user.'
        });
        return;
    }

    next();
};

module.exports = checkAuthMiddleware;