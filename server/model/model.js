const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    productid:{type:String,
    require:true,
    unique:true
},
productname:{
    type:String,
    required:true,
    unique:true
}
})
// name in database "userdb"
const Userdb = mongoose.model('userdb',schema);

module.exports = Userdb;