import React, { Component } from 'react';
import './login.css';
import ReactDOM from 'react-dom';
import '../../App.css';
import '../../header-component/header.css'
import App from '../../../app-component/App.jsx';
// import Rx from 'rxjs/Rx';
// import Header from '../../header-component/header';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import { requireAuth } from '../../isLoggedIn.js'
var req = require('request');
// import Form from 'react-validation/build/form';
// import Input from 'react-validation/build/input';
export var email, mid;


class Login extends Component {
    constructor() {

        super();
        var Backlen = window.history.length;
        window.history.go(-Backlen);
        var islogin="";
        var allUsers : [];
        window.location.href = 'http://localhost:3000/#/login'
      
        fetch('https://lims-project-dd085.firebaseio.com/users.json',
        // fetch('http://localhost:3005/books/getBooks',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((res)=>res.json()).then((res)=>
          {
          this.allUsers=res;
        })

    }
    state =
    {
        display: [],
        message: '',
        flag:false
    }
    componentWillMount() {
        requireAuth(window.location.href)
    }

    handleLogin = (e) => {
        e.preventDefault();
          for (var key in this.allUsers) {
           
            
            if(this.allUsers[key].mid === document.getElementById('mid').value&&
            this.allUsers[key].password === document.getElementById('password').value){
                localStorage.setItem('userId',JSON.stringify(key));
            }
            // skip loop if the property is from prototype
          }
          this.allUsers=Object.values(this.allUsers);
var user= this.allUsers.filter(function(users) {  
    
    return (users.mid === document.getElementById('mid').value&&
users.password === document.getElementById('password').value) });

        fetch('https://lims-project-dd085.firebaseio.com/books.json',
     
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((res)=>res.json()).then((res)=>
          {
            window.display=res
            localStorage.setItem('books',res)
        });
  if(user.length!=1)
        {
            this.islogin="sorry User Doesnt Exist";
            this.forceUpdate();
        }
        else{
            window.location='http://localhost:3000/#/';
         
            localStorage.setItem('limsuser',JSON.stringify(user[0]));
            window.location.reload();

           
 }
    }

    render() {


        function handleClick(e) {
            e.preventDefault();
            var loginWrapper = document.getElementById('lw');
            return loginWrapper.classList.toggle('open');
        }
        return (

            <div className="setColor" >




                <div className="login-wrapper" id="lw">
                    <div className="login-left">
                        <img src="https://krysiacanvindotorg.files.wordpress.com/2013/02/janko-ferlic-174927.jpg" alt="" onClick={handleClick}></img>
                        <div className="header" onClick={handleClick} style={{ fontWeight: "2000px" }}><b>Click Here to Enter</b></div>
                    </div>   
                    <div className="login-right">
                   
                    <div><h1 class="welcome-heading">Welcome to Mindtree</h1>
        <div class="login-page">
        <div class="form">
        <h3 class ="library-heading">Library Management System</h3>
          <form class="login-form">
            <input type="text" placeholder="MID" id="mid"/>
            <input type="password" placeholder="password" id ="password"/>
            <button onClick={this.handleLogin}>login</button>
            <p class="error-message ">{this.islogin}</p>
          </form>
      </div>  </div>
      </div>;
                           
                    </div>
                </div>

            </div>

        );
    }
}



export default Login;