import React from 'react';
import { ItemProvider } from './context/itemContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Login from './component/screens/adminSide/login';
import UploadImage from './component/screens/adminSide/uploadItem';
import LoginHome from './component/screens/adminSide/loginHome';
import CheckMessage from './component/screens/adminSide/checkMessage';
import EditItem from './component/screens/adminSide/editItem';
import UploadRecommended from './component/screens/adminSide/uploadRecomended';
import Home from './component/screens/clientSide/home';
import ContactUs from './component/screens/clientSide/contactUs';
import OurStory from './component/screens/clientSide/ourStory';
import ApartmentSell from './component/screens/clientSide/apartmentSell';
import ApartmentRent from './component/screens/clientSide/apartmentRent';
import ApartmentPage from './component/screens/clientSide/apartmentPage';
import TheGroup from './component/screens/clientSide/theGroup';




function App() {

  // const [apartment, setApartment] = useState([])


  return (
    <Router>

      <Switch>
        <ItemProvider>
          <Route exact path='/'><Home /></Route>
          <Route path='/contactUs'><ContactUs /></Route>
          <Route exact path='/login'><Login /></Route>
          <Route path='/login/home'><LoginHome /></Route>
          <Route path='/login/checkMessage'><CheckMessage /></Route>
          <Route path='/login/uploadImage'><UploadImage /></Route>
          <Route path='/login/editItem'><EditItem /></Route>
          <Route path='/login/recommended'><UploadRecommended /></Route>
          <Route path='/apartmentSell'><ApartmentSell /></Route>
          <Route path='/apartmentRent'><ApartmentRent /></Route>
          <Route path='/apartmentPage/:id'><ApartmentPage /></Route>
          <Route path='/theGroup'><TheGroup /></Route>
          <Route path='/ourStory'><OurStory /></Route>
        </ItemProvider>
      </Switch>
    </Router>
  );
}

export default App;
