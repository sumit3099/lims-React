import React, { Component } from 'react';
import '../../logo.svg';
import '../App.css';
import {connect} from 'react-redux';
import Img from 'react-image';
import './header.css'
import { Link } from 'react-router-dom';
import { user_name } from '../App'
import LoadingEffect from '../loading-component/loading'
import store from '../../state/store/store.js'
import { search } from '../search-component/Search'
import {requireAuth} from '../isLoggedIn.js'
import {url} from '../App'
export var key;
let route=[];
var debounce = require('debounce');
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greet: "Hi, ",
      search: '',
    }
    if(window.display===""||window.display===undefined)
    {
      window.location.replace('/#/login')
    }
  }

  handle() {
    key = document.getElementById("key").value
  }

  logout(e) {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/#/');
    window.location.reload();
    // for (var i = 0; i < cookies.length; i++) {
    //     var cookie = cookies[i];
    //     var eqPos = cookie.indexOf("=");
    //     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // }

  }
  componentWillMount() {
    route = window.location.hash.split('/')
    if(route[1]==="search")
    {
      window.location= '/#/'
    }
    fetch('https://lims-project-dd085.firebaseio.com/books.json',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((response) => {
            localStorage.setItem('books',JSON.stringify(Object.values(response)))
            window.display=Object.values(response)
            this.setState({
              display: Object.values(response),
              flag:true
            })
          })
    var d = new Date(); // for now
    let hours = d.getHours(); // => 9

    if (hours >= 4 && hours < 12) {
      this.setState({ greet: "Good morning, " });
    }
    else if (hours >= 12 && hours < 16) {
      this.setState({ greet: "Good afternoon, " });
    }
    else if (hours >= 16 && hours <= 23) {
      this.setState({ greet: "Good evening, " });
    }
    requireAuth(window.location.href)
  }
  search() {
    store.dispatch({ type: "STORE_SEARCH", payload: document.getElementById('key').value })
    search()
  }
  changeProfileShow()
  {
    window.showProfile=true;
    document.getElementById('profile').click();
    window.setClickProps="profileDetailsCross";
  }

  render() {
    window.addEventListener('click',function(e){e.preventDefault(); if((window.location.hash).indexOf('search')<0&&(window.location.hash).indexOf('details')<0&&document.getElementById('key')!==null)document.getElementById('key').value=""})
    let brr = [];
    if(window.display!==""&&window.display!==undefined){
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
    
    var titleDup = () => {
      let titleD = []
      let arr = window.display
        .sort((a, b) => {
          if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
          } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
          } else {
            return 0;
          }
        });
      if (arr.length !== 0) {
        titleD.push(arr[0]);
      }
      for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i].title.toUpperCase() !== arr[i + 1].title.toUpperCase()) {

          titleD.push(arr[i + 1]);
        }
      }
      titleD
      // eslint-disable-next-line
      .map((res) => {
        listCategory.push(<option value={res.title}></option>)
      })
    }
    var authorDup = () => {
      let authorD = []
      let arr = window.display
        .sort((a, b) => {
          if (a.author.toUpperCase() > b.author.toUpperCase()) {
            return 1;
          } else if (a.author.toUpperCase() < b.author.toUpperCase()) {
            return -1;
          } else {
            return 0;
          }
        });
      if (arr.length !== 0) {
        authorD.push(arr[0]);
      }
      for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i].author.toUpperCase() !== arr[i + 1].author.toUpperCase()) {

          authorD.push(arr[i + 1]);
        }
      }
      authorD
      // eslint-disable-next-line
      .map((res) => {
        listCategory.push(<option value={res.author}></option>)
      })
    }
    var publisherDup = () => {
      let publisherD = []
      let arr = window.display
        .sort((a, b) => {
          if (a.publisher.toUpperCase() > b.publisher.toUpperCase()) {
            return 1;
          } else if (a.publisher.toUpperCase() < b.publisher.toUpperCase()) {
            return -1;
          } else {
            return 0;
          }
        });
      if (arr.length !== 0) {
        publisherD.push(arr[0]);
      }
      for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i].publisher.toUpperCase() !== arr[i + 1].publisher.toUpperCase()) {

          publisherD.push(arr[i + 1]);
        }
      }
      publisherD
      // eslint-disable-next-line
      .map((res) => {
        listCategory.push(<option value={res.publisher}></option>)
      })
    }
    let listCategory = [];
    brr
    // eslint-disable-next-line
    .map(res => {
      listCategory.push(<option value={res.category}></option>)
    })
    titleDup();
    publisherDup();
    authorDup();
    return (
      <div >
        <nav id="headerSticky" className="navbar navbar-toggleable-md navbar-light bg-faded" style={{ backgroundColor: "rgb(31, 30, 88)" }}>
          <button style={{ backgroundColor: '#fff' }}
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span style={{ backgroundColor: '#fff' }} className="navbar-toggler-icon"></span>
          </button>


          <Img
            className="App-logo inset"
            src={require("../../Assets/Images/final_header.jpg")}
            alt="My logo"
            loader = {<LoadingEffect/>}
            align="left" onClick={(e) => { e.preventDefault(); window.location = "/#/"; 
            if(document.getElementById('openHome')!==null) document.getElementById('openHome').click() }} />

          <Link to="/">
            <span onClick = { (e) => {e.preventDefault(); window.location = "/#/";} }id="projectTitle" className="navbar-brand" style={{ color: "white", paddingLeft: '15px', fontSize: '23px', marginBottom: "15px" }}>Mindtree Library</span>
          </Link>

          <div className="offset-md-1 col-lg-6 col-md-10">
            <div>
              {/*<Link to="/search" style={{ textDecoration: 'none' }}>*/}
              <div className="input-group">

                <input list="browsers" type="text" id="key" className="form-control" style={{ alignSelf: "center" }} placeholder="Search for..." autoFocus
                  onChange={debounce((event) => {
                    event.preventDefault();
                    this.search()
                  }, 1000)}
                  onKeyPress={debounce((event) => {
                    if (event.key === 'Enter') {
                      store.dispatch({ type: "STORE_SEARCH", payload: document.getElementById('key').value })
                      search()
                    }
                  }, 500)}
                />
                <datalist id="browsers">
                  {listCategory}
                </datalist>
                <button className="btn btn-primary"

                  onClick={(event) => {
                    this.setState({ search: document.getElementById('key').value })
                    store.dispatch({ type: "STORE_SEARCH", payload: document.getElementById('key').value })
                    search()
                  }}
                  // eslint-disable-next-line
                  type="button" className="btn btn-primary" style={{ backgroundColor: "#18906f", borderColor: "#fff" }} >Go!</button>
              </div>
              {/*</Link>*/}
            </div>
          </div>


          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">



              <li className="dropdown " style={{ color: "white" }}>

                <div data-toggle="dropdown">{this.state.greet} {user_name}<span style={{ paddingRight: "15px" }}></span>
                  {/*<img className="inset" src={url} />*/}
                  <Img className="inset" src={url}  loader={<LoadingEffect/>}  />

                    <span className="dropdown-toggle"></span></div>
                  <ul className="dropdown-menu dropdown-menu-right" style={{ backgroundColor: "rgb(239, 226, 234)  	" }} >
                    <li onClick={(e)=>{e.preventDefault(); window.location = '/#/profile'}}>
                      {/*<Link to="/profile">*/}
                      <a className="dropdown-item" style={{ color: 'rgb(31, 30, 88)', borderColor: 'brown' }}><span className="fa fa-user"></span>Profile
                    </a>
                    {/*</Link>*/}
                    </li>
                    <div className="dropdown-divider" >
                    </div>
                    <li >
                      <a href="!#" onClick={this.logout} className="dropdown-item" style={{ color: 'rgb(31, 30, 88)', borderColor: 'brown' }}><span className="fa fa-lock"></span> Logout</a></li>
                  </ul>
              </li>

            </ul>
          </div>






        </nav>
          {/*<BootHeader />*/}
      </div>
        )
    }
    return(<div>{requireAuth(window.location.href)}</div>)
  }
}
// const mapStateToProps = (state) => {
//   return {}
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     storeSearchToRedux : (obj) => {
//       dispatch(storeSearch(obj))
//     }
//   }
// }
function mapStateToProps(state) {
    return {
        bbooks: state.bbooks,
        books: state.books
    };
}
export default connect(mapStateToProps)(Header);
// export default Header;