const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const purchasecontroller = require('../controller/purchasecontroller');
const salescontroller = require('../controller/salescontroller');
// sending default page
/**
 * @description Root Route
 * @method GET/
 */
// route.get('/',(req,res)=>{
//     res.render('index');
// })
route.get('/',services.homeRoutes);

route.get('/productdetails',services.productdetails);
route.get('/update_product',services.update_product);
route.get('/purchaseform',services.purchaseform);
route.get('/purchaserecord',services.purchaserecord);
route.get('/update_purchase',services.update_purchase);
route.get('/update_sales',services.update_sales);

// sales
route.get('/sales',services.sales);
// stock
route.get('/stock',services.stock);
// report
route.get('/report',services.report);
route.get('/salesreport',services.salesreport);
route.get('/purchasereport',services.purchasereport);
route.get('/salesreport_report',services.salesreport_report);
route.get('/purchasereport_report',services.purchasereport_report);
route.get('/saleshistory',services.saleshistory);
route.get('/datesalesreport',services.datesalesreport);
route.get('/datepurchasereport',services.datepurchasereport);
route.get('/stockreport',services.stockreport);

// get specific purchase report
route.post('/purchase-date-report',services.purchase_date_report);
// get specific salesreport
route.post('/sales-date-report',services.sales_date_report);
// product report
route.get('/product-report',services.product_report);
// id wise sales
route.post('/idwisesales-report',services.idwisesales_report);
// id wise purchase
route.post('/idwisepurchase-report',services.idwisepurchase_report);

// route.get('/productdetails',(req,res)=>{
//     res.render('productdetails');
// })

route.get('/add_product',services.add_product);
// route.get('/add_product',(req,res)=>{
//     res.render('add-product');
// })

route.post('/api/product',controller.create);
route.get('/api/product',controller.find);
route.put('/api/product/:id',controller.update);
route.delete('/api/product/:id',controller.detele);
// purchase
route.post('/api/purchase',purchasecontroller.create);
route.get('/api/purchase',purchasecontroller.find);
route.put('/api/purchase/:id',purchasecontroller.update);
route.delete('/api/purchase/:id',purchasecontroller.delete);
// sales
route.post('/api/sales',salescontroller.create);
route.get('/api/sales',salescontroller.find);
route.put('/api/sales/:id',salescontroller.update);
route.delete('/api/sales/:id',salescontroller.delete);



module.exports=route;