import React, {useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { CreateContainer, MainContainer } from './components'
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from './context/StateProvider'
import {getAllFoodItems} from './utils/firebaseFunctions'
import { actionType } from './context/Reducer'
import Service from './components/Service'

const App = () => {
  const [{foodItems},dispatch]=useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data)=>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data,
      })
    })
  }

  useEffect(() => {
   fetchData()
  },[]);

  return (
    <AnimatePresence>
      <div className='w-screen h-auto flex flex-co bg-primary'>
        <Header />ß

        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
            <Route path='service' element={<Service/>}/>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App

