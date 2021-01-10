var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{

    // validate request
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"});
        return;
    }
    // new user
    const user = new Userdb({
        productid:req.body.productid,
        productname:req.body.productname
    })
    // save user in databse
    user
        .save(user)
        .then(data=>{
            // res.send(data);
            // redirect the users
            res.redirect('/add_product');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "some error occured while creating operation"
            })
        })

}

// retrive and return all product / retrive a single product
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
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
        Userdb.find().sort({productid:1})
        .then(user=>{
            res.send(user);
            // console.log(user);
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
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
            res.status(404).send({message:`cannot update user with ${id}, Maybe user not found`})
            }
            else{
            res.send(data);
            }
            })
        .catch(err=>
        {
            res.status(500).send({message:"Error update user information"});
        });

}

// detele a user with specified used id in the request
exports.detele = (req,res)=>
{

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
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