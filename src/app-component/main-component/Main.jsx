import React , { Component } from 'react'
import Header from '../header-component/header'
import Footer from '../footer-component/footer'
import {User} from './user-component/user'
import BootHeader from '../header-component/bootheader'
import { Link, HashRouter, Route, Switch } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Profile from './user-component/profileView/ProfileDetails'
import Category from '../header-component/categoryView'
import BorrowedSlider from './user-component/borrowedBooks/borrowedSlider'
import WishedBooks from './user-component/wishlist/wishlistComponent'
import SearchResults from '../search-component/SearchResults'
import Details from '../BookDetails-Component/details.jsx';
import ContactUs from '../footer-component/ContactUs/contactus'
import Dashboard from './admin-component/adminDashboard/dashboard'
import BookAdmin from './admin-component/BookHandler/bookshow.jsx';
import HandleUsers from './admin-component/adminDashboard/handleusers.jsx';
import BookAdd from './admin-component/admin-edit-book/bookadd'
import BookEdit from './admin-component/admin-update-book/bookedit.jsx'
import ManageAdmin from './admin-component/admin-manage-users/adminmanage.jsx'
import {requireAuth} from '../isLoggedIn.js'
import './Main.css'

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            marginLeft:'-1%',
            goToAdmin:'none'
        }
    }
    componentWillMount() {
        if(localStorage.getItem('role')==="admin")
        {
            this.setState({goToAdmin:"block"})
        }
        else if(localStorage.getItem('role')==="user")
        {
            this.setState({goToAdmin:"none"})
        }
        requireAuth(window.location.href)
        if(window.innerWidth<=500)
        {
            this.setState({marginLeft:'0%'})
        }
    }
    render() {
        if(window.login==="yes"&&window.location.hash !=="#/contactus"&&window.location.hash !=="#/adminDash"
        &&window.location.hash!=='#/adminbooks'&&window.location.hash!=='#/handleusers'&&window.location.hash!=='#/bookadd'&&window.location.hash!=='#/bookedit'&&window.location.hash!=='#/manageuser')
        return(
            <div style={{overflow:"hidden"}}>
            <Header/>
            <div className="row mainDiv mb-4">
                <div className="col-md-3 mainDiv"><BootHeader/></div>
                <div style={{marginLeft:this.state.marginLeft}} className="col-md-9 mainDiv">
                {/*<User/>*/}
                <HashRouter>
                <Switch>
                <Route path="/" exact component={User}/>
                <Route path="/category/:category" exact component={Category} onChange={Category}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/borrowedBooks" exact component={BorrowedSlider}/>
                <Route path="/wishlist" exact component={WishedBooks}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/search/:searchValue" exact component={SearchResults} onChange={SearchResults}/>
                <Route path="/details/:isbn" exact render = {()=> <Details data={window.selected}/>}/>
                </Switch>
                </HashRouter>
                <ToastContainer/>
                </div>
            </div>
            <Link to="/adminDash">
            <input type="button" className="btn btn-primary" value="Admin" style={{position:"fixed",right:"1%",bottom:"0px",display:this.state.goToAdmin}}/>
            </Link>
            <Footer/>
            </div>
        )
        else if(window.login==="no")
        return(<div></div>)
        else if(window.location.hash==="#/contactus")
        {
            return(
                <Route path="/contactus" exact component={ContactUs}/>
            )
        }
        else if(window.location.hash==="#/adminDash")
        {
            return(
                <Route path="/adminDash" exact component = {Dashboard}/>
            )
        }
        else if(window.location.hash ==="#/adminbooks")
        {
            return(<Route path="/adminbooks" exact component={BookAdmin} />)
        }
        else if(window.location.hash === '#/handleusers')
        {
        return(<Route path="/handleusers" exact component={HandleUsers} />)
    }
    else if(window.location.hash === '#/bookadd')
    {
        return(<Route path="/bookadd" exact component={BookAdd} />)
    }
    else if(window.location.hash === '#/bookedit')
    {
        return(
            <Route path="/bookedit" exact component={BookEdit} />            
        )
    }
    else if(window.location.hash === '#/manageuser')
    {
        return(
            <Route path="/manageuser" exact component={ManageAdmin} />
        )
    }
        else return(<div>{window.login="no"}
        {sessionStorage.clear()}
        {localStorage.clear()}
        </div>)
    }
}