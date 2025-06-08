const express = require('express');
const path = require('path');
const dbritik=require("./dbconnectio")

const app = express();
const port = 8080;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like index.html)
app.use(express.static(__dirname));

app.get("/index", (req, res) => {
  const username = req.body.username; // Get username from form input
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get("/vidio",(req,res)=>{
  res.sendfile(path.join(__dirname,"vidio.html"));
})
app.post('/login',async (req, res) => {
  let rh = await dbritik();
    let gra =rh.collection("spotify_user");
  const username = req.body.username;
  const password = req.body.password;
   let fin=await gra.findOne({"name":username,"password":password});
   
   //let user=fin.name;
   //let pass=fin.password;
   //console.log(user,pass)
  if(fin){
    res.redirect('/home.html');
  }
  
  else{
     res.send(`
      <html>
      <body>
        <p style="color:red;">Incorrect username or password</p>
        <a href="/">Go back to login</a>
      </body>
      </html>
    `);
  }
  //console.log('Username:', username);
  //console.log('Password:', password); // or send a response
});
app.get("/ragistration",(req,res)=>{
  res.sendFile(path.join(__dirname, 'account.html'));
})
app.post("/insert",async(req,res)=>{
   let rh = await dbritik();
    let gra =rh.collection("spotify_user");
  let name=req.body.fullname;
  let Email=req.body.email;
  let phone=req.body.phone;
  let pass=req.body.password;

  let fin=await gra.findOne({"name":name,"password":pass});
  console.log(fin);

  if(fin){
    res.send(`
      <html>
      <body>
        <p style="color:red;">you username or password alrdy exit please inter new password</p>
        <a href="/ragistration">Go back to login</a>
      </body>
      </html>
    `);
  }
  else{
  let obj ={
            "name":name,
            "Email":Email,
            "phone":phone,
            "password":pass
         }
         const insert=gra.insertOne(obj)
         res.sendfile("index.html");
  
 
        }
})

app.listen(port, () => {
  console.log(`Server at http:// http://192.168.32.214:${port}`);
});