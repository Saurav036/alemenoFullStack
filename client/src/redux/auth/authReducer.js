import { LOGIN, SETAUTH, SETAUTHREFRESH } from "./type";
  
  const initialState = {
    isLoggedIn:false,
    auth:{}

  };
  
  const authReducer = (state = initialState, action) => {
    console.log('reducers working', action)
    switch (action.type) {
      // all todo gets reducers
      case LOGIN:
        return {
          ...state,
          login:action.data,
        };
        case SETAUTH:
          return {
            ...state,
            auth:action.data
          };
          case SETAUTHREFRESH:
            return {
              ...state, 
              auth:action.data
            }
          
      
      default:
        return state;
    }
  };
  
  export default authReducer;
  