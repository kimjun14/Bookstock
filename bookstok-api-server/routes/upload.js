var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = file.originalname.split('.').pop();
    cb(null, `image-${timestamp}.${ext}`); 
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded successfully' });
});

module.exports = router;


