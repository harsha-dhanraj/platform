const mongoose = require('mongoose');
const vehicleSchema = mongoose.Schema({
    vehicleID:{
        type:String,
        required:true
    },
    lattitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        default:Date.now
    }
});

const Vehicle = module.exports = mongoose.model('Vehicles', vehicleSchema);

module.exports.addVehicle = (vehicle, callback) => {
    Vehicle.create(vehicle, callback);
}
module.exports.getVehicle = (callback) => {
    Vehicle.find(callback);
}

module.exports.getVehiclebyVehicleID = (vehicleid, callback) => {
    query={
       vehicleID:vehicleid
    }

    Vehicle.find(query,callback);
}