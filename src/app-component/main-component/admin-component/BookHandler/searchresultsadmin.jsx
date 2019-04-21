import React, {Component} from 'react';
import {processedData} from './searchadmin.jsx';
// import $ from 'jquery';
import axios from 'axios';
// import './searchdis.css';
//eslint-disable-next-line
let users, books;
class SearchResultsAdmin extends Component
{
    // constructor(props)
    // {
    //     super(props);
    // }
    componentDidMount()
    {
        axios
            .get('https://api.myjson.com/bins/ds48n')
            .then(res => {
                this.setState({output: res.data});
                users = this.state.output;
        const b = users.filter((res) => res.user.mid === "1042948")
        books=b[0].userBooks.length
            });
    }
  
    render()
    {
        const a = processedData.map(res => {
            return (
                <div className="col-md-4 my-5">
                    <div
                        id={res.isbn}
                        className="card particular"
                        style={{
                        width: '15rem',
                        paddingBottom: '0px'
                    }}>
                        <img
                            className="card-img-top"
                            src={res.details.url}
                            alt="not available"
                            height="300vh"/>

                        <div className="overlay">
                            <div className="text container-fluid">                          
                            <b>{res.details.title}</b><br/>
                            <b>Author : </b>
                            {res.details.author}<br/>
                            <b>Category: </b>
                            {res.details.category}<br/>
                            {[1,2,3,4,5].map(d=>{
                              if(res.details.rating>=d)
                                return<span class="fa fa-star" style={{color:'white'}}></span>
                              else 
                                return<span class="fa fa-star" style={{color:'black'}}></span>
                            })}
                            {/*<button class="btn mt-4" style={{backgroundColor:'white', color:'rgb(96, 0, 58)'}} onClick={this.request}><b>Request Book</b></button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="container-fluid">
                <div className="row">
                    {a}
                </div>
            </div>
        /*<div id="myModal" class="modal">
  <span class="close">&times;</span>
  <div className="container">
  <div className="row">
  <div className="col-md-6">
  <img class="modal-content" id="img01" height="500px" width="400px"/>
  </div>
  <div className="col-md-6">
  <div id="caption">
  </div>
  </div>
  </div>
  </div>
</div>*/

        );

    }
}
export default SearchResultsAdmin;