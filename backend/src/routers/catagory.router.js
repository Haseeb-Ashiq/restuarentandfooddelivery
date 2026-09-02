const express = require('express');
// const { register, getUsers, getUser, updateUser, deleteUser, login } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { addCatagory, getCatagories, getCatagory, deleteCatagory, updateCatagory } = require('../controllers/catagory.controller');
// const upload = require('../middlewares/multer.middleware');
const multer = require('multer')
const fs = require('fs');
const path = require('path');

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
catagoryRouter = express.Router();

catagoryRouter.post('/add-catagory', upload.single('image'), addCatagory);
catagoryRouter.get('/get-catagories', authMiddleware, getCatagories);
catagoryRouter.get('/get-catagory/:id', authMiddleware, getCatagory);
catagoryRouter.patch('/update-catagory/:id', authMiddleware, updateCatagory);
catagoryRouter.delete('/delete-catagory/:id', authMiddleware, deleteCatagory);
module.exports = catagoryRouter;