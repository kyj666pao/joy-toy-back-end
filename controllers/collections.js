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

module.exports ={
    create
}