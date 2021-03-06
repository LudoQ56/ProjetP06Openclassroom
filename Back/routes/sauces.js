/*
//importation des modules
*/
const express = require('express')
const stuffCtrl = require('../controllers/sauces')
const multer = require('../middleware/multer-config')
const checkTokenMiddleware= require('../middleware/check')
const auth = require('../middleware/auth')

/*
//récupération du routeur
*/
const router = express.Router();

/*
//déclaration des routes
*/
router.get('', stuffCtrl.getAllSauces)
router.get('/:id',   stuffCtrl.getOneSauce)
router.post('/',auth,  multer, stuffCtrl.postNewSauce)
router.put('/:id',auth,  multer, stuffCtrl.modifySauce)
router.delete('/:id',auth,   stuffCtrl.deleteSauce)
router.post('/:id/like',auth,  stuffCtrl.likedSauce)



/*-
//export des routes
*/
module.exports = router