import React from 'react';
import Logo from '../assets/img/logo.svg';

const navbar = () => {
	return (
		<header className="header">
			<div className="header-body">
				<div className="app-logo">
					<img src={Logo} alt="Logo" style={{ color: 'white' }} />
					<span>React App</span>
				</div>
			</div>
		</header>
	)
}

export default navbar;