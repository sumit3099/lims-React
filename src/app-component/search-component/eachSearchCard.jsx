import React, {Component} from 'react';
// import {processedData} from './Search';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
 import {getDates} from '../dates';
import {borrowDate, returnDate} from '../dates';
import {storeBbooks} from '../../state/action/bbooksAction'
import {storeWbooks} from '../../state/action/wbooksAction'
import requestBook from '../mongo/requestBook'
import returnBook from '../mongo/returnBook'
import {addWishlist} from '../mongo/addWishlist';
import {removeWishlist} from '../mongo/removeWishlist'
// import $ from 'jquery';
// import axios from 'axios';
// import {Link} from 'react-router-dom';
import './Search.css';
// import {
//     search,
//     sortTitle,
//     sortAuthor,
//     sortPublish,
//     sortRating,
//     selectFilter
// } from './Search'
// import store from '../../state/store/store.js'
// eslint-disable-next-line
import {ToastContainer, toast} from 'react-toastify';
import {css} from 'glamor'
export var book,
    notify = 0;
// let users,     books;
export var changeNotify = () => {
    notify = 0;
}
class EachSearchCard extends Component {
    constructor(props) {
        getDates();
        super(props);
        let reqVal = true;
        let wishVal = true;
        if (this.props.bbooks !== null && this.props.bbooks.length !== 0) {
            this
                .props
                .bbooks
                // eslint-disable-next-line
                .map(res => {
                    //  //console.log((res)
                    if (res.isbn === this.props.eachValue.isbn) {
                        // //console.log(("found")
                        reqVal = false;
                    }
                })
        }
        if (this.props.wbooks !== null && this.props.wbooks.length !== 0) {
            this
                .props
                .wbooks
                // eslint-disable-next-line
                .map(res => {
                    //  //console.log((res)
                    if (res.isbn === this.props.eachValue.isbn) {
                        // //console.log(("found")
                        wishVal = false;
                    }
                })
        }
        this.state = {
            wishlistIcon: wishVal,
            requestIcon: reqVal
        }
    }
    handle(res) {
        window.selected = res;
        window.showDetails = true;
        window.location=`/#/details/${res.isbn}`
        // document.getElementById('detail').click();
        window.setClickProps = "searchDetailsCross"
    }

    changeToFilled = () => {
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
        // //console.log((items);
        (async function(){
                    var data=await addWishlist(items);
                    //console.log(("data")
                //console.log((data);
                this.props.storeWbooks(data)
                // var newD=data.json();
            }).bind(this)()
        this.setState({wishlistIcon: false});
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
    changeToEmpty = () => {
        // alert("in")
        if(navigator.onLine){
        (async function(){
                    var data=await removeWishlist(this.props.eachValue.isbn);
                    //console.log(("data")
                //console.log((data);
                this.props.storeWbooks(data)
                // var newD=data.json();
            }).bind(this)()
        this.setState({wishlistIcon: true});
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
    changeToUndo = () => {
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
    changeToRequest = () => {
        if(navigator.onLine){
        (async function(){
                var data=await returnBook(this.props.eachValue.isbn);
                localStorage.setItem('borrowedBooks',JSON.stringify(data));
                //console.log((data.data);
                this.props.storeBbooks(data)
            }).bind(this)()
        this.setState({requestIcon: true});
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
        return (
            <div
                key={this.props.eachValue.isbn}
                className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-3 mb-3">

                <div
                    id={this.props.eachValue.isbn}
                    className="card particular"
                    style={{
                    width: '200px',
                    height: '16rem',
                    paddingBottom: '0px'
                }}>
                    <img
                        className="card-img-top"
                        src={this.props.eachValue.url}
                        alt="not available"
                        style={{
                        padding: "0px"
                    }}
                        height="200vh"/> {/* {this.props.eachValue.details.rating} <span
                                                className="fa fa-star"
                                                style={{
                                                color: '#FFD700',
                                                fontSize:'13px',
                                                paddingTop:"0px"
                                            }}></span><br/>*/}
                    <div className="card-block card-text">
                        {this.props.eachValue.title}
                    </div>
                    <div
                        className="overlay"
                        style={{
                        backgroundColor: "rgba(97,65,38,0.9)"
                    }}
                        onClick={() => this.handle(this.props.eachValue)}>
                        <div
                            className="text container-fluid"
                            style={{
                            fontSize: '15px'
                        }}>
                            {this.props.eachValue.title}<br/>
                            <b>Author:
                            </b>
                            {this.props.eachValue.author}<br/>
                            <b>Category:
                            </b>
                            {this.props.eachValue.category}<br/>
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
                            <br/>
                        </div>
                    </div>
                    <div
                        className="buttonOverlay"
                        style={{
                        backgroundColor: "white"
                    }}>
                        <div
                            className="buttonText container-fluid"
                            style={{
                            fontSize: '20px'
                        }}>
                            {this.state.wishlistIcon
                                ? <span
                                        onClick={this.changeToFilled}
                                        className="fa fa-heart-o"
                                        style={{
                                        color: '#18906f'
                                    }} title="Click to add to wishlist"></span>
                                : <span
                                    onClick={this.changeToEmpty}
                                    className="fa fa-heart"
                                    style={{
                                    color: '#18906f'
                                }} title="Click to remove from wishlist"></span>}
                        </div>
                    </div>
                    <div
                        className="requestOverlay"
                        style={{
                        backgroundColor: "white"
                    }}>
                        <div
                            className="requestText container-fluid"
                            style={{
                            fontSize: '20px'
                        }}>
                            {this.state.requestIcon
                                ? <span
                                        onClick={this.changeToUndo}
                                        className="fa fa-plus-circle"
                                        style={{
                                        color: '#18906f',
                                        marginLeft: '30px'
                                    }} title="Click to request"></span>
                                : <span
                                    onClick={this.changeToRequest}
                                    className="fa fa-undo"
                                    style={{
                                    color: '#18906f',
                                    marginLeft: '30px'
                                }} title="Click to return"></span>}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {bbooks: state.bbooks, books: state.books, wbooks: state.wbooks};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        storeBbooks: storeBbooks,
        storeWbooks: storeWbooks
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(EachSearchCard);