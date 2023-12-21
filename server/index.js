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
app.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    // console.log(users,"ooo")
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/create-user', async (req, res) => {
    try {
      const existingEmail = await UserModel.findOne({ email: req.body.email });

      if (existingEmail) {
        return res.json({ error: "Email already exists", created: false });
      } else {
        console.log(req.body,"daata coming from the request..")
        const user = await UserModel.create(req.body);
        // console.log(user,"new user addedd")
        return res.json(user);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.put('/update/:id', async (req, res) => {
    try {
      console.log("updations working..")
      const id=req.params.id
      console.log(id,"user id")
      const {name, email, age} = req.body;  
      console.log(req.body)
  
      const updateuser = await UserModel.findByIdAndUpdate({_id:id},{
         name:name,
         email:email,
         age:age
      })
         
      res.json({ updateuser, message: 'successfully updated' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.delete('/delete/:id', async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ deletedUser, message: 'Deleted Successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  

app.listen(4001,()=>{
    console.log("server is running on port 4001")
})