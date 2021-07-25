import * as types from './action-type'

const initState = {
    users:[],
    user:{},
    loading:true
}

const usersReducers = (state= initState,action)=>{
    switch (action.type){
        case types.GET_USER:
        return {
            ...state,
            users:action.payload,
            loading:false
        }
        case types.DELETE_USER:
            case types.ADD_USER:
            case types.UPDATE_USER:
              return {
                ...state,
                loading: false,
              };
        default:
        return state;
    };
    
}

export default usersReducers;