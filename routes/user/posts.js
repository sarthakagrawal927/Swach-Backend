const express = require("express");
const { check, validationResult } = require("express-validator");

const postRouter = express.Router();

const User = require("../../models/User");
const Post = require("../../models/Post");
const authenticate = require("../../config/authenticate");

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const keys = require("../../config/keys");
const AWS_accessKeyId = keys.accessKeyId;
const AWS_secretAccessKey = keys.secretAccessKey;
const AWS_Bucket = keys.Bucket;

//parody
postRouter.get("/", (req, res) => {
  res.send("Make an Org account to view Garbage");
});

// SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: "./org/posts/",
  filename: function (req, res, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.noe() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("myImage", 10);

postRouter.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.log("Error occurred: ", error);
  }
});

postRouter.post("/", authenticate.verifyUser, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
    } else {
      if (req.file == undefined) {
        res.send("NO file selected");
      } else {
        res.render("index", {
          msg: "File uploaded",
          file: "", //plcae where all thw uploaded pictures will be stored as a list
        });
      }
    }
  });
});

// const s3 = new aws.S3({
//   accessKeyId: AWS_accessKeyId,
//   secretAccessKey: AWS_secretAccessKey,
//   Bucket: AWS_Bucket,
// });

// function checkFileType(file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif|jfif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

// const maxUploads = 4;
// const uploadsBusinessGallery = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: AWS_Bucket,
//     acl: "public-read",
//     key: function (req, file, cb) {
//       cb(
//         null,
//         path.basename(file.originalname, path.extname(file.originalname)) +
//           "-" +
//           Date.now() +
//           path.extname(file.originalname),
//       );
//     },
//   }),
//   limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).array("galleryImage", maxUploads);

// @route    POST posts
// @desc     Create a post
// @access   Private
postRouter.post(
  "/",
  [
    check("desc", "Description is required").not().isEmpty(),
    check("imageURL", "Description is required").not().isEmpty(),
    check("pincode", "Pincode is required").not().isEmpty(),
  ],
  authenticate.verifyUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      console.log(user);

      const newPost = new Post({
        user: user,
        desc: req.body.desc,
        imageURL: req.body.imageURL,
        pincode: req.body.pincode,
      });

      const post = await newPost.save();
      var JSONPost = JSON.stringify(post);
      res.send(JSONPost);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST posts/upload/multiple_image_upload
// @desc     Add images to a post
// @access   Private
postRouter.post("/upload/multiple_image_upload", (req, res) => {
  uploadsBusinessGallery(req, res, (error) => {
    console.log("files", req.files);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else if (req.files === undefined) {
      // If File not found
      console.log("Error: No File Selected!");
      res.json("Error: No File Selected");
    } else {
      // Success
      let fileArray = req.files,
        fileLocation;
      const galleryImgLocationArray = [];
      for (let i = 0; i < fileArray.length; i++) {
        fileLocation = fileArray[i].location;
        console.log(fileLocation);
        galleryImgLocationArray.push(fileLocation);
      }
      // Save the file name into database
      res.json({
        filesArray: fileArray,
        locationArray: galleryImgLocationArray,
      });
    }
  });
});

module.exports = postRouter;
