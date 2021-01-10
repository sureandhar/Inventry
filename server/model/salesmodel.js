const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date:{type:String,
    require:true
    },
    productid:{type:String,
    require:true
    },
    productname:{
    type:String,
    required:true
},
    quantity:{
    type:Number,
    required:true
}
})
// name in database "userdb"
const Salesdb = mongoose.model('salesdb',schema);

module.exports = Salesdb;