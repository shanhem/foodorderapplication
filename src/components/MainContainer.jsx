import React from 'react'
import HomeContainer from './HomeContainer'
import Deliery from "/Users/shan/Documents/wekravefinal/src/img/delivery.png"
import {motion} from 'framer-motion'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import RowContainer from './RowContainer'
import {useStateValue} from '../context/StateProvider'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'

const MainContainer = () => {


  const [{foodItems, cartShow},dispatch] = useStateValue();
  const [scrollValue,setScrollValue]= useState(0);


  useEffect(() => {},[scrollValue,cartShow])



  return (
    <div className='w-full h-auto flex flex-col item-center justify-center'>
      <HomeContainer/>
     
     <section className='w-full my-6'>
      <div className='w-full flex items-center justify-between'>
        <p className='text-2xl font-semibold capitalize
         text-headingColor relative before:absolute 
         before:rounded-lg before:content before:w-32 before:h-1 
         before:-bottom-2 before:left-0 before:bg-green-500 transition-all 
         ease-in-out duration-100'>
          Offers</p>

    <div className='hidden items-center md:flex gap-3'>
    <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer hover:shadow-lg flex items-center justify-center'
    onClick={()=>setScrollValue(-200)}
    >
      <MdChevronLeft className='text-lg text-black'/>
      </motion.div>

    <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'
          onClick={()=>setScrollValue(200)}

    >
      <MdChevronRight className='text-lg text-black'/>
      </motion.div>

    </div>

      </div>


    <RowContainer
    scrollValue = {scrollValue}
    flag={true} data={foodItems?.filter(n => n.category === 'smoothie')}
    />


     </section>

<MenuContainer/>

{cartShow && (
  <CartContainer/>
)}

  

      </div>

      






  )
}

export default MainContainer