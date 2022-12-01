import './App.css';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchItems, getPosts, testMiddleware } from './slices/item';


function App() {

  const items = useSelector(state => state.items)
  const users = useSelector(state => state.items.users)
  const dispatch = useDispatch()



  useEffect(()=>{
    dispatch(fetchItems())
    console.log(items)
  },[])

  return (
    <div className="App">
      <h1>USERss</h1>
      {
        users.map(e => 
        <div>
          <h1>{e.name}</h1>
          <p>{e.email}</p>
        </div>
        )
      }
    </div>
  );
}

export default App;

