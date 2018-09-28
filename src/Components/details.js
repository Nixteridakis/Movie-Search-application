import React from 'react';
import PropTypes from 'prop-types';

const Details = (props) =>{
	
	let currentMovie = props.state;

	if (currentMovie){
		let active = 'active';

		return(
			<div id='details' className={active}>
				<div className='overview-container'>
					<div className='inner-container'>
					<h2>Overview</h2>
					<h3 id='overview'>{currentMovie.Plot}</h3>
					</div>
				</div>
				<div className='details-container'>
				<div className='inner-container'>
					<h2>Details</h2>
					<ul>
						<li><h4>Director:</h4><h5>{currentMovie.Director}</h5></li>
						<li><h4>Actors:</h4><h5>{currentMovie.Actors}</h5></li>
						<li><h4>Language:</h4><h5>{currentMovie.Language}</h5></li>
						<li><h4>Genre:</h4><h5>{currentMovie.Genre}</h5></li>
						<li><h4>Runtime:</h4><h5>{currentMovie.Runtime}</h5></li>
						<li><h4>Production:</h4><h5>{currentMovie.Production}</h5></li>

					</ul>
				  </div>
				</div>
			</div>
			)
		}
		else {
			return(<div id='details' className=''></div>)
		}
	}

Details.propTypes = {
	state: PropTypes.object
};

export default Details;