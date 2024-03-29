import multer from 'multer';

const LIST_OF_ALLOWED_FILE_TYPE = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'image/svg+xml',
];

const fileFilter = (req: any, file: any, cb: any) => {
  if (LIST_OF_ALLOWED_FILE_TYPE.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Can't catch it later.
    cb(new Error('File Type is not supported'), false);
  }
};
export const upload = multer({ storage: multer.memoryStorage(), fileFilter });
