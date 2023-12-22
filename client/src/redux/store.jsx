import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'

const store=configureStore({
    reducer:{
users:userReducer
    }
})
export default store;
// configureStore() is a function provided by Redux Toolkit to
//  set up the Redux store.
// userReducer is imported from './userSlice' and added as a reducer 
// to the store. This reducer manages the state for the users slice of the Redux store.
// 'users' refers to a slice of the Redux state. A slice is a portion of the overall Redux state 
// tree that is managed separately by its reducer and contains specific data or functionality. 