import React, {Component}from 'react';
// import BootHeader from './../../header-component/bootheader.jsx';
// import Header from '../../header-component/header'
// import Pbooks from '../admin-component/PreferredBooks/PrefferdBooks.jsx';
// import Footer from '../../footer-component/footer'
// import axios from 'axios';
// import { BorrowedSlider } from './borrowedBooks/borrowedSlider';
// import {email,mid} from '../login-component/login.jsx';
import {requireAuth} from '../../isLoggedIn.js'
// import {Link} from 'react-router-dom'
// import { HashRouter, Route, Switch } from 'react-router-dom';


// import BootHeader from '../../header-component/bootheader'
import LandingView from '../../header-component/landingView'
// let users;
// window.bbooks='';
// import {email,mid} from '../login-component/login.jsx'
// import SearchResults from './SearchResults'
export class User extends Component
{
    constructor() {
        super();
        this.state = {
            goToAdmin:'none'
        }
    }
    // constructor(){
    //     super();
    //     axios.get('https://api.myjson.com/bins/14x90j')
    //  .then(res=>{
    //      this.setState({output:res.data});
    //       window.users = this.state.output;
    //             console.log(users);
    //             const b = window.users.filter((res) => res.user.mid === "1042948")
    //             window.bbooks=b[0].borrowedbooks;
    //             console.log(window.bbooks.length)
    //     });
// }
componentWillMount() {
    requireAuth(window.location.href)
}

    componentDidMount() {
        if(localStorage.getItem('role')==="admin")
        {
            this.setState({goToAdmin:"block"})
        }
        else if(localStorage.getItem('role')==="user")
        {
            this.setState({goToAdmin:"none"})
        }
    }
    render()
    {
        // if(window.bbooks.length!==0){

        // alert(window.bbooks.length)
        // }
        return(
            <div>
            {/*<BootHeader />*/}
            {/*<Header/>*/}
            {/*<Pbooks/>*/}
            {/*<BorrowedSlider/>*/}
            {/*<Footer />*/}
            <div className="contained mt-4" >
                <LandingView/>
            </div>
            </div>
        );
    }
}
