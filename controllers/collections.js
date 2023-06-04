const { Collection } = require('../models')

const create = async (req,res) => {
    try {
        req.body.profileId = req.user.profile.id
        console.log(req.body)
        const collection = await Collection.create(req.body)
        console.log(collection)
        res.status(200).json(collection)
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

const index = async (req, res) => {
    try {
        const collections = await Collection.findAll()
        console.log(collections)
        res.status(200).json(collections)
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

const show = async (req, res) => {
    try {
        const { collectionId } = req.params
        console.log(collectionId)
        const collection = await Collection.findOne({
            where: {
                id: collectionId
            }
        })
        console.log(collection)
        res.status(200).json(collection)
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

const update = async (req, res) => {
    try {
        const { collectionId } = req.params
        const collection = await Collection.update(
            req.body, 
            { where: 
                { id: collectionId }, 
              returning: true
            }
        )
        console.log(collection)
        res.status(200).json(collection[1][0])
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

module.exports ={
    create,
    index,
    show,
    update,
}