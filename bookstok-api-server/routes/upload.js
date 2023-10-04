var express = require('express');
var router = express.Router();
const multer = require('multer');

const storageBid = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/bidimg');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = file.originalname.split('.').pop();
    cb(null, `image-${timestamp}.${ext}`); 
  },
});

const storageAuction = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/auctionimg');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = file.originalname.split('.').pop();
    cb(null, `image-${timestamp}.${ext}`); 
  },
});

const uploadBid = multer({ storage: storageBid });
const uploadAuction = multer({ storage: storageAuction });

// bidImg 업로드 라우터
router.post('/', uploadBid.single('image'), (req, res, next) => {
  const path = req.file.filename;
  res.json({ bidImgSrc: path });
});

// auctionImg 업로드 라우터
router.post('/auction', uploadAuction.single('image'), (req, res, next) => {
  const path = req.file.filename;
  res.json({ bookImgSrc: path });
});

module.exports = router;
