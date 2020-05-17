const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();



app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));



app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post('/',function(req,res){
const first_name = req.body.fname;
const second_name = req.body.lname
const email = req.body.email;

var data = {
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME:first_name, 
                LNAME:second_name
            }
        }
    ]
};

var jsonData = JSON.stringify(data);

const url = "https://us18.api.mailchimp.com/3.0/lists/6d3943ee00"; 
 



const options = {
    method:"POST",
    auth:"vijay:7da272ee2ede4602cb86a191144f37f9-us18"

}

const request = https.request(url,options,function(response){
if(response.statusCode === 200){
    res.send("success");
} else {
    res.send("try again");
}

response.on("data",function(data){
    console.log(JSON.parse(data));
});
});



request.write(jsonData); 
request.end();






});





app.listen(process.env.PORT || 3000,function(){
    console.log("server started at 3000");
})






//7da272ee2ede4602cb86a191144f37f9-us18

//audience
