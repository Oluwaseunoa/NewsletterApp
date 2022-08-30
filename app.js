const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.sendFile(__dirname +"/signup.html")
})

app.post("/", (req, res)=>{
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

   const data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
   }

   const jsonData = JSON.stringify(data);

   const url = "https://us7.api.mailchimp.com/3.0/lists/520957d5b9"
   const options= {
    method: "POST",
    auth: "oluwaseun6:30b9a0426deaed7e8f9c232ff4b925bf-us7"
   }
   
    const request = https.request(url, options, (response) =>{
    if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else{
        res.sendFile(__dirname + "/failure.html")
    }
    
    response.on("data", (data)=>{
       console.log(JSON.parse(data)) 
    })
   })
   request.write(jsonData)
   request.end();
})

app.post("/failure", (req, res)=>{
    res.redirect("/")
})


app.listen(3000, ()=>{
    console.log("Server runs at port 3000")
})


//30b9a0426deaed7e8f9c232ff4b925bf-us7

//520957d5b9