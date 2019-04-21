async function fetch() {
    var data = await fetch('https://lims-project-dd085.firebaseio.com/books.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    var allData = data.json();
    window.display = allData;
    localStorage.setItem('books', JSON.stringify(allData))

  }
  (async function () {
    await fetch()
  }).bind(this)()