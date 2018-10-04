import React from 'react';
import { starFactory } from '../helpers';
import { releaseDate } from '../helpers';
import PropTypes from 'prop-types';

const Bulletpoints = (props) => {

	let currentMovie = props.state;
	
	if(currentMovie !==null | undefined){
		let active = 'active';
		let starArr = starFactory(currentMovie.Ratings[0].Value);
		let stars = (starArr.map((item,index) => { return( <i className={item} key={index}></i>);}));
		let year = releaseDate(currentMovie.Released);
		return(
			<div id='bulletpoints' className={active}>
				<div id='poster'>
					<img src={currentMovie.Poster} alt='movie-poster'/>
				</div>
				<div className='movie-bulletpoints'>
					<ul>
						<li><h1 id='movie-title'>{currentMovie.Title}</h1></li>
						<li id='release-year'>{year}</li>
						<li id='genre'>{currentMovie.Genre}</li>
						<li>
							<a href='#'
							   data-easing='easeInCubic' 
							   onClick={props.SmoothScroll} 
							   id='details-buton'>DETAILS
							</a>
						<button title='Add To Wishlist' id='add_wishlist' onClick={props.addWishlist}><span>+</span></button>	
						</li>
						<li>
							<div id='stars'>
								{stars}
							</div>
							<div id='rating'>{currentMovie.Ratings[0].Value}</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
	else{
		return (<div id='bulletpoints' className=''></div>)
	}
}

Bulletpoints.propTypes = {
  state: PropTypes.object,
  SmoothScroll: PropTypes.func.isRequired
};

export default Bulletpoints;