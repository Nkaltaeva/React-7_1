import { createSlice, createAsyncThunk, applyMiddleware } from "@reduxjs/toolkit";
import { useCallback } from "react";


export const fetchItems = createAsyncThunk(
    'fetchItems',
    async function(_,thunkApi){
        console.log(thunkApi)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = response.json()
        console.log(data)
        return data
    }
)


const itemSlice = createSlice({
    name:'items',
    initialState:{
        users:[],
        err:false,
        loading:false
    },
    reducers:{
        testMiddleware:(state, action)=>{
            state.users.push(action.payload)
        },
        getPosts:(state,action)=>{
            console.log(action.payload)
            state = action.payload
        }
    },
    extraReducers:{
        [fetchItems.pending]:(state,action)=>{
            state.loading = true
        },
        [fetchItems.fulfilled]:(state,action)=>{
            state.users = action.payload
            state.loading = false
        },
        [fetchItems.rejected]:(state,action)=>{
            state.err = true
            state.loading = false
        }
    }
})

export const itemsReducer = itemSlice.reducer
export const {testMiddleware,getPosts} = itemSlice.actions


export const middlewareAlert = store => next => (action) => {
    if (action.type === 'items/testMiddleware' && action.payload !== "Бот")
    {
        alert('middleware is worked')
        setTimeout(()=>{ store.dispatch(testMiddleware("Бот"))}, 1000)
    }
    
    return next(action)
}