import React,{Component} from 'react';
import {UserBooks}from './borrowedBook'
import {connect} from 'react-redux';
// import axios from 'axios';
// import {email,mid} from '../../login-component/login'
// import {email} from '../../login-component/login'
import Pbooks from '../../admin-component/PreferredBooks/PrefferdBooks'
// var req = require('request');
// import {BrowserRouter,Route,Link } from 'react-router-dom';
let id;
class BorrowedSlider extends Component
 { 
   

 render()
 {
     let bbooks=this.props.bbooks;
  
        let outputs=<div>
        <h5 className="borrowedText" style={{textAlign:'center',color:"rgb(31, 30, 88)"}}>You haven't borrowed any books yet!</h5>
        </div>
        if(bbooks!==null) {
        if(bbooks.length!==0)
        {
            outputs=<UserBooks key={id} list={bbooks}/>;
        }
        }
        else window.location = '/#/'
     return(
         <div className="mt-4">
             <div className="contained" >
                <h5 className="card-header yoyo" style={{ backgroundColor: "rgb(31, 30, 88)", color: "white" }}>What's New</h5>
                <Pbooks />
            </div>
    <div className="contained mt-4">
        <ol className="breadcrumb" style={{backgroundColor:'	rgb(31, 30, 88)', color : "white"}}>
        <h5>Books to be returned/renewed <span id="openHome" onClick={(e)=>{e.preventDefault(); window.location='/#/'}} style={{float:'right',cursor:'pointer',paddingLeft:'70px'}}>x</span> </h5>
        </ol>
     {outputs}
    </div>
    </div>
     );
 }

}
function mapStateToProps(state) {
    return {
        bbooks: state.bbooks
    };
}
export default connect(mapStateToProps)(BorrowedSlider);

