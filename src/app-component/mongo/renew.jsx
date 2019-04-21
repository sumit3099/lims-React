// import storeBbooks from '../../state/store/storeBbooks'; 
async function renewBook(newBook){
    
   var data= await fetch('https://lims-project-dd085.firebaseio.com/borrowedBooks',{
       
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                mid:window.user,
                isbn:newBook.isbn,
                item:newBook
            })
        })
        var allData=data.json();
        return allData;
}
export default renewBook;