import React, { Component } from 'react';
import axios from 'axios';
import {UserBooks} from './borrowedBooks.jsx';
class BorrowedBooks extends Component
{
  state=
  {
    output : [],
  }

componentDidMount()
{
  axios.get('https://api.myjson.com/bins/ds48n')
  .then(res => {
    this.setState({output : res.data});
  })
}

render()
{
 const outputs = this.state.output.map((result)=>
 {
   return(<UserBooks key={result.user.mid} list={result.userBooks} />);
 })
  return(
    
this.state.output.map((result)=>
          <div>
            {outputs}
            </div>
  )
  );
}
}
export default BorrowedBooks;