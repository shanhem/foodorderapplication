import React from 'react'
import { MdShoppingBag } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useRef } from 'react'
import  cactus  from '/Users/shan/Documents/wekravefinal/src/img/pngwing.com.png'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/Reducer'
import { useState } from 'react'

const RowContainer = ({flag , data,scrollValue}) => {
    const rowContainer = useRef()

    const [items, setItems] = useState([]);

    const [{cartItems},dispatch]=useStateValue()

    const addToCart = () => {
        dispatch({
            type :actionType.SET_CART_ITEMS,
            cartItems : items,
        })
        localStorage.setItem("cartItems",JSON.stringify(items))
    }

    useEffect(()=>{
    rowContainer.current.scrollLeft+=scrollValue
    },[scrollValue])

    useEffect(()=>{
        addToCart()
    },[items])

    return (
  <div ref={rowContainer}
  className={`w-full my-12 flex items-center gap-3 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none':'overflow-x-hidden flex-wrap justify-center h-420'}`}>

    {data && data.length>0 ? (
        data.map(item=>(
        <div key={item?.id} className='w-275 h-[175px] min-w-[275px] md:min-w-[300px] md:w-340 my-12 bg-cardOverlay rounded-lg p-2 flex items-center justify-between flex-col hover:drop-shadow-lg'>
        <div className='w-full flex items-center justify-between'>

            <motion.div whileHover={{scale:1.2}} className='w-40 -mt-8 drop-shadow-2xl h-40' >
            <motion.img className="w-full h-full object-contain "src={item?.imageURL} alt='chicken' />
            </motion.div>

            <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-full bg-green-700 flex items-center 
            justify-center cursor-pointer hover:shadow-md'
            onClick={() =>setItems([...cartItems, item])
            }
            >
                <MdShoppingBag className='text-white'/>
            </motion.div>
        </div>
    
        <div className='w-full flex flex-col items-end justify-end'>
            <p className='text-textColor font-semibold text-base md:text-md'>{item?.title}</p>
            <p className='mt-1 text-sm text-gray-500'>{item?.calories}</p>
            <div className='flex items-center gap-8'>
                <p className='text-md text-headingColor font-semibold'>
                    <span className='text-sm text-green-700'>£ </span>{item?.price}</p>
            </div>
            </div>
        </div>
    )) 

    ):( <div className='w-full flex items-center justify-center'>
        <img className='object-contain w-40 h-300' src={cactus}/>
        <p className='text-green-700 text-xl font-semibold my-2'>No Available Items </p>
        </div>
        )}

  </div>
  )
}

export default RowContainer