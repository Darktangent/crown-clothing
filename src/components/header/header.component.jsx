import React from 'react';
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
const Header = ({ currentUser }) => (
	<div className='header'>
		<Link to='/' className='logo-container'>
			<Logo className='logo' />
		</Link>
		<div className='options'>
			<Link to='/shop' className='option'>
				Shop
			</Link>
			<Link to='/shop' className='option'>
				Contact
			</Link>
			{currentUser ? (
				<div className='option' onClick={() => auth.signOut()}>
					Sign Out
				</div>
			) : (
				<Link to='/signin' className='option'>
					Sign In
				</Link>
			)}
		</div>
	</div>
);
export default Header;
