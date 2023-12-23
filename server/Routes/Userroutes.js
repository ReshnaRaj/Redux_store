const express=require('express')
const router=express.Router()
const {getData,searchData,addData,updateData,deleteData}=require('../Controller/UserController')
router.get("/",getData);
router.get("/search/:item",searchData );
router.post("/create-user",addData );
router.put("/update/:id",updateData);
router.delete("/delete/:id",deleteData );
module.exports=router