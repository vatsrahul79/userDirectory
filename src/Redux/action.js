import * as types from "./action-type"
import axios from 'axios'

const getUsers = (users) =>({
    type: types.GET_USER,
    payload: users
});

const userDeleted = () => ({
    type: types.DELETE_USER,
  });
  
  const userAdded = () => ({
    type: types.ADD_USER,
  });
  
  const userUpdated = () => ({
    type: types.UPDATE_USER,
  });

export const loadUser =()=>{
    return function (dispatch){
        axios.get('http://localhost:5000/users')
        .then((res) =>{
            console.log("resp",res)
            dispatch(getUsers(res.data))
        })
    }
}

export const deleteUser = (id) => {
    console.log(id)

    return function (dispatch) {
      axios
        .delete(`http://localhost:5000/users/${id}`)
        .then((resp) => {
          console.log("resp", resp);
          dispatch(userDeleted());
          dispatch(loadUser());
        })
        .catch((error) => console.log(error));
    };
  };


export const addUser = (user) => {
    console.log(user)
    return function (dispatch) {
      axios
        .post(`http://localhost:5000/users}`, user)
        .then((resp) => {
          console.log("resp", resp);
          dispatch(userAdded());
          dispatch(loadUser());
        })
        .catch((error) => console.log(error));
    };
  };

  export const updateUser = (user, id) => {
    console.log(user,id)

    return function (dispatch) {
      axios
        .put(`http://localhost:5000/users/${id}`, user)
        .then((resp) => {
          console.log("resp", resp);
          dispatch(userUpdated());
        })
        .catch((error) => console.log(error));
    };
  };