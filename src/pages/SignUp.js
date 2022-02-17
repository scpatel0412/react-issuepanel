import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from '../redux/actions';
import { Row,Form,Button } from 'react-bootstrap';

import Typewriter from "typewriter-effect";
import axios from 'axios'
import { loadUser } from '../redux/actions';

const SignUp = () => {

    const [dataOne, setDataOne] = useState({
       
        email:"",
        pass:"",
        isAdmin:""
    })
    const [formdata, setformdata] = useState('')
    
    const [error, setError] = useState('')
    const {users} = useSelector(state => state.users)
    // useEffect(() => {
    //     dispatch(loadUser())
    // },[]);
    // console.log('users ===>',users)
    let history =  useNavigate()
    let dispatch = useDispatch() 
    const HandleSubmit = (e) => {
        dispatch(loadUser())
          e.preventDefault();
  
          if(dataOne.email === "" || dataOne.pass === "" ||dataOne.isAdmin ===""){
              setError('Please fill all data in all forms')
          }
     
          else{
             
              
                    dispatch(addUser(dataOne))
                   history("/login",{ replace: true })
                          
           }


          
    }
   
    return (
        <div className='container-fluid' style={{background:"#DDDFDF  "}}>
            <Row>
            <div className='col-sm-8' style={{backgroundImage : `url(https://unsplash.com/photos/oR0uERTVyD0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fHx8MTY0NTAxNzkyMw&force=true)`,height:"100vh",width:"700px",backgroundRepeat:"no-repeat",backgroundSize:"800px 800px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>

            </div>
            <div className='col-sm-3' style={{marginTop:"80px",marginLeft:"20px"}}>
           
            <h1 style={{fontSize:"30px"}}>Sign up</h1>
            <Typewriter
                onInit={(typewriter)=> {
                typewriter
                .typeString("Issue panel")   
                .pauseFor(1000)
                .deleteAll()
                .typeString("Sign up to proceed")
                .deleteAll()
                .start();
                
                }}
                style={{fontSize:"32px"}}
                />
            <hr/>
            <p style={{fontSize:"20px", color:"red"}}>{error}</p>
            <Form onSubmit={HandleSubmit}>
                <Form.Group>
                <Form.Label style={{fontSize:"20px"}}>Email</Form.Label>
                <Form.Control style={{padding:"15px"}}  type="text" placeholder="enter email" value={dataOne.email} onChange={(e) => setDataOne({...dataOne,email:e.target.value})}/><br/>
                </Form.Group>
                <Form.Group>
                <Form.Label style={{fontSize:"20px"}}>Password</Form.Label>
                <Form.Control style={{padding:"15px"}}  type="password" placeholder="enter password" value={dataOne.pass} onChange={(e) => setDataOne({...dataOne,pass:e.target.value})}/><br/>
                </Form.Group>
                
                <Form.Group className="form-check-inline"> 
                Admin &nbsp; &nbsp;
                <Form.Check className="form-check-inline" type ="radio" value="yes" label="Yes" name="admin" onChange={(e) => setDataOne({...dataOne,isAdmin:e.target.value})}/>
                <Form.Check className="form-check-inline" type ="radio" value="no" name="admin" label="No" onChange={(e) => setDataOne({...dataOne,isAdmin:e.target.value})}/>
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Admin</Form.Label>
                <Form.Select  onChange={(e) =>  setDataOne({...dataOne,isAdmin:e.target.value})} placeholder='enter your type'>
                <option value="">Select any one</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
             </Form.Select>
             </Form.Group> */}
                 
                <Button type="submit" style={{background:"#565656",border:"none",paddingLeft:"85px", paddingRight:"85px",marginTop:"30px"}}>Sign up</Button>
                <hr/>
            <p style={{paddingTop:"20px"}}>Already have account <Link to="/login" style={{textDecoration:"none"}}>Login</Link></p>
            </Form>
            
            </div>
            </Row>
        </div>
    )
}

export default SignUp
