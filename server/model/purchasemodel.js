const mongoose = require('mongoose');

var schema = new mongoose.Schema({
date:{
    type:String,
    require:true
}
    ,
productid:{
    type:String,
    require:true
    },
productname:{
    type:String,
    required:true
    },
vendorname:{
    type:String,
    require:true

    },
vendoraddress:{
    type:String

    },
quantity:{
    type:Number,
    require:true

    },
rate:{
    type:Number,
    require:true
    }
})
// name in database "userdb"
const Purchasedb = mongoose.model('purchasedb',schema);

module.exports = Purchasedb;