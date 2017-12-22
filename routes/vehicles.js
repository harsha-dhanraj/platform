var express = require('express');
var router = express.Router();
const Vehicles = require('../models/vehicles');
//to add new device if  it is not present 

router.post('/', (req, res, next) => {      //checking for already existing device
    var newVehicle = req.body;
    var Id = newVehicle.vehicleID;
    Vehicles.getVehiclebyVehicleID(Id,(err,vehicle)=>{
        if (vehicle.length != 0){           
            Vehicles.addVehicle(newVehicle,(err,vehicle)=>{
                console.log(newVehicle);
                if (err){
                    console.error(err);
                    res.json({
                        success: false,
                        msg: "Some Error"
                    });
                } else {
                    res.json({
                        success:true,
                        msg:"Vehicle data registered successfully....",
                        data:vehicle
                    })
                }
            });
        }
    })
    
});


router.get('/',(req,res,next)=>{
    Vehicles.getVehicle((err,vehicles)=>{
        if (err){
            console.error(err);
            res.json({
                success:false,
                msg:"Some Error"
            })
        }else{
            res.json({
                success:true,
                data:vehicles
            })
        }
    });
});

module.exports = router;