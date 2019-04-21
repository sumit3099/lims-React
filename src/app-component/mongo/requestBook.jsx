
async function requestBook(newBook){
        var user=JSON.parse(localStorage.getItem('userId'));
          fetch('https://lims-project-dd085.firebaseio.com/users/'+user+'/borrowedBooks.json',{    
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        });
        var Bbooks=JSON.parse(localStorage.getItem('borrowedBooks'));
        Bbooks.push(newBook);
       
        localStorage.setItem('borrowedBooks',JSON.stringify(Bbooks));
    console.log(Bbooks);
        return Bbooks;

}
export default requestBook;