import React,{useEffect} from 'react';
import './App.css';
import Home from './pages/Home';
import {Routes,Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import {useSelector, useDispatch} from 'react-redux'
import { loadUser } from './redux/actions';
import HomeOne from './pages/HomeOne';


function App() {
    let dispatch = useDispatch();
    const {users} = useSelector(state => state.users)
    useEffect(() => {
     dispatch(loadUser())
    }, [])
    let val =  localStorage.getItem("id")
   // console.log("users==> ",users)
   // console.log("id => ",localStorage.getItem("id") )
    
  // //  console.log("userOne ===> " ,users.filter((id) => id.id == val ))
  //     // let home = users.filter((id) => id.id == val)
  //     // console.log("home ==>",home)
    

  return (
   <div>
     <Routes>
       <Route exact path ="/" element={<SignUp/>}/>
       <Route  path ="/login" element={<LogIn />}/>
       <Route  path ="/home" element={<Home/>}/>
       <Route path = {`/homeOne/:id`} element={<HomeOne />}/>
     </Routes>
     {/* <Editor1/> */}
   </div>
  );
}

export default App;
