import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashBoardStats from '../admin-stats/adminstats';
import {requireAuth} from '../../../../app-component/isLoggedIn'
import AdminFooter from '../admin-footer-component/adminFooter';

import AdminHeader from '../adminheader'
class ManageAdmin extends Component {
    constructor()
    {
        super();

        this.state={
            user:[],
            validateButton : "block",
            displayAdminButton:"none",
            displayUserButton:"none",
            noUserMessage:"none"
           
        }
    }
    componentWillMount() {
        requireAuth(window.location.href)
    }

    
    findUser = () => {
      
    fetch('https://lims-project-dd085.firebaseio.com/users.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    }).then((res) => res.json())
      .then((res) => {
      
let flag=true;
          for (var key in res) {

            if(res[key].email === document.getElementById('manageAdminEmail').value&&res[key].role==="user"){
         
                flag=false;
 this.setState({displayAdminButton:"block",
                            displayUserButton:"none",
                            noUserMessage:"none"});
            }
            else if(res[key].email === document.getElementById('manageAdminEmail').value&&res[key].role==="admin")
        {flag=false;
           
            this.setState({displayUserButton:"block",
                            displayAdminButton:"none",
                            noUserMessage:"none"})
        }
            // skip loop if the property is from prototype
          }
          if(flag===true)
          {
            this.setState({noUserMessage:"block",displayAdminButton:"none",
            displayUserButton:"none"});
          }
      })
  }
       
       changeRoleToAdmin = () => {

        fetch('https://lims-project-dd085.firebaseio.com/users.json', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
          .then((res) => {
          
            var userkey=null;
    for (var key in res) { 
                  
        if(res[key].email===document.getElementById('manageAdminEmail').value){
          userkey=key;
        }
    }
    var userBody=res[userkey];
    userBody.role="admin";
    console.log(userBody);
  
    fetch('https://lims-project-dd085.firebaseio.com/users/'+userkey+'.json',{    
             method: 'PUT',
             body: JSON.stringify(userBody),
             headers: {'Content-Type': 'application/json'}
         }) .then((res) => res.json())
         .then((res) => {
    
            if(res){
                alert("User Role updated Successfully")  ;
                this.setState({displayUserButton:"none",
                displayAdminButton:"none",
                noUserMessage:"none"});
            } 
            else
            {
                alert("Some Error Occured User Role Not updated")
            }
         });
        

          })
        
    
       }

       changeRoleToUser = () => {
        
        fetch('https://lims-project-dd085.firebaseio.com/users.json', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
          .then((res) => {
          
            var userkey=null;
    for (var key in res) { 
                  
        if(res[key].email===document.getElementById('manageAdminEmail').value){
          userkey=key;
        }
    }
    var userBody=res[userkey];
    userBody.role="user";
    console.log(userBody);
  
    fetch('https://lims-project-dd085.firebaseio.com/users/'+userkey+'.json',{    
             method: 'PUT',
             body: JSON.stringify(userBody),
             headers: {'Content-Type': 'application/json'}
         }) .then((res) => res.json())
         .then((res) => {
    
            if(res){
                alert("User Role updated Successfully")  ;
                this.setState({displayUserButton:"none",
                displayAdminButton:"none",
                noUserMessage:"none"});
            } 
            else
            {
                alert("Some Error Occured User Role Not updated")
            }
         });
        

          })
       }
        

    render() {
     
        return (

            <div>


                <AdminHeader />


               <header id="header" style={{	backgroundColor:'#333333'}}>

                    <div className="conatainer">
                        <div className="row">
                            <div className="col-md-10" style={{}}>
                                <h3
                                    className="dd"
                                    style={{
                                        textAlign: "left",marginTop:"7px",marginLeft:"2%"
                                    }}>
                                    <span className="fa fa-cog" aria-hidden="true"></span>DashBoard 
                                    <small> Manage User(s)/Admin(s)</small>
                                </h3>
                            </div>
                        

                                <div className="dropdown create">
                                    <button
                                        className="btn default dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        style={{color:'white',backgroundColor:"#18906f",marginTop:"0px", height : "33px" }}>
                                        Manage Content
                                        <span className="caret" /></button>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link to="/bookadd">
                                        <a className="dropdown-item" href="!#">Add Book(s)</a>
                                        </Link>
                                        <Link to="/bookedit">
                                        <a className="dropdown-item" >Edit Book(s)</a>
                                        </Link>
                                        <Link to="/manageuser">

                                        <a className="dropdown-item" >Manage User(s)
                                        </a>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        
                    </div>
                </header>

                <section id="breadcrumb">
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="active" style={{color : "black", fontSize:"20px"}}><b>DashBoard</b></li>
                        </ol>
                    </div>
                </section>

                <section id="main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">

                               <DashBoardStats />

                            </div>


                            <div className="col-md-9">


                                <div className="card">
                                    <h5 className="card-header">Manage User(s) </h5>
                                    <div className="card-body">


                                            <div className="col-md-12">
                                               
                                                   <form>
                                                   <div className="form-group " style={{ textAlign: "left" }}>
                                                    Email-Id:
                                                <input type="text" id="manageAdminEmail" className="form-control" />
                                                </div>

                                                            {/*<div style={{textAlign:'left'}}><button type="button" onClick={this.findBook} className="btn btn-warning" style={{alignContent : "left"}}>Make Admin</button>

                                            <button onClick={this.deleteBook} className="btn btn-danger" style={{marginLeft :'30px'}}>Remove Admin</button>*/}
                                            
                                            {/*</div>*/}

                                            <div style={{textAlign:'left'}}>
                                                <button type="button" onClick={this.findUser}
                                                className="btn btn-warning" style={{alignContent : "left",display:this.state.validateButton}}>Validate
                                                </button>
                                            </div>
                                            <br />
                                            <div>
                                                <button type="button" onClick={this.changeRoleToAdmin}
                                                className="btn btn-default" style={{alignContent : "left",display:this.state.displayAdminButton, backgroundColor:"rgb(31, 30, 88)", color:"white"}}>Change Role to Admin
                                                </button>
                                            </div>
                                            <div>
                                                <button type="button" onClick={this.changeRoleToUser}
                                                className="btn btn-default" style={{alignContent : "left",display:this.state.displayUserButton, backgroundColor:"rgb(31, 30, 88)", color:"white"}}>Change Role to User
                                                </button>
                                            </div>

                                            <div>
                                                <p
                                                className="btn btn-default" style={{alignContent : "left",display:this.state.noUserMessage, backgroundColor:"rgb(31, 30, 88)", color:"white"}}>Sorry no user exist with this EMAIL
                                                </p>
                                            </div>
                                            
                                                    </form>
                                                  
                                                
                                            

                                          

                                           

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <br /><br />
            <AdminFooter />
            

<div>


       

      </div>






            </div>



                
        


        )
        
    }
    

}

export default ManageAdmin;