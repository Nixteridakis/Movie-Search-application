import React from 'react';
import PropTypes from 'prop-types';



const Wishlist = (props) => {

	const wishlistItems = props.wishlistState.map((movie,index) => {
		return(
			<div className='wishlist-item' key={index}>
				<div className='wishlist-img'><img src={movie.poster} alt='wishlist-item'/></div>
				<p className='title'>{movie.title}</p>
				<p className='year'>{movie.year}</p>
				<span id={index}
					  className='remove' 
					  onClick={() => props.removeWishlist(this, index)}>x</span>
			</div>
			)
	});
	return(
		<div id='wishlist'>
			<button className='wishlist-btn'>
				<i className="material-icons">local_movies</i>
				<div className='dropdown-content'> 
					{(props.wishlistState.length > 0) ? wishlistItems : '- Wishlist Empty -'}
				</div>
			</button>		
		</div>
	)	
}

Wishlist.propTypes = {
	wishlistState : PropTypes.array,
	removeWishlist : PropTypes.func.isRequired,
}

export default Wishlist;