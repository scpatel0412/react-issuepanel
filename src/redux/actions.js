import * as types from "./actionTypes";
import axios from 'axios'

const getUsers = (users) => ({
    type : types.GET_USERS,
    payload : users,
})
const addSignUpUsers = () => ({
    type: types.SIGNUP_USERS
})
// const addUserIssue = () => ({
//     type: types.ADD_ISSUE
// })


export const loadUser = () => {
    return function(dispatch) {
        axios.get(`http://localhost:8000/user`)
             .then((res) => {
                //  console.log("resp",res.data)
                 dispatch(getUsers(res.data))
             })
             .catch((err) => {
                 console.log(err)
             })
    }
} 
export const addUser = (user) => {
    return function(dispatch) {
        axios.post(`http://localhost:8000/user`,user)
             .then((res) => {
                //  console.log("resp",res.data)
                 dispatch(addSignUpUsers())
                 dispatch(getUsers())
             })
             .catch((err) => {
                 console.log(err)
             })
    }
}
// export const addIssue = (nature, natureOne) => {
//     console.log("nature===> ",nature)
//     const val = nature.find((i)=>{return i.id == localStorage.getItem("id")})
//     console.log("val with find====>",val)
//     console.log("natureone ===>", natureOne);
    
    
   
    
//     // return function(dispatch) {
      
//     //     axios.post(`http://localhost:8000/user`,val.info.push(natureOne))
//     //          .then((res) => {
//     //              console.log("resp",res.data)
//     //             //  console.log("nature ===>", val)
//     //              dispatch(addUserIssue())
//     //              dispatch(getUsers())
//     //          })
//     //          .catch((err) => {
//     //              console.log(err)
//     //          })
//     // }
// }  