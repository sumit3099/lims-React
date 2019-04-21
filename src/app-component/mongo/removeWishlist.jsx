
export async function removeWishlist(isbn){

    
   var wbook=JSON.parse(localStorage.getItem('wishlist'));

   var user=JSON.parse(localStorage.getItem('userId'));
   var wbookCall=  await fetch('https://lims-project-dd085.firebaseio.com/users/'+user+'/wishlist.json',
     {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       }
     }).then((res)=>res.json()).then((res)=>
     {
         return res;
   });


   var wbookKey=null;
    for (var key in wbookCall) { 
                  
        if(wbookCall[key].isbn===isbn){
          wbookKey=key;
        }
    }
 var data= await  fetch('https://lims-project-dd085.firebaseio.com/users/'+user+'/wishlist/'+wbookKey+'.json',{    
             method: 'DELETE',
             headers: {'Content-Type': 'application/json'}
         });
         for (var key in wbook) {               
            if(wbook[key].isbn===isbn){
             wbookKey=key;
            }
        }        
      

     wbook.splice(wbookKey, 1);
   
     localStorage.setItem('wishlist',JSON.stringify(wbook));
     fetch('https://lims-project-dd085.firebaseio.com/users/'+user+'/.json',
       {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         }
       }).then((res)=>res.json()).then((res)=>
       {
        localStorage.setItem('limsuser',JSON.stringify(res));
     })
return  wbook
}
