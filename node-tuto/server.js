/**
 * DOCUMENTATION :
 * https://nodejs.org/en/docs/
 * https://devdocs.io/node/
 */

let http = require('http')
let fs = require("fs")

let server = http.createServer()
server.on('request', (request, response) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            response.writeHead(400)
            response.end("Erreur dans la lecture de fichier")
        } else {
            response.writeHead(200)
            response.end(data)
        }
    })
}).listen(8080)