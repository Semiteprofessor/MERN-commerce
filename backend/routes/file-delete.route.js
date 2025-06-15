const express = require("express");
const router = express.Router();
const delete_fileController = require("../controllers/file-delete.ctl");
router.delete("/delete-file/:id", delete_fileController.deleteFile);

module.exports = router;
