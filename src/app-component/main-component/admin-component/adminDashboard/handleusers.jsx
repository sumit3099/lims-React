import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashBoardStats from '../admin-stats/adminstats';
import AdminFooter from '../admin-footer-component/adminFooter';
import { requireAuth } from '../../../isLoggedIn.js'
import AdminHeader from '../adminheader'

class HandleUsers extends Component {
    componentWillMount() {
        requireAuth(window.location.href)
    }

deleteUser = (e) => {
        e.preventDefault();
      fetch('https://lims-project-dd085.firebaseio.com/users.json', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((res) => {
            var userkey=null;
    for (var key in res) { 
                  
        if(res[key].email===document.getElementById('userEmail').value){
          userkey=key;
        }
    }
    if(userkey===null){
        alert("Sorry User with this email does'nt exist" );
    }
else{
    fetch('https://lims-project-dd085.firebaseio.com/users/'+userkey+'.json',{    
             method: 'DELETE',
             headers: {'Content-Type': 'application/json'}
         }) .then((res) => res.json())
         .then((res) => {
            if(res===null){
                alert("user Deleted")  
            } 
            else
            {
                alert("Some Error Occured user Not Deleted")
            }
         });
        }
        });
}

addUser = (e) => {
    e.preventDefault();
    fetch('https://lims-project-dd085.firebaseio.com/users.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // form:{mid:"1042932"}
            body: JSON.stringify({
                name: document.getElementById('Name').value,
                userName:  document.getElementById('userName').value,
                mid:document.getElementById('mid').value,
                email: document.getElementById('email').value,
                password:document.getElementById('password').value,
                role:document.getElementById('role').value,
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.name){
                   alert('user Added Succesfully');
                   document.getElementById('addUserForm').reset();
                }
         
            })
            .catch((error)=> {
                alert('some error Occured');
            });
}

    render() {

        return (

            <div>

                <AdminHeader />

                <header id="header" style={{ backgroundColor: '#333333' }}>

                    <div className="conatainer">
                        <div className="row">
                            <div className="col-md-10" style={{}}>
                                <h3
                                    className="dd"
                                    style={{
                                        textAlign: "left", marginTop: "7px",marginLeft:"2%"
                                    }}>
                                    <span className="fa fa-cog" aria-hidden="true"></span>DashBoard
                                    <small> Manage Users</small>
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
                                    style={{ color: 'white', backgroundColor: "#18906f", marginTop: "0px", height: "33px" }}>
                                    Manage Content
                                        <span className="caret" /></button>

                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                     <Link to="/bookadd">
                                        <a class="dropdown-item" >Add Book(s)</a>
                                        </Link>
                                        <Link to="/bookedit">
                                        <a class="dropdown-item">Edit Book(s)</a>
                                        </Link>
                                        <Link to="/manageuser">
                                        
                                    <a class="dropdown-item">Manage User(s)</a>
                                    </Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </header>

                <section id="breadcrumb">
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="active" style={{ color: "black", fontSize: "20px" }}><b>DashBoard</b></li>
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
    <h5 className="card-header">DELETE USER </h5>
    <div className="card-body">


            <div className="col-md-12">
               
                   <form>
                   <div className="form-group " style={{ textAlign: "left" }}>
                    Email-Id:
                <input type="emai;" id="userEmail" className="form-control" />
                </div>

                            {/*<div style={{textAlign:'left'}}><button type="button" onClick={this.findBook} className="btn btn-warning" style={{alignContent : "left"}}>Make Admin</button>

            <button onClick={this.deleteBook} className="btn btn-danger" style={{marginLeft :'30px'}}>Remove Admin</button>*/}
            
            {/*</div>*/}

            <div style={{textAlign:'left'}}>
                <button type="button" onClick={this.deleteUser}
                className="btn btn-warning" style={{alignContent : "left"}}>Delete User
                </button>
            </div>


            
                    </form>
                  
                
            

          

           

        </div>
    </div>
</div>



                              <div>


<div className="card">
    <h5 className="card-header">Add user: </h5>
    <br />
    <div className="card-body">
        <div className="col-md-12">

            <form id="addUserForm" onSubmit={this.addUser}>
                <div class="form-group " style={{ textAlign: "left" }}>
                   Name
                <input type="text" class="form-control" id="Name"  required/>
                </div>

                <div class="form-group " style={{ textAlign: "left" }}>
                   User Name
                <input type="text" class="form-control" id="userName"  required/>
                </div>
                <div class="form-group " style={{ textAlign: "left" }}>
                  MID :
                <input type="text" class="form-control" id="mid"  required/>
                </div>
                <div class="form-group " style={{ textAlign: "left" }}>
                 Email :
                <input type="email" class="form-control" id="email" required/>
                </div>
                <div class="form-group " style={{ textAlign: "left" }}>
                 Password :
                <input type="password" class="form-control" id="password" required/>
                </div>
                 <div class="form-group " style={{ textAlign: "left" }}>
                  Role :
                  <select class="form-control" id="role">
                     <option value="user">user</option>
                     <option value="admin">admin</option>
                  </select>
                 </div>


                <div style={{ textAlign: "left" }}><button type="submit" class="btn btn-warning" style={{ textAlign: "left" }}>
                    Add user</button></div>
            </form>

            

        </div>
    </div>






</div></div>
</div>
</div>
</div>           
                </section>
                <br /><br />


                <div>





                </div>



                <AdminFooter />


            </div>









        )

    }


}

export default HandleUsers;


