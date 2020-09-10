let express = require("express")
let app = express()

app.get('/', function(request, response) {
    response.sendFile('index.html', {root : __dirname + '/public/views'});
})

app.listen(8090)
