var express = require("express");

const request =require('request');

var app = express();
var router = express.Router();
var path = __dirname + '/views/';

var x = "10"

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

const Vehicles = require(__dirname +'/models/vehicles');



router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});



// router.post('/',function(req,res){
//   console.log("comming here")
//   console.log(req.body)
// })

router.post('/', (req, res) => {      //checking for already existing device
  console.log("Body: "+JSON.stringify(req.body))
  var newVehicle = req.body;
  
  var Id = newVehicle.access_token;
  console.log("Id=>"+Id)
  
                                                                                                                 
        
        var payload={
          access_token:newVehicle.access_token,
          lattitude: newVehicle.lattitude,
          longitude: newVehicle.longitude
        }
        var connOpt={
          url:"https://polar-falls-73370.herokuapp.com/api/v1/verify_registrations/vehicle_validity",
          method:'POST',
          headers:{
              'content-Type':'application/json'
          },
          json:payload
      
      }
      // var status=null;

      request(connOpt,(err,res,body)=>{
        var napp = express();
          if(body.status){
              console.log("Vehicle Status uploaded successfully");
              // status = "true"
          }else {
              console.log("There is no vehicle registration");	
              // status = "false"
          }	
          
      });
      // console.log("Status => "+status)
      // if(status=="true"){
      //   console.log("truuuuuuuuuuuu")
        res.sendFile(path + "success.html");
      //   // res.sendFile(path + "404.html");
      // }else{
      //   console.log("falseeeeeeeeee")
      //   res.sendFile(path + "404.html");
      //   // res.sendFile(path + "success.html");
      // }             
      
 
  
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/upload",function(req,res){
  res.sendFile(path + "upload.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});


app.listen((process.env.PORT || 3000),function(){
  console.log("Server is listening....");
  var liveURL = "https://polar-falls-73370.herokuapp.com/api/v1/verify_registrations/vehicle_validity"
  // var devURL = "http://localhost:3031/api/v1/verify_registrations/vehicle_validity"
  var liveAccessToken = "bf0946246700d23d4088e61dd5a12950"
  // var devAccessToken = "337f890409db71492a5e0e5685b0c678"
  var sendLocation = setInterval(function () {
      console.log("sending co-ordinates.......");
      var n = Math.random();
      if (n > 0.5){
        n = -(n)
      }
      var payload={
        access_token:liveAccessToken,
        lattitude: (18.5309+n).toFixed(4),
        longitude: (73.8117+n).toFixed(4)
      }
      var connOpt={
        url:devURL,
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        json:payload
    
    }
    // var status=null;

    request(connOpt,(err,res,body)=>{
      var napp = express();
        if(body.status){
            console.log("Vehicle Status uploaded successfully");
            // status = "true"
        }else {
            console.log("There is no vehicle registration");	
            // status = "false"
        }	
        
    });
  }, 60000);
});