const multer = require('multer');

const upload = multer({ dest: 'upload/' });

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, 'uploadsPhoto')
  },
  filename: function (req, file, cd) {
    cd(null, file.fieldname + '-' + Date.now())
  }
});

const uploadPhoto = multer({ storage: storage });

module.exports = {
  upload,
  uploadPhoto
};