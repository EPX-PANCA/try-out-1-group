require('dotenv').config()
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const path = require('path');
const datauri = require('datauri/parser');

const myDatauri = new datauri();
const dataUri = req => myDatauri.format(path.extname(req.file.originalname), req.file.buffer);

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

cloudinary.config({
    cloud_name: dg6l4c6kf,
    api_key: 899967328296132,
    api_secret: kMPj3P_rfMn4dAJW4Xb5f0qg0X0
});

const uploadCloudinary = async(req, res) => {
    const file = dataUri(req).content;
    return await cloudinary.uploader.upload(file).then((result) => {
        const image = result.url;
        return { urlImage: image }
    }).catch((error) => {
        throw new Error(error);
    })
}

module.exports = { multerUploads, uploadCloudinary };