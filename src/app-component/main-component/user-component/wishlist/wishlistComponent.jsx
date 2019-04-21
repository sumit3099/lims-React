import React,{ Component } from 'react';
import WishedCard from './wishedBookCard'
import {connect} from 'react-redux';
// import './wishlist.css'

import Pbooks from '../../admin-component/PreferredBooks/PrefferdBooks'
class WishedBooks extends Component
{
    render()
    {
        let wishlist=this.props.wbooks;
        let x=<div>
        <h2 style={{textAlign:'center',color:"rgb(31, 30, 88)", fontSize : "20px"}}>You have no items in your wishlist. Start adding!!</h2><img className="wishedImage" alt="" src="https://static1.squarespace.com/static/56b46411356fb0307ba84bd3/t/57e980e2e4fcb54af2a38dc6/1474920680832/" />
        </div>
        if(wishlist!==null && wishlist.length!==0)
        {

        x=<div className="row mb-5">
        {wishlist.map(r=>{
            return(
                   <div className="col-lg-2 col-md-3 col-sm-6 col-xs-12 mt-4">                   
                    <WishedCard key={r.isbn} data={r}/>
                  </div>
                   );
        })}
        </div>
        }

        return(
            <div className="mt-4">

         <div className="contained" >
                <h5 className="card-header yoyo" style={{ backgroundColor: "rgb(31, 30, 88)", color: "white" }}>What's New</h5>
                <Pbooks />
            </div>
            <div className="contained mt-4">
        <ol className="breadcrumb" style={{backgroundColor : '	rgb(31, 30, 88)', color : "white"}}>
        <h5>My Wishlist<span onClick={(e)=>{e.preventDefault(); window.location="/#/"}} style={{float:'right',cursor:'pointer',paddingLeft:'70px'}}>x</span> </h5>
        </ol>
        
     {x}
    </div>
    </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        wbooks: state.wbooks
    };
}
export default connect (mapStateToProps)(WishedBooks);
