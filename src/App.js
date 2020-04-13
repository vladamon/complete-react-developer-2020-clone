import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/user.actions';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // open subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const { setCurrentUser } = this.props;

      // if users logged in, we will get this.
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(0)
          })

          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data(0)
          //   }
          // }, () => {
          //   console.log(this.state);
          // })
        });
      }

      // this is for setting state for current user when user logs out.
      // this.setState({
      //   currentUser: userAuth
      // });
      setCurrentUser(userAuth);

      console.log({ user: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
