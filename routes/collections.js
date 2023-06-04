const router = require('express').Router()
const collectionsCtrl = require('../controllers/collections.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, collectionsCtrl.create)


module.exports = router