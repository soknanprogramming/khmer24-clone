import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'src/uploads/products'); // Ensure 'src/uploads/products' directory exists
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024, files: 8 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).array('photos', 8);