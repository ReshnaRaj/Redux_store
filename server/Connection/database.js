const mongoose=require('mongoose')
const dbConnection=async()=>{
    mongoose.set('strictQuery',false)
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/Redux-store',{
            useNewUrlParser:true,
            
        }).then(()=>{
            console.log("Database is connected successfully")
        }).catch((err)=>{
            console.log("Database  error",err)
        })
    } catch (error) {
        console.log(error,"error while in connection...")
        
    }
}
module.exports=dbConnection;