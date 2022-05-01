const express = require('express');
const {getcoworkingspaces,getcoworkingspace,createcoworkingspace,updatecoworkingspace,deletecoworkingspace} = require('../controllers/coworkingspaces');
const router = express.Router();

router.route('/').get(getcoworkingspaces).post(createcoworkingspace);
router.route('/:id').get(getcoworkingspace).put(updatecoworkingspace).delete(deletecoworkingspace);

module.exports = router;