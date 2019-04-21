import React, {Component} from 'react';
import './details.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {storeBbooks} from '../../state/action/bbooksAction'
import {storeWbooks} from '../../state/action/wbooksAction'
import {storeReviews} from '../../state/action/reviewAction';
import '../search-component/Search.css';
import {getReview} from '.././mongo/getReview'
import {css} from 'glamor'
import {toast} from 'react-toastify';
import Reviews from './reviews';
import requestBook from '.././mongo/requestBook'
import returnBook from '.././mongo/returnBook'
import renewBook from '.././mongo/renew'
import {addWishlist} from '.././mongo/addWishlist'
import {removeWishlist} from '.././mongo/removeWishlist'
import {getDates} from '../dates'
import {borrowDate, returnDate} from '../dates'
let book,
stars=0,
    thisBook=null,bookDetails,bookDetailIsbn,borrowShow;

class Details extends Component {
    constructor(props) {
        super(props);
        getDates();
        borrowShow="";
        bookDetailIsbn = window.location.hash.split('/')[2];
        bookDetails = Object.values(JSON.parse(localStorage.getItem('books'))).filter(function(book) { return book['isbn'] === bookDetailIsbn })
        let check=0;
        var allBbooks,allWbooks;
    
      
         if(this.props.bbooks===null){
             var test=JSON.parse(localStorage.getItem('borrowedBooks'));
             allBbooks=test;
             
         }
         else{
            allBbooks=this.props.bbooks
         }
         if(this.props.wbooks===null){
             var test1=JSON.parse(localStorage.getItem('wishlist'));
             allWbooks=test1;
         }
         else{
            allWbooks=this.props.wbooks
         }
         
        this.props.storeReviews(null);
        (async function () {
            var values = await getReview(bookDetails[0].isbn);
            if(values===null){
                this.props.storeReviews(null)
            }
            else{
              
                 this
                .props
                .storeReviews(values)
                check=1;
            }
            if(check===1){
            this.state={
                flag:1
            }
        }
        }).bind(this)()
        let reqVal = true,
            renewVal = false,
            wishVal = true;
        let today = borrowDate;
        let days = today.split("/");
        today = days[1] + "/" + days[0] + "/" + days[2];
        if (allBbooks !== null && allBbooks !== 0) {
 
            allBbooks
                .map(res => {
                    if (res.isbn === bookDetails[0].isbn) {
                        thisBook=res;
                        reqVal = false;
                            borrowShow=(<div style={{fontSize:"18px",color:"rgb(205,133,63)", fontWeight:"bold"}}>Borrowed On : {res.borrowedDate}<br/>Return By : {res.returnDate}</div>)
                        if (res.isRenewed === "false") {
                            let retDate = res.returnDate;
                            days = retDate.split("/");
                            retDate = days[1] + "/" + days[0] + "/" + days[2];
                            let date1 = new Date(today);
                            let date2 = new Date(retDate)
                            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (diffDays <= 2) {
                                renewVal = true;
                            }
                        }
                    }
                })
        }
        if (allWbooks !== null && allWbooks !== 0) {
            allWbooks
                .map(res => {
                    if (res.isbn === bookDetails[0].isbn) {
                        wishVal = false;
                    }
                })
        }
        this.state = {
            req: reqVal,
            wish: wishVal,
            flag:0,
            renew: renewVal,
            review:true
        };
    }
    request = () => {
        if (navigator.onLine) {
        if (this.props.bbooks.length < 4) {
            let bookAdded = new Object();
            bookAdded.isbn = bookDetails[0].isbn;
            bookAdded.title = bookDetails[0].title;
            bookAdded.author = bookDetails[0].author;
            bookAdded.publisher = bookDetails[0].publisher;
            bookAdded.url = bookDetails[0].url;
            bookAdded.rating = bookDetails[0].rating;
            bookAdded.borrowedDate = borrowDate;
            bookAdded.returnDate = returnDate;
            bookAdded.isRenewed = "false";
            thisBook=bookAdded;
            (async function () {
                var data = await requestBook(bookAdded);
                localStorage.setItem('borrowedBooks',JSON.stringify(data))
                this
                    .props
                    .storeBbooks(data)
            }).bind(this)()
             borrowShow=(<div style={{fontSize:"18px",color:"rgb(205,133,63)", fontWeight:"bold"}}>Borrowed On : {bookAdded.borrowedDate}<br/>Return By : {bookAdded.returnDate}</div>)
            this.setState({req: false})
        toast.success("Successfully Requested !!!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: css({background: "brown"})
                });
            } else {
                toast.warn("Oops! You Cannot borrow more books !!!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: css({background: "red"})
                });
            }
        } else {
            toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "blue"})
            });
        }
    }
    return = () => {
        if (navigator.onLine) {
        (async function () {
            var data = await returnBook(bookDetails[0].isbn);
            localStorage.setItem('borrowedBooks',JSON.stringify(data))
            this
                .props
                .storeBbooks(data)
        }).bind(this)()
        borrowShow="";
        this.setState({req: true})
         toast.warn("Successfully Returned !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "brown"})
            });
        } else {
            toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "blue"})
            });
        }
    }

    addWish = () => {
         if (navigator.onLine) {
        var items = new Object();
        items.isbn = bookDetails[0].isbn;
        items.title = bookDetails[0].title;
        items.author = bookDetails[0].author;
        items.category = bookDetails[0].category;
        items.publisher = bookDetails[0].publisher;
        items.rating = bookDetails[0].rating;
        items.url = bookDetails[0].url;
        items.description = "";
        (async function () {
            var data = await addWishlist(items);
            localStorage.setItem('wishlist',JSON.stringify(data))
            this
                .props
                .storeWbooks(data)
        }).bind(this)()
        this.setState({wish: false});
        toast.success("Added to WishList !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "brown"})
            });
        } else {
            toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "blue"})
            });
        }
    }

    removeWish = () => {
         if (navigator.onLine) {
        (async function () {
            var data = await removeWishlist(bookDetails[0].isbn);
            localStorage.setItem('wishlist',JSON.stringify(data))
            this
                .props
                .storeWbooks(data)
        }).bind(this)()
        this.setState({wish: true});
        toast.success("Removed from WishList !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "brown"})
            });
        } else {
            toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "blue"})
            });
        }
    }
    renew=()=>{
        if (navigator.onLine) {

        var tested = new Date();
        if(thisBook.isRenewed==="false"){
        var dates = thisBook
                            .returnDate
                            .split("/");
                        tested.setDate(dates[0]);
                        tested.setMonth(dates[1] - 1);
                        tested.setFullYear(dates[2]);
                        var newDate = new Date(tested.getTime() + (10 * 24 * 60 * 60 * 1000));
                        var dd1 = newDate.getDate();
                        var mm1 = newDate.getMonth() + 1; 
                        var yyyy1 = newDate.getFullYear();
                        thisBook.returnDate = dd1 + '/' + mm1 + '/' + yyyy1;
                        thisBook.isRenewed=true;
                        (async function () {
        borrowShow=(<div style={{fontSize:"18px",color:"rgb(205,133,63)", fontWeight:"bold"}}>Borrowed On : {thisBook.borrowedDate}<br/>Return By : {thisBook.returnDate}</div>)
            var data = await renewBook(thisBook);
            localStorage.setItem('borrowedBooks',JSON.stringify(data))
            this
                .props
                .storeBbooks(data)
        }).bind(this)()
        this.setState({
            renewVal:false
        })
        toast.success("Renewed !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "brown"})
            });
        }
        else{
            toast.error("You Cannot Renew Once More !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "blue"})
            });
        }
        } else {
            toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({background: "blue"})
            });
        }
    }
    render() {
        if(this.props.reviews===null){
            stars=(<div className="mt-3 ml-3" style={{
                                                        color: 'rgb(205,133,63)',
                                                        fontSize: '22px'
                                                    }}>There are no ratings</div>)
        }
        else{
            var rating=0,count=0;
            this.props.reviews.map(d=>{
                rating=rating + d.rating;
                count++;
            })
            var newRating=rating/count;
            newRating=Math.round( newRating * 10 ) / 10
            stars=<div>
            <h2 className="bold padding-bottom-7">{newRating}<small>/5</small></h2>
                                          {  [1, 2, 3, 4, 5].map(d => {
                                                if (newRating >= d) {
                                                    return <span
                                                        key={`category${bookDetails[0].isbn}`}
                                                        className="fa fa-star"
                                                        style={{
                                                        color: '#ffd700',
                                                        fontSize: '22px'
                                                    }}></span>}
                                            else{
                                                return <span
                                                        key={`category${bookDetails[0].isbn}`}
                                                        className="fa fa-star"
                                                        style={{
                                                        fontSize: '22px'
                                                    }}></span>
                                            }
                                            })}</div>
        }
        book = bookDetails[0];    
        if(book!==null && book!==undefined)
        return (
            <div className="mt-4" style={{
                backgroundColor: "rgb(239, 226, 234)"
            }}>
                <div className="contained">
                    <div className="carders">
                        <ol
                            className="breadcrumb"
                            style={{
                            backgroundColor: "rgb(31, 30, 88)",
                            color: "white",
                            height: "50px",
                            fontSize: "15px"
                        }}>
                            <h5 >{book.title}
                                <span
                                    id="openHome"
                                    style={{
                                    float: 'right',
                                    cursor: 'pointer',
                                    paddingLeft: '85px'
                                }}
                                    onClick={(e) => {
                                   e.preventDefault();
                                   window.history.back();
                                }}>x</span>
                            </h5>
                        </ol>
                        <div
                            className="aboveDiv">
                            <div className="wrapper row">
                                <div className="col-md-4 col-sm-6 col-xs-6 col-lg-4">
                                <img
                                        alt="Not Available"
                                        src={book.url}
                                        className="detailBook mx-auto"
                                        style={{
                                        
                                    }}/>
                                    <div className="mt-1 col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                    {this.state.req
                                            ? <button
                                                    className="btn details-btn col-md-5 col-sm-5 col-xs-5 col-lg-5"
                                                    style={{
                                                        borderColor: "rgb(205,133,63)", 
                                                        overflow:"hidden",
                                                }}
                                                    onClick={this.request}>
                                                    <div className="fa fa-plus-circle"></div>
                                                    <b>Request</b>
                                                </button>
                                            : <button
                                                className="btn details-btn col-md-5 col-sm-5 col-xs-5 col-lg-5"
                                                style={{
                                                    overflow:"hidden",
                                                borderColor: "rgb(205,133,63)"
                                            }}
                                                onClick={this.return}>
                                                <div className="fa fa-undo"></div>
                                                <b>Return</b>
                                            </button>}
                                            {this.state.wish
                                            ? <button
                                                    className="btn details-btn col-md-5 col-sm-5 col-xs-5 col-lg-5"
                                                    style={{
                                                        overflow:"hidden",
                                                    borderColor: "rgb(205,133,63)"
                                                }}
                                                    onClick={this.addWish}>
                                                    <div className="fa fa-heart-o fa-lg"></div>
                                                    <b>Add</b>
                                                </button>
                                            : <button
                                                className="btn details-btn col-md-5 col-sm-5 col-xs-5 col-lg-5"
                                                style={{
                                                    overflow:"hidden",
                                                borderColor: "rgb(205,133,63)"
                                            }}                                                onClick={this.removeWish}>
                                                <div className="fa fa-heart fa-lg"></div>
                                                <b>Remove</b>
                                            </button>}
                                    </div>
                                    <div className="col-md-12 mt-1 col-sm-12 col-xs-12 col-lg-12">
                                    {this.state.renew
                                            ? <button
                                                    className="btn details-btn col-md-10 col-sm-10 col-xs-10 col-lg-10"
                                                    onClick={this.renew}
                                                    style={{
                                                        overflow:"hidden",
                                                    borderColor: "rgb(205,133,63)",
                                                    width: "100%"
                                                }}>
                                                    <div className="fa fa-refresh"></div>
                                                    <b>Renew</b>
                                                </button>
                                            : ""}

                                    </div>
                                   <div className="col-md-12 mt-1 col-sm-12 col-xs-12 col-lg-12">
                                   {borrowShow}
                                   </div> 
                                </div>
                                <div className="details col-md-8 col-lg-8">
                                   <div className="rating-block">
                                   <h4 className="ml-4">Average User Rating</h4>
                                    <div className="rating">
                                        <div className="stars mt-3 ml-3">
                                            {stars}
                                        </div>
                                    </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                    <div className="col-md-3 col-lg-3 col-sm-3 col-lg-3"></div>
                                    <ul className="col-md-6 col-sm-6 col-xs-6 col-lg-6 ml-4 list-group">
                                        <li className="list-group-item">
                                            <b>ISBN :</b>
                                            {book.isbn}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Author :</b>
                                            {book.author}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Publisher :</b>
                                            {book.publisher}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Category :</b>
                                            {book.category}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Ratings :</b>
                                            {book.rating}
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>   
                        </div>   
                     <Reviews data={bookDetails[0]} revData={this.props.reviews}/>  
                    </div>
                </div>
            </div>
        )
        else if(book===null || book === undefined){
            return(
                window.location="/#/"
            )
        }
    }
}
function mapStateToProps(state) {
    return {bbooks: state.bbooks, books: state.books, wbooks: state.wbooks, reviews:state.reviews};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        storeBbooks: storeBbooks,
        storeWbooks: storeWbooks,
        storeReviews:storeReviews
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Details);