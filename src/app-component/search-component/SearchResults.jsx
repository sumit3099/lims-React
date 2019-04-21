import React, { Component } from 'react';
import { processedData } from './Search';
import $ from 'jquery';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Search.css';
import { search, sortTitle, sortAuthor, sortPublish, sortRating, selectFilter } from './Search'
import store from '../../state/store/store.js'
// eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor'
import EachSearchCard from './eachSearchCard';
import {value} from './Search'
export var book, notify = 0;
// let users,
//     books;
export var changeNotify = () => {
    notify = 0;
}
class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wishlistIcon: true,
            requestIcon: true,
            divName:'',
            sortType:'',
            filterType:'',
        }

        // axios
        //     .get('https://api.myjson.com/bins/14x90j')
        //     .then(res => {
        //         this.setState({output: res.data});
        //         users = this.state.output;
        //         //console.log((users)
        //         const b = users.filter((res) => res.user.mid === "1042948")
        //     });
    }

    divisionName = () => {
        if(processedData.length>0&&navigator.onLine)
        {
            this.setState({divName:`Showing search results for ${value}`})
        }
        else if(processedData.length===0&&navigator.onLine)
        {
            this.setState({divName:`No search results found for ${value}`})
        }
        else if(processedData.length>0&&!navigator.onLine)
        {
            this.setState({divName:`Offline Results for ${value}`})
        }
        else if(processedData.length===0&&!navigator.onLine)
        {
            this.setState({divName:`No offline Results for ${value}`})
        }
    }

    notify = () => {
        if (notify === 0&&navigator.onLine&&processedData.length>0) {
            notify = 1;
            this.divisionName();
            toast.success("Is this what you were looking for !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "brown"
                })
            });
        }
        else if(notify===0&&!navigator.onLine)
        {
            notify=1;
            this.divisionName()
            toast.error("You're Not Online !!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "blue"
                })
            });
        }
        else if(notify===0&&navigator.onLine&& processedData.length===0)
        {
            notify=1;
            this.divisionName()
            toast.error("Sorry !!! No Search Results Found", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "red"
                })
            });

        }
        // this.divisionName()
        // toast.error("Error Notification !", {
        //   position: toast.POSITION.TOP_LEFT
        // });
        // toast.warn("Warning Notification !", {
        //   position: toast.POSITION.BOTTOM_LEFT
        // });
        // toast.info("Info Notification !", {
        //   position: toast.POSITION.BOTTOM_CENTER
        // });
    }

    notifySort = () => {
        if (navigator.onLine&&processedData.length>0) {
            toast.success("Sorted your search", {
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
        else if(navigator.onLine&& processedData.length===0)
        {
            toast.error("Sorry !!! No Search Results Found", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "red"
                })
            });

        }
    }
    notifyFilter = () => {
        if (navigator.onLine&&processedData.length>0) {
            toast.success(`Used ${document.getElementById('filter').value} on your search`, {
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
        else if(navigator.onLine&& processedData.length===0)
        {
            toast.error("Sorry !!! No Search Results Found", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: css({
                    background: "red"
                })
            });

        }
    }


    render() {
        //console.log((processedData)
        const a = processedData.map(res => {
            return (
                <EachSearchCard eachValue={res}/>
            )
        });
        $(document).ready(function () {
            $('.contained section .sortTypes li a').click(function (e) {
                e.preventDefault();
                $('.contained section .sortTypes li.activeSortElement').removeClass('activeSortElement');

                var $parent = $(this).parent();
                $parent.addClass('activeSortElement');
                e.preventDefault();
            });
        });
        return (
            <div>
                <img id="alert" alt='' onload={this.notify()} onClick={this.notify}/>
                <div className="contained mt-4">
                    {/*{document.getElementById('alert').click()}*/}
                    <ol className="breadcrumb" style={{ backgroundColor: "rgb(31, 30, 88)", color: "white" }}  >
                        <h5 >{this.state.divName}<span style={{ float: 'right', cursor: 'pointer', paddingLeft: '70px' }} id="openHome" onClick={(e)=>{e.preventDefault(); document.getElementById('key').value=""; window.location="/#/"}}>x</span></h5>
                    </ol>
                    
                        {processedData.length>1?<div>
                            <section className="sortInline form-group">
                                <span className="sortName">
                                    <span>Sort By</span>
                                </span>
                                <ul className="sortTypes">
                                    <li className="sortElement activeSortElement" onClick={(event) => {
                                        event.preventDefault();
                                        store.dispatch({ type: "STORE_SEARCH", payload: document.getElementById('key').value })
                                        // eslint-disable-next-line
                                        event.target.className !== "sortELement activeSortElement" ?
                                            search()
                                            : null
                                    }}><a id="defaultSearchResults">Default</a></li>
                                    <li className="sortElement" onClick={(event) => {
                                        event.preventDefault();
                                        this.notifySort();
                                        sortTitle();
                                    }}><a>Title</a></li>
                                    <li className="sortElement" onClick={(event) => {
                                        event.preventDefault()
                                        this.notifySort();
                                        sortAuthor();
                                    }}><a>Author</a></li>
                                    <li className="sortElement" onClick={(event) => {
                                        event.preventDefault();
                                        this.notifySort();
                                        sortPublish();
                                    }}><a>Publisher</a></li>
                                    <li className="sortElement" onClick={(event) => {
                                        event.preventDefault();
                                        this.notifySort();
                                        sortRating();
                                    }}><a>Rating</a></li>
                                </ul>

                            </section>
                            <div className="btn-group setDropdown">

                                <select className="form-control" id="filter" onChange={(e) => {
                                    e.preventDefault();
                                    this.notifyFilter();
                                    selectFilter()
                                }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="dropdown-toggle"></span>
                                    <option className="dropdown-item" >Filter By</option>
                                    <option className="dropdown-item">Filter By 5 Rated</option>
                                    <option className="dropdown-item">Filter By 4 and above</option>
                                    <option className="dropdown-item" >Filter by 3 and above</option>
                                    <option className="dropdown-item">Filter by 2 and above</option>
                                </select>
                            </div>
                        </div>:null}
                    <div className="container-fluid">
                        <div className="row">
                            {a}
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}


export default SearchResults;