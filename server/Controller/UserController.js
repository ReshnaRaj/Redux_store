const UserModel=require('../Model/Users')

const getData=async (req, res) => {
    try {
      const page = parseInt(req.query.page); // Default page is 1 if not provided
      const pageSize = parseInt(req.query.pageSize); // Default page size is 10 if not provided
  
      // Fetch users from the database or any array using pagination
      const users = await UserModel.find({});
      // .select('id name email age') // Include the fields you want to retrieve
      // .exec(); // Execute the query to get an array
  
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
  
      // Slice the users array based on the indexes for the requested page
      const paginatedUsers = users.slice(startIndex, endIndex);
  
      // Get the total count of users for calculating total pages
      // const totalCount = users.length;
  
      // Calculate the total number of pages
      const totalPages = Math.ceil(users.length / pageSize);
      console.log(totalPages, "p");
  
      res.json({ users: paginatedUsers, totalPages });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  const searchData=async (req, res) => {
    try {
      console.log(req.query.item, "data item");
      const item = req.params.item;
      const regex = new RegExp(item, "i"); // Use 'i' flag for case-insensitive search
      let result = await UserModel.find({
        $or: [
          {
            name: { $regex: regex }
          },
        ],
      });
      console.log(result, "search data");
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  const addData=async (req, res) => {
    try {
      const existingEmail = await UserModel.findOne({ email: req.body.email });
  
      if (existingEmail) {
        return res.json({ error: "Email already exists", created: false });
      } else {
        console.log(req.body, "daata coming from the request..");
        const user = await UserModel.create(req.body);
        console.log(user,"new user addedd")
        return res.json(user);
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  const updateData= async (req, res) => {
    try {
      console.log("updations working..");
      const id = req.params.id;
      console.log(id, "user id");
      const { name, email, age } = req.body;
      console.log(req.body);
  
      const updateuser = await UserModel.findByIdAndUpdate(
        { _id: id },
        {
          name: name,
          email: email,
          age: age,
        }
      );
  
      res.json({ updateuser, message: "successfully updated" });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
  const deleteData=async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ deletedUser, message: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  
  module.exports={getData,searchData,addData,updateData,deleteData}