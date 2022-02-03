const sauceModel = require('../models/sauces')


/*
//affichage de toutes les sauces
*/
exports.getAllSauces = ((req, res, next) => {
    sauceModel.find()
        .then((sauces) => { return res.status(200).json(sauces) })
        .catch((error) => res.status(404).json({ error: error })
        )
})
//affichage d'une sauce

exports.getOneSauce = ((req, res, next) => {
    sauceModel.findOne({ _id: req.params.id, })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) =>
            res.status(400).json({ error: error })
        )
})


/*
//création d'une sauce
*/
exports.postNewSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const sauceCreate = new sauceModel({
        ...sauceObject,
        imageUrl:
            `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    sauceCreate.save()
        .then(() => res.status(201).json({ message: 'sauce sauvegardée' }))
        .catch((error) => res.status(400).json({ error: error }))
}
/*
//modification d'une sauce
*/
exports.modifySauce = ((req, res) => {
    sauceModel.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new error('objet non trouvé')
                })
            }
            if (sauceModel.userId !== req.auth.userId) {
                res.status(400).json({
                    error: new Error('unauthorized request')
                })
            }
        })
    const modelSauce = req.file

        ? ({
            ...JSON.parse(req.body),
            imageUrl:
                `${req.protocol}://${req.get('host')}/images/${modelSauce.filename}`
        })
        : ({ ...req.body })
    sauceModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce mise à jour' }))
        .catch(error => res.status(400).json({ error }));
})

/*
//suppression d'une sauce
*/
exports.deleteSauce = ((req, res, next) => {
    sauceModel.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new error('objet non trouvé')
                })
            }
            if (sauceModel.userId !== req.auth.userId) {
                res.status(400).json({
                    error: new Error('unauthorized request')
                })
            }
        })
    sauceModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'deleted' }))
        .catch((error) => res.status(400).json({ error: error }))
})



//like d'une sauce
exports.likedSauce = ((req, res, next) => {

    const { userId, like } = req.body
    const sauceId = req.params.id

    sauceModel.findOne({ _id: sauceId })
        .then((sauce) => {
            //unlike d'une sauce
            if (like === -1) {
                sauce.dislikes++
                sauce.userDisliked.push(userId)
                sauceModel.updateOne(
                    { _id: req.params.id },
                    {
                        dislikes: sauce.dislikes,
                        usersDisliked: sauce.usersDisLiked
                    })
                    .then(() => res.status(200).json({ message: 'sauce disliked' }))
                    .catch((error) => res.status(401).json({ error: error }))
            }

            //like d'une sauce
            if (like === 1) {
                sauce.likes++
                sauce.usersLiked.push(userId)

                sauceModel.updateOne(
                    { _id: sauceId },
                    {
                        likes: sauce.likes,
                        usersLiked: sauce.usersLiked
                    })
                    .then(() => res.status(200).json({ message: 'sauce liked' }))
                    .catch((error) => res.status(401).json({ error: error }))
            }

            //des-like des-unlike
            if (like === 0) {
                if (sauce.usersLiked.includes(userId)) {
                    sauce.like--
                    const index = sauce.usersLiked.indexof(userId)
                    sauce.usersLiked.splice(index, 1)
                    console.log('délike de sauce')
                    sauceModel.updateOne(
                        { _id: sauceId },
                        {
                            likes: sauce.likes,
                            usersLiked: sauce.usersLiked
                        })
                        .then(() => res.status(200).json({ message: 'sauce unliked' }))
                        .catch((error) => res.status(401).json({ error: error }))
                }
                if (sauce.usersDisliked.include(userId)) {
                    sauce.dislike--
                    const index = sauce.usersDisliked.indexof(userId)
                    sauce.usersDisliked.splice(index, 1)
                    sauceModel.updateOne(
                        { _id: sauceId },
                        {
                            dislikes: sauce.dislikes,
                            usersDisliked: sauce.usersDisLiked
                        })
                        .then(() => res.status(200).json({ message: 'sauce undisliked' }))
                        .catch((error) => res.status(401).json({ error: error }))
                }

            }


        })
        .then(() => res.status(200).json({ message: "produit évalué" }))
        .catch((error) => res.status(400).json)

})


