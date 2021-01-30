import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//adminSide
import Login from './component/screens/adminSide/login';
//home
import LoginHome from './component/screens/adminSide/loginHome';
//apartment
import UploadApartment from './component/screens/adminSide/uploadApartment';
import EditApartment from './component/screens/adminSide/editApartment';
import ApartmentsRent from './component/screens/adminSide/apartmentsRent';
import ApartmentsSell from './component/screens/adminSide/apartmentsSell';
//check message
import CheckMessage from './component/screens/adminSide/checkMessage';
//recommended
import RecAdmin from './component/screens/adminSide/recommended';
import EditRec from './component/screens/adminSide/editRecommended';
import UploadRecommended from './component/screens/adminSide/uploadRecomended';
//article
import AdminArticles from './component/screens/adminSide/articles';
import EditArticle from './component/screens/adminSide/editArticle';
import ArticleUpload from './component/screens/adminSide/articleUpload';
//group
import Group from './component/screens/adminSide/group';
import AddToGroup from './component/screens/adminSide/addToGroup';
import EditGroup from './component/screens/adminSide/editGroup';
//feature
import Features from './component/screens/adminSide/features';
import UploadFeatures from './component/screens/adminSide/uploadFeatures';
import EditFeature from './component/screens/adminSide/editFeature';
//our articles
import OurArticle from './component/screens/adminSide/ourArticles';
import UploadOurArticle from './component/screens/adminSide/uploadOurArticle';
import EditOurArticle from './component/screens/adminSide/editOurArticle';


// import CheckUserLogin from './component/screens/adminSide/com/checkUserLogin';

//clientSide
import Home from './component/screens/clientSide/home';
import ContactUs from './component/screens/clientSide/contactUs';
import OurStory from './component/screens/clientSide/ourStory';
import ApartmentSell from './component/screens/clientSide/apartmentSell';
import ApartmentRent from './component/screens/clientSide/apartmentRent';
import ApartmentPage from './component/screens/clientSide/apartmentPage';
import TheGroup from './component/screens/clientSide/theGroup';
import Blog from './component/screens/clientSide/blog';
import Article from './component/screens/clientSide/article'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/component/reducer';
import firebase from './firebase';

import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import OurArticles from './component/screens/adminSide/ourArticles';
// import MoreExample from './moreExample';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

// Add firebase to reducers //
// const rootReducer = combineReducers({
//   firebase: firebaseReducer
// })

// Create store with reducers and initial state
const initialState = {}
const store = createStore(reducers, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

function App() {

  // const [apartment, setApartment] = useState([])


  return (
    <Router>

      <Switch>
        {/* <ItemProvider> */}
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>


            <Route exact path='/'><Home /></Route>
            <Route path='/contactUs'><ContactUs /></Route>
            <Route path='/apartmentSell' ><ApartmentSell /></Route>
            <Route path='/apartmentRent'><ApartmentRent /></Route>
            <Route path='/apartmentPage/:id'><ApartmentPage /></Route>
            <Route path='/theGroup'><TheGroup /></Route>
            <Route path='/ourStory'><OurStory /></Route>
            <Route exact path='/blog'><Blog /></Route>
            <Route path='/blog/:id'><Article /></Route>
            {/* admin */}
            <Route exact path='/login'><Login /></Route>
            {/* home */}
            <Route path='/login/home'  ><LoginHome /></Route>
            {/* message from mail */}
            <Route path='/login/checkMessage'><CheckMessage /></Route>
            {/* apartments */}
            <Route path='/login/apartmentsSell'><ApartmentsSell /></Route>
            <Route path='/login/apartmentsRent'><ApartmentsRent /></Route>
            <Route path='/login/uploadApartment/:id'><UploadApartment /></Route>
            <Route path='/login/editApartment/:id'><EditApartment /></Route>
            {/* recommended */}
            <Route path='/login/recommended'><RecAdmin /></Route>
            <Route path='/login/addRecommended'><UploadRecommended /></Route>
            <Route path='/login/editRecommended/:id'><EditRec /></Route>
            {/* articles */}
            <Route path='/login/uploadArticle'><ArticleUpload /></Route>
            <Route path='/login/articles'><AdminArticles /></Route>
            <Route path='/login/editArticle/:id'><EditArticle /></Route>
            {/* group */}
            <Route path='/login/group'><Group /></Route>
            <Route path='/login/addToGroup'><AddToGroup /></Route>
            <Route path='/login/editGroup/:id'><EditGroup /></Route>
            {/* features */}
            <Route path='/login/features'><Features /></Route>
            <Route path='/login/uploadFeature'><UploadFeatures /></Route>
            <Route path='/login/editFeature/:id'><EditFeature /></Route>
            {/* our article */}
            <Route path='/login/ourArticles'><OurArticle /></Route>
            <Route path='/login/uploadOurArticle'><UploadOurArticle /></Route>
            <Route path='/login/editOurArticle/:id'><EditOurArticle /></Route>

          </ReactReduxFirebaseProvider>
        </Provider>
        {/* </ItemProvider> */}

      </Switch>
    </Router>
  );
}

export default App;
