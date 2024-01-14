import HeroBg from "/Users/shan/Documents/wekravefinal/src/img/heroBg.png"
import React from 'react'
import Deliery from "/Users/shan/Documents/wekravefinal/src/img/delivery.png"
import { heroData } from "../utils/data"
import {motion} from 'framer-motion'

function HomeContainer() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <div className='py-2 flex-1 flex flex-col items-start justify-center 
      md:items-start'>

        <div className='flex items-center gap-6 justify-center  p-2 rounded-full bg-green-200 drop-shadow-xl'>
          <p className='text=base text-green-800 font-semibold'> Bike Delivery</p>
          <div className='w-8 h-8  rounded-full overflow-hidden drop-shadow-xl bg-orange-200'>
            <img className='w-full h-full object-contain' src={Deliery} alt="delivery" />
          </div>
        </div>

        <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
          The Fast Delivery in <span className=' font-bold text-green-800 text-[3rem] lg:text-[5rem]'> Your City</span></p>
        <p className='text-base text-textColor md:w-[80%] text-center lg:text-left'>Introducing WeKrave, the online platform that satisfies your cravings for delicious and healthy food. Our website offers a wide selection of nutritious meals that are carefully curated by our team of expert chefs and nutritionists.
        </p>

        <motion.button type='button' whileTap={{scale:0.75}} className=' bg-green-700 rounded-lg w-full my-5 px-4 py-2 hover:drop-shadow-2xl hover:bg-black hover:text-green-500 transition-all ease-in-out duration-100 md:w-auto'>Order Now</motion.button>
      </div>

      <div className='py-2 flex-1 flex items-center relative'>
        <img className=' ml-auto h-400 w-full lg:w-auto lg:h-auto' src={HeroBg} alt='herobg' />
        <div className='w-full h-full absolute top-0 left-0 gap-4 flex-wrap py-4 flex items-center justify-center lg:px-32'>
          {heroData && heroData.map(n =>
            <div key={n.id} className=' lg:w-190 p-4 bg-cardOverlay backdrop-blur-md shadow-lg rounded-3xl flex flex-col justify-center items-center'>

              <img src={n.imageSrc} className="w-20 lg:w-40 lg:-mt-20 -mt-10" />

              <p className='lg:text-xl text-base font-semibold lg:mt-4 text-textColor mt-2'>{n.name}</p>

              <p className='text-[12px] lg:text-sm lg:mt-4 mt-2 text-gray-500 font-semibold lg:my-3 my-1'>{n.decp}</p>

              <p className='text-sm text-black font-semibold'><span className='text-xs text-green-700'>£ </span>{n.price}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeContainer