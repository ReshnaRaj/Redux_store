const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dbConnection=require('./Connection/database')
const UserModel=require('./Model/Users')
const app=express()
app.use(
    cors({
      origin: 'http://localhost:3000',
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
app.use(express.json())
dbConnection()
app.get('/',(req,res)=>{
    UserModel.find()
    .then(users=>res.jsone(users))
    .catch(err=>res.json(err))

})
app.post('/create-user', async (req, res) => {
    try {
      const existingEmail = await UserModel.findOne({ email: req.body.email });
  
      if (existingEmail) {
        return res.json({ error: "Email already exists", created: false });
      } else {
        const user = await UserModel.create(req.body);
        return res.json(user);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.put('/update', async (req, res) => {
    try {
      const { id, names, emails, ages } = req.body; // Extract id and other data from the request body
      console.log(req.body)
  
      const updateuser = await UserModel.findByIdAndUpdate(id, {
        name: names,
        email: emails,
        age: ages
      }, { new: true }); // Use { new: true } to get the updated document
  
      res.json({ updateuser, message: 'successfully updated' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

app.listen(4001,()=>{
    console.log("server is running on port 4001")
})