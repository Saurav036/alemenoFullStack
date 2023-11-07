import {createStore , applyMiddleware}  from 'redux'
import rootReducer from './redux/rootReducer'
import thunk from 'redux-thunk'

export default createStore(rootReducer, applyMiddleware(thunk))

// export default Store