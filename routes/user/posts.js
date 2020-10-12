const express = require("express");
const multer  = require('multer');

const postRouter = express.Router();



//SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: './org/posts/',
  filename: function(req,res,cb){
cb(null,file.fieldname + '-' + Date.noe() + path.extname(file.originalname));
  }
});

const upload =multer({
  storage:storage,
  limits:{fileSize:1000000},
  fileFilter : function(req, file,cb){
    checkFileType(file,cb);
  }
}).array('myImage',10);


function checkFileType(file ,cb){

const fileTypes = /jpeg|jpg|png/;  //check file type
const extname = filetypes.test(path.extname(file.originalname). toLowerCase());
const mimetype = filetypes.test(file.mimetype);

if(mimetype && extname){
  return cb(null,true);
}else{
  cb('Error:Images ONly');
}

}


postRouter.get( '/', async (req, res) => {
  try {
       
    ;
  } catch (error) {
      console.log("Error occurred: ", error);
  }
});

postRouter.post('/' , (req,res) => {
upload(req,res ,(err) => {
  if(err){

  }else {
    if(req.file == undefined){
      res.send('NO file selected');
   }else{
     res.render('index',{
       msg: 'File uploaded',
       file: ''    //plcae where all thw uploaded pictures will be stored as a list
     });
   }
  }
});

});





postRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your posts are underway!");
});

postRouter.route("/new").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your NEW posts is underway!");
});


postRouter.route("/:id").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Your post ${req.params.id} is underway!`);
});

module.exports = postRouter;
