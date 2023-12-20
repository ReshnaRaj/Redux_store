import  {createSlice} from '@reduxjs/toolkit'
const userSlice=createSlice({
    name:'users',
    // this name is should be same as in written in store actions  [ Represents the name of the slice in the Redux store, in this case, 'users'.]
    initialState:{
        users:[]
    
    },
    reducers:{
        getUser:(state,action)=>{
            state.users=action.payload.map(user=>{
                return {id:user._id,
                    name:user.name,
                    email:user.email,
                    age:user.age,
                    
                }

            })

        }
        ,addUser:(state,action)=>{
            state.users.push(action.payload)
            
        },
        updateUser:(state,action)=>{
            const index=state.users.findIndex(x=>x.id===action.payload.id)
            state.users[index]={
                id:action.payload.id,
                name:action.payload.names,
                email:action.payload.emails,
                age:action.payload.ages
            }
        
        },
        removeUser:(state,action)=>{

            const id=action.payload.id;
            state.users=state.users.filter(u=>u.id!==id)
        }

    }
})
export const {getUser,addUser,updateUser,removeUser} =userSlice.actions;
export default userSlice.reducer;