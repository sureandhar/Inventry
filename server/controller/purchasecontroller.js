var Purchasedb = require('../model/purchasemodel');

// create and save new user
exports.create = (req,res)=>{

    // validate request
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"});
        return;
    }

    // current date
    let today = new Date().toLocaleDateString()

    // new user
    const purchase = new Purchasedb({
        date:`${today}`,
        productid:req.body.productid,
        productname:req.body.productname,
        vendorname:req.body.vendorname,
        vendoraddress:req.body.vendoraddress,
        quantity:req.body.quantity,
        rate:req.body.rate
    })
    // save user in databse
    purchase
        .save(purchase)
        .then(data=>{
            // res.send(data);
            // redirect the users
            res.redirect('/purchaseform');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "some error occured while creating operation"
            })
        })

}

// retrive and return all users / retrive a single user
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Purchasedb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found with id"+id})
                }
                else{
                    res.send(data)
                }
                
            })
            .catch(err=>{
                res.status(500).send({message:"Error retriving user with id"+id})
            })

    }
    else{
        Purchasedb.find()
        .then(user=>{
            res.send(user);
        })
        .catch(err=>{
            res.satus(500).send({message:err.message || "Error occured whille retriving information"})
        })
    }



}

// update a new identified user by user Id
exports.update = (req,res)=>
{

    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update cannot be empty"})
    }

    // url paramater
    const id = req.params.id;
    Purchasedb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        
        .then(data=>{
            
            if(!data){
            res.status(404).send({message:`cannot update user with ${id}, Maybe user not found`})
            }
            else{
                console.log(req.body.name);
                console.log(data.date);
            res.send(data);
            console.log("Updated User : ", data); 
            }
            })
        .catch(err=>
        {
            res.status(500).send({message:"Error update user information"});
        });

}

// detele a user with specified used id in the request
exports.delete = (req,res)=>
{

    const id = req.params.id;

    Purchasedb.findByIdAndDelete(id)
        .then(data=>
        {
            if(!data){
                res.status(404).send({message:`cannot delete with ${id}, Maybe id is wrong`})
            }
            else{
                res.send({
                    message:"User was deleted"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"could ot delete user with id"+id
            });
        });


}