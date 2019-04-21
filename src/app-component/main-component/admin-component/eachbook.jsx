import React from 'react';
import './eachbook.css';
export const Cards =(props) =>
{
return(
    <div>

 <div className="card-columns">

        <div className="card" >
  <img className="card-img-top" src="https://www.taylor.lib.mi.us/ImageRepository/Document?documentID=1858" height="200" width="215" alt="Card image cap" />
  <div className="card-block">
    <h4 className="card-title">Title : {props.data.details.title}</h4>
    <p className="card-text"><b> ISBN :</b><span> {props.data.isbn}</span></p>
    <p className="card-text"><b> Issued Date :</b><span>{props.data.details.borrowedDate}</span></p>
    <p className="card-text"><b> Return Date : </b><span>{props.data.details.returnDate}</span></p>
    </div>
  </div>
</div>

{/*<div className="container">
  <h2>Carousel Example</h2>  
  <div id="myCarousel" className="carousel slide" data-ride="carousel">
   
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    
    <div className="carousel-inner">
      <div className="item active">
        <img src="la.jpg" alt="Los Angeles" width="100%" />
      </div>

      <div className="item">
        <img src="chicago.jpg" alt="Chicago" width="100%" />
      </div>
    
      <div className="item">
        <img src="ny.jpg" alt="New york" width="100%" />
      </div>
    </div>

    
    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>*/}
           
        </div>

);
} 