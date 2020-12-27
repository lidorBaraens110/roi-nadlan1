import React, { useEffect, useContext, useState } from 'react';
import './App.css';
import { ApartmentProvider } from './context/apartmentContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './component/screens/home';
import ContactUs from './component/screens/contactUs';
import Login from './component/screens/uploadSide/login';
import UploadImage from './component/screens/uploadSide/uploadItem';
import LoginHome from './component/screens/uploadSide/loginHome';
import EditItem from './component/screens/uploadSide/editItem';
import UploadRecommended from './component/screens/uploadSide/uploadRecomended';
import OurStory from './component/screens/ourStory';
import ApartmentSell from './component/screens/apartmentSell';
import ApartmentRent from './component/screens/apartmentRent';
import firebase from './firebase/index'


function App() {

  // const [apartment, setApartment] = useState([])


  return (
    <Router>

      <Switch>
        <ApartmentProvider>
          <Route exact path='/'><Home /></Route>
          <Route path='/contactUs'><ContactUs /></Route>
          <Route exact path='/login'><Login /></Route>
          <Route path='/login/home'><LoginHome /></Route>
          <Route path='/login/uploadImage'><UploadImage /></Route>
          <Route path='/login/editItem'><EditItem /></Route>
          <Route path='/login/recommended'><UploadRecommended /></Route>
          <Route path='/apartmentSell'><ApartmentSell /></Route>
          <Route path='/apartmentRent'><ApartmentRent /></Route>
          <Route path='/ourStory'><OurStory /></Route>
        </ApartmentProvider>
      </Switch>
    </Router>
  );
}

export default App;
