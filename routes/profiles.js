const router = require('express').Router()
const profilesCtrl = require('../controllers/profiles.js')
const collectionsCtrl = require('../controllers/collections.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.get('/:id', checkAuth, collectionsCtrl.indexOnesCollections)

module.exports = router
