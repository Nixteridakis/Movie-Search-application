import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) =>{

		return(
			<footer id="footer">
				<span className='arrow-container' onClick={() => {props.scroll(1)}}>
					<span className='shape1'></span>
					<span className='shape2'></span>
				</span>
				<div>Marinos Chrysanthou</div>
				<div>2018</div>
				<div>Powered by React</div>
			</footer>
		)
	}

Footer.propTypes = {
	scroll: PropTypes.func.isRequired
}

export default Footer;