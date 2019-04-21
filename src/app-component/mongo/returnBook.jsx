
async function returnBook(isbn){
    
   var bbook=JSON.parse(localStorage.getItem('borrowedBooks'));

   var user=JSON.parse(localStorage.getItem('userId'));
   var bBookCall=  await fetch('https://lims-project-dd085.firebaseio.com/users/'+user+'/borrowedBooks.json',
     {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       }
     }).then((res)=>res.json()).then((res)=>
     {
         return res;
   });


   var bbookKey=null;
    for (var key in bBookCall) { 
                  
        if(bBookCall[key].isbn===isbn){
          bbookKey=key;
        }
    }
 var data= await  fetch('https://lims-project-dd085.firebaseio.com/users/'+user+'/borrowedBooks/'+bbookKey+'.json',{    
             method: 'DELETE',
             headers: {'Content-Type': 'application/json'}
         });
         for (var key in bbook) {               
            if(bbook[key].isbn===isbn){
              bbookKey=key;
            }
        }        
     

     bbook.splice(bbookKey, 1);

     localStorage.setItem('borrowedBooks',JSON.stringify(bbook));
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
return  bbook
}
export default returnBook;