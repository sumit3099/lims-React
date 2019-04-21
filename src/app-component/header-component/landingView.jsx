import React, { Component } from 'react';
import Pbooks from '../main-component/admin-component/PreferredBooks/PrefferdBooks.jsx';
// import BorrowedSlider from '../main-component/user-component/borrowedBooks/borrowedSlider.jsx';
import TopBooks from '../main-component/admin-component/topRatedBooks/topRated'

export default class LandingView extends Component{
    render () {
    return (

        <div>
            <div className="contained" >
                <h5 className="card-header yoyo" style={{ backgroundColor: "rgb(31, 30, 88)", color: "white" }}>What's New</h5>
                <Pbooks />
            </div>
            <TopBooks/>
        </div>
    );
}
}
