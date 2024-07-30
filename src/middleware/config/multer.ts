import multer from "multer";

const imgMimTypeWhitelist = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const uploadImages = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    //validate file extensions
    if (!imgMimTypeWhitelist.includes(file.mimetype)) {
      //throw err
      return cb(
        new Error("Only .jpeg, .jpg, .png, .webp formats are allowed."),
      );
    }
    //accept
    cb(null, true);
  },
});
