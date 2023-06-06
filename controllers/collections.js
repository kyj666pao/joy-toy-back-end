const { Collection } = require('../models')
const cloudinary = require('cloudinary').v2


const addPhoto = async (req, res) => {
    try {
        const { collectionId } = req.params
        console.log("1---collectionId", collectionId)
        console.log("2", req.files.img.path)
        const imageFile = req.files.img.path
        console.log("3", imageFile)
        const collection = await Collection.findByPk(collectionId)
        console.log("4", collection)
        const image = await cloudinary.uploader.upload(
            imageFile, 
            { tags: `${req.body.img}` }
        )
        console.log("5---Here---", image)
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
        console.log(req.body)
        const collection = await Collection.create(req.body)
        console.log("---collection:",collection)
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
    show,
    update,
    addPhoto,
    delete: deleteCollection,
}