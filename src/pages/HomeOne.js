import React,{useState,useEffect} from 'react'
// import { Form } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { addIssue } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Row,Navbar,Table,Button,Form,OverlayTrigger,Popover,Badge} from 'react-bootstrap'

import {CKEditor} from '@ckeditor/ckeditor5-react'
import  ClassicEditor  from "@ckeditor/ckeditor5-build-classic";
// import maldives from "../images/"
// import { render } from '@testing-library/react';


const HomeOne = () => {
   let history = useNavigate();
   //let dispatch = useDispatch();
    const [formCall, setFormCall] = useState(false)
    const [dataThree, setDataThree] = useState({set_id : localStorage.getItem("id"),title:"",description:"",type:""});
    const [error, setError] = useState("");
    const [dataFour, setDataFour] = useState([]);
    const [filterData, setFilterData] = useState(''); 
    const [showButton, setShowButton] = useState(false);
    const [local, setLocal] = useState('')
    const [changeButton,setChangeButton] = useState(false)
    const [storeData,setStoreData] = useState({})
    const [formdata, setformdata] = useState('')
   
    useEffect(() => {
      axios.get(`https://issuepanel-crud.herokuapp.com/api/stars`)
           .then((res) => {
            //    console.log("HOMEONE DATA ===> ",res.data)
               setDataFour(res.data)
               
           })
           window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
              setShowButton(true);
            } else {
              setShowButton(false);
            }
          });
          setLocal(localStorage.getItem("email"))
    },[]);
    //console.log("data Four ====>",dataFour)
     
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

    const onFormCall = (e) => {
        setFormCall(true)
        e.preventDefault();
    }
    const onFormCallReject = () => {
        setFormCall(false)
    }
    const imageChange=(e)=>{
        let data = new FormData();
      data.append('categoryImage',e.target.files[0] );
      data.append('name',e.target.files[0].name)

      data.append("title",dataThree.title)
      data.append("description",dataThree.description)
      
       data.append("type",dataThree.type)
       data.append("set_id",dataThree.set_id)
      setformdata(data)
      console.log("upload",formdata)
       
}

    const handleChange = (e, editor) => {
        const data = editor.getData();
        setDataThree({...dataThree,description:data});
        //console.log(data);
    }
    const onLogOut = () =>{
        localStorage.clear();
        history("/")
    }
    const onDeleteData = (id) => {
        if(window.confirm("are you sure want to delete data")){
            axios.delete(`https://issuepanel-crud.herokuapp.com/api/stars/${id}`)
            axios.get(`https://issuepanel-crud.herokuapp.com/api/stars`)
            .then((res) => {
             //    console.log("HOMEONE DATA ===> ",res.data)
                setDataFour(res.data)
                
            })
        }
        // window.location.reload();
    }
    const onUpdateData = (id) => {
       
        // axios.get(`http://localhost:8000/data/${id}`)
        //      .then((res) => {
        //          console.log(res.data)
        //          setStoreData(res.data)
                 
        //         //  localStorage.setItem("itemuserid",res.data.userId)
        //         //  localStorage.setItem("itemtitle",res.data.title)
        //         //  localStorage.setItem("itemdescription",res.data.description)
        //         //  localStorage.setItem("itemlink",res.data.link)
        //         //  localStorage.setItem("itemtype",res.data.type)
        //         //  setDataThree({userId : res.data.userId,id: res.data.id,title:res.data.title,description:res.data.discription,link:res.data.link,type:res.data.type})
        //      })
        
             let valTwo = val.find((i) => {return i._id ==id})
             setDataThree({set_id : valTwo.set_id,title:valTwo.title,description:valTwo.description,type:valTwo.type})
             localStorage.setItem("itemid",id)
             setChangeButton(true)
        
        
    }
    const onUpdateDataOne = () => {
        
       
        // window.location.reload();
    }
    // const onFileHandler = (e) => {
    //     const reader = new FileReader();
    //     reader.onload = () =>{
    //       if(reader.readyState === 2){
    //         setDataThree({...dataThree,link: reader.result})
    //       }
    //     }
    //     reader.readAsDataURL(e.target.files[0])
    // } 
    const onFormIssue =(e) => {
        e.preventDefault();
    //     let data = new FormData();
    //   data.append('categoryImage',dataThree.link );
    //   data.append('name',dataThree.link.name)

    //   data.append("title",dataThree.title)
    //   data.append("description",dataThree.description)
      
    //    data.append("type",dataThree.type)
    //    data.append("set_id",dataThree.set_id)
    //   setformdata(data)
    if(changeButton === false){
      console.log("upload",formdata)
        if(dataThree.title === "" || dataThree.description === ""|| dataThree.link===""|| dataThree.type === ""){
            setError("Please fill all field")
        }
       
        else{
            if(window.confirm('are you sure you want to add data')){
             axios.post(`https://issuepanel-crud.herokuapp.com/api/stars`,formdata)
             axios.get(`https://issuepanel-crud.herokuapp.com/api/stars`)
             .then((res) => {
              //    console.log("HOMEONE DATA ===> ",res.data)
                 setDataFour(res.data)
                 
             })
            }
            // window.location.reload()
        }
    }
    else{
        if(window.confirm("Are you sure you want to update data")){
            axios.put(`https://issuepanel-crud.herokuapp.com/api/stars/${localStorage.getItem('itemid')}`,formdata)
            setChangeButton(false)
            axios.get(`https://issuepanel-crud.herokuapp.com/api/stars`)
            .then((res) => {
             //    console.log("HOMEONE DATA ===> ",res.data)
                setDataFour(res.data)
                
            })
        }
        // window.location.reload();
        
    }

    }
    let val =  dataFour?.filter((i) => {return i.set_id == localStorage.getItem("id")})
    // console.log("val ===> ",val)
    let valOne =  val?.filter((i) => {return i.type == filterData})
    // console.log("val ===> ",valOne)
    //  console.log("public link",process.env.REACT_APP_API);

   
    // console.log("data==> ",name)
    return (
        <div>
            {local != null ?
        <div>
            {/* <img src={require("http://localhost:3000/6b8aecbd-f426-4256-8601-d836dee454af")}/> */}
     
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
                
                    <Navbar.Brand style={{color:"white", fontSize:"30px"}}>User panel</Navbar.Brand>
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
           
         

        
         <div className='container' style={{marginTop:"10px"}}>
             <Row>
                <div className="col-sm-12">
                {/* {['top', 'right', 'bottom', 'left'].map((placement) => (
    <OverlayTrigger
      trigger="click"
      key={placement}
      placement={placement}
      overlay={
        <Popover id={`popover-positioned-${placement}`}>
          <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="secondary">Popover on {placement}</Button>
    </OverlayTrigger>
  ))} */}
             <Button variant='warning' style={{marginRight:"10px"}} onClick={onFormCall}>Add Issue</Button>
             <Button onClick={onFormCallReject}>Hide Form</Button>
             <div>
                 {
                     formCall ? 
                     <div>
                         
                         <Form onSubmit={onFormIssue}>
                         <p style={{color:"red"}}>{error}</p>
                             <Form.Group>
                             <Form.Label>Title</Form.Label>
                             <Form.Control type ="text" value ={dataThree.title} onChange={(e) => setDataThree({...dataThree, title:e.target.value})} placeholder='enter your title'/>
                             </Form.Group>
                             <Form.Group>
                             <Form.Label>Description</Form.Label>
                             <CKEditor editor={ClassicEditor} data={dataThree.description} onChange={handleChange} />
                             </Form.Group>
                             
                             <Form.Group>
                             <Form.Label>Type</Form.Label>
                             <Form.Select value ={dataThree.type} onChange={(e) => setDataThree({...dataThree,type:e.target.value}) } placeholder='enter your type'>
                                 <option value=''>Enter your type</option>
                                 <option value="bug">Bug</option>
                                 <option value="discussion">Discussion</option>
                                 <option value="review">Review</option>
                             </Form.Select>
                             </Form.Group>
                             <Form.Group>
                             <Form.Label>Link</Form.Label>
                             <Form.Control type ="file" name="categoryImage" onChange={imageChange} placeholder='enter your link'/>
                             </Form.Group>
                             <Button type='submit'>{changeButton === false ? 'Submit Issue' : 'Update Issue'}</Button>
                             
                         </Form>
                         
                     </div>
                     :null
                 }

             </div>
             <div>
         <Table striped bordered hover variant="dark" style={{marginTop:"20px"}}>
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
                <th>Type</th>
                <th>actions</th>
            </tr>
            </thead>
            <tbody>
            {val?.map((i) => {
                // console.log(i.link.substring(i.link.length-4,i.link.length),i.link.substring(0,1));
                let media1 = i.image && i.image.substring(8 ,i.image.length)
                console.log("media1===>",media1)
                return (
                <tr key={i.id}>
                    <td>{i.title}</td>
                    <td>  <div dangerouslySetInnerHTML={{ __html: i.description}}  /></td>
                    <td>{media1 ? <a href={`https://issuepanel-crud.herokuapp.com/${media1}`}><img src={`https://issuepanel-crud.herokuapp.com/${media1}`} style={{height:"100px",width:"100px"}}/></a>:<p>no images found</p>}</td>
                    <td>{i.type === "bug" ?<Badge bg="danger">{i.type}</Badge>:null}
                    {i.type === "discussion" ?<Badge bg="info">{i.type}</Badge>:null}
                    {i.type === "review" ?<Badge bg="warning">{i.type}</Badge>:null}</td>
                    <td><Button onClick={() => onDeleteData(i._id)}>Delete</Button><br/><Button onClick={() => onUpdateData(i._id)}>Update</Button></td>
                </tr>
                )
            })}
            </tbody>
        </Table>
         </div>
             </div>
             <div className='col-sm-12'>
                 
             <Form.Select  onChange={(e) => setFilterData(e.target.value) } placeholder='enter your type'>
             <option value=''>Enter your type</option>
               <option value="bug">Bug</option>
                <option value="discussion">Discussion</option>
                <option value="review">Review</option>
             </Form.Select>
             <div>
         <Table striped bordered hover variant="dark" style={{marginTop:"20px"}}>
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
                <th>Type</th>
                
            </tr>
            </thead>
            <tbody>
            {valOne?.map((i) => {
                let media1 = i.image && i.image.substring(8 ,i.image.length)
                console.log("media1===>",media1)
                return (
                <tr key={i.id}>
                    <td>{i.title}</td>
                    <td><div dangerouslySetInnerHTML={{ __html: i.description}}  /></td>
                    <td>{media1 ? <a href={`https://issuepanel-crud.herokuapp.com/${media1}`}><img src={`https://issuepanel-crud.herokuapp.com/${media1}`} style={{height:"100px",width:"100px"}}/></a>:<p>no data found</p>}</td>
                    <td>{i.type === "bug" ?<Badge bg="danger">{i.type}</Badge>:null}
                    {i.type === "discussion" ?<Badge bg="info">{i.type}</Badge>:null}
                    {i.type === "review" ?<Badge bg="warning">{i.type}</Badge>:null}</td>
                    
                </tr>
                )
            })}
            </tbody>
        </Table>
    
         </div>            

                

             </div>
             </Row>
         </div>
                 
        </div>:
        <div>
              <h1>Please sign up or login properly and do visit again</h1>
        <Link to="/login">Login Here</Link>
        </div>
        }
        </div>
    )
       
}


export default HomeOne
// https://github.com/ckeditor/ckeditor5-react/issues/241