const { Collection } = require('../models')
const cloudinary = require('cloudinary').v2


const addPhoto = async (req, res) => {
    try {
        const { collectionId } = req.params
        const imageFile = req.files.img.path
        const collection = await Collection.findByPk(collectionId)
        const image = await cloudinary.uploader.upload(
            imageFile, 
            { tags: `${req.body.img}` }
        )
        collection.img = image.url
        await collection.save()
        res.status(201).json(collection.img)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })
    }
}

const create = async (req,res) => {
    try {
        req.body.profileId = req.user.profile.id
        const collection = await Collection.create(req.body)
        res.status(200).json(collection)
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

const index = async (req, res) => {
    try {
        const collections = await Collection.findAll({
            order: [ [ 'createdAt', 'DESC' ]]
        })
        res.status(200).json(collections)
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

const indexOnesCollections = async (req, res) => {
    try {
        const { id } = req.params
        const collections = await Collection.findAll({
            where: { profileId: id},
            order: [ [ 'createdAt', 'DESC' ]]
        })
        res.status(200).json(collections)
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

const show = async (req, res) => {
    try {
        const { collectionId } = req.params
        const collection = await Collection.findOne({
            where: {
                id: collectionId
            }
        })
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
        res.status(200).json(collection[1][0])
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

const deleteCollection = async (req, res) => {
    try {
        const { collectionId } = req.params
        const collection = await Collection.findByPk(collectionId)
        await collection.destroy()
        res.status(200).json(collection)
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

module.exports ={
    create,
    index,
    indexOnesCollections,
    show,
    update,
    addPhoto,
    delete: deleteCollection,
}