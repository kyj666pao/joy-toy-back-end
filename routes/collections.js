const router = require('express').Router()
const collectionsCtrl = require('../controllers/collections.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, collectionsCtrl.create)
router.get('/', checkAuth, collectionsCtrl.index)
router.get('/:collectionId', checkAuth, collectionsCtrl.show)
router.put('/:collectionId', checkAuth, collectionsCtrl.update)
router.put('/:collectionId/add-photo', checkAuth, 
    collectionsCtrl.addPhoto)
router.delete('/:collectionId', checkAuth, collectionsCtrl.delete)

module.exports = router