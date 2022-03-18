const express = require('express');
const router = express.Router();
const Add = require('../models/addSchema');
const reqObj = require('../models/requestSchema');
//const upload=require('../middleware/upload')
var multer = require('multer');
const authenticate = require('../middleware/authenticate');




// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//       cb(null, './public/uploads')
//     },
//     filename: (req, file, cb)=> {
//       cb(null, file.originalname);
//     }
// })

//const upload = multer({ storage: storage });
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './public/uploads');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|PNG|JPEG|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

router.post("/upload", upload.single("articleImage"),authenticate, async (req, res) => {
  try {
    // const newArticle = new Add({
    // title: req.body.title,
    // desc: req.body.desc,
    // img: req.file.originalname
    // })
    const { title, desc } = req.body;
      const { path, mimetype } = req.file;
      const newArticle = new Add({
        title,
        desc,
        owner: req.rootUser.name,
        owner_id:req.rootUser._id,
        file_path: path,
        file_mimetype: mimetype,
        status:"empty",
      });
    await newArticle.save();
    res.send("uploades successfully");
    
  } catch (error) {
   res.status(400).send("Error while uploading file. Try again later.");
    console.log(error);
    
  }
  
  
  
    
});
router.get('/allPosts/:id', async (req, res) => {
 
  const id = req.params.id;
  const data = await Add.findById(id);
  res.send(data);
 
})
router.get('/allPosts', authenticate,async (req, res) => {
  // console.log('hello');
  try {
    const data = await Add.find({owner_id:{$nin: req.rootUser._id},status:"empty"});
    //console.log(data);
    res.send(data);
  }
  catch (error) {
    console.log(error);
  }
  
})
router.get('/req', authenticate, async (req, res) => {
  
  try {
  
    const data = await Add.find({ owner_id: req.rootUser._id });
    res.send(data);
  
  } catch (error) {
    
  }
})

router.post('/req', authenticate,async (req, res) => {
  try {
    const { exchangeObj_id, requestedObj_id } = req.body;
    const objExist = await Add.findById(exchangeObj_id);
    const reqobjExist = await Add.findById(requestedObj_id);
    const reqExist = await reqObj.find({}, { projection: { exchangeObj_id, requestedObj_id } });
    console.log(reqExist);
    if (objExist.status === "traded" )
    {
      res.status(501).send("object already traded");
      return;
    }
    else {
      
      const newObj = new reqObj({
        exchangeObj_id,
        requestedObj_id,
        requestedObjOwner_id: reqobjExist.owner_id,
        exchangeObjOwner_id: req.rootUser._id
        
      })
      await newObj.save();

      res.send("request made successfully");
    }
    
  // console.log(exchangeObj_id);
  // console.log( requestedObj_id);
  } catch (error) {
    console.log(error);
  }
  
})

router.get('/notification', authenticate, async (req, res) => {
  try {
    const data = await reqObj.find({ requestedObjOwner_id: req.rootUser._id, status: 'PENDING' }).populate(['exchangeObj_id', 'requestedObj_id']).exec();

  res.send(data);
  } catch (error) {
    console.log(error);
  }
  
})
router.post('/notification', async (req, res) => {
  try {
    const { exchangeObj_id, requestedObj_id,_id,name} = req.body;
    // console.log(exchangeObj_id._id);
    // console.log(requestedObj_id._id);
    // console.log(name);
    // console.log(_id);
    if (name === "ACCEPT")
    {
      await Add.updateOne({ _id: exchangeObj_id._id }, { $set: { status: "traded" } });
      await Add.updateOne({ _id: requestedObj_id._id }, { $set: { status: "traded" } });
      await reqObj.updateMany({ requestedObj_id }, { $set: { status: "REJECT" } });
      await reqObj.updateOne({ _id }, { $set: { status: "ACCEPT" } });
      
    }
    else {
       await reqObj.updateOne({ _id }, { $set: { status: "REJECT" } });
    }
    
    res.sendStatus(200);
    
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;