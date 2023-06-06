const { Profile } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const profiles = await Profile.findAll()
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)
    // console.log("111---Here---", imageFile , profile)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    console.log("222---Here---", image)
    profile.photo = image.url
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { index, addPhoto }
