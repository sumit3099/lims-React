import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import'./PrefferedBooks.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { css } from 'glamor'
// eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify';
import {getDates} from '../../../dates';
import {borrowDate, returnDate} from '../../../dates';
import requestBook from '../../../mongo/requestBook'
import returnBook from '../../../mongo/returnBook'
import {storeBbooks} from '../../../../state/action/bbooksAction'
import {addWishlist} from '../../../mongo/addWishlist';
import {storeWbooks} from '../../../../state/action/wbooksAction'
import {removeWishlist} from '../../../mongo/removeWishlist'
// eslint-disable-next-line
let bbooks;
// let test=()=>{
//     var val=5;
//     return val;
// }
class EachPrefferedCard extends Component{
    constructor(props)
    {
        super(props);
        getDates();
        let reqVal=true
        let wishVal=true
        // if(props.data.length!==0){
        // //console.log(("called")
        // }
        // //console.log((props.data)
        // //console.log((props.data)
        // bbooks=storeBbooks.getState().bbooks;
        // //console.log((bbooks)
            // alert(window.bbooks.length);
            // //console.log((props.data.length)
            if( props.Bdata!==null && props.Bdata.length!==0){
                // eslint-disable-next-line
                 props.Bdata.map(res=>{
                    //  //console.log((res)
            if(res.isbn===this.props.item.isbn){   
                // //console.log(("found")
            reqVal=false;
            }
        })
            }
            if(props.Wdata!==null && props.Wdata.length!==0){
                // eslint-disable-next-line
                 props.Wdata.map(res=>{
                    //  //console.log((res)
            if(res.isbn===this.props.item.isbn){   
                // //console.log(("found")
            wishVal=false;
            }
        })
            }
        this.handle=this.handle.bind(this);
        this.changeToFilled=this.changeToFilled.bind(this);
        // requestBook
        // this.requestBook=this.requestBook.bind(this);
        this.state={
            wishlistIcon:wishVal,
            requestIcon:reqVal
        }
    }

    handle(){
        window.selected=this.props.item
        window.showDetails=true;
        window.location=`/#/details/${this.props.item.isbn}`
        // document.getElementById('detail').click();
        window.setClickProps="prefferedDetailsCross"
    }
    changeToFilled=()=>
    {
        if(navigator.onLine){
            // eslint-disable-next-line
        var items=new Object();
        items.isbn=this.props.item.isbn;
        items.title=this.props.item.title;
        items.author=this.props.item.author;
        items.category=this.props.item.category;
        items.publisher=this.props.item.publisher;
        items.rating=this.props.item.rating;
        items.url=this.props.item.url;
        items.description="";
        // //console.log((items);
        (async function(){
                    var data=await addWishlist(items);
                    //console.log(("data")
                //console.log((data);
                this.props.storeWbooks(data)
                // var newD=data.json();
            }).bind(this)()

        // addWishlist(items);
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
        // removeWishlist(this.props.item.isbn);
        if(navigator.onLine){
        (async function(){
                    var data=await removeWishlist(this.props.item.isbn);
                    //console.log(("data")
                //console.log((data);
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
        console.log('inside each preferred');
        // let num=test();
        // alert("in")
        // alert(num);
        if(navigator.onLine){
        if(this.props.bbooks.length<4){
            // eslint-disable-next-line
            let bookAdded=new Object();
                bookAdded.isbn=this.props.item.isbn;
                bookAdded.title=this.props.item.title;
                bookAdded.author=this.props.item.author;
                bookAdded.publisher=this.props.item.publisher;
                bookAdded.url=this.props.item.url;
                bookAdded.rating=this.props.item.rating;
                bookAdded.borrowedDate=borrowDate;
                bookAdded.returnDate=returnDate;
                bookAdded.isRenewed="false"; 
                (async function(){
                    var data=await requestBook(bookAdded);
                //console.log((data.data);
                this.props.storeBbooks(data.data)
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
                var data=await returnBook(this.props.item.isbn);
                //console.log((data.data);
                console.log(data);
                localStorage.setItem('borrowedBooks',JSON.stringify(data));
                console.log(data);
                this.props.storeBbooks(localStorage.setItem('borrowedBooks',JSON.stringify(data)));
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
        // let a=<ReturnBook/>        
        // //console.log((this.props.data)
        //res=this.props.item;
    return (
        <div
            className="mx-auto col-lg-2 col-md-4 col-sm-6 col-xs-12">            
            <div
                className="card-img particular mx-auto"
                //  onClick={()=>this.handle(res)}
                style={{
                    height:"13rem", width:"160px"
            }}>
                <img
                    className="mx-auto"
                    alt=""
                    src={this.props.item.url}
                    height="160px"
                    width="100%"/>
                    <div className="card-block card-text" style={{width:"160px", fontSize:"14px"}}>
                    {this.props.item.title}
                    </div>
                <div className="overlay" style={{backgroundColor : "rgba(97,65,38,0.9)"}} onClick={this.handle}>
                    <div className="text container-fluid" style={{fontSize:'13px'}}>
                        <b>{this.props.item.title}</b><br/>
                        <b>Author :
                        </b>
                        {this.props.item.author}<br/>
                        <b>Category :
                        </b>
                        {this.props.item.category}<br/> 
                    
                        <span className="ml-2">{[1, 2, 3, 4, 5]
                            // eslint-disable-next-line
                            .map(d => {
                            if (this.props.item.rating >= d) 
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
                {this.state.wishlistIcon?<span onClick={this.changeToFilled} className="fa fa-heart-o" style={{color:'#CD853F'}} title="Click to add to wishlist"></span>:<span onClick={this.changeToEmpty} className="fa fa-heart" style={{color:'#CD853F'}} title="Click to remove from wishlist"></span>}
                </div>
                </div>
                <div className="requestOverlay" style={{backgroundColor : "white"}} >
                <div className="requestText container-fluid" style={{fontSize:'20px'}}>
                {this.state.requestIcon?<span onClick={this.changeToUndo} className="fa fa-plus-circle" style={{color:'#CD853F', marginLeft:'30px'}} title="Click to request"></span>: <span onClick={this.changeToRequest} className="fa fa-undo" style={{color:'#CD853F', marginLeft:'30px'}} title="Click to return"></span>}
                </div>
                </div>
            </div>      
        </div>
    );
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
export default connect(mapStateToProps,matchDispatchToProps)(EachPrefferedCard);
