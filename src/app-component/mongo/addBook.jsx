
export async function addBook (bookDetails){

  

  var resp=  await  fetch('https://lims-project-dd085.firebaseio.com/books.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // form:{mid:"1042932"}
            body: JSON.stringify({
                isbn: bookDetails.isbn,
                title: bookDetails.title,
                author: bookDetails.author,
                publisher: bookDetails.publisher,
                category: bookDetails.category,
                year: bookDetails.year,
                url: bookDetails.url,
                copies: bookDetails.copies,
                rating: bookDetails.rating
            })
        })
    
            .then((res) => res.json())
            .then((res) => {
                if(res.name){
                    document.getElementById('addBookForm').reset();
                    document.getElementById('formSuccess').style.display = "block";
                    document.getElementById('formError').style.display = "none";
                }
         
            })
            .catch((error)=> {
                document.getElementById('formError').style.display = "block";
                document.getElementById('formSuccess').style.display = "none";
            });
    }