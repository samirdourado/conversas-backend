import multer from "multer";
import { AppError } from "../errors";
const permited = ['image/jpeg', 'image/jpg', 'image/png']

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname)       
    },
});

let upload = multer({ storage, fileFilter: (req, file, cb) => {
    if (!permited.includes(file.mimetype)) {
       return cb (new AppError('Arquivo não suportado, permitido apenas jpeg ou png', 400));
    }
    cb(null, true);
} })

export default upload
