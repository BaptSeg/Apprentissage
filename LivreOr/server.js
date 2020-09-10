let express = require("express")
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

/**
 * Moteur de modèle
 */
// On défini le moteur de modèle que l'on utilise, ici on utilise ejs
app.set('view engine', 'ejs')





/**
 * Nos middlewear
 */
// On dit à express de pouvoir utiliser tous les fichier de cette route
app.use('/assets', express.static('public'))

// Ces deux middlewear nous servent à gerer les formulaires
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middlewear pour express-session
app.use(session({
    secret: 'azezaaaaa',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Middleware perso (flash), pour afficher une erreur
app.use(require("./middlewares/flash"))





/**
 * Les routes
 */
// Lorsque tu seras sur la racine, tu renderas le fichier index et tu enverras la variable test
app.get("/", (request, response) => {
    response.render('pages/index')
})

// Lorsque l'on recoie un post de la racine, on traite l'information
app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '' ) {
        // Comme on a chargé le mdidlewear espress-session, on peut utiliser .session
        request.flash('error', "Vous n'avez pas entré de message")
        response.redirect('/')
    } else {

    }
})

app.listen(8080)