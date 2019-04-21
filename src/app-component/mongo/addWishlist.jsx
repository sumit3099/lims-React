export async function addWishlist(newBook){
 
        var user=JSON.parse(localStorage.getItem('userId'));
          fetch('https://lims-project-dd085.firebaseio.com/users/'+user+'/wishlist.json',{    
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        });
        var Bbooks=Object.assign([],JSON.parse(localStorage.getItem('wishlist')));
    
        Bbooks.push(newBook);
        localStorage.setItem('wishlist',JSON.stringify(Bbooks));
       
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
  
        return Bbooks;

       
}
