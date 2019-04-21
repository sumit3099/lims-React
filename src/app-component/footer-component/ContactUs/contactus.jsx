import React, { Component } from 'react';
import Footer from '../footer.jsx';
import Header from '../../header-component/header';
import './contactus.css';
// import $ from 'jquery';
import { requireAuth } from '../../../app-component/isLoggedIn';


export default class ContactUs extends Component {

    componentWillMount() {
        requireAuth(window.location.href)
    }
    componentDidMount() {

    }
    render() {
        return (
            <div style={{ background:'rgb(239, 226, 234)  '}}>
      
      <div style={{ background:'rgb(239, 226, 234)  '}}>
    
      
<Header />

<br />
  
  <div class="contact_us" style={{textAlign : "left"}}>
    <div class="contact_us_fon">
    <div class="contact_us_left">
      
      <div class="contact_us_big_text">
           <span class="contact_us_big_text">contact <span class="red_text">us</span></span>
      </div>
      
      <div class="contact_us_small_text adress"> Global Village, RVCE Post, Mysore Road, Bengaluru, Karnataka 560059</div>
      <div class="contact_us_small_text phone_number"> Phone: 080670 64000</div>
      <div class="contact_us_small_text mail"> help@mindtree.com</div>    
    </div>
    
    
    <div class="contact_us_right">
      
      <div class="contact_us_icons">
        <a href="!#"><div class="icon icon_facebook"></div></a> 
        <a href="!#"><div class="icon icon_twitter"></div></a> 
        <a href="!#"><div class="icon icon_google_plus"></div></a> 
        <a href="!#"><div class="icon icon_linkedin"></div></a> 
      </div>   
      
    </div>
    </div>
  </div>
  

  
 <br /><br />
    
    
    <Footer />



 </div>
 
 </div>
       

                )
    }
}