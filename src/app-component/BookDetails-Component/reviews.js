import React, {Component} from 'react';
import $ from 'jquery';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {storeReviews} from '../../state/action/reviewAction';
import {css} from 'glamor'
import {borrowDate} from '../dates'
import {toast} from 'react-toastify';
import {addReview} from '.././mongo/addReview'
let ratingValue,reviewData,reviewChart;
class Reviews extends Component{
    constructor(){
        super();
        this.state={
            review:false,
            currentNumber:5,
            showdown:true,
            showArrow:true
        }
    }

    componentDidMount(){
        if(this.props.reviews!==null && this.props.reviews.length<=5)
        {
            this.setState({showArrow:false});
        }
    }
    leaveReview=()=>{
        if(this.state.review===false){
            this.setState({
                review:true
            })
        }
        else{
            this.setState({
                review:false
            })
        }
    }
    addReview = () => {
    // eslint-disable-next-line
        var item = new Object();
        item.mid = window.user;
        item.name=localStorage.getItem('user-name').split('"')[1]
        item.image=`https://social.mindtree.com/User%20Photos/Profile%20Pictures/m${window.user}_MThumb.jpg?t=63646089488`;
        item.date=borrowDate;
        if(document.getElementById("desc").value===""){
            document.getElementById("desc").focus();
            toast.warn("Please add a review", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: css({background: "blue"})
                });
        }
        else if(ratingValue===undefined || ratingValue===0){
          toast.warn("Please add a rating", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: css({background: "blue"})
                });  
        }
        else{
        item.rating=ratingValue;
        item.description = document
            .getElementById("desc")
            .value;
            var review;
            (async function () {
                review = await addReview(this.props.data.isbn, item);
                this
                .props
                .storeReviews(review)
            })
            .bind(this)();
              
        document.getElementById("desc").value="";
        this.setState({
            review:false
        })
         toast.success("Successfully Added !!!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: css({background: "brown"})
                });
    }
    }
    loadMore=()=>
    {
        if(this.props.reviews!==null)
        {
        if(this.state.currentNumber<=this.props.reviews.length)
        {
            
            this.setState({
                currentNumber:this.state.currentNumber+5,
                              
            })
        }
        
        else{
           
            this.setState({             
                showdown:false  
            })
        }
    }
    }
    showLess=()=>
    {
        this.setState({currentNumber:5,showdown:true});
    }

    render(){
        ratingValue=0;
        let count=[0,0,0,0,0];
        let reviewWidth=[0,0,0,0,0];

        if(this.props.reviews===null){
            reviewChart="";
            reviewData=(<h5 className="ml-4 mt-3" style={{color:"rgb(169,169,169)"}}>There are no reviews yet. Why don't you add one?</h5>)
        }
        else{
            //eslint-disable-next-line
            var chart=this.props.reviews.map((res)=>{
                count[res.rating-1]++
            })
        let total =count[0]+count[1]+count[2]+count[3]+count[4];
        for(var p=0;p<reviewWidth.length;p++)
        {
            reviewWidth[p]=(count[p]/ total)*100;
        }
            var values=this.props.reviews.slice(0,this.state.currentNumber).map((res)=>{
                let imageurl = `https://social.mindtree.com/User%20Photos/Profile%20Pictures/m${res.mid}_MThumb.jpg?t=63646089488`
                return (
                    <div className="card review-card ml-3 mb-4">
                    <div class="row">
						<div class="col-sm-3">
							<img src={imageurl} alt="Not Available" onClick={()=>{window.location.href=`https://peoplehub.mindtree.com/Profile/Pages/Profile.aspx?accountname=mindtree\\M${res.mid}`}} className="img-rounded eachImage my-3"/>
						</div>
						<div class="col-sm-9">
							<div class="review-block-rate">
                            <b style={{fontSize:"24px"}}>{res.name} says:</b>						
							</div>
							<div style={{fontSize:'18px'}} class="review-block-description">{res.description}<div>
                                {//eslint-disable-next-line
                                            [1, 2, 3, 4, 5].map(d => {

                                                if (res.rating >= d) 
                                                    return <span
                                                        key={`review${this.props.data.isbn}`}
                                                        className="fa fa-star"
                                                        style={{
                                                        color: '#ffd700',
                                                        fontSize: '16px'
                                                    }}></span>
                                            })}</div>
                                        </div>
                                        <div className="mr-3" style={{color:"rgb(169,169,169)", float:"left",fontSize:"16px",position:"absolute",right:"1%", bottom:"2%"}}>{res.date}</div>
                                        </div></div>
                                        </div>
                )
            })
            reviewChart=(<div className="row">
                             <div className="col-md-6 mb-4 ml-4 mt-3">

                                        <div className="pull-left">
                                            <div
                                                className="pull-left"
                                                style={{
                                                width: "60px",
                                                lineHeight: "1px"
                                            }}>
                                                <div
                                                    style={{
                                                    height: "9px"
                                                }}>5
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <div className="pull-left prgrsBar">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        style={{
                                                        width: `${reviewWidth[4]}%`
                                                    }}
                                                        aria-valuenow="5"
                                                        aria-valuemin="0"
                                                        aria-valuemax="5"></div>
                                                </div>
                                            </div>
                                            <div
                                                className="pull-right"
                                                style={{
                                                marginLeft: "10px"
                                            }}>{count[4]}</div>
                                        </div>
                                        <div className="pull-left">
                                            <div
                                                className="pull-left"
                                                style={{
                                                width: "60px",
                                                lineHeight: "1px"
                                            }}>
                                                <div
                                                    style={{
                                                    height: "9px"
                                                }}>4
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <div className="pull-left prgrsBar">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{
                                                        width: `${reviewWidth[3]}%`
                                                    }}
                                                        aria-valuenow="5"
                                                        aria-valuemin="0"
                                                        aria-valuemax="5"></div>
                                                </div>
                                            </div>
                                            <div
                                                className="pull-right"
                                                style={{
                                                marginLeft: "10px"
                                            }}>{count[3]}</div>
                                        </div>
                                        <div className="pull-left">
                                            <div
                                                className="pull-left"
                                                style={{
                                                width: "60px",
                                                lineHeight: "1px"
                                            }}>
                                                <div
                                                    style={{
                                                    height: "9px"
                                                }}>3
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <div className="pull-left prgrsBar">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        style={{
                                                        width: `${reviewWidth[2]}%`
                                                    }}
                                                        aria-valuenow="5"
                                                        aria-valuemin="0"
                                                        aria-valuemax="5"></div>
                                                </div>
                                            </div>
                                            <div
                                                className="pull-right"
                                                style={{
                                                marginLeft: "10px"
                                            }}>{count[2]}</div>
                                        </div>
                                        <div className="pull-left">
                                            <div
                                                className="pull-left"
                                                style={{
                                                width: "60px",
                                                lineHeight: "1px"
                                            }}>
                                                <div
                                                    style={{
                                                    height: "9px"
                                                }}>2
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <div className="pull-left prgrsBar">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        style={{
                                                        width: `${reviewWidth[1]}%`
                                                    }}
                                                        aria-valuenow="5"
                                                        aria-valuemin="0"
                                                        aria-valuemax="5"></div>
                                                </div>
                                            </div>
                                            <div
                                                className="pull-right"
                                                style={{
                                                marginLeft: "10px"
                                            }}>{count[1]}</div>
                                        </div>
                                        <div className="pull-left">
                                            <div
                                                className="pull-left"
                                                style={{
                                                width: "60px",
                                                lineHeight: "1px"
                                            }}>
                                                <div
                                                    style={{
                                                    height: "9px"
                                                }}>1
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <div className="pull-left prgrsBar">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        style={{
                                                        width: `${reviewWidth[0]}%`
                                                    }}
                                                        aria-valuenow="5"
                                                        aria-valuemin="0"
                                                        aria-valuemax="5"></div>
                                                </div>
                                            </div>
                                            <div
                                                className="pull-right"
                                                style={{
                                                marginLeft: "10px"
                                            }}>{count[0]}</div>
                                        </div>
                                        </div>
                            </div>)
            reviewData=(<div className="text-left ml-4 mr-4">                            
                        {values}
                        </div>)
        }
                let i;
        $(document).ready(function(){
  
  /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  }); 
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }   
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }  
    ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
  });
});
var cardReview=(<div className="card card-review mt-3 mb-5 ml-3" style={{backgroundColor:"rgb(255, 248, 220)", marginRight:"3%"}}>  
        <h5 className="text-left mt-4 mb-2 ml-3"><b><u>Description</u></b></h5>
                            <textarea rows="2" cols="50" className="review-input mt-3 ml-3 mr-3" style={{backgroundColor:"rgb(255, 248, 220)", width:"95%"}} placeholder="Description" id="desc"/>   
                            <div className='rating-widget ml-4 mt-3'>
                            <div className='rating-stars text-left'>
                                <ul id='stars'>
                                <li className='star' title='Poor' data-value='1'>
                                    <i className='fa fa-star fa-fw'></i>
                                </li>
                                <li className='star' title='Fair' data-value='2'>
                                    <i className='fa fa-star fa-fw'></i>
                                </li>
                                <li className='star' title='Good' data-value='3'>
                                    <i className='fa fa-star fa-fw'></i>
                                </li>
                                <li className='star' title='Excellent' data-value='4'>
                                    <i className='fa fa-star fa-fw'></i>
                                </li>
                                <li className='star' title='WOW!!!' data-value='5'>
                                    <i className='fa fa-star fa-fw'></i>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div className="text-right">
                            <button className="btn  details-btn col-md-2 col-xs-2 col-sm-2 col-lg-2 mt-1 ml-2 mr-2" 
                            
                            style={{borderColor: "rgb(205,133,63)", width:"95%",overflow:"hidden",fontSize:"auto"}} onClick={this.addReview}><div className="fa fa-pencil fa-lg"></div><b>Add</b> </button> 
                            <button className="btn  details-btn col-md-2 col-xs-2 col-sm-2 col-lg-2 mt-1 ml-2 mr-2" onClick={this.leaveReview} style={{borderColor: "rgb(205,133,63)", width:"95%",overflow:"hidden"}}>
                            <div className="fa fa-times fa-lg"></div><b>Cancel</b> </button> 
                            </div>  
                            </div> 
                         );
        return(
            <div className="col-md-12 mt-0 mb-5">
            <div className="card review-card" style={{backgroundColor:"rgb(255, 248, 220)",marginLeft:"7%", marginRight:"5%"}}>  
                            <div className="text-right">
                            </div>
                               <div className="row">
                            <h3 className="col-md-6 text-left mt-3 ml-3" style={{color:"rgb(205,133,63)"}}>Reviews and Ratings<div className="fa fa-pencil hidden-md-up" 
                            onClick={this.leaveReview} style={{position:"absolute", right:"4%"}}></div></h3>
                            <div><button className="btn  hidden-sm-down details-btn col-md-3  offset-md-4 col-sm-3 col-lg-3 mt-3 ml-2 mr-2" 
                            onClick={this.leaveReview} style={{borderColor: "rgb(205,133,63)", width:"95%",position:"absolute",right:"2%", overflow:"hidden"}} 
                           ><div className="fa fa-pencil fa-lg"></div>
                            <b>Leave A Review</b> </button>
                </div>
                </div> 
                {reviewChart}
                {this.state.review?cardReview:""}
                            {reviewData}
                            {this.props.reviews!==null && this.props.reviews.length>5?<div> {this.state.showdown?<div onClick={this.loadMore} style={{color:'rgb(31, 30, 88)', fontSize:'30px'}} className="fa fa-sort-down"></div>:<div onClick={this.showLess} style={{color:'rgb(31, 30, 88)', fontSize:'30px'}} className="fa fa-sort-up"></div>}</div>:null}
                            </div> 
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {bbooks: state.bbooks, wbooks: state.wbooks,reviews:state.reviews};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        storeReviews:storeReviews
    }, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Reviews);