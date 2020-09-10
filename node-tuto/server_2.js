let fs = require('fs')

/**
 * Le problème de cette ùanière de faire, c'est que dans un premier temps on li le fichier, et ensuite on le copi, donc entre la lecture et la copi on stock sur le disque
 * tout le fichier, ce qui n'est pas optimal
 */
// fs.readFile('demo.mp4', (err, data) => {
//     if (err) throw err
//     console.log("Lecture réussie")
//     fs.writeFile('copy.mp4', data, (err) => {
//         if (err) throw err
//         console.log("Copie réussie")
//     })
// })

/**
 * Cette manière de faire est plus optimisé car on va copier petit bout par petit bout le fichier en même temps que la lecture
 */
// Dans un premier temps on stock dans un variable le chemin du fichier
let file = 'demo.mp4'
// Permet de connaître la taille total du fichier
fs.stat(file, (err, stats) => {
    let file_size = stats.size
    let avancement = 0;
    // On initialise le stream de lecture et le stream d'écriture
    let read = fs.createReadStream(file)
    let write = fs.createWriteStream('copi.mp4')
    // On utilise l'event 'data' ==> Correspond à l'event lorsque le stream recois des données.
    // On appele un callback qui prend en paramètre le chunk contenant les données (ici il s'agit d'un buffer puisqu'on li une vidéo)
    read.on('data', (chunk) => {
        avancement += chunk.length
        console.log("J'ai lu " + Math.round(avancement/file_size*100) + "%")
    })

    // On connecte avec un pite les deux stream
    // Le pipe permet de gerer le drain lorsque le lecture est plus rapide que l'écriture (par exmeple)
    read.pipe(write)

    // Et on regarde lorsque l'écriture est fini
    write.on('finish', () => {
        console.log("La fichier a bien été copié")
    })

})


