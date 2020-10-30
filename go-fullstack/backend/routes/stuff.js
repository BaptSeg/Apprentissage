const express = require('express');
const router = express.Router();

// Middleware qui va controler si nous sommes authentifié ou non.
const auth = require('../middleware/auth');
// Middleware qui va nous permettre de telécharger les images des objets en vente
const multer = require('../middleware/mutler');

// On importe la logique pour les routes /stuff
const stuffCtrl = require('../controllers/stuff');
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.getAllStuff);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;