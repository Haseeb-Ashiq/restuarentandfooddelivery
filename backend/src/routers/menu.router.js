const express = require('express');
// const { register, getUsers, getUser, updateUser, deleteUser, login } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
// const { addCatagory, getCatagories, getCatagory, deleteCatagory, updateCatagory } = require('../controllers/catagory.controller');
// const upload = require('../middlewares/multer.middleware');
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const { addMenu, getMenues, getMenu, updateMenu, deleteMenu } = require('../controllers/menu.controller');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now() + '-' + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 * 1024 }
})
menuRouter = express.Router();

menuRouter.post('/add-menu', upload.array('image'), addMenu);
menuRouter.get('/get-menues', getMenues);
menuRouter.get('/get-menu/:id', authMiddleware, getMenu);
menuRouter.patch('/update-menu/:id', authMiddleware, updateMenu);
menuRouter.delete('/delete-menu/:id', authMiddleware, deleteMenu);
module.exports = menuRouter;