$('#add_product').submit(function(e){
    alert("Data inseted succesfully!")
})

// update PUT request for product update
$('#update_product').submit(function(e){

    e.preventDefault();
    // console.log("success")
    var unindexarray = $(this).serializeArray();
    var data={};
    // console.log(unindexarray);
    // get value form update page click event and store values in data
    $.map(unindexarray,function(d,pos){
        data[d['name']]=d['value'];
    })
    // console.log(data)
    // console.log(data.id)

    var request = {
        "url":`api/product/${data.id}`,
        "method":'put',
        "data":data
    }
    $.ajax(request).done(function(response){
        // console.log(data)
        alert("Data Updated Successfully");
    })
})

// PUT request for purchase update
$('#update_purchase').submit(function(e){

    e.preventDefault();
    // console.log("success")
    var unindexarray = $(this).serializeArray();
    var data={};
    // console.log(unindexarray);
    // get value form update page click event and store values in data
    $.map(unindexarray,function(d,pos){
        data[d['name']]=d['value'];
    })
    // console.log(data)
    // console.log(data.id)

    var request = {
        "url":`api/purchase/${data.id}`,
        "method":'put',
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully");
    })
})
// delete document from product
if(window.location.pathname =='/productdetails')
{
    // console.log("w/elcome")
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
    var id=$(this).attr("data-id")
    
    var request = {
        "url":`api/product/${id}`,
        "method":'delete',
    }
    if(confirm("Do you really want to delete record?")){
        $.ajax(request).done(function(response){
            alert("Data Deleted Successfully");
            location.reload();
        })
    }
    
    })
}
// delete document from purchase
if(window.location.pathname =='/purchaserecord')
{
    // console.log("welcome")
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
    var id=$(this).attr("data-id")
    // console.log(id)
    var request = {
        "url":`api/purchase/${id}`,
        "method":'delete',
    }
    if(confirm("Do you really want to delete record?")){
        $.ajax(request).done(function(response){
            alert("Data Deleted Successfully");
            location.reload();
        })
    }
    
    })
}


// update sales record
$('#update_sales').submit(function(e){

    e.preventDefault();
    // console.log("success")
    var unindexarray = $(this).serializeArray();
    var data={};
    // console.log(unindexarray);
    // get value form update page click event and store values in data
    $.map(unindexarray,function(d,pos){
        data[d['name']]=d['value'];
    })
    // console.log(data)
    // console.log(data.id)

    var request = {
        "url":`api/sales/${data.id}`,
        "method":'put',
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully");
    })
})
// delete sales record
if(window.location.pathname =='/saleshistory')
{
    // console.log("welcome")
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
    var id=$(this).attr("data-id")
    // console.log(id)
    var request = {
        "url":`api/sales/${id}`,
        "method":'delete',
    }
    if(confirm("Do you really want to delete record?")){
        $.ajax(request).done(function(response){
            alert("Data Deleted Successfully");
            location.reload();
        })
    }
    
    })
}