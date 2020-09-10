module.exports = function (request, response, next) {

    // Fonction flash
    request.flash = function (type, content) {
        if (request.session.flash === undefined) {
            request.session.flash = {}
        }
        request.session.flash[type] = content
    }

    // Ainsi, si il y a eu des choses mise en session.flash, on les défini en local pour les passer à la vue
    if (request.session.flash) {
        response.locals.flash = request.session.flash
        request.session.flash = undefined
    }

    next()
}