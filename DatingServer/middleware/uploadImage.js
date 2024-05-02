import multer from 'multer'

const storage = multer.diskStorage({
    // Destination will be the folder where the image will be stored
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        // filename will be the composition of the image name
        // console.log(file) // generation of a random number with Math.floor(Math.random() * 1000)
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage })
export default upload