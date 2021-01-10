const axios = require('axios');
const pdf = require('html-pdf')
const fs = require('fs');


const options = {
    "format":'A4',
    "height": "11.25in",
    "width": "8.5in",
    "border": {
        "top": "0in",            // default is 0, units: mm, cm, in, px
        "right": "0.6in",
        "bottom": "0.4in",
        "left": "0.6in"
      },
    
    "header":{
        "height":"10mm"
    },
    
      "footer": {
        "height": "10mm"
      },
};

exports.homeRoutes=(req,res)=>{

    // axios.get('http://localhost:3000/api/users')
    //     .then(function(response){
    //         // console.log(response)
    //         res.render('index',{users:response.data});
    //     })
    //     .catch(err=>{
    //         res.send(err);
    //     })
    res.render('index');

}
exports.productdetails=(req,res)=>{

        axios.get('http://localhost:3000/api/product')
        .then(function(response){
            // console.log(response)
            // res.render('productdetails',{users:response.data});
            res.render('productdetails',{users:response.data});
        })
        .catch(err=>{
            res.send(err);
        })
    // res.render('productdetails');
}
exports.update_product=(req,res)=>{

    axios.get('http://localhost:3000/api/product',{params:{id:req.query.id}})
    .then(function(response){
        res.render('update-product',{user:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    
}
// show product form
exports.add_product=(req,res)=>{
    res.render('add-product');
}
exports.purchaseform=(req,res)=>{
    res.render('purchase');
}
exports.purchaserecord=(req,res)=>{

    axios.get('http://localhost:3000/api/purchase')
        .then(function(response){
            // console.log(response);
            // res.render('productdetails',{users:response.data});
            res.render('purchaserecord',{users:response.data});
        })
        .catch(err=>{
            res.send(err);
        })

    // res.render('purchaserecord');
}
// show update form
exports.update_purchase=(req,res)=>{
    // res.render('update-purchase');
    axios.get('http://localhost:3000/api/purchase',{params:{id:req.query.id}})
    .then(function(response){
        res.render('update-purchase',{user:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}
// sales
// exports.sales=(req,res)=>{
//     // res.render('salesdetails');
//     // multiple api request
//     let one = 'http://localhost:3000/api/product';
//     let two = 'http://localhost:3000/api/purchase';
//     // handling multiple request
//     const requestOne = axios.get(one);
//     const requestTwo = axios.get(two);
//     // error handling
//     axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
//         const responseOne = responses[0]
//         const responseTwo = responses[1]
//         // use/access the results 
//         // res.send(responseOne);
//         console.log(responseOne.data)
//         console.log(responseTwo.data)
//         res.render('salesdetails',{users:response.data});
//       })).catch(errors => {
//         // react on errors.
//       })

// }

exports.sales=(req,res)=>{
    // res.render('salesdetails');


    axios.get('http://localhost:3000/api/product')
        .then(function(response){
            // console.log(response)
            // res.render('productdetails',{users:response.data});
            res.render('salesdetails',{users:response.data});
        })
        .catch(err=>{
            res.send(err);
        })
}
// stock
exports.stock=(req,res)=>{

    // axios.get('http://localhost:3000/api/purchase')
    // .then(function(response){
    //     console.log(response);
    //     // res.render('productdetails',{users:response.data});
    //     res.render('stock',{users:response.data});
    // })
    // .catch(err=>{
    //     res.send(err);
    // })

    // res.render('stock');

    // res.render('salesdetails');
    // multiple api request
    let one = 'http://localhost:3000/api/product';
    let two = 'http://localhost:3000/api/purchase';
    let three = 'http://localhost:3000/api/sales';
    // handling multiple request
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    // error handling
    axios.all([requestOne, requestTwo,requestThree]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responseThree = responses[2]
        // use/access the results 
        // res.send(responseOne);
        // console.log(responseOne.data)
        // console.log(responseTwo.data)
        
        res.render('stock',{users:responseOne.data,user:responseTwo.data,sale:responseThree.data});
      })).catch(errors => {
        // react on errors.
      })

}
// stock report
exports.stockreport=(req,res)=>{

    // axios.get('http://localhost:3000/api/purchase')
    // .then(function(response){
    //     console.log(response);
    //     // res.render('productdetails',{users:response.data});
    //     res.render('stock',{users:response.data});
    // })
    // .catch(err=>{
    //     res.send(err);
    // })

    // res.render('stock');

    // res.render('salesdetails');
    // multiple api request
    let one = 'http://localhost:3000/api/product';
    let two = 'http://localhost:3000/api/purchase';
    let three = 'http://localhost:3000/api/sales';
    // handling multiple request
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    // error handling
    axios.all([requestOne, requestTwo,requestThree]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responseThree = responses[2]
        // use/access the results 
        // res.send(responseOne);
        // console.log(responseOne.data)
        // console.log(responseTwo.data)
        // start pdf file
        res.render('stockreport',{users:responseOne.data,user:responseTwo.data,sale:responseThree.data},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/stockreport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/stockreport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file
        
        // res.render('stockreport',{users:responseOne.data,user:responseTwo.data,sale:responseThree.data});
      })).catch(errors => {
        // react on errors.
      })

}

// report
exports.report=(req,res)=>{
    res.render('report');
}
exports.salesreport=(req,res)=>{
    res.render('salesreport');
}
// open report
exports.salesreportpdf=(req,res)=>{
    res.render('salesreport');
}
exports.salesreport_report=(req,res,next)=>{

    

    let one = 'http://localhost:3000/api/sales';
    let two = 'http://localhost:3000/api/purchase';
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        // console.log(responseTwo)
         // start pdf file
         res.render('reporttemplate-sales',{sale:responseOne.data,purchase:responseTwo.data},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/salesreport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/salesreport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file
        
        // res.render('stock',{users:responseOne.data,user:responseTwo.data,sale:responseThree.data});
      })).catch(errors => {
        // react on errors.
      })

    // // get sales report to generate pdf
    // axios.get('http://localhost:3000/api/sales')
    //     .then(function(response){
    //         // var options = {format:'A4'};
            

    //         // pdf file start
    //         // res.render('reporttemplate-sales',{sale: response.data});
    //         res.render('reporttemplate-sales',{sale: response.data},function(err,html){
    //             pdf.create(html, options).toFile('./generate-pdf/salesreport.pdf', function(err, result) {
    //                 if (err){
    //                     console.log(err);
    //                 }
    //                 else{
    //                     // res.send("File created successfully");

    //                     // console.log(result);
    //                     var datafile = fs.readFileSync('./generate-pdf/salesreport.pdf');
    //                     res.header('content-type','application/pdf');
    //                     // console.log(datafile)
    //                     // res.sendFile(result.filename);
    //                     res.send(datafile);

    //                     }
    //               });
    //         })
        
    //         // pdf end
            

    //     })
        .catch(err=>{
            res.send(err);
        })
    // end sales report get

}

// purchase report

exports.purchasereport=(req,res)=>{
    res.render('purchasereport')
}
// date sales page
exports.datesalesreport=(req,res)=>{
    res.render('datesalesreport')
}
// date purchase page
exports.datepurchasereport=(req,res)=>{
    res.render('datepurchasereport')
}
// purchase full report
exports.purchasereport_report=(req,res)=>{


    axios.get('http://localhost:3000/api/purchase')
    .then(function(response){
        
        // console.log(response)
        // res.render('productdetails',{users:response.data});
        // res.render('reporttemplate-purchase',{purchase:response.data});\
        // start pdf file
        res.render('reporttemplate-purchase',{purchase: response.data},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/purchasereport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/purchasereport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file
    })
    .catch(err=>{
        res.send(err);
    })
}
// purchase date wise report
exports.purchase_date_report=(req,res)=>{


    // console.log(req.body.sdate);
    // console.log(req.body.edate);
    
    let datedata = {
        start : req.body.sdate,
        end : req.body.edate
    }
    // console.log(datedata);

    axios.get('http://localhost:3000/api/purchase')
    .then(function(response){
        // console.log(response)
        // res.render('productdetails',{users:response.data});
        // res.render('datewisepurchase',{purchase:response.data,duration:datedata});
        // start pdf file
        res.render('datewisepurchase',{purchase: response.data,duration:datedata},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/datewisepurchasereport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/datewisepurchasereport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file
    })
    .catch(err=>{
        res.send(err);
    })

}

// sales date wise report
exports.sales_date_report=(req,res)=>{

    // console.log(req.body.sdate);
    // console.log(req.body.edate);
    
    let datedata = {
        start : req.body.sdate,
        end : req.body.edate
    }
    // console.log(datedata);

    axios.get('http://localhost:3000/api/sales')
    .then(function(response){
        // console.log(response)
        // res.render('productdetails',{users:response.data});
        // res.render('datewisesales',{sales:response.data,duration:datedata});
        // start pdf file
        res.render('datewisesales',{sales:response.data,duration:datedata},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/datewisesalesreport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/datewisesalesreport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file
    })
    .catch(err=>{
        res.send(err);
    })

}


// id wise sales 

exports.idwisesales_report=(req,res)=>{

    // console.log(req.body.sdate);
    // console.log(req.body.edate);
    
    let datedata = {
        start : req.body.sdate,
        end : req.body.edate,
        id : req.body.sid
    }
    // console.log(datedata);
    let one = 'http://localhost:3000/api/sales';
    let two = 'http://localhost:3000/api/purchase';
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        // console.log(responseTwo)
         // start pdf file
         res.render('idwisesales',{sales:responseOne.data,purchase:responseTwo.data,duration:datedata},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/idwisesalesreport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/idwisesalesreport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file
        
        // res.render('stock',{users:responseOne.data,user:responseTwo.data,sale:responseThree.data});
      })).catch(errors => {
        // react on errors.
      })
    .catch(err=>{
        res.send(err);
    })

}

// id wise purchase

exports.idwisepurchase_report=(req,res)=>{

    // console.log(req.body.sdate);
    // console.log(req.body.edate);
    
    let datedata = {
        start : req.body.sdate,
        end : req.body.edate,
        id : req.body.sid
    }
    // console.log(datedata);
    let one = 'http://localhost:3000/api/sales';
    let two = 'http://localhost:3000/api/purchase';
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        // console.log(responseTwo)
         // start pdf file
         res.render('idwisepurchase',{sales:responseOne.data,purchase:responseTwo.data,duration:datedata},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/idwise_purchasesreport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/idwise_purchasesreport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file
        
        // res.render('stock',{users:responseOne.data,user:responseTwo.data,sale:responseThree.data});
      })).catch(errors => {
        // react on errors.
      })
    .catch(err=>{
        res.send(err);
    })

}

// sales history
exports.saleshistory=(req,res)=>{


    axios.get('http://localhost:3000/api/sales')
    .then(function(response){
        // console.log(response)
        // res.render('productdetails',{users:response.data});
        res.render('saleshistory',{sales:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    
}
// update sales
exports.update_sales=(req,res)=>{
    // res.render('update-purchase');
    axios.get('http://localhost:3000/api/sales',{params:{id:req.query.id}})
    .then(function(response){
        res.render('update-sales',{user:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}


// product report
exports.product_report=(req,res)=>{
    axios.get('http://localhost:3000/api/product')
    .then(function(response){

         // start pdf file
         res.render('productreport',{product:response.data},function(err,html){
            pdf.create(html, options).toFile('./generate-pdf/productreport.pdf', function(err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    // res.send("File created successfully");

                    // console.log(result);
                    var datafile = fs.readFileSync('./generate-pdf/productreport.pdf');
                    res.header('content-type','application/pdf');
                    // console.log(datafile)
                    // res.sendFile(result.filename);
                    res.send(datafile);

                    }
              });
        })
        // end pdf file

        // res.render('productreport',{product:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}