var Salesdb = require('../model/salesmodel');

// create and save new user
exports.create = (req,res)=>{

    // validate request
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"});
        return;
    }
    let today = new Date().toLocaleDateString()
    // new user
    const sales = new Salesdb({
        date:`${today}`,
        productid:req.body.pid,
        productname:req.body.name,
        quantity:req.body.pqty
    })
    // save user in databse
    sales
        .save(sales)
        .then(data=>{
            // res.send(data);
            // redirect the users
            res.redirect('/sales');
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

        Salesdb.findById(id)
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
        Salesdb.find()
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
    Salesdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
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
exports.delete = (req,res)=>
{

    const id = req.params.id;

    Salesdb.findByIdAndDelete(id)
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