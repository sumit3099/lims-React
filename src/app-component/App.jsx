import React, { Component } from 'react';
import './App.css';
import Login from './main-component/login-component/login.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createStore } from 'redux';
import allReducers from '../state/reducer';
import { connect } from 'react-redux';
import { storeBbooks } from '../state/action/bbooksAction'
import { storeBooks } from '../state/action/booksAction';
import { storeWbooks } from '../state/action/wbooksAction';
import Main from './main-component/Main'
export var user_name, url;
class App extends Component {
  constructor() {
    super();
    var Backlen = window.history.length;
    window.history.go(-Backlen);
    this.state = {
      bbooks: [],
      display: [],
      wishlist: [],
      flag: false
    }
  }

  getBorrowedData() {
    var tempBbook = JSON.parse(localStorage.getItem('limsuser')).borrowedBooks;
    var tempArray = [];
    for (var key in tempBbook) {
      tempArray.push(tempBbook[key]);
    }
    localStorage.setItem('borrowedBooks', JSON.stringify(tempArray));
    tempBbook = JSON.parse(localStorage.getItem('limsuser')).wishlist;
    var tempArray1 = [];
    for (var key1 in tempBbook) {
      tempArray1.push(tempBbook[key1]);
    }

    localStorage.setItem('wishlist', JSON.stringify(tempArray1));
    this.setState({
      bbooks: tempArray,
      wishlist: tempArray1
    })
  }

  addUser = (UserDetails) => {
    if (navigator.onLine) {

      localStorage.setItem('role', JSON.parse(localStorage.getItem('limsuser')).role);
      fetch('https://lims-project-dd085.firebaseio.com/books.json',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((response) => {
          localStorage.setItem('books', JSON.stringify(Object.values(response)))
          this.setState({
            display: Object.values(response),
            flag: true
          })
        })
      if (JSON.parse(localStorage.getItem('limsuser')).borrowedBooks === undefined) {
        var temparr = [];
        localStorage.setItem('borrowedBooks', JSON.stringify(temparr));
      }
      if (JSON.parse(localStorage.getItem('limsuser')).wishlist === undefined) {
        let tempar = [];
        localStorage.setItem('wishlist', JSON.stringify(tempar));
      }
      if (JSON.parse(localStorage.getItem('limsuser')).borrowedBooks && JSON.parse(localStorage.getItem('limsuser')).borrowedBooks.length != 0) {
        this.getBorrowedData();
      }
    }
    else {
      if (JSON.parse(localStorage.getItem('books')) !== "" && JSON.parse(localStorage.getItem('books')) !== null) {
        this.setState({
          display: JSON.parse(localStorage.getItem('books')),
          bbooks: JSON.parse(localStorage.getItem('borrowedBooks')),
          wishlist: JSON.parse(localStorage.getItem('wishlist'))
        })
      }
      else {
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace('/#/login')
      }
    }
  }
  componentWillMount() {
    if (localStorage.getItem('limsuser') !== "" && localStorage.getItem('limsuser') !== null) {
      var user = JSON.parse(localStorage.getItem('limsuser'));
      let mid = user.userName.split("@");
      let id = mid[0].split("M")
      window.user = id[1];
      this.addUser(user);
      this.forceUpdate();
    }

  }

  render() {

    if (localStorage.getItem('limsuser') !== "" && localStorage.getItem('limsuser') !== null) {

      window.display = this.state.display;
      let bbooks = this.state.bbooks;
      let wbooks = this.state.wishlist
      let books = this.state.display;

      if (navigator.onLine) {
        this.props.storeBooks(books);
        this.props.storeBbooks(bbooks)
        this.props.storeWbooks(wbooks)
      }
      else {
        this.props.storeBooks(this.state.display)
        this.props.storeBbooks(this.state.bbooks)
        this.props.storeWbooks(this.state.wishlist)
      }
      user_name = JSON.parse(localStorage.getItem('limsuser')).name;
      localStorage.setItem('user-name', JSON.stringify(JSON.parse(localStorage.getItem('limsuser')).name))
      var UserDetails = JSON.parse(localStorage.getItem('limsuser'));
      localStorage.setItem('mid', window.user)
      url = `https://social.mindtree.com/User%20Photos/Profile%20Pictures/m${window.user}_MThumb.jpg?t=63646089488`
    }



    return (
      <HashRouter basename="/">
        <div className="App" id="App">
          <Main />
          <Switch>
            <Route path="/login" exact component={Login} />
          </Switch>

        </div>
      </HashRouter>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ storeBbooks: storeBbooks, storeBooks: storeBooks, storeWbooks: storeWbooks }, dispatch);
}
export default connect(null, matchDispatchToProps)(App);
