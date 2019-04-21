import React, { Component } from 'react';
// import axios from 'axios';
// import './bookshow.css';
import { Link } from 'react-router-dom';
// import SearchResultsAdmin from '../../../search-component/SearchResults.jsx';
import SearchAdmin from './searchadmin';
import DashBoardStats from '../admin-stats/adminstats';
// import './searchdis.css';
// import Footer from '../../../footer-component/footer.jsx';
import {requireAuth} from '../../../isLoggedIn.js'
import AdminFooter from '../admin-footer-component/adminFooter';

import AdminHeader from '../adminheader'

// var count =0;
class BookAdmin extends Component {
    componentWillMount() {
        requireAuth(window.location.href)
    }

    render() {
  
        return (

            <div>


                <AdminHeader />


               <header id="header" style={{	backgroundColor:'#333333'}}>

                    <div className="conatainer">
                        <div className="row">
                            <div className="col-md-10" style={{}}>
                                <h3
                                    className="dd"
                                    style={{
                                        textAlign: "left",marginTop:"7px",marginLeft:"2%"
                                    }}>
                                    <span className="fa fa-cog" aria-hidden="true"></span>DashBoard 
                                    <small> Manage Books</small>
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
                                        style={{color:'white',backgroundColor:"#18906f",marginTop:"0px", height : "33px" }}>
                                        Manage Content
                                        <span className="caret" /></button>

                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link to="/bookadd">
                                        <a class="dropdown-item" href="!#">Add Book(s)</a>
                                        </Link>
                                        <Link to="/bookedit">
                                        <a class="dropdown-item" >Edit Book(s)</a>
                                        </Link>
                                        <Link to="/manageuser">

                                        <a class="dropdown-item" >Manage User(s)
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
                            <li className="active" style={{color : "black", fontSize:"20px"}}><b>DashBoard</b></li>
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
                                    <h5 className="card-header">Books Overview</h5>
                                    <div className="card-body">

                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="fu1">
                                                    <SearchAdmin />
                                                  
                                                </div>
                                            </div>

                                          

                                           

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <br /><br />
            <AdminFooter />
            

<div>


       

      </div>






            </div>



                
        


        )
        
    }
    

}

export default BookAdmin;