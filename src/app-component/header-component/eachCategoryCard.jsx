import React,{Component} from 'react';
import './bootheader.css';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { css } from 'glamor'
// eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify';
import {bindActionCreators} from 'redux';
 import {getDates} from '.././dates';
import {borrowDate, returnDate} from '.././dates';
import requestBook from '../mongo/requestBook'
import returnBook from '../mongo/returnBook'
import {storeBbooks} from '../../state/action/bbooksAction'
import {storeWbooks} from '../../state/action/wbooksAction'
// import {controller,handleController} from './bootheader';
import {addWishlist} from '../mongo/addWishlist';
import {removeWishlist} from '../mongo/removeWishlist'
// import EachCategory from './../main-component/admin-component/topRatedBooks/eachCategory';
let handle=(data)=>{
window.selected=data;
window.location=`/#/details/${data.isbn}`
window.showDetails=true;
// document.getElementById('detail').click();
 window.setClickProps="categoryDetailsCross"
}

 class EachCategoryCard extends Component
{
    constructor(props)
    {
        super(props);
        getDates();
        let reqVal=true;
        let wishVal=true;
        if(this.props.bbooks!==null && this.props.bbooks.length!==0){
                 this.props.bbooks
                 .map(res=>{
            if(res.isbn===this.props.eachValue.isbn){   
            reqVal=false;
            }
        })
            }
            if(this.props.wbooks!==null && this.props.wbooks.length!==0){
                 this.props.wbooks
                 // eslint-disable-next-line
                 .map(res=>{
            if(res.isbn===this.props.eachValue.isbn){   
            wishVal=false;
            }
        })
            }
        this.state={
        wishlistIcon:wishVal,
        requestIcon:reqVal,
    }
}

    changeToFilled=()=>
    {
        if(navigator.onLine){
            // eslint-disable-next-line
        var items=new Object();
        items.isbn=this.props.eachValue.isbn;
        items.title=this.props.eachValue.title;
        items.author=this.props.eachValue.author;
        items.category=this.props.eachValue.category;
        items.publisher=this.props.eachValue.publisher;
        items.rating=this.props.eachValue.rating;
        items.url=this.props.eachValue.url;
        items.description="";
        (async function(){
                    var data=await addWishlist(items);
                this.props.storeWbooks(data)
                // var newD=data.json();
            }).bind(this)()
        this.setState({wishlistIcon:false});
        toast.success("Added to WishList !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "brown"
                })
            });
    }
    else{
        toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "blue"
                })
            });
    }
    }
    changeToEmpty=()=>
    {
        if(navigator.onLine){
        (async function(){
                    var data=await removeWishlist(this.props.eachValue.isbn);
                this.props.storeWbooks(data)
                // var newD=data.json();
            }).bind(this)()
        this.setState({wishlistIcon:true});
        toast.success("Removed from WishList !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "brown"
                })
            });
    }
        else{
        toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "blue"
                })
            });
    }
    }
    changeToUndo=()=>
    {
        if(navigator.onLine){
         if(this.props.bbooks.length<4){
             // eslint-disable-next-line
            let bookAdded=new Object();
                bookAdded.isbn=this.props.eachValue.isbn;
                bookAdded.title=this.props.eachValue.title;
                bookAdded.author=this.props.eachValue.author;
                bookAdded.publisher=this.props.eachValue.publisher;
                bookAdded.url=this.props.eachValue.url;
                bookAdded.rating=this.props.eachValue.rating;
                bookAdded.borrowedDate=borrowDate;
                bookAdded.returnDate=returnDate;
                bookAdded.isRenewed="false"; 
                (async function(){
                    var data=await requestBook(bookAdded);
                this.props.storeBbooks(data)
                // var newD=data.json();
            }).bind(this)()
        this.setState({requestIcon:false});
          toast.success("Successfully Requested !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "brown"
                })
            });
    }
    else{
        toast.warn("Oops! You Cannot borrow more books !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "red"
                })
            });
    }
        }
        else{
        toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "blue"
                })
            });
        }
    }
    changeToRequest=()=>
    {
        if(navigator.onLine){
        (async function(){
                var data=await returnBook(this.props.eachValue.isbn);
                localStorage.setItem('borrowedBooks',JSON.stringify(data))
                this.props.storeBbooks(data)
            }).bind(this)()
        this.setState({requestIcon:true});
        toast.warn("Successfully Returned !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "brown"
                })
            });
        }
        else{
        toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "blue"
                })
            });
        }
    } 

render()
{
    return(
                        <div
                className="col-lg-2 col-md-4 col-sm-4 col-xs-4 mt-2 mb-3">
            
        <div
                className="card-img particular mx-auto"
                id={this.props.eachValue.isbn}
                style={{
                    height:"13rem", width:"160px"
            }}>
            
                <img
                    alt=""
                    className="mx-auto"
                    src={this.props.eachValue.url}
                    height="160px"
                    width="100%"/>
                   <div className="card-block card-text" style={{width:"160px", fontSize:"14px"}}>
                    {this.props.eachValue.title}
                    </div>
                     <div className="overlay" style={{backgroundColor: "rgba(97,65,38,0.9)"}} onClick={()=>handle(this.props.eachValue)}>
                    <div className="text container-fluid" style={{fontSize:'13px'}}>
                        <b>{this.props.eachValue.title}</b><br/>
                        <b>Author :
                        </b>
                        {this.props.eachValue.author}<br/>
                        <span className="ml-2">{[1, 2, 3, 4, 5]
                            // eslint-disable-next-line
                            .map(d => {
                            if (this.props.eachValue.rating >= d) 
                                return <span
                                    class="fa fa-star"
                                    style={{
                                    color: '#ffd700',
                                    fontSize: '5px'
                                }}></span>
                        })}</span>
                    </div>
                </div>
                <div className="buttonOverlay" style={{backgroundColor : "white"}} >
                <div className="buttonText container-fluid" style={{fontSize:'20px'}}>
                {this.state.wishlistIcon?<span onClick={this.changeToFilled} className="fa fa-heart-o" style={{color:'#18906f'}} title="Click to add to wishlist"></span>:<span onClick={this.changeToEmpty} className="fa fa-heart" style={{color:'#18906f'}} title="Click to remove from wishlist"></span>}
                </div>
                </div>
                <div className="requestOverlay" style={{backgroundColor : "white"}} >
                <div className="requestText container-fluid" style={{fontSize:'20px'}}>
                {this.state.requestIcon?<span onClick={this.changeToUndo} className="fa fa-plus-circle" style={{color:'#18906f', marginLeft:'30px'}} title="Click to request"></span>: <span onClick={this.changeToRequest} className="fa fa-undo" style={{color:'#18906f', marginLeft:'30px'}} title="Click to return"></span>}
                </div>
                </div>
                </div>
</div>

    )

    
}
}
function mapStateToProps(state) {
    return {
        bbooks: state.bbooks,
        books: state.books,
        wbooks:state.wbooks
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({storeBbooks: storeBbooks,storeWbooks:storeWbooks}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(EachCategoryCard);