import React from 'react';
import PropTypes from 'prop-types';

const Recommendations =(props) =>{

	const opacity ={
		opacity : 0.75
	}

	const list = props.reccState.map((movie,index)=>{
		return (
 				<div 
					id={`recommendation-${index+1}`} 
					key={index}
					onClick={() => props.handleClick(this, index)}>
				<a href='#search-container'><img src={movie.Poster} alt='Movie-Poster'/></a>
					<div 
						id={`recommendation-info-${index+1}`}
						key={index}
						onMouseEnter={() => props.onMouseEnter(this,index)}
						onMouseLeave={props.onMouseLeave}
						style={(props.hover === index) ? opacity : null}>
						<h2>{movie.Title}</h2>
						<h4>{movie.Year}</h4>
					</div>
				</div>

		)
	});
	
	return(
		<div id='recommendations' >
			<h1> Recommendations</h1>
			  <div id='container'>{list}</div>
			</div>
	)
};

Recommendations.propTypes = {
  reccState: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default Recommendations;
