import React,{useEffect,useState} from 'react'
// import { useDispatch,useSelector } from 'react-redux'
// import { loadUser } from '../redux/actions';
import axios from "axios"
import {Row,Navbar,Table, Button,Badge} from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom';
import Typewriter from "typewriter-effect";
const Home = () => {
    // const dispatch = useDispatch();
    // const {users} = useSelector(state => state.users)
    const history = useNavigate()
    const [dataFive, setDataFive] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [local,setLocal] = useState("")
  
    // console.log(users)
    useEffect(() => {
        axios.get(`http://localhost:8000/data`)
        .then((res) => {
            //console.log("res ====> ",res.data)
            setDataFive(res.data)
        })
        .catch((err) => {
            //console.log("error ==> ", err)
        } )
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
              setShowButton(true);
            } else {
              setShowButton(false);
            }
          });
        setLocal(localStorage.getItem("email"))     
    },[])
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
      const onLogOut = () =>{
          localStorage.clear();
          history("/")
      }
      console.log(local)
      

      
    return (
      <div>
        {local != null?
        <div>
              {showButton && (
            <Button style={{ position: "fixed",
            bottom: "20px",
            right: "20px",
            fontSize: "20px",
            background: "orange",
            color: "white",
            cursor: "pointer",
            bordeRadius: "100px",
            border: "none",
            boxShadow: "0 5px 10px #ccc"  }} onClick={scrollToTop}>  &#8679;</Button>)}
            <Row>
              <div className="col-sm-12">
              <Navbar style={{background:"#3B3D3D",padding:"35px"}}>
                
                    <Navbar.Brand style={{color:"white", fontSize:"30px"}}>Admin panel</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{color:"white"}}>
                        Signed in as: <a style={{color:"white"}}>{localStorage.getItem("email")}</a>
                       &nbsp;&nbsp; <a onClick={() => onLogOut()} style={{color:"white",cursor:"default",textDecoration:"none"}}>Log out</a>
                    </Navbar.Text>
                    </Navbar.Collapse>
                
                </Navbar>
              </div>
            </Row>
            <div style={{height:"78vh", width:"100vw",background:"#DCDCDC"}}>
            <div className='container'>
            <Row>
           
            <div className='col-sm-12'>
            <Typewriter
                onInit={(typewriter)=> {
                typewriter
                .typeString(`Welcome ${localStorage.getItem("email")}`)   
                .pauseFor(1000)
                .deleteAll()
                .typeString("Admin")
                .deleteAll()
                .start();
                
                }}
                style={{fontSize:"32px"}}
                />
            <Table striped bordered hover variant="dark" style={{marginTop:"40px"}}>
            <thead>
            <tr>
                <th>User Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
                <th>Type</th>
            </tr>
            </thead>
            <tbody>
            {dataFive && dataFive.map((i) => {
                return (
                <tr>
                    <td>{i.userId}</td>
                    <td>{i.title}</td>
                    <td><div dangerouslySetInnerHTML={{ __html: i.description}}  /></td>
                    <td><img src={require(`../images/${i.link}`)} style={{height:"100px",width:"100px"}}/></td>
                    <td>{i.type === "bug" ?<Badge bg="danger">{i.type}</Badge>:null}
                    {i.type === "discussion" ?<Badge bg="info">{i.type}</Badge>:null}
                    {i.type === "review" ?<Badge bg="warning">{i.type}</Badge>:null}
                    
                    </td>
                </tr>
                )
            })}
            </tbody>
        </Table>  
            </div>
            
            </Row>
            </div>
            </div>
        </div>:
        <div>
        <h2>{JSON.stringify({Error : 'Please sign up or login properly and do visit again'})}</h2>
        <Link to="/login">Login Here</Link>
        </div>
        }
        </div>
    )
         
}

export default Home
