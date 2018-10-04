import React from 'react';
import Wishlist from './wishlist';
import PropTypes from 'prop-types';


class SearchBox extends React.Component {

 	render(){
	let currentMovie = this.props.movieState;
	let top = (currentMovie) ? 'top' : '';
	let dropdownItems = this.props.dropdownState.map((item,index)=>{
		return(
			<option value={item} key={index}/>
			)
	});
		return(
			<div id='search-container'>
				<Wishlist wishlistState={this.props.wishlistState}
						  removeWishlist={this.props.removeWishlist}/>
			  	<form className={`search-bar ${top}`} onSubmit={e => e.preventDefault()} >
			  		<label htmlFor='search'><h1>LOOK FOR A MOVIE</h1></label>
  					<input list="options"
  						   id='search' 
  						   type="text" 
  						   value={this.props.input} 
  						   name="search" 
  						   onChange={(e) => this.props.handleChange(e)}
  						   onKeyDown={this.props.dropdownSelect}
  						  	
  						   />
  					<datalist id='options'>{dropdownItems}</datalist>
				</form>
			</div>
		)
	}
}

SearchBox.propTypes = {
	movieState : PropTypes.object,
	dropdownState : PropTypes.array.isRequired,
	input : PropTypes.string.isRequired,
	handleChange : PropTypes.func.isRequired,
	dropdownSelect : PropTypes.func.isRequired 
}

export default SearchBox;