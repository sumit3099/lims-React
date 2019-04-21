import React, { Component } from 'react';
// import axios from 'axios';
// import './bookshow.css';
import { Link } from 'react-router-dom';
// import SearchResultsAdmin from '../../../search-component/SearchResults.jsx';
// import SearchAdmin from './searchadmin';
// import './searchdis.css';
import AdminFooter from '../admin-footer-component/adminFooter';
import { requireAuth } from '../../../isLoggedIn.js'
// import '../../../../../node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js'

import {addBook} from '../../../mongo/addBook'
import DashBoardStats from '../admin-stats/adminstats'



import AdminHeader from '../adminheader'

// var debounce = require('debounce');
// var count = 0;

class BookAdd extends Component {
    componentWillMount() {
        requireAuth(window.location.href)
    }

    handleBook = (e) => {
        e.preventDefault();
        var bookDetails = {
            isbn: document.getElementById('addBookIsbn').value,
            title: document.getElementById('addBookTitle').value,
            author: document.getElementById('addBookAuthor').value,
            publisher: document.getElementById('addBookPublisher').value,
            category: document.getElementById('addBookCategory').value,
            year: document.getElementById('addBookYear').value,
            url: document.getElementById('addBookUrl').value,
            copies: document.getElementById('addBookCopies').value,
            rating: document.getElementById('addBookRatings').value
        }   }

    render() {

        return (

            <div>

                <AdminHeader />

                <header id="header" style={{ backgroundColor: '#333333' }}>

                    <div className="conatainer">
                        <div className="row">
                            <div className="col-md-10" style={{}}>
                                <h3
                                    className="dd"
                                    style={{
                                        textAlign: "left", marginTop: "7px",marginLeft:"2%"
                                    }}>
                                    <span className="fa fa-cog" aria-hidden="true"></span>DashBoard
                                    <small> Add Books</small>
                                </h3>
                            </div>

                            <div className="dropdown create">
                                <button
                                    className="btn default dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{ color: 'white', backgroundColor: "#18906f", marginTop: "0px", height: "33px" }}>
                                    Manage Content
                                        <span className="caret" /></button>

                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to="/bookadd">
                                        <a class="dropdown-item" href="!#">Add Book(s)</a>
                                    </Link>
                                    <Link to="/bookedit">
                                        <a class="dropdown-item" href="!#">Edit Book(s)</a>
                                    </Link>
                                                                            <Link to="/manageuser">

                                    <a class="dropdown-item" href="!#">Manage User(s)
                                        </a>
                                        </Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </header>

                <section id="breadcrumb">
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="active" style={{ color: "black", fontSize: "20px" }}><b>DashBoard</b></li>
                        </ol>
                    </div>
                </section>

                <section id="main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">

                                <DashBoardStats />

                            </div>


                            <div className="col-md-9">


                                <div className="card">
                                    <h5 className="card-header">Add Book : </h5>
                                    <br />
                                    <div className="card-body">
                                        <div className="col-md-12">

                                            <form id="addBookForm" onSubmit={this.handleBook}>
                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    ISBN:
                                                <input type="text" class="form-control" id="addBookIsbn" />
                                                </div>

                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    Title:
                                                <input type="text" class="form-control" id="addBookTitle" />
                                                </div>
                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    Author:
                                                <input type="text" class="form-control" id="addBookAuthor" />
                                                </div>
                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    Category:
                                                <input type="text" class="form-control" id="addBookCategory" />
                                                </div>
                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    Publisher:
                                                <input type="text" class="form-control" id="addBookPublisher" />
                                                </div>
                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    Ratings:
                                                <input type="text" class="form-control" id="addBookRatings" />
                                                </div>

                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    Copies:
                                                <input type="text" class="form-control" id="addBookCopies" />
                                                </div>

                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    URL:
                                                <input type="text" class="form-control" id="addBookUrl" />
                                                </div>

                                                <div class="form-group " style={{ textAlign: "left" }}>
                                                    Year:
                                                <input type="text" class="form-control" id="addBookYear" />
                                                </div>


                                                <div style={{ textAlign: "left" }}><button type="submit" class="btn btn-warning" style={{ textAlign: "left" }}>
                                                    Add Book</button></div>
                                            </form>

                                            <div class="form-group" id="formSuccess" style={{ textAlign: "centre",color:"red",display:"none" }}>
                                              Book Added Succesfully
                                                </div>
                                         <div class="form-group " id="formError"style={{ textAlign: "centre",color:"red",display:"none" }}>
                                              Sorry Error Occrred please try again after some time
                                         </div>

                                        </div>
                                    </div>






                                </div></div>
                        </div>
                    </div>
                </section>
                <br /><br />


                <div>





                </div>



                <AdminFooter />


            </div>









        )

    }


}

export default BookAdd;


