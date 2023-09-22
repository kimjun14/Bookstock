var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/bidimg');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = file.originalname.split('.').pop();
    cb(null, `image-${timestamp}.${ext}`); 
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res, next) => {
  const path=req.file.filename
  res.json({ bidImgSrc: path});
});

module.exports = router;


