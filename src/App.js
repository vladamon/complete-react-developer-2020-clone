import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

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
      const { setCurrentUser, collectionsArray } = this.props;

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
      // this was called only once, to store static data into firebase !!!
      //addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));

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
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={() => {
            return this.props.currentUser ?
              <Redirect to="/" /> :
              <SignInAndSignUpPage/>
          }} />
        </Switch>
      </div>
    );
  }
}

// we are using here structured selector even though we have only one property because
// in the future we can have more properties and then it is easier to add them with structured selector.
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser
// })

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
