/***********/
/**import des modules */
const express = require('express')
const cors = require ('cors')
const mongoose=require ('mongoose')
const stuffRoutes=require('./routes/sauces')
const userRoutes=require('./routes/user')

const path = require("path");

/*initialisation serveur et dépendances*/
const app=express()

app.use(cors())
app.use(express.json())


/*déclaration des routes*/
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/sauces', stuffRoutes)
app.use('/api/auth',userRoutes)

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


