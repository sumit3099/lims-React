import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'glamor'
// eslint-disable-next-line
import {ToastContainer,toast} from 'react-toastify';
import {borrowDate, returnDate} from '../../../dates';
import requestBook from '../../../mongo/requestBook'
import returnBook from '../../../mongo/returnBook'
import {storeBbooks} from '../../../../state/action/bbooksAction'
import {storeWbooks} from '../../../../state/action/wbooksAction'
import {removeWishlist} from '../../../mongo/removeWishlist'

let handle = (data) => {
    window.selected = data;
    window.showDetails=true;
    window.location=`/#/details/${data.isbn}`
   // document.getElementById('detail').click();
    window.setClickProps="wishlistDetailsCross";
}
class WishedCard extends Component{
    constructor(props)
    {
        super(props);
        // eslint-disable-next-line
            let reqVal = true,wishVal = true;
        // console.log("top") console.log(props.bbooks)
        if (this.props.bbooks!==undefined&&this.props.bbooks.length !== 0) {
            this
                .props
                .bbooks
                // eslint-disable-next-line
                .map(res => {
                    //  console.log(res)
                    if (res.isbn === this.props.data.isbn) {
                        // alert("found") console.log("found")
                        // eslint-disable-next-line
                        reqVal = false;
                    }
                })
        }
        if (this.props.wbooks!==undefined && this.props.wbooks.length !== 0) {
            this
                .props
                .wbooks
                // eslint-disable-next-line
                .map(res => {
                    //  console.log(res)
                    if (res.isbn === this.props.data.isbn) {
                        // console.log("found")
                        // eslint-disable-next-line
                        wishVal = false;
                    }
                })
        }
        this.state={
         wishlistIcon:wishVal,
        requestIcon:reqVal,
    }
}
changeToRequest = () => {
        if (navigator.onLine) {
            (async function () {
                var data = await returnBook(this.props.data.isbn);
                localStorage.setItem('borrowedBooks',JSON.stringify(data));
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
    changeToEmpty = () => {
        if (navigator.onLine) {
            (async function () {
                var data = await removeWishlist(this.props.data.isbn);
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
                bookAdded.isbn = this.props.data.isbn;
                bookAdded.title = this.props.data.title;
                bookAdded.author = this.props.data.author;
                bookAdded.publisher = this.props.data.publisher;
                bookAdded.url = this.props.data.url;
                bookAdded.rating = this.props.data.rating;
                bookAdded.borrowedDate = borrowDate;
                bookAdded.returnDate = returnDate;
                bookAdded.isRenewed = "false";
                (async function () {
                    var data = await requestBook(bookAdded);
                    // console.log(data.data);
                    this
                        .props
                        .storeBbooks(data)
                    // var newD=data.json();
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
    render(){
    let res = this.props.data;
    return (
            <div
                className="card-img mx-auto particular"
                id={this.props.data.isbn}
                style={{
                height: "13rem",
                width: "160px"
            }}>
                <img
                    alt=""
                    className="mx-auto"
                    src={this.props.data.url}
                    height="160px"
                    width="100%"
                    />
                    <div className="card-block card-text" style={{width:"160px", fontSize:"14px"}}>
                    {this.props.data.title}
                    </div>
                <div
                    className="overlay"
                    style={{
                    backgroundColor: " rgba(97,65,38,0.9)",
                    fontSize:'13px'
                }}
                onClick={() => handle(res)}>
                    <div className="text container-fluid" style={{fontSize:'12px'}}>
                        <b>{this.props.data.title}</b><br/>
                        <b>Author :
                        </b>
                        {this.props.data.author}<br/>
                        <b>Category :
                        </b>
                        {this.props.data.category}<br/> 
                        <span className="ml-2">{[1, 2, 3, 4, 5]
                            // eslint-disable-next-line
                            .map(d => {
                            if (this.props.data.rating >= d) 
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
    );
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
export default connect(mapStateToProps, matchDispatchToProps)(WishedCard);