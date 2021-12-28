const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// connection to Cloudinary for image upload

cloudinary.config({
    cloud_name: 'dqcadja0y',
    api_key: '543624931585359',
    api_secret: 'T87v7TD46Xq79d3y78mwLyB1mqY'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'KarolinaPhoto',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}