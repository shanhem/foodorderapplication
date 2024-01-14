import React from 'react'
import {IoLeafSharp} from "react-icons/io5"
import { useState } from 'react';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import { dispatch } from 'react';

const MenuContainer = () => {

    const [filter, setFilter] = useState("chicken");
    const [{foodItems},dispatch]=useStateValue();

  return (
     <section className='w-full my-6' id="menu">
        <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold capitalize
         text-headingColor relative before:absolute 
         before:rounded-lg before:content before:w-16 before:h-1 
         before:-bottom-2 before:left-7 before:bg-green-700 transition-all 
         ease-in-out duration-100'>
          Our Fresh Menu</p>
          
          <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll 
          scrollbar-none'>
            {categories && categories.map(category=>(
                <motion.div whileTap={{scale:0.75}} key={category.id} 
            className={`group ${filter === category.urlParamName ? 'bg-limeGreen':"bg-white"} bg-card w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-limeGreen`}
            onClick={()=>setFilter(category.urlParamName)}
            >
                    
                    <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-white':'bg-green-700'} group-hover:bg-card flex items-center justify-center`}>
                    <IoLeafSharp className={`text-lg ${filter === category.urlParamName ? 'text-textColor':"text-white"} group-hover:text-textColor`}
                    />
                    </div>
                    <p className={`text-sm text-textColor ${filter === category.urlParamName ? 'text-white':"text-textColor"} group-hover:text-white'`}>{category.urlParamName}</p>
                </motion.div>
            ))}
          </div>
            
            <div className='w-full'>
                <RowContainer flag={false} data={foodItems?.filter((n) => n.category == filter)}/>
            </div>

        </div>
    </section>    
 )
}

export default MenuContainer