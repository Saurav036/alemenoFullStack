import React from 'react'
import { SET_COURSES } from './type'
const initialState = {
    courses:[]
}
const Course = (state =initialState,  action) => {
switch (action.type){
    case SET_COURSES:
    return{
        ...state,
        courses: action.data
    }

    default: 
    return state
}
    
}

export default Course