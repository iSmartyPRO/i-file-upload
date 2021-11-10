const express = require("express")
const router = express.Router()
const controller = require("../controllers/api")

router.post('/file', controller.saveFile)
router.post('/files', controller.saveFiles)

module.exports = router