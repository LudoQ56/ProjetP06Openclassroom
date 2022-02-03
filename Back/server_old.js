




/**********************************/
/*************import des modules***/

const express = require('express');
const cors = require('cors');
// const res = require('express/lib/response');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const stuffRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')
// const req = require('express/lib/request');


/**********************************/
/**************initialisation API */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*******************************************/
/******************déclaration des routes***/
//app.use('/api/sauces', stuffRoutes)
app.post('/api/sauces', (req, res) => {
  console.log('bonjour la sauce')
  console.log(req.body)
  res.status(200).json({message: 'connard'})
})
app.use('/api/auth', userRoutes);
/*******************************/
/*******gestion des images */
// const path = require('path')


/******************************************/
/***************start server*****************/
mongoose.connect('mongodb+srv://Ludo:Jokerstream56@piquante.dgthr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connexion à MongoDB réussie !')
  })
  .then(() => {
    app.listen(process.env.SERVER_PORT, '127.0.0.1', () =>
      console.log(`serveur sur le port ${process.env.SERVER_PORT}.`))
  })
  .catch(() => console.log('Connexion à MongoDB échouée !'));




  /**************************************************************************/
  const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const userRoutes = require('./routes/user')

app.get('/', (req, res) => res.send('Bonjour marcel'))

app.post('/api/sauces', (req, res) => {
  console.log('dans le post')
  console.log(req.body)

  res.status(200).json({message: 'connard'})
  
})

app.use('/api/auth', userRoutes);

mongoose.connect('mongodb+srv://Ludo:Jokerstream56@piquante.dgthr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connexion à MongoDB réussie !')
  })
  .then(() => {
    console.log('bdd ok')
  })
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.listen(3000, () => {
  console.log(`API de l'extreme en route pour l'enfer`)
})