import React, { Component } from 'react';
import axios from 'axios';
import './adminlogin.css';
import Footer from '../../../footer-component/footer.jsx';
import $ from 'jquery';
import '../../../../logo.svg';
import '../../../App.css';
import { Link } from 'react-router-dom';
class AdminLogin extends Component {

componentDidMount() {

}


    render() {

        return (

            <div>

 <div className="loginpage">
	<div class="login">
		<div class="login-screen">
			<div class="app-title">
				<h1>Login</h1>
			</div>

			<div class="login-form">
				<div class="control-group">
				<input type="text" class="login-field" value="" placeholder="username" id="login-name" />
				<label class="login-field-icon fui-user" for="login-name"></label>
				</div>

				<div class="control-group">
				<input type="password" class="login-field" value="" placeholder="password" id="login-pass" />
				<label class="login-field-icon fui-lock" for="login-pass"></label>
				</div>
               
				<a class="login-link" href="#">Lost your password?</a>
			</div>
		</div>
	</div>
</div>

            </div>


        )
        
    }

}

export default AdminLogin;