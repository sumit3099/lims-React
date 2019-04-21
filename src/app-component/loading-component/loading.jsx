import React, {Component} from 'react'
import './loading.css'
class LoadingEffect extends Component
{
	render()
		{
			return (
					<div className="row">
					<div id="loader">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="lading"></div>
						</div>
					</div>
					);
		}
}
export default LoadingEffect;