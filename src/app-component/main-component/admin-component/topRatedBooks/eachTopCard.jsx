import React, {Component} from 'react';
import './topRated.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// eslint-disable-next-line
import {getDates} from '../../../dates';
import {css} from 'glamor'
// eslint-disable-next-line
import {ToastContainer, toast} from 'react-toastify';
import {borrowDate, returnDate} from '../../../dates';
import requestBook from '../../../mongo/requestBook'
import returnBook from '../../../mongo/returnBook'
import {storeBbooks} from '../../../../state/action/bbooksAction'
import {addWishlist} from '../../../mongo/addWishlist';
import {storeWbooks} from '../../../../state/action/wbooksAction'
import {removeWishlist} from '../../../mongo/removeWishlist'
// import {Link} from 'react-router-dom';
export class EachTopCard extends Component {
    constructor(props)
    {getDates();
        super(props);
        this.handle = this
            .handle
            .bind(this)
        let reqVal = true,
            wishVal = true;

        if (this.props.bbooks.length !== 0) {
            // eslint-disable-next-line
            this.props.bbooks.map(res => {

                    if(res.isbn === this.props.item.isbn) {
                        // alert("found") //console.log(("found")
                        reqVal = false;
                    }
                })
        }
        if (this.props.wbooks.length !== 0) {
            // eslint-disable-next-line

            this.props.wbooks.map(res => {
                    //  //console.log((res)
                    if (res.isbn === this.props.item.isbn) {
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
    handle = (res) => {
        window.selected = res;
        window.showDetails = true;
        window.location=`/#/details/${res.isbn}`
        // window.location = `/#/details/${JSON.stringify(res)}`
        // document.getElementById('detail').click();
        window.setClickProps = "topDetailsCross"
    }

    changeToFilled = () => {
        if (navigator.onLine) {
            // eslint-disable-next-line
            var items = new Object();
            items.isbn = this.props.item.isbn;
            items.title = this.props.item.title;
            items.author = this.props.item.author;
            items.category = this.props.item.category;
            items.publisher = this.props.item.publisher;
            items.rating = this.props.item.rating;
            items.url = this.props.item.url;
            items.description = "";
            (async function () {
                var data = await addWishlist(items);
                //console.log(("data")
                //console.log((data);
                this
                    .props
                    .storeWbooks(data)
                // var newD=data.json();
            }).bind(this)()
            this.setState({wishlistIcon: false});
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
    changeToEmpty = () => {
        if (navigator.onLine) {
            (async function () {
                var data = await removeWishlist(this.props.item.isbn);
                //console.log(("data")
                //console.log((data);
                this
                    .props
                    .storeWbooks(data)
                // var newD=data.json();
            }).bind(this)()
            this.setState({wishlistIcon: true});
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
    changeToUndo = () => {
        if (navigator.onLine) {

            if (this.props.bbooks.length < 4) {
                // eslint-disable-next-line
                let bookAdded = new Object();
                bookAdded.isbn = this.props.item.isbn;
                bookAdded.title = this.props.item.title;
                bookAdded.author = this.props.item.author;
                bookAdded.publisher = this.props.item.publisher;
                bookAdded.url = this.props.item.url;
                bookAdded.rating = this.props.item.rating;
                bookAdded.borrowedDate = borrowDate;
                bookAdded.returnDate = returnDate;
                bookAdded.isRenewed = "false";
                (async function () {
                
                    var data = await requestBook(bookAdded);

                    this
                        .props
                        .storeBbooks(data)
              
                }).bind(this)()
                this.setState({requestIcon: false});
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
    changeToRequest = () => {
        if (navigator.onLine) {
            (async function () {
                var data = await returnBook(this.props.item.isbn);
                //console.log((data.data);
                localStorage.setItem('borrowedBooks',JSON.stringify(data))
                this
                    .props
                    .storeBbooks(data)
            }).bind(this)()
            this.setState({requestIcon: true});
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

    render() {
        let res = this.props.item;
        return (
            <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 my-3">

                <div
                    className="card-img particular mx-auto"
                    id={this.props.isbn}
                    style={{
                    width: '150px'
                }}>

                    <div
                        className="card particular"
                        style={{
                        width: "160px",
                        height: "13rem"
                    }}>
                        <img className="card-img-top mx-auto" src={this.props.item.url} // src="x"
                            alt={`${this.props.item.title}`} height="160px" width="100%"/>
                        <div
                            className="card-block card-text"
                            style={{
                            width: "160px",
                            fontSize: "14px"
                        }}>
                            {this.props.item.title}
                        </div>
                        <div
                            className="overlay"
                            style={{
                            backgroundColor: "rgba(97,65,38,0.9)"
                        }}
                            onClick={() => this.handle(res)}>
                            <div
                                className="text container-fluid"
                                style={{
                                fontSize: '13px'
                            }}>
                                <b>{this.props.item.title}</b><br/>
                                <b>Author :
                                </b>
                                {this.props.item.author}<br/>
                                {// eslint-disable-next-line
                                <span className="ml-2">{[1, 2, 3, 4, 5].map(d => {
                                    if (this.props.item.rating >= d) 
                                        return <span
                                        className="fa fa-star"
                                            style={{
                                            color: '#ffd700',
                                            fontSize: '5px'
                                        }}></span>
                                })}</span>}
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
                                    }} title="Click to remove from wishlist"
                                    ></span>}
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
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {bbooks: state.bbooks, wbooks: state.wbooks};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        storeBbooks: storeBbooks,
        storeWbooks: storeWbooks
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(EachTopCard);