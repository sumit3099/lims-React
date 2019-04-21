import React, { Component } from 'react';
import './profileDetails.css';
import {requireAuth} from '../../../isLoggedIn.js'
import {url} from '../../../App'
import {connect} from 'react-redux';
import { Route } from 'react-router-dom'
import MyWishList from'./MyWishList';

let bookName, wishBookName;

class Profile extends Component {
	constructor()
	{
		super();
		this.state={
			showMore:false,
			isWishFilled:true,
			isBorrowedFilled:true
		}
	}
	componentWillMount() {
	if(this.props.wbooks!==null) {
		if(this.props.wbooks.length>4)
		{
			this.setState({showMore:true});
		}
	    if(this.props.wbooks.length===0)
		{
			this.setState({isWishFilled:false});
		}
	    if(this.props.bbooks.length===0)
		{
			this.setState({isBorrowedFilled:false});
		}
	}
	else if(this.props.wbooks===null) {
		window.location.replace('/#/')
	}
		requireAuth(window.location.href)
	}
	profileWislist()
	{
		document.getElementById("openProfileWishlist").click();
	}
	handle=(arg)=>
	{
        window.selected=arg;
        window.showDetails=true;
		window.location=`/#/details/${arg.isbn}`
        // document.getElementById('detail').click();
        window.setClickProps="profile"
	}
  
  render() {
	  if(this.props.bbooks!==null) {
	  bookName=this.props.bbooks.map((res)=>{
		  return(
			  <div className="eachTitle mt-2 mb-2 ml-2">
			  <span className="fa fa-arrow-right" />
              <b className="hoverTitle"  onClick={this.handle.bind(this,res)}>{res.title}</b>
			  </div>
		  );
	  })
	}
	else if(this.props.bbooks===null)
	{
		window.location.replace('/#/')
	}
	if(this.props.wbooks!==null) {
	  wishBookName=this.props.wbooks.slice(0,4).map((res)=>{
		  return(
			  <div className="eachTitle mt-2 mb-2 ml-2">
			  <span className="fa fa-arrow-right" />
              <b className="hoverTitle"  onClick={this.handle.bind(this,res)}>{res.title}</b>
			  </div>
		  );
	  })
	}
	else if(this.props.wbooks===null) {
		window.location.replace('/#/')
	}
    return (
    <div className="carders contained mt-4"style={{backgroundColor : "rgb(239, 226, 234)  ", minHeight : "33px"}}>
{/*<Header />*/}
        <ol className="breadcrumb" style={{backgroundColor : "rgb(31, 30, 88)", color : "white", height:"50px" , fontSize : "15px"}}  >
        <h5 >My Profile <span id="openHome" style={{float:'right',cursor:'pointer',paddingLeft:'85px'}} onClick={(e)=>{e.preventDefault(); window.history.back()}}>x</span></h5>
        </ol>
<div className="container-fluid"  >
  <br/><nr />
	<div className="innerwrap">
		<section className="section1 clearfix">
			<div>
				<div className="row grid clearfix">
					<div className="col2 first">
						<img src={url} alt="" class="center-block img-circle img-responsive outset" style={{height : "150px", width : "150px"}} />
						<h1>{JSON.parse(localStorage.getItem('limsuser')).name}</h1>
						<p>{JSON.parse(localStorage.getItem('limsuser')).name}</p>
						
					</div>
					<div className="col2 last">
						<div className="grid clearfix">
							<div className="col3 first">
								<h1>{this.props.bbooks!==null?this.props.bbooks.length:null}</h1>
								<span>Books Borrowed</span>
							</div>
							<div className="col3"><h1>{this.props.wbooks!==null?this.props.wbooks.length:null}</h1>
							<span>Wishlist</span></div>
						</div>
					</div>
				</div>
				{}
				<div className="row">
				<div className="col-md-6 mt-5">
				<div className="detailsCard">
				<h3 className="mt-3">Borrowed Books</h3>
				<div className="horizontalLine mx-auto mt-3"/>
				<div className="mt-3">
                {this.state.isBorrowedFilled?<div>{bookName}</div>:<div className="mt-5"><b>No Borrowed book!<br/>Its very easy to borrow a book from Mindtree library.</b></div>}
				</div>
				</div>
				</div>

				<div className="col-md-6 mt-5">
				<div className="detailsCard">
				<h3 className="mt-3">Wished Books</h3>
				<div className="horizontalLine mx-auto mt-3"/>
				<div className="mt-3">
                {this.state.isWishFilled?<div>{wishBookName}</div>:<div className="mt-5"><b>No wished book!<br/>Don't hesitate Mindtree gives the freedom to wish.</b></div>}
				</div>
				{this.state.showMore?<div className="more mr-3" onClick={this.profileWislist}><b>more..</b></div>:null}
				</div>
				</div>
				</div>


<div>
	            <Route path="/profile/mywishlist" exact component={MyWishList} />

	</div>
				
			</div>
		</section>
		{/*<section className="section2 clearfix">*/}
			{/*<div className="grid">*/}
				{/*<div className="col3 first">
					<div className="postcont"><img src="https://www.ohmyindia.com/wp-content/uploads/2017/09/dhoni8.jpg" alt="" />
					</div>*/}
					{/*<div className="profileinfo">
						<img src="https://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt="" />
						<p>MS Dhoni has hit most sixes for India in international cricket</p>
						<span>Read more <i className="fa fa-angle-right"></i></span>
					</div>
				</div>*/}
				{/*<div className="col3 center">
					<div className="postcont"><img src="https://d1u4oo4rb13yy8.cloudfront.net/article/67350-wcbqbtpugy-1504272183.jpg" alt="" />
					</div>*/}
					{/*<div className="profileinfo">
						<img src="https://d1u4oo4rb13yy8.cloudfront.net/article/67350-wcbqbtpugy-1504272183.jpg" alt="" />
						<p>MS Dhoni has been involved in most T20 wins</p>
						<span>Read more <i className="fa fa-angle-right"></i></span>
					</div>
				</div>*/}
				{/*<div className="col3 last">
					<div className="postcont"><img src="https://ste.india.com/sites/default/files/2017/07/06/607698-ms-dhoni-pc-pti4.jpg" alt="" />
					</div>*/}
					{/*<div className="profileinfo">
						<img src="https://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt="" />
						<p>MS Dhoni has captained most number of intl. matches (334)</p>
						<span>Read more <i className="fa fa-angle-right"></i></span>
					</div>*/}
				{/*</div>
			</div>
		</section>*/}
	</div>
</div>	
<br />
<br />
<br />
   </div>
    )}
}
function mapStateToProps(state) {
    return {
        bbooks: state.bbooks,
		wbooks:state.wbooks
    };
}
export default connect(mapStateToProps)(Profile);