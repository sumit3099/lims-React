export async function addReview(isbn,review){
    


var data= await  fetch('https://lims-project-dd085.firebaseio.com/reviews.json',{    
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({isbn:isbn,
                reviews:review})
        });
        var  data= await   fetch('https://lims-project-dd085.firebaseio.com/reviews.json',
    
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((res)=>res.json()).then((res)=>
        { var tem=[];
          for (var key in res) {
      
            
            if(res[key].isbn===isbn){
      
              tem.push(res[key].reviews)
      
            }
            // skip loop if the property is from prototype
          }
         
   
             return tem;
      });

    var finalData= data;
if(finalData.length==0){
  return null;
}else{
      
      return finalData;
}
}