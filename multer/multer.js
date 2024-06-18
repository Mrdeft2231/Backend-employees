const multer = require('multer');
const path = require('path')

const upload = multer({ dest: 'upload/' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadsPhoto')
  },
  filename: function (req, file, cb) {
    // Используем модуль path для получения расширения файла
    const fileExt = path.extname(file.originalname);
    // Проверяем расширение файла
    if (fileExt === '.png' || fileExt === '.jpg' || fileExt === '.jpeg') {
      // Если расширение допустимо, сохраняем файл с этим расширением
      cb(null, file.fieldname + '-' + Date.now() + fileExt);
    } else {
      // Если расширение не допустимо, передаем ошибку в callback
      cb(new Error('Недопустимый тип файла'), false);
    }
  }
});

const uploadPhoto = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Проверяем MIME-тип файла
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      // Если MIME-тип допустим, принимаем файл
      cb(null, true);
    } else {
      // Если MIME-тип не допустим, отклоняем файл
      cb(null, false);
      // Можно также передать сообщение об ошибке
      // cb(new Error('Недопустимый MIME-тип файла'));
    }
  } 
});

module.exports = {
  upload,
  uploadPhoto
};