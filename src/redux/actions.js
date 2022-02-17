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
        axios.get(`https://issuepanel-crud.herokuapp.com/api/users`)
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
        axios.post(`https://issuepanel-crud.herokuapp.com/api/users`,user)
             .then((res) => {
                //  console.log("resp",res.data)
                 dispatch(addSignUpUsers())
                 dispatch(getUsers())
             })
             .catch((err) => {
                 console.log(err)
                //  setError("please add another email")
             })
    }
}
 