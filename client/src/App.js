

import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home'
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
import About from './components/About';
import './index.css';

import AddPost from './components/AddPost';
import AllPosts from './components/AllPosts';
import OnePost from './components/OnePost';
import Request from './components/Request';
import Notification from './components/Notification';


function App() {
  return( <>
    
    <Navbar />
    <Route exact path='/'>
       <Home/>
    </Route>
    <Route path='/Signup'>
       <Signup/>
    </Route>
    <Route path='/Login'>
      <Login />
    </Route>
    <Route path='/About'>
       <About/>
    </Route>
    <Route exact path='/AllPosts/:id'>
      <OnePost/>
    </Route>
    <Route exact path='/Request'>
      <Request/>
    </Route>
    <Route exact  path='/AllPosts/'>
      <AllPosts/>
    </Route>
   
     <Route path='/Addpost'>
      <AddPost/>
    </Route>
    <Route path='/Notify'>
      <Notification/>
    </Route>
   
   
  </>)
  
  
}

export default App;
