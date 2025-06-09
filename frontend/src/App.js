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
         <Route path='/rejected' element={<Rejected/>}/>
       </Routes>
      </BrowserRouter>

     
    </div>
  );
}

export default App;
