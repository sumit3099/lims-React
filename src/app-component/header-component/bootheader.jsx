import React, { Component } from 'react';
// import axios from 'axios';
import './bootheader.css';
import {Link} from 'react-router-dom'
// import {Redirect} from 'react-router'
// import storeBbooks from '../../state/store/storeBbooks'
// import Footer from '../footer-component/footer.jsx';
// import Header from './header.jsx';
// import Pbooks from '../main-component/admin-component/PreferredBooks/PrefferdBooks.jsx';
// import BorrowedSlider from '../main-component/user-component/borrowedBooks/borrowedSlider.jsx';
// import Search from '../search-component/Search.jsx';
import store from '../../state/store/store.js'
// import SearchResults from '../search-component/SearchResults.jsx';
// import Search from '../search-component/Search'
// import Details from './../BookDetails-Component/details';
// import { LandingView } from './landingView';
// import  Category  from './categoryView';
// import WishedBooks from '../main-component/user-component/wishlist/wishlistComponent'
// import LoadingEffect from './../loading-component/loading';
import { EachListItem } from './categoryList';
// eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify';
import {css} from 'glamor'
import {connect} from 'react-redux';
// import $ from 'jquery';
// import BorrowedBooks from './../main-component/admin-component/booksDisplay';
// import Profile from './../main-component/user-component/profileView/ProfileDetails';
import '../main-component/user-component/profileView/profileDetails.css'
import {requireAuth} from '../isLoggedIn.js'
export let controller;
export var handleController = () => {
    controller=1
}
// eslint-disable-next-line
var count = 0,
    plusCtgry,
    checkCtgry,
    plusMy,
    checkMy;
class BootHeader extends Component {
    constructor() {
        super();
        plusCtgry = (
            <div className="fa fa-minus"></div>
        );
        plusMy = (
        <div className="fa fa-minus"></div>
        );
        checkCtgry = "-";
        checkMy = "-";
        this.state = {
            display: [],
            landingView: true,
            currentlyClicked: "",
            categoryClicked: true,
            borrowedClicked: false,
            wishlistClicked: false,
            passBorrowed: false,
            passWish: false,
            plusCtgry: plusCtgry,
            plusMy: plusMy,
            arrayResults: [],
            searchResults: false,
            searchClicked : false,
            sortedData:'',
            searchArg:'',
            redirect:false
        

        }
        window.showProfile=false;
        window.hideCategory=true;
    }
    componentWillMount() {
        requireAuth(window.location.href)
    }
    // componentWillMount() {
    //     axios
    //         // .get('https://api.myjson.com/bins/1a9rkj')
    //         // .then(res => {
    //             this.setState({ display: window.display });
    //         // })
    // }

    openCategory = (arg) => {
        this.setState({
            landingView: false,
            currentlyClicked: arg,
            categoryClicked: true,
            borrowedClicked: false,
            passBorrowed: false,
            passWish: false,
            wishlistClicked: false,
            searchClicked: false,
        });
        window.hideCategory=false;
        window.showDetails=false;
        window.showProfile=false;
        controller=0;
    }
    closeCategory = () => {
        this.setState({
            landingView: true,
            categoryClicked: true,
            borrowedClicked: false,
            passBorrowed: false,
            wishlistClicked: false,
            passWish: false
        });
    }
    openBorrowedBooks = () => {
        this.setState({
            landingView: true,
            categoryClicked: true,
            borrowedClicked: true,
            passBorrowed: true,
            wishlistClicked: false,
            passWish: true
        });
        window.showDetails=false;
        window.showProfile=false;
    }

    closeBorrowed = () => {
        this.setState({
            landingView: true,
            categoryClicked: true,
            borrowedClicked: false,
            passBorrowed: false,
            wishlistClicked: false,
            passWish: false
        });
    }

    openWishlist = () => {
        this.setState({
            landingView: true,
            categoryClicked: true,
            wishlistClicked: true,
            passWish: true,
            borrowedClicked: false,
            passBorrowed: true
        });
        window.showDetails=false;
        window.showProfile=false;
    }

    closeWishlist = () => {
        this.setState({
            landingView: true,
            categoryClicked: true,
            wishlistClicked: false,
            passWish: false,
            borrowedClicked: false,
            passBorrowed: false
        });
    }
    openSearch = () => {
        this.setState({
            landingView: false,
            categoryClicked: false,
            borrowedClicked: false,
            passBorrowed: false,
            passWish: false,
            wishlistClicked: false,
            searchResults: true,
            searchClicked : true,
            sortedData: store.getState().sorted_Data,
        })
        window.showDetails=false;
        window.showProfile=false;
        if(store.getState().sorted_Data.length===0)
        this.setState({searchArg: "No Results found for your search: "+ document.getElementById('key').value})
        else
        this.setState({searchArg:"Results Found for "+document.getElementById('key').value} )
        // this.setState({redirect:true})
    }
    closeSearch = () => {
        this.setState({
            landingView: true,
            categoryClicked: true,
            borrowedClicked: false,
            passBorrowed: false,
            wishlistClicked: false,
            passWish: false,
            searchResults: false,
            searchClicked:false
        });
       document.getElementById('key').value="";
    }
    openDetails=()=>
    {
            this.setState({
            landingView: false,
            categoryClicked: false,
            borrowedClicked: false,
            passBorrowed: false,
            passWish: false,
            wishlistClicked: false,
            searchResults: false,
            searchClicked : false,
        })
        window.showProfile=false;
        window.location="/#/details"
    }
    closeDetails=()=>
    {
         window.showDetails=false;
         window.showProfile=false;
            this.setState({
            landingView: true,
            categoryClicked: true,
            borrowedClicked: false,
            passBorrowed: false,
            wishlistClicked: false,
            passWish: false,
            searchResults: false,
            searchClicked:false
        });
       
    }
    openProfile=()=>
    {
        window.hideCategory=true;
        window.showDetails=false;
        window.showProfile=true;
            this.setState({
            landingView: false,
            categoryClicked: false,
            borrowedClicked: false,
            passBorrowed: false,
            passWish: false,
            wishlistClicked: false,
            searchResults: false,
            searchClicked : false,
        })
    }
    closeProfile=()=>
    {
            window.showDetails=false;
            window.showProfile=false;
            this.setState({
            landingView: true,
            categoryClicked: true,
            borrowedClicked: false,
            passBorrowed: false,
            wishlistClicked: false,
            passWish: false,
            searchResults: false,
            searchClicked:false
        });
    }


    plusCtgryClicked = () => {
        if (checkCtgry === "-") {
            checkCtgry = "+";
            plusCtgry = (
                <div className="fa fa-plus"></div>
            )
            this.setState({ plusCtgry: plusCtgry });
        } else {
            checkCtgry = "-";
            plusCtgry = (
                <div className="fa fa-minus"></div>
            )
            this.setState({ plusCtgry: plusCtgry });
        }
    }
        plusMyClicked = () => {
        if (checkMy === "-") {
            checkMy = "+";
            plusMy = (
                <div className="fa fa-plus"></div>
            )
            this.setState({ plusMy: plusMy });
        } else {
            checkMy = "-";
            plusMy = (
                <div className="fa fa-minus"></div>
            )
            this.setState({ plusMy: plusMy });
        }
    }
    
    notify = (a) => {
        if (navigator.onLine) {
            toast.success(`Showing ${a} category`, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "brown"
                })
            });
        }
        else if(!navigator.onLine)
        {
            toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "blue"
                })
            });
        }
    }


    componentDidMount() {
        if(window.innerWidth<=500)
        {
            document.getElementById('categoryDiv').click();
             document.getElementById('myBooksDiv').click();
        }
    }
    render() {
//         if (this.state.redirect) {
//     return <Redirect push to="/search" />;
//   }
        if(window.login==="yes") {
        let valueB,valueW;
        if(this.props.bbooks===null){
            valueB=0;
        }
        else{
            valueB=this.props.bbooks.length
        }
        if(this.props.wbooks===null){
            valueW=0;
        }
        else{
            valueW=this.props.wbooks.length
        }
        let brr = [];
        let arr = window.display
            .sort((a, b) => {
                if (a.category.toUpperCase() > b.category.toUpperCase()) {
                    return 1;
                } else if (a.category.toUpperCase() < b.category.toUpperCase()) {
                    return -1;
                } else {
                    return 0;
                }
            });
        if (arr.length !== 0) {
            brr.push(arr[0]);
        }
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i].category.toUpperCase() !== arr[i + 1].category.toUpperCase()) {

                brr.push(arr[i + 1]);
            }

        }


        return (

            <div style={{
                backgroundColor: "rgb(239, 226, 234)  "
            }}>

                {/*<Header />*/}
                <br />
                <div
                    className="bigshow"
                >
                    {/*
                                <div

                                    style={{
                                    marginTop: '-8px'
                                }}
                                    onClick={this
                                    .openCategory
                                    .bind(this, 'Java')}
                                    className="list-group-item  list-group-item-action" >
                                    <span className="fa fa-asterisk" aria-hidden="true"></span>Java
                                    <div
                                            className='mov'
                                            style={{
                                                paddingRight: "227px"
                                            }}>
                                    <span className="badge  badge-pill badge-warning ml-1">{this
                                            .state
                                            .display
                                            .filter(r => r.details.category.toLowerCase() == "java")
                                            .length}</span></div>

                                </div>

                </section>*/}
                    <section id="main">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="list-group">
                                                               <div
                                            className="row col-md-12 list-group-item collor nav-item dropdown nav-link ml-0"
                                            data-toggle="collapse"
                                            data-target="#myBooks"
                                            aria-controls="myBooks"
                                            aria-expanded="true"
                                            aria-label="Toggle navigation"
                                            style={{
                                                backgroundColor: "rgb(31, 30, 88)",
                                                color: "white"
                                                
                                            }}
                                            id="myBooksDiv"
                                            onClick={this.plusMyClicked}>
                                            
                                            <div className="col-md-0 fa fa-list-alt" aria-hidden="true"></div>
                                            <div
                                                className="col"
                                                style={{
                                                    textAlign: "left"
                                                }}>MyBooks</div>
                                            <div className="row">
                                                <div className="mr-1">{this.state.plusMy}</div>
                                            </div>
                                        </div>

                                        {/*<a>
                                        <button
                                            onClick={this.openBorrowedBooks}
                                            className="btnl default list-group-item  list-group-item-action"
                                            style={{
                                                background: " 	rgb(239, 226, 234)  "
                                            }}>

                                            <span className="fa fa-arrow-right" style={{color : 'brown'}} aria-hidden="true"></span>
                                            Borrowed Books
                                        </button>
                                        </a>*/}

                                        <Link to="/search"><div id="os" onClick={this.openSearch} ></div></Link>
                                        <div id="cs" onClick={this.closeSearch}></div>
                                        <div id="detail" onClick={this.openDetails}></div>
                                        <div id="topDetailsCross" onClick={this.closeDetails}></div>
                                        <div id="searchDetailsCross" onClick={this.openSearch}></div>
                                        <div id="categoryDetailsCross" onClick={this.closeDetails}></div>
                                        <div id="wishlistDetailsCross" onClick={this.openWishlist}></div>
                                        <div id="borrowedDetailsCross" onClick={this.openBorrowedBooks}></div>
                                        <div id="prefferedDetailsCross" onClick={this.closeDetails}></div>
                                        <div id="profile" onClick={this.openProfile}></div>
                                        <div id="profileDetailsCross" onClick={this.closeDetails}></div>
                                        <div id="openProfileWishlist" onClick={this.openWishlist}/>
           <div className="collapse show" id="myBooks">                              
           <a>                             
            <button type="button"
            onClick={(e)=>{e.preventDefault(); window.location="/#/borrowedBooks"}}
            className="btnl default  list-group-item list-group-item-action default ml-0"
            style={{
            background: " rgb(239, 226, 234)  "
        }}>
            <div className="col-md-0 fa fa-arrow-right " style={{color : 'brown'}} area-hidden="true"></div>
            <div className="col" style={{
                textAlign: "left", textTransform:'capitalize'
            }}>Borrowed books</div>
            <div className="row">
                <div className="badge badge-pill badge-warning mr-3">{valueB}</div>
           
            </div>
        </button>
        </a>
        <a>
            <button type="button"
            onClick={(e)=>{e.preventDefault(); window.location ="/#/wishlist"}}
            className="btnl default  list-group-item list-group-item-action default ml-0"
            style={{
            background: " rgb(239, 226, 234)  "
        }}>
            <div className="col-md-0 fa fa-arrow-right " style={{color : 'brown'}} area-hidden="true"></div>
            <div className="col" style={{
                textAlign: "left", textTransform:'capitalize'
            }}>Wishlist</div>
            <div className="row">
                <div className="badge badge-pill badge-warning mr-3">{valueW}</div>
           
            </div>
        </button>
        </a>
</div>





                                    </div>
                                <div className="list-group mt-3" style={{marginBottom:"-45px"}}>
                                        <div
                                            className="row col-md-12 list-group-item collor nav-item dropdown nav-link ml-0"
                                            data-toggle="collapse"
                                            data-target="#navbaDropdown"
                                            aria-controls="navbaDropdown"
                                            aria-expanded="true"
                                            aria-label="Toggle navigation"
                                            style={{
                                                backgroundColor: "rgb(31, 30, 88)",
                                                color: "white"
                                                
                                            }}
                                            id="categoryDiv"
                                            onClick={this.plusCtgryClicked}>
                                            
                                            <div className="col-md-0 fa fa-list-alt" aria-hidden="true"></div>
                                            <div
                                                className="col"
                                                style={{
                                                    textAlign: "left"
                                                }}>Categories</div>
                                            <div className="row">
                                                <div className="mr-1">{this.state.plusCtgry}</div>
                                            </div>
                                        </div>

                                        <div className="collapse show scrollList" id="navbaDropdown">
                                            <a>
                                            <button type="button" onClick={(e)=>{e.preventDefault(); if(navigator.onLine){ this.notify("All"); window.location = '/#/category/all'} else if(!navigator.onLine)this.notify("All");}} className="btnl default list-group-item list-group-item-action ml-0"
                                                style={{background: " rgb(239, 226, 234)  "}}>



                                                <div className="col-md-0 fa fa-arrow-right" style={{color : 'brown'}} area-hidden="true"></div>
                                                <div className="col" style={{textAlign: "left"}}>All</div>
                                                {/*<button type="button" class="list-group-item list-group-item-action">All</button>*/}
                                                
                                                
                                                <div className="row">
                                                    <div className="badge badge-pill badge-warning mr-3">{window.display.length}</div>
                                                </div>
                                                
                                            </button>
                                            </a>
                                            
                                            {brr.map((r) => {

                                                return <EachListItem
                                                    key={`boot${r.category}`}
                                                    completeArray={window.display}
                                                    categoryName={r.category}
                                                    onClick={(e)=> {e.preventDefault(); this.notify(r.category)}}
                                                    openByCategory={this
                                                        .openCategory
                                                        .bind(this, r.category)} />
                                            })
                                            }



                                        </div>
                                    </div>
                                </div>

                                {/*<div className="col-md-9">
                                    <div>
                                        {this.state.landingView && this.state.categoryClicked
                                            ? <LandingView show={this.state.passBorrowed} wish={this.state.passWish} />
                                            : <Category
                                                categoryCrossClicked={this.closeCategory}
                                                data={this.props.books}
                                                Bbooks={this.props.bbooks}
                                                selected={this.state.currentlyClicked}
                                                isSearchClicked={this.state.searchClicked} />}
                                    </div>
                                    <div>
                                        {this.state.borrowedClicked && this.state.passBorrowed
                                            ? <BorrowedSlider borrowCrossClicked={this.closeBorrowed} />
                                            : null}
                                    </div>
                                    <div>
                                        {this.state.wishlistClicked && this.state.passWish
                                            ? <WishedBooks wishCrossClicked={this.closeWishlist} />
                                            : null}
                                    </div>
                                    <div>
                                        {this.state.landingView && this.state.searchClicked
                                            ? <LandingView show={this.state.passBorrowed} wish={this.state.passWish} />
                                            : <SearchResults
                                                divName={this.state.searchArg}
                                                closeSearch={this.closeSearch}
                                                result={this.state.sortedData}
                                                isSearchClicked={this.state.searchClicked}
                                                searchCrossClicked={this.closeSearch} />}
                                    </div>
                                    <div>
                                    {window.showDetails?<Details data={window.selected} detailsCrossClicked={this.closeDetails}/>:null}
                                    </div>
                                    <div>
                                    {window.showProfile?<Profile profileCrossClicked={this.closeProfile}/>:null}
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                    </section>
                    <br /><br />
                    {/*<Footer />*/}
                </div>
            </div>

        )
    }
    else if(window.login==="no")
    return (<div></div>)

    }

}

function mapStateToProps(state) {
    return {
        bbooks: state.bbooks,
        books: state.books,
        wbooks:state.wbooks
    };
}
export default connect(mapStateToProps)(BootHeader);
// export default BootHeader;