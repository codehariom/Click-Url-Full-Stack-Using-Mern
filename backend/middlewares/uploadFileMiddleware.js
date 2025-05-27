import fs from 'fs';
import multer from 'multer';

// Create destination folder if it doesn't exist
const tempFolder = './public/temp';
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// Optional: File filter (only allow image files, for example)
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .png files are allowed'), false);
  }
};

// Create upload middleware
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

