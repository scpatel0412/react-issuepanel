import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { loadUser } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import {Row,Form,Button} from "react-bootstrap"

import Typewriter from "typewriter-effect";
const LogIn = () => {

    const [dataTwo, setDataTwo] = useState({email:'',pass:''})
    const [error, setError] = useState('')
    let dispatch =  useDispatch()
    let history = useNavigate();
    const {users} = useSelector(state => state.users)
    // console.log(users)
    // window.location.reload();
    // const reloadUsingLocationHash = () => {
    //   window.location.reload();
    // }
    // window.onload = reloadUsingLocationHash();
    // useEffect(() => {
       
        
    
    // })




     const handleLogin = (e) => {
      dispatch(loadUser())
        e.preventDefault()
        if(dataTwo.email === "" || dataTwo.pass === ""){
            setError('Please fill all data!!')
        }
        else{
            users.map((i,k) => 
               { 
                   if(dataTwo.email === i.email && dataTwo.pass === i.pass ){
                     if(i.isAdmin === "yes"){
                        localStorage.setItem("id",i._id)
                        localStorage.setItem("email",i.email)
                        history(`/home`)    
                     }
                     else{
                        localStorage.setItem("id",i._id)
                        localStorage.setItem("email",i.email)
                        history(`/homeOne/${i._id}`)
                     }  
                   
                   }
                   
                     
                        
                    
                     else{setError('No login matched instead signup!')} 
                     
               }

             )
        }
        
     }




    return (
        <div className='container-fluid' style={{background:"#DDDFDF"}}>
         <Row>
          <div className='col-sm-8' style={{backgroundImage : `url(https://unsplash.com/photos/oR0uERTVyD0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fHx8MTY0NTAxNzkyMw&force=true)`,height:"100vh",width:"700px",backgroundRepeat:"no-repeat",backgroundSize:"800px 800px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>

          </div>
          <div className='col-sm-3' style={{marginTop:"150px",marginLeft:"20px"}}>
          <h1 style={{fontSize:"30px"}}>Login</h1>
          <Typewriter
                onInit={(typewriter)=> {
                typewriter
                .typeString("Issue panel")   
                .pauseFor(1000)
                .deleteAll()
                .typeString("Login to proceed")
                .deleteAll()
                .start();
                
                }}
                style={{fontSize:"32px"}}
                />
          <hr/>
            <p style={{fontSize:"20px", color:"red",textShadow:" 0px 3px 3px rgba(255,255,255,0.5)"}}>{error}</p>
            
            <Form onSubmit ={handleLogin}  >
                <Form.Group>
                <Form.Label style={{fontSize:"20px"}}>Email</Form.Label>
                <Form.Control style={{padding:"15px"}} type="text"  placeholder="Enter email" value={dataTwo.email} onChange={(e) => setDataTwo({...dataTwo,email:e.target.value})} />
                </Form.Group>
                <Form.Group>
                <Form.Label style={{fontSize:"20px"}}>Password</Form.Label>
                <Form.Control style={{padding:"15px"}} type="password" placeholder="Enter password" value={dataTwo.pass} onChange={(e) => setDataTwo({...dataTwo,pass:e.target.value})}  />
                </Form.Group>
                <Button type="submit" size="lg" style={{background:"#565656",border:"none",paddingLeft:"90px", paddingRight:"90px",marginTop:"30px"}}>Login</Button>
            </Form>
            <hr/>
            <Link to="/" style={{paddingTop:"20px",textDecoration:"none"}}>New user sign up!!!</Link>
          </div>
           
         </Row>
        </div>
    )
}

export default LogIn
