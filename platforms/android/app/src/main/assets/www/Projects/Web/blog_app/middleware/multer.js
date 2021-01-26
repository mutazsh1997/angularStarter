const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cd) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let errInvalid = new Error("image is Invalid");
        if (isValid) {
            errInvalid = null;
        }
        cd(errInvalid, "backend/images");
    },
    filename: (req, file, cd) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cd(null, name + '_' + Date.now() + '.' + ext);
    }
});

module.exports = multer({storage: fileStorage}).single('image');