import multer from "multer";
import path from "path";
import sharp from "sharp";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const helperImage = (filePath: string, fileName: string, size = 40) => {
  return sharp(filePath).resize(size).toFile(`optimize/${fileName}`);
};
const upload = multer({
  storage: storage,
});

export default upload;
