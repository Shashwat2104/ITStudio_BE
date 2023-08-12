const mongoose=require("mongoose");
const  {transporter} = require("../utils/nodemailer");
const userShema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
  hobbies: {
    type: String,
  },
});
userShema.post("save",async function(doc){
   try{
      
         let info =await transporter.sendMail(
             {
                 from:"Sarthak Srivastava",
                 to:doc.email,
                 subject:" Data Saved Confirmation",
                 html:`<h2> <h1>Data Saved Successfully</h1>
                 <p>Your data has been successfully saved.</p>
                 <p>Thank you</p>`
             }
         )
         console.log(info);
   }
   catch(err)
   {
         console.log(err)
         res.json({err})
   }
}) 
module.exports=mongoose.model("users", userShema);