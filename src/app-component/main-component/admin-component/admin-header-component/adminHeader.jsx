import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>


          <nav class="navbar navbar-toggleable-md navbar-default" style={{backgroundColor:'#A9A9A9'}}>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation"   >
                        <span class="navbar-toggler-icon"></span></button>
                    <button
                        class="navbar-toggler navbar-toggler-right"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span
                            class="navbar-toggler-icon"
                            style={{
                                backgroundColor: "black"
                            }}></span>
                    </button>
                   <img className="App-logo inset" src={require("../../../../Assets/Images/final_header.jpg")} alt="My logo" align="left"  />
          
          <Link to="/adminDash">
            <span id="projectTitle" className="navbar-brand" style={{ color: "white",paddingLeft:'15px',fontSize:'23px', marginBottom : "15px"  }}>Mindtree Library</span>
          </Link>
                    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                            <Link to="/adminDash">
                                
                                <a class="nav-link" href="!#">DashBoard
                                    {/*<span class="sr-only">(current)</span>*/}
                                </a>
                                </Link>
                            </li>
                            <Link to="/adminbooks">
                                <li class="nav-item">
                                    <a class="nav-link" href="!#">Books</a>
                                     {/*<span class="sr-only">(current)</span>*/}
                                </li>
                            </Link>
                            <Link to="/handleusers">
                                <li class="nav-item">
                                    <a class="nav-link " href="!#">Users</a>
                                     {/*<span class="sr-only">(current)</span>*/}
                                </li>
                            </Link>

                          
                        </ul>

                        <ul class="navbar-nav navbar-right">
                            <li class="nav-item active">
                                <a class="nav-link" href="!#">
                                    Welcome {localStorage.getItem('user-name'),
                                    {/*<span class="sr-only">(current)</span>*/}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="!#">Logout</a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>

        )
    }
}

export default Header;