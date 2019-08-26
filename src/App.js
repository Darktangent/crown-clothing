import React from 'react';
import './App.css';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		currentUser: null
	// 	};
	// }
	unsubscribeFromAuth = null;
	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
			// this.setState({ currentUser: user });
			// console.log(user);
		});
	}
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}
	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact component={HomePage} path='/' />
					<Route exact component={ShopPage} path='/shop' />
					<Route exact component={SignInAndSignUpPage} path='/signin' />
				</Switch>
			</div>
		);
	}
}
const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
	null,
	mapDispatchToProps
)(App);
