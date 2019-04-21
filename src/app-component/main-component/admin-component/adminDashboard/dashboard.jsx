import React, { Component } from 'react';
// import axios from 'axios';
import './dashboard.css';
import DashBoardStats from '../admin-stats/adminstats'
import '../../../App.css'
import AdminFooter from '../admin-footer-component/adminFooter';

import { Link } from 'react-router-dom';
// import { UserBooks } from './../borrowedBooks';
import { requireAuth } from '../../../isLoggedIn.js'

import AdminHeader from '../adminheader'

var count = 0;
class DashBoard extends Component {
    constructor() {
        super();

        this.state = {
            user: [],
            output: [],
            display: []
        }
    }
    componentWillMount() {
        requireAuth(window.location.href)

        fetch('https://lims-project-dd085.firebaseio.com/users.json', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ user: Object.values(res) });

            })

        fetch('https://lims-project-dd085.firebaseio.com/books.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ display: res });

            })
    }

    componentDidMount() {
    }

    render() {
        window.users = this.state.user;
        var booksum=0;
        Object.values(JSON.parse(localStorage.getItem('books'))).map((book=>{
            booksum=booksum+parseInt(book.copies);
        }));
        window.bookies = this.state.display;
        let booksnum =  booksum;
        let values = window.users.length;
        count = 0;
        const outputs = window.users
            .map((result) => {
                count = count + 1;

                return (
                    <tr>
                        <td style={{ textAlign: 'left' }}>{result.name}<span class="badge  badge-pill badge-warning ml-2">{result.borrowedBooks.length}</span></td>
                        <td style={{ textAlign: 'left' }}>{result.email}</td>
                        <td style={{ textAlign: 'left' }}>{result.mid}</td>
                        <td style={{ textAlign: 'left' }}>{result.role}</td>

                        {/*<td style={{textAlign:'left'}}>{result.borrowedbooks}</td>*/}
                    </tr>

                );
            })

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
                                        textAlign: "left", marginTop: "7px", marginLeft : "2%"
                                    }}>
                                    <span className="fa fa-cog" aria-hidden="true"></span>DashBoard
                                    <small> Manage LiMS</small>
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
                                        <a class="dropdown-item">Add Book(s)</a>
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
                            <li
                                className="active"
                                style={{
                                    color: "black",
                                    fontSize: "20px"
                                }}>
                                <b>DashBoard</b>
                            </li>
                        </ol>
                    </div>
                </section>


                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <DashBoardStats />

                        </div>
                        <div className="col-md-9">

                            <div className="card">
                                <h5 className="card-header">Library Overview</h5>
                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-3">
                                            <div className="fu1">
                                                <div className="card">

                                                    <div className="card-block">
                                                        <h2>
                                                            <span className="fa fa-user" aria-hidden="true"></span>
                                                            {values}
                                                        </h2>
                                                        <h4>
                                                            Users
                                                            </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="fu">
                                                <div className="card">
                                                    <div className="card-block">
                                                        <h2>
                                                            <span className="fa fa-list" aria-hidden="true"></span>
                                                            2
                                                            </h2>
                                                        <h4>
                                                            Edits
                                                            </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="fu">
                                                <div className="card">
                                                    <div className="card-block">
                                                        <h2>
                                                            <span className="fa fa-pencil" aria-hidden="true"></span>{booksnum}
                                                        </h2>
                                                        <h4>
                                                            Books
                                                            </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="fu2">
                                                <div className="card">
                                                    <div className="card-block">
                                                        <h2>
                                                            <span className="fa fa-globe" aria-hidden="true"></span>
                                                            14
                                                            </h2>
                                                        <h4>
                                                            Visitors
                                                            </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="mana">
                                <div class="card">
                                    <div class="card-header">
                                        Recent Users</div>
                                    <div class="card-block">

                                        {/*<table class="table table-hover table-responsive ">
                                                <thead>
                                                    <tr>
                                                        <th style={{textAlign:'center'}}>User Name</th>
                                                        <th style={{textAlign:'center'}}>Email</th>
                                                        <th style={{textAlign:'center'}}>MID</th>
                                                        <th style={{textAlign:'center'}}>Preferenece(s)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {outputs}

                                                </tbody>
                                            </table>*/}

                                        <div className="row">
                                            <div className="col-md-1" />
                                            <div className="col-md-10">

                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ textAlign: 'left' }}>User Name</th>
                                                                <th style={{ textAlign: 'left' }}>Email</th>
                                                                <th style={{ textAlign: 'left' }}>MID</th>
                                                                <th style={{ textAlign: 'left' }}>Role</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody >
                                                            {outputs}
                                                        </tbody>
                                                    </table>
                                                </div>



                                            </div>

                                            <div className="col-md-1" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br /><br />


                    <div>



                    </div>

                </div>
                <AdminFooter />

            </div>

        )

    }

}

export default DashBoard;