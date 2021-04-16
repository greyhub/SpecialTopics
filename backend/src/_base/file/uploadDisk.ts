import multer, { diskStorage } from "multer"
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

function createIfNotExistUploadPath(uploadPath: string) {
  fs.exists(uploadPath, function(exists: any) {
    if(exists) {
      return true;
    }
    else {
      fs.mkdir(uploadPath, function(err) {
        if(err) {
          return false; 
        }  
        return true;
      })
    }
  })
}

const storage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    createIfNotExistUploadPath("./static");
    cb(null, "static")
  },
  filename: function(req: any, file: any, cb: any) {
    cb(null, uuidv4()+'-'+file.originalname);
  },
})

const uploadDisk = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const mt = file.mimetype;
    const isOK = mt === 'image/jpg' || mt === 'image/jpeg' || mt === 'image/png';
    return cb(null, isOK);
  },
})

export default uploadDisk