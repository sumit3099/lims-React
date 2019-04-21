import React, { Component } from 'react';
import './prodetails.css';
import AlternateHeader from '../../../../app-component/header-component/AlternateHeader/AlternateHeader';
import Footer from '../../../../app-component/footer-component/footer.jsx';
import {requireAuth} from '../../../isLoggedIn.js'
// import {url} from '../../../header-component/header'
import {url} from '../../../App'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MyWishList from'./MyWishList';

class Profile extends Component {
	componentWillMount() {
		requireAuth(window.location.href)
	}
  
  render() {

    return (
    <div style={{backgroundColor : "rgb(239, 226, 234)  ", minHeight : "33px"}}>
{/*<Header />*/}
<div className="container-fluid"  >
  <br/><nr />
	<div className="innerwrap">
		<section className="section1 clearfix">
			<div>
				<div className="row grid clearfix">
					<div className="col2 first">
						<img src={url} alt="" className="center-block img-circle img-responsive outset" style={{height : "150px", width : "150px"}} />
						<h1>{JSON.parse(localStorage.getItem('limsuser')).profile.name}</h1>
						<p>{JSON.parse(localStorage.getItem('limsuser')).profile.unique_name}</p>
						
					</div>
					<div className="col2 last">
						<div className="grid clearfix">
							<div className="col3 first">
								<h1>{this.props.bbooks.length}</h1>
								<span>Books Borrowed</span>
							</div>
							<div className="col3"><h1>9</h1>
							<span>Wishlist</span></div>
							<div className="col3 last"><h1>12</h1>
							<span>Books Requested</span></div>
						</div>
					</div>
				</div>
				<div className="container" style={{minHeight : "33px"}}>
					<ul className="row2tab clearfix">

						{/*<li><i className="fa fa-list-alt"></i> My Books </li>
						<Link to="/mywishlist">
						<li><i className="fa fa-heart"></i> My WishList </li>
						</Link>
						<li><i className="fa fa-check"></i> My Requests </li>
						<li><i className="fa fa-thumbs-o-up "></i> Reviews </li>*/}

						<li><i className="fa fa-list-alt"></i> <a href="#tab_default_1" data-toggle="tab" >My Books</a> </li>
						<li><i className="fa fa-heart"></i> <a href="#tab_default_1" data-toggle="tab" >
    My WishList</a> </li>
						<li><i className="fa fa-check"></i><a href="#tab_default_1" data-toggle="tab"> My Requests </a></li>
						<li><i className="fa fa-thumbs-o-up "></i><a href="#tab_default_1" data-toggle="tab"> Reviews</a> </li>

					</ul>
				</div>


<div>
	            <Route path="/profile/mywishlist" exact component={MyWishList} />

	</div>
				
			</div>
			<span className="smalltri">
				
			<i className="fa fa-star"></i>
			</span>
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
        bbooks: state.bbooks
    };
}
export default connect(mapStateToProps)(Profile);