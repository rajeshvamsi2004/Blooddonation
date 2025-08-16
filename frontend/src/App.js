import './App.css';
import FrontPage from './FrontPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import Donor from './Donor';
import ToastNotification from './ToastNotification';
import Don from './Don'
import Request from './Request'
import Donorboard from './Donorboard';
import Dash from './Dash';
import Profile from './Profile';
import Review from './Review';
import Accepted from './Accepted';
import Rejected from './Rejected';
import Slide from './Slide'
import Photo from './Photo';
import AddBloodCamp from './AddBloodCamp';
import Bloodcampsearch from './Bloodcampsearch'
import Location from './Location';
import Donation from './Donation';
import BloodCampPage from './BloodCampPage';
import Eligibility from './Eligibility';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
       <Route path='/' element={<FrontPage/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<SignUp/>}/>
         <Route path='/donorlogin' element={<Don/>}/>
         <Route path='/request' element={<Request/>}/>
         <Route path='/donor' element={<Donor/>}/>
         <Route path='/toast' element={<ToastNotification/>}/>
         <Route path='/board' element={<Donorboard/>}/>
         <Route path='/box' element={<Dash/>}/>
         <Route path='/slides' element={<Slide/>}/>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/pendings' element={<Review/>}/>
         <Route path='/accepted' element={<Accepted/>}/>
         <Route path='/rejected' element={<Rejected type="rejected" />}/>
         <Route path='/change' element={<Photo/>}/>
         <Route path='/addbloodcamp' element={<AddBloodCamp/>}/>
         <Route path='bloodcamps' element={<BloodCampPage/>}/>
         <Route path='/bloodbanks' element={<Location/>}/>
         <Route path='/donation' element={<Donation/>}/>
         <Route path='/eligibility' element={<Eligibility/>}/>
       </Routes>
      </BrowserRouter>

     
    </div>
  );
}

export default App;
