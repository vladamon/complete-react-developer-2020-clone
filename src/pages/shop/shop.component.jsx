import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    // classical fetch pattern
    // fetch('https://firestore.googleapis.com/v1/projects/crown-db-c77eb/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections));

    //promise based pattern
    collectionRef.get()
    .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        console.log(collectionsMap);
        updateCollections(collectionsMap);
        this.setState({
          loading: false
        })
      }
    );

    // observer pattern - subscription
    // collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   console.log(collectionsMap);
    //   updateCollections(collectionsMap);
    //   this.setState({
    //     loading: false
    //   });
    // });
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />}></Route>
        <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}></Route>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
