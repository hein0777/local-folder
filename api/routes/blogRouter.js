const express = require ('express')
const router = express.Router();
const fileupload = require('express-fileupload');
const postModel = require('./../Model/postsModel')

router.get('/',async(req,res,next)=>{
   let getAllPost = await postModel.find({});
   res.json(getAllPost);
})
router.get('/:id',async(req,res,next)=>{
  let {id} = req.params;
  res.json(id);
 })
router.post('/create',async (req,res,next)=>{
  
    const {files,body}=req;
    const fileName = files.image.name;
    const filePath = 'public/images/' + fileName;
    files.image.mv(filePath,(err)=>{
    console.log(err);
    });
    console.log(body.contact)
    await postModel.create({
        title:body.title,
        summery: body.summery,
        contact : body.contact,
        image:fileName
    })
   .then(res.json("Article Created"))
})
router.put('/getPost', async(req,res,next)=>{
    let id = req.body.id
    console.log("id is ",id)
   await postModel.findOne({_id:id})
   .then(result=>{res.json(result)
    console.log("post is found")
})
.catch(e=>{console.log("error is occur",e)
    res.json("error",e)
})
; 
})
module.exports = router;