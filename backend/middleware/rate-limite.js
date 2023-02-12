// IMPORTATION DES MODULES
const rateLimit = require('express-rate-limit')


// REGLES RateLimit
module.exports = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Nombre de tentatives dépassé ! Veuillez réessayer plus tard.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})